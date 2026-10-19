(function(root) {
  const KEY = 'brass-tasks-webapp.v1';
  function parseMarkdown(markdown) {
    const lines = markdown.split(/\r?\n/); const tasks = [];
    let title = '', section = '', fence = null, frontmatter = lines[0]?.trim() === '---';
    lines.forEach((line, index) => {
      if (frontmatter) { if(index > 0 && /^(---|\.\.\.)\s*$/.test(line)) frontmatter = false; return; }
      const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
      if (marker) { if(!fence) fence = marker[1]; else if(marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null; return; }
      if (fence) return;
      const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
      if (heading) { if(heading[1].length === 1 && !title) title = heading[2]; else section = heading[2]; }
      const task = line.match(/^(\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])(\]\s+)(.+)$/);
      if (task) tasks.push({ line:index, text:task[4], done:task[2].toLowerCase() === 'x', section });
    });
    return { title, tasks };
  }
  function changeTask(markdown, lineIndex, action, text) {
    const parsed = parseMarkdown(markdown);
    const task = parsed.tasks.find(t => t.line === lineIndex);
    if (!task) throw Error('This task changed. Please try again.');
    const newline = markdown.includes('\r\n') ? '\r\n' : '\n';
    const lines = markdown.split(/\r?\n/);
    if(action === 'remove') lines.splice(lineIndex, 1);
    else if(action === 'toggle') lines[lineIndex] = lines[lineIndex].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[)[ xX](\])/, (_,a,b) => a + (task.done ? ' ' : 'x') + b);
    else if(action === 'edit') lines[lineIndex] = lines[lineIndex].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[[ xX]\]\s+).+$/, (_,prefix) => prefix + cleanText(text));
    return lines.join(newline);
  }
  function cleanText(text) { const value = String(text || '').replace(/[\r\n]+/g, ' ').trim(); if(!value || value.length > 500) throw Error('Enter between 1 and 500 characters.'); return value; }
  function addTask(markdown, text) { const nl = markdown.includes('\r\n') ? '\r\n' : '\n'; return markdown.replace(/\s*$/, '') + nl + '- [ ] ' + cleanText(text) + nl; }
  function parseTaskBatch(text) {
    const lines = String(text || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if(!lines.length) throw Error('Enter at least one task, one per line.');
    if(lines.length > 200) throw Error('Add up to 200 tasks at a time.');
    return lines.map(line => cleanText(line.replace(/^(?:[-*+•]|\d+[.)])\s+/, '').replace(/^\[[ xX]\]\s*/, '')));
  }
  function addTasks(markdown, text) {
    const tasks = parseTaskBatch(text), nl = markdown.includes('\r\n') ? '\r\n' : '\n';
    return markdown.replace(/\s*$/, '') + nl + tasks.map(task => '- [ ] ' + task).join(nl) + nl;
  }
  function isComplete(markdown) { const tasks = parseMarkdown(markdown).tasks; return tasks.length > 0 && tasks.every(task => task.done); }
  function becameComplete(before, after) { return !isComplete(before) && isComplete(after); }
  function advanceQuote(state, count) { state.quoteIndex = ((state.quoteIndex || 0) + 1) % count; }
  function exportMarkdown(page) { return page.kind === 'note' ? '# ' + page.title + '\n\n' + page.markdown : page.markdown; }
  function exportCollection(pages, kind) {
    const selected = pages.filter(page => page.status !== 'binned' && (page.kind === 'note' ? 'note' : 'plan') === kind);
    return '# ' + (kind === 'note' ? 'All notes' : 'All task lists') + '\n\n' + selected.map(page => {
      const content = exportMarkdown(page);
      return (parseMarkdown(content).title ? '' : '# ' + page.title + '\n\n') + content;
    }).join('\n\n---\n\n');
  }
  function fresh() { return { version:1, revision:0, activeId:null, quoteIndex:0, plans:[], sessions:[], preferences:{ focus:false, muted:false, tickMuted:true, bellMuted:false, digital:true }, timer:{} }; }
  function movePage(state, id, status) {
    const page = state.plans.find(page => page.id === id);
    if(!page || !['active','archived','binned'].includes(status)) throw Error('This page is no longer available.');
    page.status = status;
    if(status === 'active') state.activeId = id;
    else if(state.activeId === id) state.activeId = state.plans.find(page => page.status === 'active')?.id || null;
  }
  function journalEntries(state) {
    return [...state.sessions, ...state.plans.filter(page => page.kind === 'note' && page.status !== 'binned').map(page => ({
      id:page.id, pageId:page.id, title:page.title, note:page.markdown, kind:'note',
      at:page.finishedAt || page.updatedAt || page.createdAt || 0,
      label:page.status === 'archived' ? 'Archived note' : page.finishedAt ? 'Finished note' : 'Draft note'
    }))].sort((a,b) => b.at - a.at);
  }
  function quoteMarkdown(quote) {
    return quote.text.split(/\r?\n/).map(line => '> ' + line).join('\n') + '\n\n— ' + quote.author + ', ' + quote.book + '\n\nSource: Readwise PDF, page ' + quote.page + ' · reading location ' + quote.location + '\n';
  }
  function validate(value) {
    if (!value || value.version !== 1 || !Array.isArray(value.plans) || !Array.isArray(value.sessions) || value.plans.length > 1000 || value.sessions.length > 10000) throw Error('This is not a valid Brass & Tasks backup.');
    const ids = new Set();
    for(const plan of value.plans) {
      if(!plan || typeof plan.id !== 'string' || ids.has(plan.id) || typeof plan.title !== 'string' || typeof plan.markdown !== 'string' || plan.markdown.length > 2000000 || !['active','archived','binned'].includes(plan.status)) throw Error('The backup contains an invalid plan.');
      ids.add(plan.id);
      if(plan.kind !== undefined && !['plan','note'].includes(plan.kind)) throw Error('The backup contains an invalid page type.');
      if(plan.finishedAt !== undefined && (!Number.isFinite(plan.finishedAt) || plan.finishedAt < 0)) throw Error('The backup contains an invalid note completion time.');
    }
    for(const session of value.sessions) if(!session || typeof session.id !== 'string' || typeof session.title !== 'string' || typeof session.note !== 'string' || !Number.isFinite(session.at)) throw Error('The backup contains an invalid session.');
    const defaults = fresh();
    const result = { ...defaults, plans:value.plans, sessions:value.sessions, activeId:ids.has(value.activeId) ? value.activeId : null, timer:value.timer && typeof value.timer === 'object' ? value.timer : {}, revision:Number.isSafeInteger(value.revision) ? value.revision : 0 };
    if(Number.isSafeInteger(value.quoteIndex) && value.quoteIndex >= 0 && value.quoteIndex < 200) result.quoteIndex = value.quoteIndex;
    for(const key of Object.keys(defaults.preferences)) if(typeof value.preferences?.[key] === 'boolean') result.preferences[key] = value.preferences[key];
    return result;
  }
  function commit(storage, state, expectedRevision) {
    const previous = storage.getItem(KEY);
    if(previous && JSON.parse(previous).revision !== expectedRevision) throw Error('Another tab updated this workspace. Reload before editing.');
    const next = { ...state, revision:expectedRevision + 1 };
    storage.setItem(KEY, JSON.stringify(next));
    return next;
  }
  const api = { KEY, parseMarkdown, changeTask, addTask, parseTaskBatch, addTasks, isComplete, becameComplete, advanceQuote, exportMarkdown, exportCollection, movePage, journalEntries, quoteMarkdown, cleanText, fresh, validate, commit };
  if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.BrassModel = api;
})(globalThis);
