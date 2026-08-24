export type GuideStep = {
  title: string;
  body: string;
};

export type Guide = {
  slug: string;
  title: string;
  /** One-line hook used on cards and social posts */
  hook: string;
  category: Category;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  /** What the reader walks away with */
  outcome: string;
  /** Short intro shown under the title */
  intro: string;
  aiWay: {
    summary: string;
    tools: string[];
    steps: GuideStep[];
    timeSaver: string;
  };
  diyWay: {
    summary: string;
    materials: string[];
    steps: GuideStep[];
    proTip: string;
  };
  verdict: string;
  mistakes: string[];
};

export type Category = "Home" | "Work" | "Money" | "Life";

export const CATEGORIES: { name: Category; blurb: string; accent: string }[] =
  [
    { name: "Home", blurb: "Fix, clean, cook, maintain.", accent: "#22d3ee" },
    { name: "Work", blurb: "Automate the boring, ship faster.", accent: "#a78bfa" },
    { name: "Money", blurb: "Budgets, bills, and better deals.", accent: "#f472b6" },
    { name: "Life", blurb: "Health, travel, learning, hobbies.", accent: "#34d399" },
  ];

const guides: Guide[] = [
  // ─── HOME ────────────────────────────────────────────────────────────────
  {
    slug: "fix-leaking-tap",
    title: "Fix a Leaking Tap",
    hook: "Stop that drip tonight — no plumber, no panic.",
    category: "Home",
    minutes: 30,
    difficulty: "Easy",
    outcome:
      "A silent tap, a saved water bill, and one new washer you can point at proudly.",
    intro:
      "A tap that drips once per second wastes over 20 litres a day. Nine times out of ten the fix is a ₹20 washer — the trick is knowing which part actually failed.",
    aiWay: {
      summary:
        "Use an AI assistant as your diagnosis partner before you touch a single tool.",
      tools: ["ChatGPT / Claude / Gemini (free tier is fine)", "Phone camera"],
      steps: [
        {
          title: "Photograph the problem",
          body: "Take 2–3 clear photos: the tap from the front, underneath, and a video of the drip. Note the brand name if visible.",
        },
        {
          title: "Ask for a diagnosis",
          body: 'Prompt: "My [brand] tap drips from the spout even when fully closed. Here are photos. List likely failed parts in order of probability and what each part costs in India."',
        },
        {
          title: "Get a parts list and video shortlist",
          body: 'Follow up: "Give me exact washer/cartridge sizes to check with a ruler, and search terms to find tutorial videos for this exact model."',
        },
        {
          title: "Buy right, fix once",
          body: "With the AI's parts list, buy the correct size at any hardware shop (₹10–₹50). Follow the recommended video while replacing.",
        },
      ],
      timeSaver:
        "Skips the classic 2-trip hardware-store mistake of buying the wrong washer.",
    },
    diyWay: {
      summary:
        "The classic method: shut off, disassemble, identify, replace. Takes one evening.",
      materials: [
        "Adjustable wrench",
        "Flat + Phillips screwdrivers",
        "New washer set (assorted, ~₹100) or cartridge if it's a mixer tap",
        " Cloth + old towel",
        "White vinegar (for crust)",
      ],
      steps: [
        {
          title: "Shut off the water",
          body: "Close the angle valve under the sink (or the main valve). Open the tap to release pressure. Stuff the drain with a cloth so nothing falls in.",
        },
        {
          title: "Open the tap head",
          body: "Pry off the decorative cap, unscrew the handle, then loosen the packing nut / flange with the wrench. For mixers, unscrew the cartridge cap.",
        },
        {
          title: "Identify the culprit",
          body: "Pull out the spindle/valve. If the rubber washer at the end is cracked, flattened or hard — that's your leak. Crusty white buildup? Soak in vinegar 15 min.",
        },
        {
          title: "Replace and reassemble",
          body: "Swap the washer (match size exactly), smear a tiny bit of petroleum jelly on it, reassemble in reverse order. Turn water back on slowly and check.",
        },
      ],
      proTip:
        "Drip from the spout = washer or cartridge. Drip from the handle base = O-ring. Diagnose before you buy anything.",
    },
    verdict:
      "DIY wins this one — it's a 30-minute job once you own a wrench. AI earns its keep by making sure you buy the right part the first time.",
    mistakes: [
      "Forgetting to shut off water → indoor fountain",
      "Overtightening the packing nut (snug, not heroic)",
      "Buying a 'universal' washer without checking spindle size",
    ],
  },
  {
    slug: "balcony-garden-starter",
    title: "Start a Balcony Garden in One Weekend",
    hook: "6 pots, ₹500, fresh mint by next month.",
    category: "Home",
    minutes: 180,
    difficulty: "Easy",
    outcome:
      "A working container garden with herbs you'll actually harvest within weeks.",
    intro:
      "You don't need land, luck, or a green thumb — just sun mapping, the right containers, and three forgiving plants to start with.",
    aiWay: {
      summary:
        "Let AI design the garden plan around your exact balcony conditions.",
      tools: ["ChatGPT / Gemini", "Compass app on phone"],
      steps: [
        {
          title: "Describe your balcony",
          body: 'Prompt: "My balcony faces [direction] in [city], gets [X] hours of direct sun, is [size]. I want herbs + 2 vegetables in containers. Give me a plant list matched to these conditions, pot sizes, and a layout."',
        },
        {
          title: "Generate a watering schedule",
          body: 'Follow up: "Create a weekly care calendar: watering days, feeding schedule, and warning signs of overwatering vs underwatering for each plant."',
        },
        {
          title: "Troubleshoot on demand",
          body: "Yellow leaf? Photo → AI → diagnosis. This alone saves most beginner gardens from the compost bin.",
        },
      ],
      timeSaver:
        "Replaces weeks of forum-reading with a plan tailored to your exact light and city.",
    },
    diyWay: {
      summary:
        "The traditional way: observe the sun, start with survivors, learn by doing.",
      materials: [
        "5–6 containers with drainage holes (buckets work; ₹0–₹300)",
        "Potting mix + compost (₹150)",
        "Seedlings: mint, tulsi/basil, chilli (near-unkillable starters)",
        "Watering can or reused bottle",
      ],
      steps: [
        {
          title: "Map your sun",
          body: "Check the balcony at 9 AM, 1 PM and 5 PM for two days. Full sun = 6+ hrs (grow chilli, tomato). Partial = 3–4 hrs (mint, basil, spinach). Shade = greens only.",
        },
        {
          title: "Plant deep, not dense",
          body: "One plant per 20–25 cm pot. Cover drainage hole with a broken pot shard, fill 2/3 with mix, seat the seedling, top up, water till it drains.",
        },
        {
          title: "Water by finger test",
          body: "Stick a finger 2 cm into soil — dry? Water. Wet? Wait. Most beginner plants die of kindness, not thirst.",
        },
        {
          title: "Feed monthly, harvest weekly",
          body: "Mix a handful of compost into the top layer monthly. Pinch herbs from the top (they bush out); never strip more than a third at once.",
        },
      ],
      proTip:
        "Mint is invasive — give it its own pot or it will bully everything else.",
    },
    verdict:
      "DIY teaches you gardening; AI accelerates it. Do DIY for the first three pots, use AI whenever something looks sick.",
    mistakes: [
      "Pots without drainage holes (root rot city)",
      "Starting with exotic plants instead of weeds-that-give-food",
      "Watering on a clock instead of by soil feel",
    ],
  },

  // ─── WORK ────────────────────────────────────────────────────────────────
  {
    slug: "weekly-report-automation",
    title: "Automate Your Weekly Report",
    hook: "2 hours every Friday → 10 minutes of review.",
    category: "Work",
    minutes: 90,
    difficulty: "Medium",
    outcome:
      "A pipeline that collects your week's numbers and drafts the report before you open your laptop Friday morning.",
    intro:
      "Weekly reports are the same skeleton refilled with new numbers — which makes them the highest-value automation target in office life.",
    aiWay: {
      summary: "Wire your data sources straight into an AI drafting step.",
      tools: [
        "Zapier / Make / n8n (free tiers ok)",
        "OpenAI / Anthropic API key",
        "Your data source (Sheets, Jira, CRM export…)",
      ],
      steps: [
        {
          title: "Pick one report, define inputs",
          body: "Write down exactly what goes in: 3 metrics from Sheets, closed tickets from Jira, notes field. One source per automation trigger.",
        },
        {
          title: "Build the flow",
          body: "Trigger: schedule Fri 7 AM. Step 1: pull data. Step 2: send to LLM with a prompt like 'Draft a weekly update for my manager from this data. Confident tone, bullet points, flag anything below target.' Step 3: email/Slack it to you.",
        },
        {
          title: "Add guardrails",
          body: "Instruct the model to never invent numbers — only use provided data, mark gaps as [NEEDS INPUT]. Review the first 3 outputs closely.",
        },
        {
          title: "Ship it",
          body: "Once trust is built, deliver straight to stakeholders and keep yourself as CC'd reviewer.",
        },
      ],
      timeSaver:
        "~90 minutes setup, then ~100 minutes saved every week. Pays for itself in week one.",
    },
    diyWay: {
      summary:
        "No-code-free version: a template + a ritual that halves the effort today.",
      materials: [
        "One-page report template (structure never changes)",
        "Saved filters/views in each data source",
        "A recurring 15-min calendar block",
      ],
      steps: [
        {
          title: "Freeze the structure",
          body: "Sections: Headline → Wins → Numbers table → Risks → Asks. Write section headers once, forever.",
        },
        {
          title: "Create saved views",
          body: "In each tool, save the exact filter ('my tickets closed this week'). Monday-you should never rebuild queries Friday-you needs.",
        },
        {
          title: "Batch the collection",
          body: "Friday 9:00–9:15, collect all numbers into the template in one sitting. No tab-switching during the week.",
        },
        {
          title: "Keep a running wins log",
          body: "One line per win, noted when it happens. Friday becomes assembly, not archaeology.",
        },
      ],
      proTip:
        "The template IS the automation. Structure decided once removes hundreds of micro-decisions later.",
    },
    verdict:
      "If your data already lives in connected tools, automate now. If it lives in five different people's heads, build the DIY discipline first — then automate.",
    mistakes: [
      "Letting the AI invent plausible-sounding numbers (always cite sources)",
      "Automating a report nobody reads — kill those instead",
      "Building for a format that changes weekly; stabilize structure first",
    ],
  },
  {
    slug: "inbox-zero-system",
    title: "Build an Inbox You Can Trust",
    hook: "From 4,000 unread to zero, daily, in 20 minutes.",
    category: "Work",
    minutes: 60,
    difficulty: "Easy",
    outcome:
      "An inbox that sorts itself, where important mail surfaces and noise disappears without guilt.",
    intro:
      "Inbox Zero isn't about willpower — it's about routing rules made once so decisions aren't repeated 80 times a day.",
    aiWay: {
      summary:
        "AI triage drafts replies and summarizes threads you don't need to read.",
      tools: [
        "Gmail (Gemini side panel) / Superhuman / Shortwave",
        "Or: Zapier + LLM for custom auto-labeling",
      ],
      steps: [
        {
          title: "Enable AI summaries",
          body: "Turn on your client's thread-summarization. Long threads become 3 lines; decide in seconds whether to care.",
        },
        {
          title: "Auto-draft routine replies",
          body: "Meeting confirmations, status updates, 'got it' acks — let AI draft from context, review with one glance, send.",
        },
        {
          title: "Build an auto-labeler",
          body: "Zapier flow: new email → LLM classifies (newsletter / invoice / action-needed / FYI) → applies label. Newsletters skip the inbox entirely.",
        },
        {
          title: "Review labels, not mail",
          body: "Your morning ritual becomes: scan 'action-needed', skim 'FYI', batch-read newsletters Sunday. Inbox stays empty by default.",
        },
      ],
      timeSaver: "~45 min/day of email handling drops to ~15.",
    },
    diyWay: {
      summary: "The pure Gmail-fu method: archive aggressively, filter everything.",
      materials: ["30 uninterrupted minutes", "Gmail filters (or Outlook rules)"],
      steps: [
        {
          title: "The big archive",
          body: "Select all → archive. Seriously. Anything vital will come back. Instant zero, instant calm.",
        },
        {
          title: "Filter the repeat offenders",
          body: "For each newsletter/notification: filter sender → 'skip inbox, apply label'. Ten filters cover 80% of volume.",
        },
        {
          title: "Two-minute rule",
          body: "Open each remaining mail once: reply if <2 min, otherwise convert to a task with deadline. Mail is not a to-do list.",
        },
        {
          title: "Close loops at fixed times",
          body: "Email 11:30 AM and 4 PM only. Notifications off between. The inbox is a place you visit, not where you live.",
        },
      ],
      proTip:
        "'Unread' is not a to-do system. If it matters, it gets a task with a date — or it's noise.",
    },
    verdict:
      "Start DIY today (free, 30 min). Layer AI triage on top once filters have tamed the bulk — AI on an unfiltered inbox just automates chaos.",
    mistakes: [
      "Keeping 47 folders nobody can remember",
      "Checking mail reactively all day (batch it)",
      "Trusting auto-drafts on sensitive threads unreviewed",
    ],
  },

  // ─── MONEY ───────────────────────────────────────────────────────────────
  {
    slug: "subscription-audit",
    title: "Run a Subscription Audit",
    hook: "Most people find ₹1,500+/month they forgot they were paying.",
    category: "Money",
    minutes: 45,
    difficulty: "Easy",
    outcome:
      "A cancel-list worth real money, plus a system so subscriptions never silently renew again.",
    intro:
      "Subscriptions are designed to be forgotten. The average person pays for 3–5 services they haven't opened in a month. This audit takes one sitting.",
    aiWay: {
      summary: "Paste a statement, get a categorized cancel-list ranked by waste.",
      tools: ["ChatGPT / Claude (privacy note: redact account numbers)"],
      steps: [
        {
          title: "Export card statement",
          body: "Last 90 days, CSV or PDF. Redact card/account numbers first — share amounts and merchant names only.",
        },
        {
          title: "Ask for the audit",
          body: 'Prompt: "Identify recurring charges in this statement. Group them, estimate annual cost of each, flag ones appearing twice (double-billing), and rank by likelihood I forgot them."',
        },
        {
          title: "Get cancellation intel",
          body: 'Follow-up: "For each flagged service, what\'s the cancellation path and are there retention deals I should ask for?"',
        },
        {
          title: "Execute the cancel-list",
          body: "Cancel top-down. For services you keep, note renewal dates in your calendar with a reminder 3 days prior.",
        },
      ],
      timeSaver:
        "Turns 2 hours of statement squinting into 15 minutes of decisive cancelling.",
    },
    diyWay: {
      summary: "Manual sweep using your bank's own tools and a simple spreadsheet.",
      materials: [
        "Bank/card app with search",
        "Spreadsheet (or paper)",
        "45 minutes",
      ],
      steps: [
        {
          title: "Search for recurring patterns",
          body: "In card statement, search common billing names (Netflix, Spotify, Zomato Pro…) plus 'auto debit'/'recurring'. UPI autopay mandates live in the bank app under Autopay.",
        },
        {
          title: "Score each subscription",
          body: "Three columns: last-used date, monthly cost, joy delivered. Anything unused in 30 days with cost > ₹0 goes on the cancel-list.",
        },
        {
          title: "Cancel properly",
          body: "In-app cancellations often hide behind 'Manage plan'. For UPI autopay, revoke the mandate itself in the bank app — that's the real kill switch.",
        },
        {
          title: "Set the quarterly ritual",
          body: "Calendar reminder, first Saturday of every quarter, 30 min. Subscriptions drift back otherwise.",
        },
      ],
      proTip:
        "Annual plans are the sneakiest: one charge, twelve months of forgetting. Check for them explicitly.",
    },
    verdict:
      "Tie. The DIY sweep finds everything; AI adds pattern detection (double-billing, price creep) worth checking for once a year.",
    mistakes: [
      "Cancelling the app but not the UPI autopay mandate",
      "Ignoring small ₹49–₹199 charges (₹149 × 12 × 3 forgotten apps = real money)",
      "Not calendar-ing the survivors' renewal dates",
    ],
  },
  {
    slug: "price-drop-sniping",
    title: "Never Miss a Price Drop",
    hook: "Set traps for prices instead of refreshing pages.",
    category: "Money",
    minutes: 20,
    difficulty: "Easy",
    outcome:
      "Watchlists that ping you the moment a wished-for item crosses your target price.",
    intro:
      "Sale pricing is psychological warfare. The winning move is patience plus automation: define your price, walk away, let robots watch.",
    aiWay: {
      summary: "LLM-assisted research to find the right product and fair price.",
      tools: ["ChatGPT / Perplexity", "Price-tracking sites"],
      steps: [
        {
          title: "Research before wanting",
          body: 'Prompt: "I want [product] for [use case], budget ₹[X]. Compare top 3 models, known issues, and typical sale-season discounts in India."',
        },
        {
          title: "Find true price history",
          body: "Check price-history trackers for the exact SKU. '70% OFF' against an inflated MRSP is the oldest trick in the book — history doesn't lie.",
        },
        {
          title: "Set multi-channel alerts",
          body: "Tracker alert at target price + wishlist + (optionally) a Zapier watch on the product page for stock/drop changes.",
        },
        {
          title: "Buy on the ping, not the itch",
          body: "Alert fires → verify against price history → buy within the return window. No alerts for months? It wasn't a deal yet.",
        },
      ],
      timeSaver: "Ends daily deal-site scrolling; the deal comes to you.",
    },
    diyWay: {
      summary: "Native tools only: wishlists plus tracker sites, zero setup cost.",
      materials: [
        "Amazon/Flipkart wishlist",
        "Free price-tracker website account",
        "Email notifications on",
      ],
      steps: [
        {
          title: "Wishlist everything you're eyeing",
          body: "Wishlisted items often trigger native drop notifications — free monitoring you already have.",
        },
        {
          title: "Track on a price site",
          body: "Add the product URL to a price tracker, set your target, enable email/push.",
        },
        {
          title: "Time purchases to seasons",
          body: "Big-ticket categories have predictable dips (electronics: festive sales; appliances: pre-Diwali). Patience has a calendar.",
        },
        {
          title: "Stack savings at checkout",
          body: "Card offers + cashback wallet + exchange bonus stack. The listed 'deal' is the starting point, not the finish line.",
        },
      ],
      proTip:
        "Screenshot the price history before buying — easiest evidence if the 'sale' price was quietly raised.",
    },
    verdict:
      "DIY covers 90% with native wishlists and trackers. AI earns its place at step one: choosing the right product before tracking it.",
    mistakes: [
      "Tracking inflated-MRSP 'deals' without history context",
      "Buying instantly on any drop instead of your pre-set target",
      "Skipping the return-window check on electronics",
    ],
  },

  // ─── LIFE ────────────────────────────────────────────────────────────────
  {
    slug: "learn-anything-fast",
    title: "Learn Any Skill Faster",
    hook: "A personal curriculum in 10 minutes, not a semester.",
    category: "Life",
    minutes: 60,
    difficulty: "Easy",
    outcome:
      "A week-one learning plan for any skill, with daily drills and checkpoints you'll actually follow.",
    intro:
      "Most self-learning dies in the bookmark folder. The fix is a concrete week-one plan with daily reps — and AI makes building one take ten minutes.",
    aiWay: {
      summary: "AI as curriculum designer, drill sergeant, and patient tutor.",
      tools: ["ChatGPT / Claude / Gemini"],
      steps: [
        {
          title: "Brief the tutor",
          body: 'Prompt: "Design a 7-day starter plan for [skill]. I have [X] hrs/day and know [current level]. Each day: one concept, one drill, one checkpoint to prove I learned it."',
        },
        {
          title: "Demand active recall",
          body: 'Each session ends with: "Quiz me on what I just learned. Then tell me the single most common beginner mistake tomorrow."',
        },
        {
          title: "Explain-it-back loop",
          body: "After each day, explain the concept to the AI in your own words. Gaps it spots = tomorrow's first drill.",
        },
        {
          title: "Weekly retro",
          body: 'Day 7: "Here\'s what I struggled with this week. Rebuild next week\'s plan focusing there."',
        },
      ],
      timeSaver:
        "Replaces hours of syllabus-hunting and dead-end tutorials with a plan tuned to your pace.",
    },
    diyWay: {
      summary: "The classic apprenticeship method: find humans, copy masters, ship publicly.",
      materials: [
        "One well-reviewed textbook or course (just one)",
        "A notebook for logs",
        "A community of practitioners",
      ],
      steps: [
        {
          title: "Choose one source",
          body: "Pick THE standard resource and ignore the other 40. Resource-shopping feels like progress; it isn't.",
        },
        {
          title: "Copy masters deliberately",
          body: "Reproduce great examples line-by-line/stroke-by-stroke before creating originals. Copying is how every craft school ever worked.",
        },
        {
          title: "Log daily, tiny",
          body: "One line per day: what I did, what confused me. Momentum is the entire game at week one.",
        },
        {
          title: "Go public early",
          body: "Share day-7 output with a community. Feedback compresses years; embarrassment fades in minutes.",
        },
      ],
      proTip:
        "Consistency beats intensity: 25 minutes daily demolishes a 3-hour Sunday binge.",
    },
    verdict:
      "Hybrid is honest here: AI builds the scaffold and quizzes you; the DIY habits (one source, public shipping) keep you human-accountable.",
    mistakes: [
      "Collecting courses instead of completing reps",
      "Passive consumption (watching ≠ learning)",
      "Planning for ideal weeks instead of real ones",
    ],
  },
  {
    slug: "sleep-cooling-fix",
    title: "Sleep Cool Without an AC War",
    hook: "Beat the 3 AM sweat-wake with physics, not a remote.",
    category: "Life",
    minutes: 40,
    difficulty: "Easy",
    outcome:
      "A bedroom setup that drops perceived temperature several degrees — for under ₹1,000.",
    intro:
      "Waking sweaty at 3 AM is usually airflow, bedding fabric, and heat radiation working against you — all fixable without running the AC all night.",
    aiWay: {
      summary: "AI tailors fixes to your room's actual orientation and climate.",
      tools: ["ChatGPT / Gemini"],
      steps: [
        {
          title: "Describe the room",
          body: 'Prompt: "My bedroom: [floor], [which walls get sun], [city], ceiling fan only, wake up sweating around 3 AM. Rank the top 5 fixes by impact-per-rupee for this exact situation."',
        },
        {
          title: "Decode your bedding labels",
          body: 'Photo of tags → "Are these sheets breathable for a humid climate? What GSM/thread count should I buy instead?"',
        },
        {
          title: "Diagnose the wake-up",
          body: "Log wake times + room state for 3 nights, feed back to AI, get a hypothesis ranking (airflow vs mattress vs late meals etc.).",
        },
      ],
      timeSaver: "Skips buying gadgets your specific room doesn't need.",
    },
    diyWay: {
      summary: "Cross-ventilation engineering plus cotton — grandmother-approved.",
      materials: [
        "Cotton bedsheets & covers (percale weaves breathe)",
        "Bowl of ice + fan, or damp sheet hung in doorway",
        "Blackout curtain for sun-facing windows",
      ],
      steps: [
        {
          title: "Engineer cross-flow",
          body: "Fan facing OUT of the window pushes hot air out (better than blowing at you). Second window/opening cracked = replacement air path. Cross-flow beats brute force.",
        },
        {
          title: "Pre-cool the bed",
          body: "AC/dehumidifier 20 min before sleep, or hot-water-bottle filled with ice water at the feet. Cooling core body temp triggers sleepiness — physics works for you.",
        },
        {
          title: "Switch fabrics",
          body: "Polyester blends trap heat. Cotton sheets + cotton nightwear = measurable difference on humid nights.",
        },
        {
          title: "Kill evening heat loads",
          body: "No laptop-in-bed, hot showers moved earlier, dinner 2+ hrs before bed (digestion is a furnace).",
        },
      ],
      proTip:
        "The fan-facing-out trick surprises everyone: exhaust beats intake for room cooling.",
    },
    verdict:
      "DIY wins outright — this is airflow and fabric, not technology. Use AI only if the problem persists after the basics (could be medical).",
    mistakes: [
      "Fan blowing AT the bed instead of exhausting OUT",
      "Buying 'cooling gel' gadgets before fixing fabric and airflow",
      "Heavy dinner + late screen = heat generated from inside",
    ],
  },
  {
    slug: "meal-prep-sunday",
    title: "Meal Prep Without the Sunday Sacrifice",
    hook: "5 lunches locked in 90 minutes — not your whole day.",
    category: "Life",
    minutes: 90,
    difficulty: "Easy",
    outcome:
      "A fridge with five ready lunches, a repeating grocery list, and Sunday evenings back.",
    intro:
      "Meal prepping fails when it's framed as cooking ten perfect dishes. It works when it's framed as an assembly line for five repeatable lunches.",
    aiWay: {
      summary: "AI as menu planner, macro counter, and grocery-list generator.",
      tools: ["ChatGPT / Gemini"],
      steps: [
        {
          title: "Generate the menu",
          body: 'Prompt: "Plan 5 work lunches around [cuisine you love]. Constraints: one-pot recipes, shared ingredients to cut waste, ~600 kcal each, vegetarian (or your preference). Reuse the same base ingredients across meals."',
        },
        {
          title: "Collapse into one grocery list",
          body: 'Follow up: "Merge all 5 recipes into a single grocery list, grouped by supermarket section, with quantities for one person."',
        },
        {
          title: "Get a cook-order",
          body: 'Then: "Sequence these recipes so total cooking time is under 90 minutes — what cooks while what rests?"',
        },
        {
          title: "Iterate weekly",
          body: "Rate each lunch 1–5 during the week. Friday: 'keep the 4s and 5s, swap the rest' — the menu improves itself.",
        },
      ],
      timeSaver:
        "Menu decisions (the actual time-killer) drop from ~1 hour of dithering to 5 minutes.",
    },
    diyWay: {
      summary: "The no-apps method: one base, three toppings, five boxes.",
      materials: [
        "5 airtight containers",
        "One big pot + one sheet tray",
        "A base you don't get tired of (rice, dal, khichdi, pasta)",
      ],
      steps: [
        {
          title: "Pick one base",
          body: "Something you genuinely like and can eat variations of all week. Cook a big pot — this is 80% of the job.",
        },
        {
          title: "Roast one tray of vegetables",
          body: "Whatever's in the fridge, olive oil, salt, 25 min at 200°C. One tray, zero attention.",
        },
        {
          title: "One protein, three ways",
          body: "Paneer/eggs/chicken cooked plain, then split: curry-ish, salad-ish, wrap-ish. Same ingredient, three different lunches.",
        },
        {
          title: "Assembly line, then label",
          body: "Line up 5 boxes, fill base → veg → protein in passes. Day-1-to-3 boxes in the fridge, day-4-to-5 in the freezer.",
        },
      ],
      proTip:
        "Sauces make repetition invisible: one yoghurt-herb, one peanut, one tomato. Same food, five personalities.",
    },
    verdict:
      "DIY wins the cooking; AI wins the deciding. Use AI for the plan and grocery list, then execute the dumb-simple assembly line.",
    mistakes: [
      "Prepping salads on day 1 for day 5 (sog). Dress at eat-time.",
      "Ten recipes instead of one base — that's catering, not prepping.",
      "No backup meal for the day you inevitably skip — keep 2 frozen emergency boxes.",
    ],
  },
  {
    slug: "budget-that-runs-itself",
    title: "Set Up a Budget That Runs Itself",
    hook: "One hour to build, then it manages you (gently).",
    category: "Money",
    minutes: 60,
    difficulty: "Medium",
    outcome:
      "Automatic splits on salary day, a guilt-free spending number, and savings that grow without willpower.",
    intro:
      "Budgets fail because they need daily decisions. This one needs one decision — on salary day, money splits itself before you can touch it.",
    aiWay: {
      summary: "AI audits your spending pattern and designs the split ratios.",
      tools: ["ChatGPT / Claude", "Your bank's monthly statement (redacted)"],
      steps: [
        {
          title: "Baseline your reality",
          body: 'Redact and paste 2 months of statements. Prompt: "Categorize this spending, calculate averages, and tell me my top 3 leak categories. Be blunt."',
        },
        {
          title: "Design your split",
          body: 'Follow up: "Propose a salary split (needs/wants/future) based on my actual spending, not textbook percentages. I want to save [goal amount] monthly."',
        },
        {
          title: "Stress-test it",
          body: '"What breaks this budget first if rent rises 10%? What\'s my emergency-fund gap?" Fix the fragile parts now, not in a crisis.',
        },
        {
          title: "Automate the moves",
          body: "Set standing instructions on salary day: auto-transfer to savings/RD, auto-pay bills. Your spending account gets what's left — that's the budget.",
        },
      ],
      timeSaver:
        "Turns a weekend of spreadsheet guilt into one focused hour with a personalized plan.",
    },
    diyWay: {
      summary: "The envelope method, digitized: separate accounts do the enforcing.",
      materials: [
        "2–3 bank accounts (or one account + one wallet app)",
        "Standing-instruction access",
        "One hour on salary day (once)",
      ],
      steps: [
        {
          title: "Split accounts by job",
          body: "Account 1: bills & rent. Account 2: daily spending. Account 3: savings — no debit card attached, ideally a different bank so transfers take a day (friction is a feature).",
        },
        {
          title: "Automate on salary day",
          body: "Standing instructions move money the morning it arrives. Bills paid from 1, you spend from 2, you never see 3.",
        },
        {
          title: "One number to rule them all",
          body: "Your only daily job: keep account 2 positive till month-end. No category tracking, no app nagging — one number.",
        },
        {
          title: "Monthly 10-minute review",
          body: "Calendar reminder: check savings grew, check account 2 didn't need a bailout. Adjust next month's split by ₹500 increments, not revolutions.",
        },
      ],
      proTip:
        "The account you can't see is the account you can't spend. Distance beats discipline every time.",
    },
    verdict:
      "DIY is the backbone — account splitting does 90% of the work for free. AI is the consultant who sets honest numbers on day one.",
    mistakes: [
      "Budgeting to an ideal month instead of your real spending history",
      "Savings account with a debit card attached (it will be used)",
      "Tracking 30 categories daily — the system should need minutes per month, not hours",
    ],
  },
];

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
