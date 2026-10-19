'use strict';
const $ = selector => document.querySelector(selector);
const M = BrassModel;
const node = (tag, className, text) => { const element = document.createElement(tag); if(className) element.className = className; if(text !== undefined) element.textContent = text; return element; };
const button = (label, handler, className = '') => { const element = node('button', className, label); element.type = 'button'; element.onclick = handler; return element; };
let state = M.fresh(), storageError = '', showArchived = false, toastTimeout, modalOrigin, modalSubmit;
try { const raw = localStorage.getItem(M.KEY); if(raw) state = M.validate(JSON.parse(raw)); }
catch { storageError = 'Saved data could not be read. Export a backup before restoring a valid workspace. Your existing data has not been overwritten.'; }
let timer = new Pomodoro(state.timer);
const typeSound = new TypewriterSound(), clockSound = new ClockSound();
let audioPromise;
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimeout); toastTimeout = setTimeout(() => $('#toast').hidden = true, 7000); }
function mutate(edit) {
  if(storageError) throw Error(storageError);
  const next = structuredClone(state); edit(next); next.timer = timer.serialize();
  try { state = M.commit(localStorage, next, state.revision); }
  catch(error) { $('#save-state').textContent = 'Not saved'; throw Error(error.name === 'QuotaExceededError' ? 'Browser storage is full. Download a backup and free space before trying again.' : error.message); }
  $('#save-state').textContent = 'All changes saved';
}
function run(action) { try { return action(); } catch(error) { toast(error.message); } }
function active() { return state.plans.find(plan => plan.id === state.activeId && plan.status === 'active'); }
function savePlan(markdown) {
  const completed = M.becameComplete(active().markdown,markdown);
  mutate(next => { const plan = next.plans.find(p => p.id === next.activeId); plan.markdown = markdown; plan.updatedAt = Date.now(); if(completed) M.advanceQuote(next,BrassQuotes.length); });
  render();
  if(completed) { typeSound.ejectPaper(); toast('Plan complete. A fresh thought for your next chapter.'); }
  return completed;
}
function createPlan(title, markdown = '', kind = 'plan') {
  title = M.cleanText(title);
  mutate(next => { const id = crypto.randomUUID(); next.plans.unshift({ id, title, kind, markdown:kind === 'note' ? markdown : markdown || '# ' + title + '\n\n', status:'active', createdAt:Date.now(), updatedAt:Date.now() }); next.activeId = id; });
  showArchived = false; $('#plan-search').value = ''; render(); typeSound.play('return');
}
function field(labelText, id, type = 'text', value = '') {
  const label = node('label', '', labelText); label.htmlFor = id;
  const input = node(type === 'textarea' ? 'textarea' : 'input'); input.id = id; input.name = id; if(type !== 'textarea') input.type = type; input.value = value;
  $('#modal-content').append(label, input); return input;
}
function openModal(title, build, submitLabel, submit) {
  if(!$('#modal').open) modalOrigin = document.activeElement;
  $('#modal-title').textContent = title; $('#modal-content').replaceChildren(); $('#modal-error').textContent = ''; $('#modal-actions').replaceChildren();
  modalSubmit = submit;
  build?.($('#modal-content'));
  $('#modal-actions').append(button('Cancel', closeModal, 'secondary'));
  if(submitLabel) { const confirm = node('button','primary',submitLabel); confirm.type = 'submit'; $('#modal-actions').append(confirm); }
  if(!$('#modal').open) $('#modal').showModal();
  requestAnimationFrame(() => ($('#modal-content input, #modal-content textarea, #modal-content button') || $('#modal-close')).focus());
}
function closeModal() { $('#modal').close(); }
$('#modal').addEventListener('close', () => { if(modalOrigin?.isConnected) modalOrigin.focus(); });
$('#modal-close').onclick = closeModal;
$('#modal-form').onsubmit = async event => {
  event.preventDefault(); if(!modalSubmit) return;
  const submit = $('#modal-actions [type=submit]'); if(submit) submit.disabled = true;
  try { await modalSubmit(); closeModal(); }
  catch(error) { $('#modal-error').textContent = error.message; }
  finally { if(submit) submit.disabled = false; }
};
function newPlanDialog() { openModal('A fresh page.', () => { const input = field('Give your plan a title', 'plan-title'); input.placeholder = 'A good day’s work'; input.maxLength = 120; input.required = true; }, 'Create plan', () => createPlan($('#plan-title').value)); }
function newNoteDialog() {
  openModal('A page for your thoughts.', () => { const input = field('Note title','note-title'); input.placeholder = 'Thoughts worth keeping'; input.maxLength = 120; input.required = true; }, 'Create note', () => createPlan($('#note-title').value, '', 'note'));
}
function deletePlanDialog(plan) {
  const kind = plan.kind === 'note' ? 'note' : 'plan';
  openModal(`Delete this ${kind}?`, body => body.append(node('p','',`“${plan.title}” will be removed from this browser. Export it first if you want a copy. Journal entries are retained.`)), 'Delete ' + kind, () => {
    mutate(next => {
      next.plans = next.plans.filter(p => p.id !== plan.id);
      if(next.activeId === plan.id) next.activeId = next.plans.find(p => p.status === 'active')?.id || null;
    });
    render(); modalOrigin = $('#create-button'); toast(kind === 'note' ? 'Note deleted.' : 'Plan deleted.');
  });
}
function addTaskDialog(task) {
  if(!active()) return newPlanDialog();
  const id = active().id;
  openModal(task ? 'Refine your task.' : 'What’s the next small thing?', content => { const input = field('Task', 'task-text', 'text', task?.text || ''); input.maxLength = 500; input.required = true; input.placeholder = 'Something you can actually do'; if(!task) content.append(button('Add multiple tasks instead',bulkTaskDialog,'text-button')); }, task ? 'Save task' : 'Add task', () => {
    if(active()?.id !== id) throw Error('The active plan changed. Open this dialog again.');
    const markdown = task ? M.changeTask(active().markdown, task.line, 'edit', $('#task-text').value) : M.addTask(active().markdown, $('#task-text').value);
    savePlan(markdown); typeSound.play();
  });
}
function bulkTaskDialog() {
  if(!active()) return newPlanDialog();
  const id = active().id;
  openModal('Make room for the whole plan.', content => {
    content.append(node('p','','One task per line, up to 200 at once. Plain text, bullet lists, numbered lists, and Markdown checkboxes are accepted. All added tasks start unchecked.'));
    const input = field('Tasks, one per line','bulk-tasks','textarea'); input.required = true; input.maxLength = 110000;
    input.placeholder = 'Read the chapter\nDraft the outline\nReview the first version';
    const count = node('p','batch-count','0 tasks ready to add'); count.id = 'batch-count'; count.setAttribute('role','status'); content.append(count);
    input.oninput = () => { try { const n = M.parseTaskBatch(input.value).length; count.textContent = `${n} ${n === 1 ? 'task' : 'tasks'} ready to add`; } catch(error) { count.textContent = input.value.trim() ? error.message : '0 tasks ready to add'; } };
  },'Add tasks',() => {
    if(active()?.id !== id) throw Error('The active plan changed. Open this dialog again.');
    const text = $('#bulk-tasks').value, count = M.parseTaskBatch(text).length;
    savePlan(M.addTasks(active().markdown,text)); typeSound.play('return'); toast(`${count} tasks added.`);
  });
}
function renderQuote() {
  const quote = BrassQuotes[state.quoteIndex || 0];
  $('#quote-text').textContent = quote.text;
  $('#quote-source').textContent = `From ${quote.book} · ${quote.author}`;
  $('#quote-source').title = `Readwise PDF, page ${quote.page} · reading location ${quote.location}`;
  $('#quote-position').textContent = `${(state.quoteIndex || 0) + 1} / ${BrassQuotes.length}`;
  $('#quote-text').dataset.quoteId = quote.id;
}
function renderLibrary() {
  const query = $('#plan-search').value.trim().toLowerCase(); const list = $('#plan-list'); list.replaceChildren();
  const plans = state.plans.filter(p => p.status === (showArchived ? 'archived' : 'active') && p.title.toLowerCase().includes(query));
  $('#plan-count').textContent = state.plans.filter(p => p.status === 'active').length;
  for(const plan of plans) {
    const kind = plan.kind === 'note' ? 'note' : 'plan';
    const parsed = M.parseMarkdown(plan.markdown);
    const item = button('', () => run(() => {
      if(showArchived) { openModal(`Bring this ${kind} back?`, content => content.append(node('p','',plan.title)), 'Restore ' + kind, () => { mutate(next => { next.plans.find(p => p.id === plan.id).status = 'active'; next.activeId = plan.id; }); showArchived = false; render(); }); }
      else { mutate(next => next.activeId = plan.id); render(); }
    }), 'plan-item' + (plan.id === state.activeId ? ' active' : ''));
    item.setAttribute('aria-current', String(plan.id === state.activeId));
    item.append(node('span','plan-icon','▤'));
    const info = node('span','plan-info'); info.append(node('strong','',plan.title),node('small','',kind === 'note' ? 'Markdown note' : `${parsed.tasks.filter(t => t.done).length} of ${parsed.tasks.length} complete`)); item.append(info);
    const row = node('div','plan-row');
    const remove = button('Delete', () => deletePlanDialog(plan), 'delete-plan');
    remove.setAttribute('aria-label', `Delete ${kind}: ` + plan.title); remove.title = `Delete ${kind}: ` + plan.title;
    row.append(item,remove); list.append(row);
  }
  if(!plans.length) list.append(node('p','library-empty',query ? 'No matching pages.' : showArchived ? 'No archived pages yet.' : 'Your next chapter starts with a fresh page.'));
  $('#archive-toggle').textContent = showArchived ? 'Back to active pages' : 'Show archived pages'; $('#archive-toggle').setAttribute('aria-expanded', String(showArchived));
}
function renderPaper() {
  const paper = $('#paper'), scroll = paper.scrollTop; paper.replaceChildren(); const plan = active();
  const isNote = plan?.kind === 'note';
  paper.classList.toggle('note-paper', isNote); paper.setAttribute('aria-label', isNote ? 'Note page' : 'Plan checklist');
  $('.view-toggle').hidden = isNote;
  $('#export-button').title = isNote ? 'Download note as Markdown' : 'Download current plan';
  $('#export-button').setAttribute('aria-label', $('#export-button').title);
  $('#plan-menu').setAttribute('aria-label', isNote ? 'Note actions' : 'Plan actions');
  $('#finish-button').textContent = isNote ? 'Download Markdown ↓' : 'Close this session ↗';
  $('#export-button').disabled = !plan; $('#plan-menu').disabled = !plan; $('#finish-button').hidden = !plan;
  if(!plan) {
    paper.append(node('div','paper-kicker','YOUR NEXT CHAPTER'),node('h2','paper-welcome','A fresh page awaits.'),node('p','empty-paper','Bring a plan, or start with one small thing. There’s room to begin again.'));
    paper.append(button('+ Create your first plan',newPlanDialog,'paper-start'),node('br'),button('Try a sample plan', () => run(() => createPlan('A fresh start', '# A fresh start\n\n## Settle in\n- [ ] Choose one thing that matters today\n- [ ] Start a focus session with the brass clock\n- [ ] Take a breath, and mark your progress\n')), 'paper-start'));
    $('#progress').textContent = 'A fresh page awaits'; $('#task-summary').textContent = 'Make space for what matters.'; return;
  }
  if(isNote) {
    paper.append(node('div','paper-kicker','A PAGE FOR YOUR THOUGHTS'),node('h2','paper-title',plan.title));
    const editor = node('textarea','note-editor'); editor.id = 'note-editor'; editor.value = plan.markdown; editor.maxLength = 2000000;
    editor.setAttribute('aria-label','Write your note'); editor.placeholder = 'Let your thoughts find their way onto the page…';
    editor.oninput = () => run(() => {
      mutate(next => { const note = next.plans.find(p => p.id === plan.id); note.markdown = editor.value; note.updatedAt = Date.now(); });
    });
    paper.append(editor); $('#progress').textContent = 'Your note · saved as you write';
    $('#task-summary').textContent = 'Your words, ready to take with you.'; return;
  }
  const parsed = M.parseMarkdown(plan.markdown), complete = parsed.tasks.filter(task => task.done).length;
  const kicker = node('div','paper-kicker'); kicker.append(node('span','',state.preferences.focus ? 'ONE THING AT A TIME' : 'A PLAN, NOT A RACE'),node('span','',String(complete).padStart(2,'0') + ' / ' + String(parsed.tasks.length).padStart(2,'0')));
  paper.append(kicker,node('h2','paper-title',plan.title),node('hr','divider'));
  const visible = state.preferences.focus ? parsed.tasks.filter(task => !task.done).slice(0,1) : parsed.tasks;
  let section;
  visible.forEach(task => {
    if(task.section && task.section !== section) paper.append(node('div','section',task.section)); section = task.section;
    const row = node('div','task-item');
    const toggle = button('', () => run(() => { const completed = savePlan(M.changeTask(active().markdown,task.line,'toggle')); if(!completed) typeSound.play(task.done ? 'key' : 'return'); const nextToggle = document.querySelector(`[data-task-line="${task.line}"]`) || $('.task') || $('.add-task'); nextToggle?.focus({preventScroll:true}); }), 'task' + (task.done ? ' done' : ''));
    toggle.setAttribute('role','checkbox'); toggle.setAttribute('aria-checked',String(task.done)); toggle.dataset.taskLine = task.line;
    const box = node('span','box'); box.setAttribute('aria-hidden','true'); box.innerHTML = '<svg viewBox="0 0 8 8"><path d="M1 4 L3 6 L7 1"/></svg>';
    toggle.append(box,node('span','task-text',task.text));
    const edit = button('✎',() => addTaskDialog(task),'edit-task'); edit.setAttribute('aria-label','Edit task: ' + task.text);
    const remove = button('−', () => run(() => {
      const before = active().markdown, planId = active().id;
      savePlan(M.changeTask(before,task.line,'remove'));
      toast('Task removed.');
      const undo = button(' Undo', () => run(() => { if(active()?.id !== planId) throw Error('Open the original plan to undo.'); const current = active().markdown; if(current !== M.changeTask(before,task.line,'remove')) throw Error('The plan has changed. Restore this task manually to preserve your edits.'); savePlan(before); $('#toast').hidden = true; })); $('#toast').append(undo);
      ($('.task') || $('.add-task'))?.focus({preventScroll:true});
    }), 'remove-task'); remove.setAttribute('aria-label','Remove task: ' + task.text);
    row.append(toggle,edit,remove); paper.append(row);
  });
  if(!parsed.tasks.length) paper.append(node('p','empty-paper','A small step is a good place to start.'));
  else if(complete === parsed.tasks.length) paper.append(node('p','all-done','A little progress. A lovely feeling. ✓'));
  paper.append(button('+ add a task',() => addTaskDialog(),'add-task'));
  paper.append(button('+ add multiple tasks',bulkTaskDialog,'add-task bulk-add'));
  paper.scrollTop = scroll;
  $('#progress').textContent = `${complete} / ${parsed.tasks.length} tasks complete`;
  $('#task-summary').textContent = parsed.tasks.length ? `${parsed.tasks.length - complete} small ${parsed.tasks.length - complete === 1 ? 'step' : 'steps'} to go.` : 'Make space for what matters.';
}
function render() {
  renderLibrary(); renderPaper();
  $('#list-view').setAttribute('aria-pressed', String(!state.preferences.focus)); $('#focus-view').setAttribute('aria-pressed', String(state.preferences.focus));
  applyAudio(); drawTimer(); renderQuote();
}
function download(name, data, type = 'text/markdown;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([data], {type})); const a = node('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
}
function filename(title) { return title.replace(/[<>:"/\\|?*\x00-\x1f]/g,'-').slice(0,100) || 'plan'; }
function importText(markdown, fallback = 'Imported plan') {
  if(!markdown.trim()) throw Error('This file is empty.');
  if(markdown.length > 2000000) throw Error('Choose a Markdown file smaller than 2 MB.');
  const parsed = M.parseMarkdown(markdown); createPlan(parsed.title || fallback, markdown);
  if(!parsed.tasks.length) toast('Plan imported. Add tasks here, or use Markdown checkboxes: - [ ] Task');
}
async function importFile(file) { if(!file) return; if(!/\.(md|markdown)$/i.test(file.name)) throw Error('Choose a .md or .markdown file.'); if(file.size > 2000000) throw Error('Choose a Markdown file smaller than 2 MB.'); importText(await file.text(),file.name.replace(/\.(md|markdown)$/i,'')); }
function pasteDialog() { openModal('Bring your plan along.', () => { const area = field('Paste your Markdown', 'markdown-input', 'textarea'); area.placeholder = '# A good day\n\n## First things first\n- [ ] One small thing\n- [ ] Another small thing'; area.required = true; $('#modal-content').append(node('p','','Checkbox tasks, headings, and your original text are kept when exported.')); }, 'Import plan', () => importText($('#markdown-input').value)); }
$('#create-button').onclick = $('#new-plan').onclick = newPlanDialog;
$('#create-note').onclick = $('#new-note').onclick = newNoteDialog;
$('#import-button').onclick = $('#machine-import').onclick = () => $('#markdown-file').click();
$('#paste-button').onclick = pasteDialog;
$('#markdown-file').onchange = async event => { try { await importFile(event.target.files[0]); } catch(error) { toast(error.message); } event.target.value = ''; };
$('#plan-search').oninput = renderLibrary;
$('#archive-toggle').onclick = () => { showArchived = !showArchived; renderLibrary(); };
$('#list-view').onclick = () => run(() => { mutate(next => next.preferences.focus = false); render(); });
$('#focus-view').onclick = () => run(() => { mutate(next => next.preferences.focus = true); render(); });
$('#export-button').onclick = () => { const plan = active(); if(plan) download(filename(plan.title) + '.md',M.exportMarkdown(plan)); };
$('#backup-button').onclick = () => {
  try { const contents = storageError ? localStorage.getItem(M.KEY) : JSON.stringify({...state,timer:timer.serialize()},null,2); download('brass-tasks-backup-' + new Date().toISOString().slice(0,10) + '.json',contents || '{}','application/json'); }
  catch(error) { toast(error.message); }
};
$('#restore-button').onclick = () => $('#backup-file').click();
$('#backup-file').onchange = async event => {
  try {
    const file = event.target.files[0]; if(!file) return; if(file.size > 10000000) throw Error('Choose a backup smaller than 10 MB.');
    const backup = M.validate(JSON.parse(await file.text()));
    openModal('Restore your workspace?', content => content.append(node('p','',`This replaces the plans, journal, and timer in this browser with ${backup.plans.length} plans and ${backup.sessions.length} journal entries from your backup. Back up your current workspace first if you want to keep it.`)), 'Restore backup', () => {
      const current = localStorage.getItem(M.KEY); let revision = state.revision;
      try { revision = JSON.parse(current)?.revision || revision; } catch { /* User explicitly chose recovery. */ }
      backup.revision = revision + 1; localStorage.setItem(M.KEY,JSON.stringify(backup)); state = backup; storageError = ''; timer = new Pomodoro(state.timer); showArchived = false; clockSound.stopAlarm(); render(); toast('Workspace restored.');
    });
  } catch(error) { toast('Could not restore backup. ' + error.message); }
  finally { event.target.value = ''; }
};
$('#plan-menu').onclick = () => {
  const plan = active(); if(!plan) return;
  const kind = plan.kind === 'note' ? 'note' : 'plan';
  openModal('This page is yours.', content => {
    const actions = node('div','action-list');
    actions.append(button('Rename ' + kind, () => openModal('A new title.', () => { const input = field(kind === 'note' ? 'Note title' : 'Plan title','rename-title','text',plan.title); input.required = true; input.maxLength = 120; }, 'Rename', () => {
      const title = M.cleanText($('#rename-title').value);
      mutate(next => { const item = next.plans.find(p => p.id === plan.id); const oldTitle = M.parseMarkdown(item.markdown).title; item.title = title; if(item.kind !== 'note' && oldTitle) { let replaced = false; item.markdown = item.markdown.replace(/^#\s+(.+?)\s*#*$/gm,(match,heading) => { if(!replaced && heading === oldTitle) { replaced = true; return '# ' + title; } return match; }); } item.updatedAt = Date.now(); }); render();
    })));
    actions.append(button('Archive ' + kind, () => openModal(`Put this ${kind} away?`, body => body.append(node('p','',`Your ${kind} stays in the archive. You can bring it back whenever you need.`)), 'Archive', () => { mutate(next => { next.plans.find(p => p.id === plan.id).status = 'archived'; next.activeId = next.plans.find(p => p.status === 'active')?.id || null; }); render(); })));
    actions.append(button('Delete ' + kind + '…', () => deletePlanDialog(plan)));
    content.append(actions);
  });
};
$('#finish-button').onclick = () => {
  const plan = active(); if(!plan) return;
  if(plan.kind === 'note') return download(filename(plan.title) + '.md',M.exportMarkdown(plan));
  const tasks = M.parseMarkdown(plan.markdown).tasks;
  openModal('Leave a reflection.', content => { content.append(node('p','',`${tasks.filter(t => t.done).length} of ${tasks.length} tasks complete. Save a note and archive this plan for later.`)); field('What did you learn? What comes next?', 'session-note', 'textarea'); }, 'Save & close session', () => {
    mutate(next => { next.sessions.unshift({id:crypto.randomUUID(),title:plan.title,note:$('#session-note').value.slice(0,10000),at:Date.now(),kind:'reflection',done:tasks.filter(t => t.done).length,total:tasks.length}); next.plans.find(p => p.id === plan.id).status = 'archived'; next.activeId = next.plans.find(p => p.status === 'active')?.id || null; }); render(); toast('Progress, safely tucked away.');
  });
};
$('#history-button').onclick = () => openModal('Your session journal.', content => {
  if(!state.sessions.length) content.append(node('p','','Your finished focus sessions and end-of-plan reflections will appear here. Every small step counts.'));
  else {
    content.append(button('Download journal', () => download('brass-tasks-journal.md','# Session journal\n\n' + state.sessions.map(entry => `## ${entry.title}\n${new Date(entry.at).toLocaleString()}\n\n${entry.note}\n`).join('\n')), 'text-button'));
    state.sessions.forEach(entry => { const item = node('article','journal-entry'); item.append(node('small','',new Date(entry.at).toLocaleString()),node('h3','',entry.title),node('p','',entry.note)); content.append(item); });
  }
});
$('#desk-tab').onclick = () => { closeModal(); $('#paper').focus(); };
$('#help-button').onclick = () => openModal('A quieter way to work.', content => {
  content.append(node('p','modal-copy','Create a plan or import a Markdown file with - [ ] checkbox tasks. Switch to Focus to see only the next unfinished task. The clock counts up, with a longer break after four focus sessions.\n\nPlans, timer settings, and reflections stay in this browser on this device. Download workspace backups regularly; clearing site data removes them. This edition has no account or cloud sync.\n\nTo work with Obsidian, import a note and export your updated Markdown. Browser imports do not modify the original note. Live vault sync and always-on-top desktop windows are not available here.\n\nTimers catch up when you return. Browsers may delay sound in the background, and cannot ring while the app is closed. Click a control to enable audio.'));
});
function applyAudio() {
  const prefs = state.preferences; typeSound.setMuted(prefs.muted); clockSound.setMuted(prefs.muted); clockSound.setChannelMuted('tick',prefs.tickMuted); clockSound.setChannelMuted('bell',prefs.bellMuted);
  $('#sound').textContent = prefs.muted ? '♫̸' : '♪'; $('#sound').setAttribute('aria-label',prefs.muted ? 'Enable all sounds' : 'Mute all sounds'); $('#sound').setAttribute('aria-pressed',String(!prefs.muted)); $('#sound').title = $('#sound').getAttribute('aria-label');
  for(const [id,enabled,label] of [['tick-toggle',!prefs.tickMuted,'Ticking'],['bell-toggle',!prefs.bellMuted,'Bell'],['digital-toggle',prefs.digital,'Digits']]) { $('#' + id).setAttribute('aria-pressed',String(enabled)); $('#' + id).textContent = `${label} ${enabled ? 'on' : 'off'}`; }
  $('#timer-time').hidden = !prefs.digital;
  clockSound.setTicking(timer.running);
}
function enableAudio() {
  if(audioPromise) { if(clockSound.context?.state === 'suspended') clockSound.context.resume().catch(() => {}); return; }
  audioPromise = (async () => {
    try {
      clockSound.init();
      const recordings = await Promise.all(['clock-ticking.ogg','clock-bell.mp3'].map(async file => { const response = await fetch('assets/audio/' + file); if(!response.ok) throw Error('Audio unavailable'); return new Uint8Array(await response.arrayBuffer()); }));
      await clockSound.loadSamples({ticking:recordings[0],bell:recordings[1]}); applyAudio();
    } catch { toast('Recorded audio is unavailable. Tasks and the timer still work.'); }
  })();
}
document.addEventListener('pointerdown',enableAudio,{once:true}); document.addEventListener('keydown',enableAudio,{once:true});
for(const [id,key] of [['sound','muted'],['tick-toggle','tickMuted'],['bell-toggle','bellMuted'],['digital-toggle','digital']]) $('#' + id).onclick = () => run(() => { mutate(next => next.preferences[key] = !next.preferences[key]); applyAudio(); });
function timerAction(action) {
  const before = timer.serialize();
  try { action(); mutate(() => {}); clockSound.stopAlarm(); drawTimer(); applyAudio(); }
  catch(error) { timer = new Pomodoro(before); throw error; }
}
const modeLabel = {work:'Focus',short:'Short break',long:'Long break'};
function drawTimer() {
  const elapsed = Math.floor(timer.elapsed()/1000); const time = String(Math.floor(elapsed/60)).padStart(2,'0') + ':' + String(elapsed%60).padStart(2,'0');
  $('#timer-time').textContent = time; $('#timer-mode').textContent = modeLabel[timer.mode].toUpperCase(); $('#timer-target').textContent = 'OF ' + timer.settings[timer.mode] + ' MIN';
  $('#timer-start').textContent = timer.completed ? (timer.mode === 'work' ? 'Take a break' : 'Next focus') : timer.running ? 'Pause' : timer.elapsed() > 0 ? 'Resume' : 'Start ' + (timer.mode === 'work' ? 'focus' : 'break');
  const status = timer.completed ? 'Session complete. A pause is earned.' : timer.running ? 'Just this moment. Just this task.' : timer.elapsed() > 0 ? 'Paused. Take your time.' : 'No rush. Just begin.';
  if($('#timer-state').textContent !== status) $('#timer-state').textContent = status;
  document.querySelectorAll('[data-mode]').forEach(btn => btn.setAttribute('aria-pressed',String(btn.dataset.mode === timer.mode)));
  const cycleDone = timer.workCount % 4 || (timer.workCount > 0 && (timer.mode !== 'work' || timer.completed) ? 4 : 0);
  const dots = $('#session-dots'); dots.replaceChildren(); for(let i = 0;i < 4;i++) dots.append(node('i',i < cycleDone ? 'done' : ''));
  const cycleLabel = `${cycleDone} of 4 focus sessions · long break after 4`;
  dots.setAttribute('aria-label',cycleLabel); dots.title = cycleLabel; $('#session-progress-label').textContent = cycleLabel;
  document.title = timer.running ? `${time} · ${modeLabel[timer.mode]} — Brass & Tasks` : 'Brass & Tasks — Your quiet workspace';
}
function completeTimer() {
  const before = timer.serialize(); if(!timer.tick()) return;
  try {
    mutate(next => { if(timer.mode === 'work') { next.sessions.unshift({id:crypto.randomUUID(),at:Date.now(),kind:'focus',title:active()?.title || 'A moment of focus',note:`Completed ${timer.settings.work} ${timer.settings.work === 1 ? 'minute' : 'minutes'} of focus.`}); M.advanceQuote(next,BrassQuotes.length); } });
    renderQuote();
    clockSound.setTicking(false); clockSound.alarm(); toast(modeLabel[timer.mode] + ' complete. Take a breath.');
  } catch(error) { timer = new Pomodoro(before); timer.pause(); clockSound.setTicking(false); toast(error.message); }
}
$('#timer-start').onclick = () => run(() => timerAction(() => { completeTimer(); if(timer.completed) { timer.select(timer.nextMode()); timer.start(); } else if(timer.running) timer.pause(); else timer.start(); }));
$('#timer-reset').onclick = () => run(() => timerAction(() => timer.reset()));
document.querySelectorAll('[data-mode]').forEach(btn => btn.onclick = () => run(() => timerAction(() => { completeTimer(); timer.select(btn.dataset.mode); })));
$('#timer-settings').onclick = () => openModal('Find your own rhythm.', content => {
  content.append(node('p','','Durations in whole minutes, from 1 to 180. Saving resets the current timer.'));
  for(const mode of ['work','short','long']) { const input = field(modeLabel[mode], 'duration-' + mode,'number',timer.settings[mode]); input.min = 1; input.max = 180; input.step = 1; input.required = true; }
}, 'Save settings', () => timerAction(() => timer.configure(Object.fromEntries(['work','short','long'].map(mode => [mode,Number($('#duration-' + mode).value)])))));
setInterval(() => { completeTimer(); drawTimer(); }, 1000);
function sweep() { $('#clock-hand').style.transform = `rotate(${timer.elapsed()/timer.targetMs*360}deg)`; requestAnimationFrame(sweep); }
requestAnimationFrame(sweep);
document.addEventListener('visibilitychange',() => { if(!document.hidden) { completeTimer(); drawTimer(); } });
window.addEventListener('storage', event => {
  if(event.key !== M.KEY) return;
  try { state = event.newValue ? M.validate(JSON.parse(event.newValue)) : M.fresh(); timer = new Pomodoro(state.timer); storageError = ''; clockSound.stopAlarm(); if($('#modal').open) closeModal(); render(); toast('Workspace refreshed from another tab.'); }
  catch { toast('Another tab saved unreadable data. Download a backup before reloading.'); }
});
let dragDepth = 0;
document.addEventListener('dragenter',event => { if([...event.dataTransfer.types].includes('Files')) { event.preventDefault(); dragDepth++; $('#drop-overlay').hidden = false; } });
document.addEventListener('dragover',event => { if([...event.dataTransfer.types].includes('Files')) event.preventDefault(); });
document.addEventListener('dragleave',() => { if(--dragDepth <= 0) { dragDepth = 0; $('#drop-overlay').hidden = true; } });
document.addEventListener('drop',async event => { event.preventDefault(); dragDepth = 0; $('#drop-overlay').hidden = true; try { if(event.dataTransfer.files.length !== 1) throw Error('Drop one Markdown file at a time.'); await importFile(event.dataTransfer.files[0]); } catch(error) { toast(error.message); } });
for(const keys of ['1234567890','QWERTYUIOP','ASDFGHJKL','ZXCVBNM!?']) { const row = node('div','key-row'); for(const key of keys) row.append(node('span',key === '!' ? 'key accent' : 'key',key)); $('#keys').append(row); } $('#keys').append(node('div','space'));
for(let i = 0;i < 37;i++) { const line = document.createElementNS('http://www.w3.org/2000/svg','line'); const angle = (i / 36 * 140 + 20) * Math.PI / 180; for(const [attr,value] of Object.entries({x1:130+Math.cos(angle)*112,y1:-19+Math.sin(angle)*82,x2:130+Math.cos(angle)*70,y2:-19+Math.sin(angle)*43})) line.setAttribute(attr,value); $('#typebars').append(line); }
for(let i = 0;i < 60;i++) { const angle = i/60*Math.PI*2, major = i%5 === 0; const line = document.createElementNS('http://www.w3.org/2000/svg','line'); for(const [attr,value] of Object.entries({x1:100+Math.sin(angle)*(major?80:85),y1:100-Math.cos(angle)*(major?80:85),x2:100+Math.sin(angle)*90,y2:100-Math.cos(angle)*90})) line.setAttribute(attr,value); if(major) line.classList.add('major'); $('#clock-ticks').append(line); }
for(let i = 1;i <= 12;i++) { const angle = i/12*Math.PI*2; const text = document.createElementNS('http://www.w3.org/2000/svg','text'); text.setAttribute('x',100+Math.sin(angle)*69); text.setAttribute('y',100-Math.cos(angle)*69); text.textContent = i; $('#clock-numbers').append(text); }
$('#today-label').textContent = new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'}).toUpperCase() + ' / ROOM FOR FOCUS';
render(); if(storageError) toast(storageError); else completeTimer();
