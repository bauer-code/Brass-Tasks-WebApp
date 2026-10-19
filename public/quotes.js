(function(root) {
  const quotes = [
  {
    "id": "readwise-4162",
    "text": "When you focus your mind on the present moment, on the process of what you are doing right now, you are always where you want to be and where you should be.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 348
  },
  {
    "id": "readwise-2660",
    "text": "Learning is deeper and more durable when it’s effortful. Learning that’s easy is like writing in sand, here today and gone tomorrow.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 97
  },
  {
    "id": "readwise-2460",
    "text": "Purpose is stronger than object. What you want is powerful, but what you want it for is more powerful.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 122,
    "location": 2453
  },
  {
    "id": "readwise-790",
    "text": "As my high school English teacher suggested, once you get all the ideas out of your head and in front of your eyes, you’ll automatically notice natural relationships and structure.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 50,
    "location": 1763
  },
  {
    "id": "readwise-2183",
    "text": "We spend our lives gathering: gathering knowledge, gathering skills, gathering experiences. But we must also apply the knowledge, skills, and experiences we gather in the realms of life and business.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 111,
    "location": 257
  },
  {
    "id": "readwise-2675",
    "text": "Mastering the lecture or the text is not the same as mastering the ideas behind them.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 288
  },
  {
    "id": "readwise-4202",
    "text": "There were no mistakes being made, just a process of discovering what worked and what didn’t.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 213,
    "location": 1001
  },
  {
    "id": "readwise-2210",
    "text": "Think about your life at this moment. What areas need attention right now?",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 112,
    "location": 393
  },
  {
    "id": "readwise-2811",
    "text": "Everything was to be approached logically and with due consideration, in a calm and orderly fashion but decisively, and with no loose ends.",
    "book": "Meditations",
    "author": "Marcus Aurelius",
    "page": 140,
    "location": 894
  },
  {
    "id": "readwise-2512",
    "text": "If you have a long list of things to get done within one day, do the toughest one while your concentration is at its peak.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 124,
    "location": 2936
  },
  {
    "id": "readwise-2350",
    "text": "All great leaders keep working on themselves until they become effective.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 117,
    "location": 1584
  },
  {
    "id": "readwise-2803",
    "text": "The point is not to “slide your eyes over the words.” You start with questions, and you read for answers.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 139,
    "location": 3394
  },
  {
    "id": "readwise-285",
    "text": "Nothing great, said Epictetus, is produced suddenly, since not even the grape or the fig is.",
    "book": "A Selection From the Discourses of Epictetus With the Encheiridion",
    "author": "Epictetus",
    "page": 20,
    "location": 248
  },
  {
    "id": "readwise-481",
    "text": "Thus then in life also the chief business is this: distinguish and separate things, and say: Externals are not in my power: will is in my power.",
    "book": "A Selection From the Discourses of Epictetus With the Encheiridion",
    "author": "Epictetus",
    "page": 27,
    "location": 562
  },
  {
    "id": "readwise-4129",
    "text": "First, see clearly. Next, act correctly. Finally, endure and accept the world as it is.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 208,
    "location": 2091
  },
  {
    "id": "readwise-4079",
    "text": "Failure shows us the way—by showing us what isn’t the way.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 206,
    "location": 1077
  },
  {
    "id": "readwise-4067",
    "text": "Tell yourself: The time for that has passed. The wind is rising. The bell’s been rung. Get started, get moving.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 205,
    "location": 915
  },
  {
    "id": "readwise-2606",
    "text": "Make sure that your upcoming success is at the service of others, not at the expense of others.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 127,
    "location": 4122
  },
  {
    "id": "readwise-4726",
    "text": "Changing the conversation is better than prolonging a conversation designed to degrade someone.",
    "book": "The Seasons of Life",
    "author": "Jim Rohn",
    "page": 238,
    "location": 180
  },
  {
    "id": "readwise-111",
    "text": "Seeing a problem clearly does not prevent you from taking action, he explained. Acceptance is not passivity.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 11,
    "location": 1867
  },
  {
    "id": "readwise-780",
    "text": "Whereas purpose provides the juice and the direction, principles define the parameters of action and the criteria for excellence of conduct.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 50,
    "location": 1629
  },
  {
    "id": "readwise-4166",
    "text": "Our goal is to stay in this process and to direct our energy into whatever activity we are choosing at the present.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 395
  },
  {
    "id": "readwise-4211",
    "text": "An incorrect note is just part of learning to play the correct note; it is not a judgment of your playing ability.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 213,
    "location": 1085
  },
  {
    "id": "readwise-3994",
    "text": "You have everything you need to be great right now. Stop waiting for things to be just right and start where you stand.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 200,
    "location": 2853
  },
  {
    "id": "readwise-4052",
    "text": "That is, when you can break apart something, or look at it from some new angle, it loses its power over you.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 532
  },
  {
    "id": "readwise-2818",
    "text": "You can lead an untroubled life provided you can grow, can think and act systematically.",
    "book": "Meditations",
    "author": "Marcus Aurelius",
    "page": 140,
    "location": 1441
  },
  {
    "id": "readwise-4164",
    "text": "We waste so much of our energy by not being aware of how we are directing it.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 372
  },
  {
    "id": "readwise-4155",
    "text": "We have a very unhealthy habit of making the product — our intended result — the goal, instead of the process of reaching that goal.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 326
  },
  {
    "id": "readwise-69",
    "text": "“You simply observe that it’s another thought. And by knowing that it’s another thought, you’re not totally identified with the thought.”",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 10,
    "location": 1113
  },
  {
    "id": "readwise-2794",
    "text": "What we do shapes who we become and what we’re capable of doing. The more we do, the more we can do. To embrace this principle and reap its benefits is to be sustained through life by a growth mindset.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 138,
    "location": 2862
  },
  {
    "id": "readwise-1107",
    "text": "I shall pass this way but once; any good, therefore, that I can do or any kindness that I can show to any human being, let me do it now. Let me not defer nor neglect it, for I shall not pass this way again.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 68,
    "location": 1052
  },
  {
    "id": "readwise-2793",
    "text": "We make the effort because the effort itself extends the boundaries of our abilities.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 138,
    "location": 2861
  },
  {
    "id": "readwise-4046",
    "text": "Does what happened keep you from acting with justice, generosity, self-control, sanity, prudence, honesty, humility, straightforwardness?",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 474
  },
  {
    "id": "readwise-217",
    "text": "Striving is fine, as long as it’s tempered by the realization that, in an entropic universe, the final outcome is out of your control.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 16,
    "location": 3291
  },
  {
    "id": "readwise-2663",
    "text": "Trying to solve a problem before being taught the solution leads to better learning, even when errors are made in the attempt.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 113
  },
  {
    "id": "readwise-2160",
    "text": "You will never gain strength by being shown, but only by the exercise of your own unaided powers.",
    "book": "How to Study",
    "author": "George Fillmore Swain",
    "page": 108,
    "location": 540
  },
  {
    "id": "readwise-952",
    "text": "Merely observing your behaviour seems to make for better behaviour. Just paying attention is enough.",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 60,
    "location": 1969
  },
  {
    "id": "readwise-813",
    "text": "Once you know what to put on the lists and how to use them, the medium really doesn’t matter. Just go for simplicity, speed, and fun.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 51,
    "location": 2090
  },
  {
    "id": "readwise-811",
    "text": "When considering whether to get and use any organizing tool, and if so, which one, keep in mind that all you really need to do is manage lists.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 51,
    "location": 2089
  },
  {
    "id": "readwise-705",
    "text": "Getting Things Done is not simply about getting things done. It’s about being appropriately engaged with your work and life.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 46,
    "location": 242
  },
  {
    "id": "readwise-2342",
    "text": "Remember, the good life is not measured by material wealth or possessions. The good life is an attitude, an act, an idea, a discovery, a search.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 117,
    "location": 1515
  },
  {
    "id": "readwise-1056",
    "text": "Tension is a habit. Relaxing is a habit. And bad habits can be broken, good habits formed.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 66,
    "location": 272
  },
  {
    "id": "readwise-4187",
    "text": "“You need to keep reviewing these ideas so that you can hang on to their clarity and perspective. Otherwise, life steals them away.”",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 212,
    "location": 898
  },
  {
    "id": "readwise-2696",
    "text": "For our learning to have practical value, we must be adept at discerning “What kind of problem is this?” so we can select and apply an appropriate solution.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 133,
    "location": 805
  },
  {
    "id": "readwise-4089",
    "text": "Take your time, don’t rush. Some problems are harder than others. Deal with the ones right in front of you first. Come back to the others later. You’ll get there.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 206,
    "location": 1143
  },
  {
    "id": "readwise-2317",
    "text": "We can all learn to gather up the past and invest in the future.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 116,
    "location": 1263
  },
  {
    "id": "readwise-1127",
    "text": "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 69,
    "location": 1334
  },
  {
    "id": "readwise-3933",
    "text": "To get different results, you will have to do things differently and do different things.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 197,
    "location": 2141
  },
  {
    "id": "readwise-2549",
    "text": "You would be surprised at how effective you could become in many areas if you would just make the arrangements to get help when you need it.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 125,
    "location": 3427
  },
  {
    "id": "readwise-746",
    "text": "Second, you must clarify exactly what your commitment is and decide what you have to do, if anything, to make progress toward fulfilling it.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 48,
    "location": 634
  },
  {
    "id": "readwise-2767",
    "text": "Knowledge is not knowhow until you understand the underlying principles at work and can fit them together into a structure larger than the sum of its parts. Knowhow is learning that enables you to go do.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 137,
    "location": 2290
  },
  {
    "id": "readwise-851",
    "text": "A growth mindset turns change into an adventure. It frees people from the burden of having to ‘just’ be themselves.",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 55,
    "location": 218
  },
  {
    "id": "readwise-102",
    "text": "We can do more than just think; we also have the power simply to be aware of things—without judgment, without the ego.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 11,
    "location": 1702
  },
  {
    "id": "readwise-850",
    "text": "Go ahead and be the best imperfect person you can be, and get started on those things you want to accomplish before you die.’",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 55,
    "location": 190
  },
  {
    "id": "readwise-2273",
    "text": "Remember, however, that reaching your goals is the fruitful result of discipline, not merely hope.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 114,
    "location": 946
  },
  {
    "id": "readwise-2672",
    "text": "Learning is stronger when it matters, when the abstract is made concrete and personal.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 224
  },
  {
    "id": "readwise-874",
    "text": "Bennett’s insight is that zoning out is tiring, not relaxing; half-hearted semi-focusing causes life to feel like an exhausting blur.",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 56,
    "location": 689
  },
  {
    "id": "readwise-2376",
    "text": "It is so important to know what is a good use of your time and what is a waste of time.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 118,
    "location": 1728
  },
  {
    "id": "readwise-2709",
    "text": "Reflection is a form of retrieval practice (What happened? What did I do? How did it work out?), enhanced with elaboration (What would I do differently next time?).",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 134,
    "location": 994
  },
  {
    "id": "readwise-2509",
    "text": "The fourth time-management essential is learning to say no.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 123,
    "location": 2885
  },
  {
    "id": "readwise-4180",
    "text": "What is required is that you are aware of what you want to achieve, that you know the motions you must intentionally repeat to accomplish the goal, and that you execute your actions without emotions or judgments; just stay on course.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 212,
    "location": 812
  },
  {
    "id": "readwise-3914",
    "text": "That will require you to be clear on what matters most, and then to have the courage to say no to things that distract you.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 197,
    "location": 2011
  },
  {
    "id": "readwise-113",
    "text": "The only thing you can control is how you handle it.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 11,
    "location": 1870
  },
  {
    "id": "readwise-4038",
    "text": "Can you fight the urge to panic and instead focus only on what you can change? On the task at hand?",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 441
  },
  {
    "id": "readwise-2751",
    "text": "Whether something feels familiar or fluent is not always a reliable indicator of learning.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 136,
    "location": 1837
  },
  {
    "id": "readwise-4163",
    "text": "In order to focus on the present, we must give up, at least temporarily, our attachment to our desired goal.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 351
  },
  {
    "id": "readwise-2644",
    "text": "There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality.",
    "book": "Letters From a Stoic",
    "author": "Lucius Annaeus Seneca and Seedbox Classics",
    "page": 129,
    "location": 524
  },
  {
    "id": "readwise-220",
    "text": "All I had to do was tell myself: if it doesn’t work, I only need the grit to start again—just like when my mind wandered in meditation.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 16,
    "location": 3300
  },
  {
    "id": "readwise-1035",
    "text": "“I can’t write a book commensurate with Shakespeare,” he said, “but I can write a book by me.”",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 66,
    "location": 125
  },
  {
    "id": "readwise-4031",
    "text": "There is no good or bad without us, there is only perception. There is the event itself and the story we tell ourselves about what it means.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 366
  },
  {
    "id": "readwise-2716",
    "text": "In fact, because new learning depends on prior learning, the more we learn, the more possible connections we create for further learning.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 134,
    "location": 1135
  },
  {
    "id": "readwise-2530",
    "text": "Be ready for tomorrow by doing all that you can today.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 124,
    "location": 3164
  },
  {
    "id": "readwise-2666",
    "text": "However, if you practice elaboration, there’s no known limit to how much you can learn. Elaboration is the process of giving new material meaning by expressing it in your own words and connecting it with what you already know.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 133
  },
  {
    "id": "readwise-2310",
    "text": "Every book is a stepping stone out of the darkness into the light.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 116,
    "location": 1229
  },
  {
    "id": "readwise-3600",
    "text": "Tell the truth and tell it with dignity and self-respect.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 454
  },
  {
    "id": "readwise-2215",
    "text": "Here’s the time to act: when the idea is hot and the emotion is strong.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 112,
    "location": 424
  },
  {
    "id": "readwise-2188",
    "text": "The voice within us says, “Get it done.” Discipline then says, “Do it now, to the best of your ability.”",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 111,
    "location": 294
  },
  {
    "id": "readwise-4769",
    "text": "You can go where you want to go, do what you want to do, become what you want to become…right from where you are.",
    "book": "The Seasons of Life",
    "author": "Jim Rohn",
    "page": 240,
    "location": 664
  },
  {
    "id": "readwise-1073",
    "text": "“There are two things to aim at in life: first, to get what you want; and, after that, to enjoy it. Only the wisest of mankind achieve the second.”",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 67,
    "location": 519
  },
  {
    "id": "readwise-3598",
    "text": "So study the great stories and then go find some of your own. Your stories will get better the more you tell them.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 439
  },
  {
    "id": "readwise-475",
    "text": "\"If you would have anything good, receive it from yourself.\"",
    "book": "A Selection From the Discourses of Epictetus With the Encheiridion",
    "author": "Epictetus",
    "page": 27,
    "location": 439
  },
  {
    "id": "readwise-945",
    "text": "What if you dropped the requirement of feeling good, accepted that you felt bad, and just started anyway? Motivation usually shows up quickly thereafter.",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 59,
    "location": 1870
  },
  {
    "id": "readwise-2613",
    "text": "Focus on accomplishing what’s right in front of you at this moment.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 127,
    "location": 4181
  },
  {
    "id": "readwise-2308",
    "text": "When you come across something important, write it down.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 116,
    "location": 1211
  },
  {
    "id": "readwise-2664",
    "text": "When you’re adept at extracting the underlying principles or “rules” that differentiate types of problems, you’re more successful at picking the right solutions in unfamiliar situations.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 119
  },
  {
    "id": "readwise-3599",
    "text": "You should be able to explain your work to a kindergartner, a senior citizen, and everybody in between.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 450
  },
  {
    "id": "readwise-3594",
    "text": "Don’t share things you can’t properly credit. Find the right credit, or don’t share.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 374
  },
  {
    "id": "readwise-2772",
    "text": "Don’t assume that you’re doing something wrong if the learning feels hard. Remember that difficulties you can overcome with greater cognitive effort will more than repay you in the depth and durability of your learning.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 137,
    "location": 2309
  },
  {
    "id": "readwise-4095",
    "text": "In every situation, life is asking us a question, and our actions are the answer. Our job is simply to answer well.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 206,
    "location": 1191
  },
  {
    "id": "readwise-2790",
    "text": "The active ingredient is the simple but nonetheless profound realization that the power to increase your abilities lies largely within your own control.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 138,
    "location": 2631
  },
  {
    "id": "readwise-937",
    "text": "If you start small, it’s surprisingly easy to begin adjusting others’ expectations. It’s like strength training: gradually, you build up tolerance.",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 59,
    "location": 1729
  },
  {
    "id": "readwise-2173",
    "text": "“Discipline enables you to capture your emotion and wisdom and translate them into action.”",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 111,
    "location": 203
  },
  {
    "id": "readwise-1070",
    "text": "“We seldom think of what we have but always of what we lack.”",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 67,
    "location": 481
  },
  {
    "id": "readwise-2416",
    "text": "Find something and leave it better than you found it.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 120,
    "location": 2047
  },
  {
    "id": "readwise-4165",
    "text": "We look at the outcome of each attempt with emotional indifference. We accept it as it is, with no judgment involved.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 390
  },
  {
    "id": "readwise-2261",
    "text": "Have a base of knowledge to draw from. Build a reservoir of thoughts, ideas, philosophies, and experiences that are your own.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 114,
    "location": 866
  },
  {
    "id": "readwise-2719",
    "text": "The added effort increases comprehension and learning. (Of course, learning will not improve if the difficulty completely obscures the meaning or cannot be overcome.)",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 135,
    "location": 1289
  },
  {
    "id": "readwise-4086",
    "text": "Being trapped is just a position, not a fate. You get out of it by addressing and eliminating each part of that position through small, deliberate actions—not by trying (and failing) to push it away with superhuman strength.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 206,
    "location": 1124
  },
  {
    "id": "readwise-3929",
    "text": "To achieve breakthrough, you must come to think about your own time as at least as important as that of your customers.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 197,
    "location": 2114
  },
  {
    "id": "readwise-2316",
    "text": "There are some things you need to do alone, such as ponder, think, wonder, read, study, and absorb new ideas.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 116,
    "location": 1260
  },
  {
    "id": "readwise-737",
    "text": "If you had the freedom to decide what to do, you also had the responsibility to make good choices, given your priorities.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 48,
    "location": 534
  },
  {
    "id": "readwise-4181",
    "text": "You should do this in the comfort of knowing that intentionally repeating something over a short course of time will create a new habit or replace an old one.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 212,
    "location": 814
  },
  {
    "id": "readwise-4199",
    "text": "Wherever we are in our process is where we should be.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 213,
    "location": 968
  },
  {
    "id": "readwise-1106",
    "text": "In our interpersonal relations we should never forget that all our associates are human beings and hunger for appreciation.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 68,
    "location": 1041
  },
  {
    "id": "readwise-761",
    "text": "Ask yourself, “When do I need to see what, in what form, to get it off my mind?” You build a system for function, not just to have a system.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 49,
    "location": 894
  },
  {
    "id": "readwise-2690",
    "text": "Practice at retrieving new knowledge or skill from memory is a potent tool for learning and durable retention.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 133,
    "location": 673
  },
  {
    "id": "readwise-2284",
    "text": "The key is to start right now gathering the ideas and making the changes that will take you further along this new road.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 115,
    "location": 1045
  },
  {
    "id": "readwise-1055",
    "text": "Relax! Relax! Relax! Learn to relax while you are doing your work!",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 66,
    "location": 269
  },
  {
    "id": "readwise-2492",
    "text": "Do the research. Be prepared. Be resourceful. Do all you can in preparation of what’s to come.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 123,
    "location": 2755
  },
  {
    "id": "readwise-2212",
    "text": "The most valuable form of discipline is the one that you impose upon yourself.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 112,
    "location": 398
  },
  {
    "id": "readwise-4041",
    "text": "“When you worry, ask yourself, ‘What am I choosing to not see right now?’ What important things are you missing because you chose worry over introspection, alertness or wisdom?”",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 450
  },
  {
    "id": "readwise-3898",
    "text": "Learning to do the things you need to do, regardless of how you feel, is a core discipline for success.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 196,
    "location": 918
  },
  {
    "id": "readwise-2202",
    "text": "Each time you complete an activity and take a rest, you’re preparing yourself for even greater accomplishment.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 112,
    "location": 355
  },
  {
    "id": "readwise-4013",
    "text": "“The obstacle in the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.”",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 203,
    "location": 194
  },
  {
    "id": "readwise-4074",
    "text": "What went wrong here? What can be improved? What am I missing?",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 205,
    "location": 1044
  },
  {
    "id": "readwise-2684",
    "text": "Today, we know from empirical research that practicing retrieval makes learning stick far better than reexposure to the original material does.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 133,
    "location": 456
  },
  {
    "id": "readwise-4016",
    "text": "Objective judgment, now at this very moment. Unselfish action, now at this very moment. Willing acceptance—now at this very moment—of all external events. That’s all you need.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 203,
    "location": 223
  },
  {
    "id": "readwise-2769",
    "text": "Adopt active learning strategies like retrieval practice, spacing, and interleaving.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 137,
    "location": 2304
  },
  {
    "id": "readwise-2337",
    "text": "There must be a balance between work time and home time, professional time and personal time.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 117,
    "location": 1468
  },
  {
    "id": "readwise-3572",
    "text": "We can stop asking what others can do for us, and start asking what we can do for others.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 181,
    "location": 63
  },
  {
    "id": "readwise-4014",
    "text": "When you have a goal, obstacles are actually teaching you how to get where you want to go—carving you a path. “The Things which hurt,” Benjamin Franklin wrote, “instruct.”",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 203,
    "location": 211
  },
  {
    "id": "readwise-2649",
    "text": "If you would not have a man flinch when the crisis comes, train him before it comes.",
    "book": "Letters From a Stoic",
    "author": "Lucius Annaeus Seneca and Seedbox Classics",
    "page": 129,
    "location": 779
  },
  {
    "id": "readwise-4156",
    "text": "We become fixated on our intended goal and completely miss out on the joy present in the process of achieving it.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 328
  },
  {
    "id": "readwise-2652",
    "text": "Above all, my dear Lucilius, make this your business: learn how to feel joy.",
    "book": "Letters From a Stoic",
    "author": "Lucius Annaeus Seneca and Seedbox Classics",
    "page": 129,
    "location": 1013
  },
  {
    "id": "readwise-4062",
    "text": "We must be sure to act with deliberation, boldness, and persistence.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 205,
    "location": 824
  },
  {
    "id": "readwise-2134",
    "text": "He must possess self-confidence, a consciousness of his power to master the subject, and a firm determination to master it.",
    "book": "How to Study",
    "author": "George Fillmore Swain",
    "page": 107,
    "location": 125
  },
  {
    "id": "readwise-2523",
    "text": "“Is what I am doing today getting me closer to where I want to be tomorrow?”",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 124,
    "location": 3102
  },
  {
    "id": "readwise-4194",
    "text": "Now you are doing nothing else but what you are doing.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 213,
    "location": 933
  },
  {
    "id": "readwise-2635",
    "text": "The process is mutual; for men learn while they teach.",
    "book": "Letters From a Stoic",
    "author": "Lucius Annaeus Seneca and Seedbox Classics",
    "page": 129,
    "location": 296
  },
  {
    "id": "readwise-98",
    "text": "Mindfulness is a fourth option, a way to view the contents of our mind with nonjudgmental remove.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 11,
    "location": 1681
  },
  {
    "id": "readwise-178",
    "text": "The brain, it turns out, is constantly changing in response to experience.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 14,
    "location": 2720
  },
  {
    "id": "readwise-3601",
    "text": "The minute you learn something, turn around and teach it to others. Share your reading list. Point to helpful reference materials. Create some tutorials and post them online.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 497
  },
  {
    "id": "readwise-2667",
    "text": "The more you can explain about the way your new learning relates to your prior knowledge, the stronger your grasp of the new learning will be, and the more connections you create that will help you remember it later.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 132,
    "location": 135
  },
  {
    "id": "readwise-2325",
    "text": "If you’ve “just gotten out of the habit,” just get back into the habit. It’s called discipline.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 117,
    "location": 1325
  },
  {
    "id": "readwise-777",
    "text": "We need ways to validate and support our thinking, no matter how informal.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 49,
    "location": 1440
  },
  {
    "id": "readwise-793",
    "text": "The final stage of planning comes down to decisions about the allocation and reallocation of physical resources to actually get the project moving. The question to ask here is, “What’s the next action?”",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 50,
    "location": 1781
  },
  {
    "id": "readwise-112",
    "text": "What mindfulness does is create some space in your head so you can, as the Buddhists say, “respond” rather than simply “react.”",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 11,
    "location": 1868
  },
  {
    "id": "readwise-4131",
    "text": "Of course, it is not enough to simply read this or say it. We must practice these maxims, rolling them over and over in our minds and acting on them until they become muscle memory.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 208,
    "location": 2101
  },
  {
    "id": "readwise-5772",
    "text": "What old people say you cannot do, you try and find that you can.",
    "book": "Walden",
    "author": "Henry David Thoreau",
    "page": 286,
    "location": 100
  },
  {
    "id": "readwise-2820",
    "text": "Remember—your responsibilities can be broken down into individual parts as well. Concentrate on those, and finish the job methodically—without getting stirred up or meeting anger with anger.",
    "book": "Meditations",
    "author": "Marcus Aurelius",
    "page": 140,
    "location": 1530
  },
  {
    "id": "readwise-124",
    "text": "May you be happy. May you be safe and protected from harm. May you be healthy and strong. May you live with ease.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 12,
    "location": 2183
  },
  {
    "id": "readwise-1075",
    "text": "The essence of all art is to have pleasure in giving pleasure.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 67,
    "location": 546
  },
  {
    "id": "readwise-4196",
    "text": "We need to let go of the futile idea that happiness is out there somewhere, and embrace the infinite growth available to us as a treasure, not as something that we are impatient to overcome.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 213,
    "location": 956
  },
  {
    "id": "readwise-2715",
    "text": "There’s virtually no limit to how much learning we can remember as long as we relate it to what we already know.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 134,
    "location": 1134
  },
  {
    "id": "readwise-3591",
    "text": "Once you make sharing part of your daily routine, you’ll notice themes and trends emerging in what you share.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 181,
    "location": 275
  },
  {
    "id": "readwise-2814",
    "text": "“The world is nothing but change. Our life is only perception.”",
    "book": "Meditations",
    "author": "Marcus Aurelius",
    "page": 140,
    "location": 1142
  },
  {
    "id": "readwise-2796",
    "text": "Remember that the most successful students are those who take charge of their own learning and follow a simple but disciplined strategy.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 138,
    "location": 2881
  },
  {
    "id": "readwise-2141",
    "text": "In studying his book he may well make a list of such questions to ask the teacher or to look up later.",
    "book": "How to Study",
    "author": "George Fillmore Swain",
    "page": 107,
    "location": 185
  },
  {
    "id": "readwise-3593",
    "text": "Being open and honest about what you like is the best way to connect with people who like those things, too.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 354
  },
  {
    "id": "readwise-4731",
    "text": "Life is a delicate maneuver of selection, rejection, review and change.",
    "book": "The Seasons of Life",
    "author": "Jim Rohn",
    "page": 238,
    "location": 193
  },
  {
    "id": "readwise-600",
    "text": "For whatever of these things results, it is in my power to derive benefit from it.",
    "book": "Enchiridion",
    "author": "Epictetus",
    "page": 37,
    "location": 138
  },
  {
    "id": "readwise-4227",
    "text": "Staying aware that I had a choice in how I reacted to the feelings was what I strived for.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 214,
    "location": 1381
  },
  {
    "id": "readwise-3918",
    "text": "To be your best, you must intentionally align your time and activities with your strengths and your unique capabilities.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 197,
    "location": 2024
  },
  {
    "id": "readwise-4088",
    "text": "Moving forward, one step at a time. Subordinate strength to the process. Replace fear with the process. Depend on it. Lean on it. Trust in it.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 206,
    "location": 1142
  },
  {
    "id": "readwise-2311",
    "text": "There are some particularly good times to reflect. One is at the end of the day. Take a few minutes to go back over the day. Whom did you see? What did they say? What happened? How did you feel? What went on?",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 116,
    "location": 1238
  },
  {
    "id": "readwise-4717",
    "text": "Let the past be a servant for making the future both more enjoyable and profitable.",
    "book": "The Seasons of Life",
    "author": "Jim Rohn",
    "page": 238,
    "location": 126
  },
  {
    "id": "readwise-4100",
    "text": "Remember, sometimes the longest way around is the shortest way home.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 207,
    "location": 1318
  },
  {
    "id": "readwise-2474",
    "text": "Learn from your personal experiences. Learn from other people’s experiences.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 122,
    "location": 2614
  },
  {
    "id": "readwise-168",
    "text": "But then I’d see the thought for what it was: just a thought.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 13,
    "location": 2621
  },
  {
    "id": "readwise-3921",
    "text": "One of the building blocks of your success is the ability to spend time on what matters most.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 197,
    "location": 2033
  },
  {
    "id": "readwise-182",
    "text": "I could see how the counterintuitive act of stopping, even for a few seconds, could be a source of strength, not weakness. This was a practical complement to Joseph’s “is this useful?” mantra. It was the opposite of zoning out, it was zoning in.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 14,
    "location": 2787
  },
  {
    "id": "readwise-3938",
    "text": "Learn to prioritize your most important activities and do those things before you work on anything else.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 198,
    "location": 2182
  },
  {
    "id": "readwise-4043",
    "text": "Real strength lies in the control or, as Nassim Taleb put it, the domestication of one’s emotions, not in pretending they don’t exist. So go ahead, feel it.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 456
  },
  {
    "id": "readwise-741",
    "text": "What if you could dedicate fully 100 percent of your attention to whatever was at hand, at your own choosing, with no distraction?",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 48,
    "location": 571
  },
  {
    "id": "readwise-958",
    "text": "The productivity expert Mark Forster, in Get Everything Done, recommends diving into such dreaded work for timed ‘bursts’ of five minutes.",
    "book": "Help!",
    "author": "Oliver Burkeman",
    "page": 60,
    "location": 2013
  },
  {
    "id": "readwise-747",
    "text": "Third, once you’ve decided on all the actions you need to take, you must keep reminders of them organized in a system you review regularly.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 48,
    "location": 638
  },
  {
    "id": "readwise-3909",
    "text": "The choices that you make on how you spend your time, ultimately create your results in life.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 196,
    "location": 1991
  },
  {
    "id": "readwise-4161",
    "text": "When you focus on the process, the desired product takes care of itself with fluid ease.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 211,
    "location": 346
  },
  {
    "id": "readwise-60",
    "text": "What made this different was that I was able to see my thoughts for what they were: just thoughts, with no concrete reality.",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 9,
    "location": 1036
  },
  {
    "id": "readwise-2813",
    "text": "Nowhere you can go is more peaceful—more free of interruptions—than your own soul.",
    "book": "Meditations",
    "author": "Marcus Aurelius",
    "page": 140,
    "location": 1123
  },
  {
    "id": "readwise-745",
    "text": "Anything you consider unfinished in any way must be captured in a trusted system outside your mind, or what I call a collection tool, that you know you’ll come back to regularly and sort through.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 48,
    "location": 633
  },
  {
    "id": "readwise-4766",
    "text": "We are meant to constantly improve our conditions, ourselves, and our results.",
    "book": "The Seasons of Life",
    "author": "Jim Rohn",
    "page": 240,
    "location": 574
  },
  {
    "id": "readwise-4727",
    "text": "Saying “no” is better than saying “yes” to something you don’t want to do, or to someone you don’t want to be with.",
    "book": "The Seasons of Life",
    "author": "Jim Rohn",
    "page": 238,
    "location": 182
  },
  {
    "id": "readwise-3895",
    "text": "When you understand that true accountability is about choice and taking ownership of your choices, everything changes.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 196,
    "location": 856
  },
  {
    "id": "readwise-1108",
    "text": "“Every man I meet is my superior in some way. In that, I learn of him.”",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 68,
    "location": 1054
  },
  {
    "id": "readwise-4023",
    "text": "We can learn to perceive things differently, to cut through the illusions that others believe or fear. We can stop seeing the “problems” in front of us as problems. We can learn to focus on what things really are.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 203,
    "location": 298
  },
  {
    "id": "readwise-4232",
    "text": "All things of lasting and deep value require time and nurturing and come to us only through our own effort.",
    "book": "The Practicing Mind",
    "author": "Thomas M. Sterner",
    "page": 214,
    "location": 1538
  },
  {
    "id": "readwise-3987",
    "text": "Take the time each week for the strategically important items that matter most over the long term.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 199,
    "location": 2712
  },
  {
    "id": "readwise-526",
    "text": "In every act consider what precedes and what follows, and then proceed to the act.",
    "book": "A Selection From the Discourses of Epictetus With the Encheiridion",
    "author": "Epictetus",
    "page": 29,
    "location": 1331
  },
  {
    "id": "readwise-766",
    "text": "You don’t actually do a project; you can only do action steps related to it.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 49,
    "location": 1121
  },
  {
    "id": "readwise-4054",
    "text": "Is there a chance? Do I have a shot? Is there something I can do?",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 205,
    "location": 579
  },
  {
    "id": "readwise-784",
    "text": "We know that the focus we hold in our minds affects what we perceive and how we perform.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 50,
    "location": 1643
  },
  {
    "id": "readwise-2182",
    "text": "Begin a new habit, no matter how small it is.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 111,
    "location": 240
  },
  {
    "id": "readwise-219",
    "text": "“All we can do is everything we can do.”",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 16,
    "location": 3299
  },
  {
    "id": "readwise-3578",
    "text": "Talk about the things you love. Your voice will follow.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 181,
    "location": 106
  },
  {
    "id": "readwise-3604",
    "text": "If you want to be noticed, you have to notice.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 535
  },
  {
    "id": "readwise-1059",
    "text": "Take a chance! All life is a chance. The man who goes farthest is generally the one who is willing to do and dare.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 67,
    "location": 309
  },
  {
    "id": "readwise-3930",
    "text": "The future you are going to live is the one you are creating right now at this very moment.",
    "book": "The 12 Week Year",
    "author": "Brian P. Moran, Michael Lennington",
    "page": 197,
    "location": 2126
  },
  {
    "id": "readwise-2203",
    "text": "Invest yourself in discipline so your talents are not wasted.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 112,
    "location": 360
  },
  {
    "id": "readwise-2239",
    "text": "What have you done today that makes this day successful?",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 113,
    "location": 520
  },
  {
    "id": "readwise-4039",
    "text": "This is the skill that must be cultivated—freedom from disturbance and perturbation—so you can focus your energy exclusively on solving problems, rather than reacting to them.",
    "book": "The Obstacle Is the Way",
    "author": "Ryan Holiday",
    "page": 204,
    "location": 447
  },
  {
    "id": "readwise-227",
    "text": "When worrying about the future, I learned to ask myself: What do I really want?",
    "book": "10% Happier",
    "author": "Dan Harris",
    "page": 16,
    "location": 3375
  },
  {
    "id": "readwise-1135",
    "text": "If we want to make friends, let’s put ourselves out to do things for other people—things that require time, energy, unselfishness, and thoughtfulness.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 69,
    "location": 1422
  },
  {
    "id": "readwise-776",
    "text": "The goal is to get projects and situations sufficiently clear and under control to get them off your mind, and not to lose any potentially useful ideas.",
    "book": "Getting Things Done",
    "author": "David Allen",
    "page": 49,
    "location": 1436
  },
  {
    "id": "readwise-3616",
    "text": "You want feedback from people who care about you and what you do.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 182,
    "location": 627
  },
  {
    "id": "readwise-3568",
    "text": "In order to be found, you have to be findable.",
    "book": "Show Your Work!",
    "author": "Austin Kleon",
    "page": 181,
    "location": 24
  },
  {
    "id": "readwise-2785",
    "text": "But if your goal is to increase your ability, you pick ever-increasing challenges, and you interpret setbacks as useful information that helps you to sharpen your focus, get more creative, and work harder.",
    "book": "Make It Stick",
    "author": "Peter C. Brown",
    "page": 138,
    "location": 2594
  },
  {
    "id": "readwise-316",
    "text": "Therefore we ought to exercise ourselves in small things, and beginning with them to proceed to the greater.",
    "book": "A Selection From the Discourses of Epictetus With the Encheiridion",
    "author": "Epictetus",
    "page": 21,
    "location": 268
  },
  {
    "id": "readwise-2434",
    "text": "Be a student of a variety of styles, but make sure you develop your own.",
    "book": "Leading an Inspired Life",
    "author": "Jim Rohn",
    "page": 121,
    "location": 2226
  },
  {
    "id": "readwise-1084",
    "text": "If you want to gather honey, don’t kick over the beehive.",
    "book": "How to Enjoy Your Life and Your Job",
    "author": "Dale Carnegie",
    "page": 68,
    "location": 659
  }
];
  if(typeof module !== "undefined" && module.exports) module.exports = quotes; else root.BrassQuotes = quotes;
})(globalThis);
