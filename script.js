"use strict";

/* =========================================================
   1. YOUR CONTENT — edit the arrays below
   ========================================================= */

/* Weighted decision matrix. Scores and reasons are the team's own.
   Ratings are worked out from each score: 90–100% Fully meets,
   70–89% Mostly meets, 50–69% Partly meets, below 50% Weak. */
const criteria = [
  { key: "eff", name: "Effectiveness", short: "Effectiveness", max: 35 },
  { key: "off", name: "Offline usability", short: "Offline", max: 20 },
  { key: "rem", name: "Remote field operability", short: "Remote field", max: 20 },
  { key: "mnt", name: "Maintainability", short: "Maintain.", max: 15 },
  { key: "trn", name: "Minimal training", short: "Training", max: 10 }
];

const ratingScale = [
  { label: "Fully meets", range: "90–100%", text: "Works fully with Lama Lama Country conditions" },
  { label: "Mostly meets", range: "70–89%", text: "Works well with small limits" },
  { label: "Partly meets", range: "50–69%", text: "Works, but with clear limits" },
  { label: "Weak", range: "Below 50%", text: "Big barriers to use on Lama Lama Country" }
];

const solutions = [
  {
    id: "app", short: "Offline App", selected: true,
    name: "Offline Ranger Prioritisation & Support App",
    scores: { eff: 30, off: 19, rem: 18, mnt: 14, trn: 9 },
    reasons: {
      eff: "Covers the whole need: finding, keeping track and deciding what comes first. It loses a few points only because Rangers still have to reach a site to spot weeds",
      off: "Built to work offline first; every record is saved on the phone and uploads later.",
      rem: "Runs on a phone that can be carried anywhere.",
      mnt: "Phones are easy to replace, and the app can be updated remotely.",
      trn: "Uses normal phone steps: take a photo, choose the weed, save."
    },
    verdict: [
      "Covers the whole need: finding, keeping track and deciding what comes first. It loses a few points only because Rangers still have to reach a site to spot weeds.",
      "Built to work offline first; every record is saved on the phone and uploads later. Runs on a phone that can be carried anywhere.",
      "Phones are easy to replace, and the app can be updated remotely. Uses normal phone steps: take a photo, choose the weed, save."
    ]
  },
  {
    id: "drone", short: "Drone + ML",
    name: "Drone + Machine-Learning Aerial Survey",
    scores: { eff: 28, off: 14, rem: 16, mnt: 6, trn: 5 },
    reasons: {
      eff: "Very good at finding and mapping weeds, but does not keep treatment history, remind Rangers to go back, or help decide what comes first.",
      off: "The drone flies without internet, but the computer program and photo uploads need strong internet.",
      rem: "Limited by battery life, weather and thick plants, although it can reach places a vehicle cannot.",
      mnt: "Drones need repairs and special parts, often from Cairns.",
      trn: "Needs drone-flying training and skills to check the photos."
    },
    verdict: [
      "Maps weeds but keeps no history or reminders.",
      "Needs a pilot, batteries, and specialist repairs.",
      "Photos need a strong internet connection to process."
    ]
  },
  {
    id: "ai", short: "AI Photo ID",
    name: "AI Photo-Based Weed Identification",
    scores: { eff: 24, off: 10, rem: 18, mnt: 8, trn: 8 },
    reasons: {
      eff: "Helps name weeds, but does not keep treatment history, remind Rangers to go back, or help decide what comes first.",
      off: "The weed-guessing program usually needs internet or frequent updates.",
      rem: "Runs on a phone that can be carried anywhere.",
      mnt: "The weed-guessing ML model needs ongoing re-training.",
      trn: "Uses normal phone steps, like Option 1."
    },
    verdict: [
      "Names weeds but gives no reminders or priorities.",
      "Usually needs internet or regular updates.",
      "AI model must keep being re-trained."
    ]
  },
  {
    id: "spray", short: "Spot-spray",
    name: "Portable Spot-Spray Device",
    scores: { eff: 15, off: 18, rem: 8, mnt: 12, trn: 8 },
    reasons: {
      eff: "Only helps with spraying. It does not help Rangers find weeds, keep track of sites or decide what comes first.",
      off: "A hand sprayer needs no signal or internet at all.",
      rem: "Heavy to carry on foot over long distances, and needs refilling with water and chemical, which limits how far Rangers can take it.",
      mnt: "Simple parts such as nozzles and seals are easy to replace, but chemicals need safe storage.",
      trn: "Simple to use, but safe chemical handling still needs training."
    },
    verdict: [
      "Only helps with spraying, not tracking sites.",
      "Heavy to carry far and needs refilling."
    ]
  }
];

/* "Why is it chosen?" — the four user needs and the app features that meet them.
   box = highlight on the screenshot as [left, top, right, bottom] in % of the image. */
const appScreens = {
  sites: { src: "images/fig6-sites-screen.jpg", fig: 6, name: "Sites list screen" },
  report: { src: "images/fig5-report-screen.jpg", fig: 5, name: "Report a weed screen" }
};

const appNeeds = [
  {
    key: "detect", name: "Detect", need: "Find and record weeds, even with no signal",
    features: [
      { title: "Works offline", screen: "sites", text: "Saves records with no signal and uploads them later.", tag: "Offline usability 19/20", boxes: [[67.5, 4.8, 87.8, 9]] },
      { title: "Six priority weeds", screen: "report", text: "A fixed list of the six weeds keeps everyone’s records the same.", tag: "Minimal training 9/10", boxes: [[3.2, 18, 78.8, 35.6]] },
      { title: "GPS without internet", screen: "report", text: "The phone’s GPS works with no signal.", tag: "Offline usability 19/20", boxes: [[3.2, 64.9, 96.8, 73.2]] }
    ]
  },
  {
    key: "monitor", name: "Monitor", need: "Keep track of treated sites and go back in time",
    features: [
      { title: "Overdue re-checks first", screen: "sites", text: "Warns when a treated site is late for its check, so it is not forgotten.", tag: "Effectiveness 30/35", boxes: [[6.6, 34.6, 33.8, 38.3]] },
      { title: "Photo evidence", screen: "report", text: "Photos are kept to compare later visits.", tag: "Effectiveness 30/35", boxes: [[3.2, 37.2, 96.8, 63.4]] }
    ]
  },
  {
    key: "prioritise", name: "Prioritise", need: "Decide which site needs attention first",
    features: [
      { title: "Sorted by urgency", screen: "sites", text: "Puts the most urgent sites first, to plan short field days.", tag: "Effectiveness 30/35", boxes: [[3.2, 24.4, 36, 29.2], [3.2, 57.3, 40, 62]] },
      { title: "Navigate to the site", screen: "sites", text: "Gives directions to the saved location.", tag: "Remote field operability 18/20", boxes: [[6.6, 48.6, 37.4, 53.6]] }
    ]
  },
  {
    key: "control", name: "Ranger control", need: "Keep Rangers and YAC in control of their information",
    features: [
      { title: "Checked before listing", screen: "report", text: "Reports are checked first, so Rangers and YAC stay in control.", tag: "Must-have rule", boxes: [[3.2, 10.2, 79.2, 13.2]] }
    ]
  }
];

/* Pages, in reading order. On desktop they pair up as 1 2 | 3 4 | 5 6 …
   Keep the total even so the last spread is full. */
/* QR code for the prototype link */
const QR_SVG = "<svg viewBox=\"-2 -2 37 37\" class=\"qr\" role=\"img\" aria-label=\"QR code linking to the Ranger App prototype\" shape-rendering=\"crispEdges\"><rect x=\"-2\" y=\"-2\" width=\"37\" height=\"37\" fill=\"#fff\"/><path d=\"M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM10 0h1v1h-1zM12 0h1v1h-1zM13 0h1v1h-1zM14 0h1v1h-1zM16 0h1v1h-1zM17 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM13 1h1v1h-1zM14 1h1v1h-1zM18 1h1v1h-1zM19 1h1v1h-1zM20 1h1v1h-1zM22 1h1v1h-1zM24 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM8 2h1v1h-1zM11 2h1v1h-1zM13 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM19 2h1v1h-1zM20 2h1v1h-1zM21 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM10 3h1v1h-1zM14 3h1v1h-1zM16 3h1v1h-1zM18 3h1v1h-1zM20 3h1v1h-1zM21 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM8 4h1v1h-1zM9 4h1v1h-1zM11 4h1v1h-1zM13 4h1v1h-1zM15 4h1v1h-1zM16 4h1v1h-1zM21 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM13 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1zM16 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM23 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM12 7h1v1h-1zM13 7h1v1h-1zM14 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM25 8h1v1h-1zM28 8h1v1h-1zM30 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM1 9h1v1h-1zM2 9h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM13 9h1v1h-1zM14 9h1v1h-1zM15 9h1v1h-1zM17 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM23 9h1v1h-1zM28 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM31 9h1v1h-1zM2 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM15 10h1v1h-1zM16 10h1v1h-1zM21 10h1v1h-1zM23 10h1v1h-1zM26 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM30 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM3 11h1v1h-1zM4 11h1v1h-1zM7 11h1v1h-1zM9 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM18 11h1v1h-1zM23 11h1v1h-1zM26 11h1v1h-1zM27 11h1v1h-1zM30 11h1v1h-1zM31 11h1v1h-1zM32 11h1v1h-1zM1 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM12 12h1v1h-1zM13 12h1v1h-1zM15 12h1v1h-1zM17 12h1v1h-1zM23 12h1v1h-1zM24 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM0 13h1v1h-1zM3 13h1v1h-1zM4 13h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM12 13h1v1h-1zM14 13h1v1h-1zM17 13h1v1h-1zM18 13h1v1h-1zM19 13h1v1h-1zM20 13h1v1h-1zM22 13h1v1h-1zM23 13h1v1h-1zM25 13h1v1h-1zM27 13h1v1h-1zM30 13h1v1h-1zM0 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM12 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1zM17 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM21 14h1v1h-1zM22 14h1v1h-1zM26 14h1v1h-1zM28 14h1v1h-1zM3 15h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM11 15h1v1h-1zM12 15h1v1h-1zM14 15h1v1h-1zM16 15h1v1h-1zM18 15h1v1h-1zM20 15h1v1h-1zM22 15h1v1h-1zM25 15h1v1h-1zM27 15h1v1h-1zM28 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM32 15h1v1h-1zM2 16h1v1h-1zM4 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM8 16h1v1h-1zM13 16h1v1h-1zM15 16h1v1h-1zM16 16h1v1h-1zM20 16h1v1h-1zM22 16h1v1h-1zM23 16h1v1h-1zM24 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM27 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM3 17h1v1h-1zM4 17h1v1h-1zM5 17h1v1h-1zM9 17h1v1h-1zM11 17h1v1h-1zM15 17h1v1h-1zM17 17h1v1h-1zM18 17h1v1h-1zM19 17h1v1h-1zM20 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM30 17h1v1h-1zM32 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM7 18h1v1h-1zM9 18h1v1h-1zM10 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM17 18h1v1h-1zM18 18h1v1h-1zM19 18h1v1h-1zM20 18h1v1h-1zM21 18h1v1h-1zM22 18h1v1h-1zM23 18h1v1h-1zM24 18h1v1h-1zM27 18h1v1h-1zM29 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM32 18h1v1h-1zM0 19h1v1h-1zM2 19h1v1h-1zM5 19h1v1h-1zM8 19h1v1h-1zM9 19h1v1h-1zM10 19h1v1h-1zM13 19h1v1h-1zM23 19h1v1h-1zM24 19h1v1h-1zM26 19h1v1h-1zM28 19h1v1h-1zM29 19h1v1h-1zM30 19h1v1h-1zM0 20h1v1h-1zM3 20h1v1h-1zM6 20h1v1h-1zM10 20h1v1h-1zM14 20h1v1h-1zM16 20h1v1h-1zM18 20h1v1h-1zM24 20h1v1h-1zM27 20h1v1h-1zM29 20h1v1h-1zM32 20h1v1h-1zM0 21h1v1h-1zM2 21h1v1h-1zM3 21h1v1h-1zM4 21h1v1h-1zM5 21h1v1h-1zM13 21h1v1h-1zM14 21h1v1h-1zM23 21h1v1h-1zM25 21h1v1h-1zM27 21h1v1h-1zM28 21h1v1h-1zM30 21h1v1h-1zM0 22h1v1h-1zM4 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM11 22h1v1h-1zM12 22h1v1h-1zM19 22h1v1h-1zM20 22h1v1h-1zM23 22h1v1h-1zM25 22h1v1h-1zM26 22h1v1h-1zM28 22h1v1h-1zM30 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM0 23h1v1h-1zM2 23h1v1h-1zM3 23h1v1h-1zM4 23h1v1h-1zM8 23h1v1h-1zM9 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM15 23h1v1h-1zM17 23h1v1h-1zM19 23h1v1h-1zM20 23h1v1h-1zM22 23h1v1h-1zM23 23h1v1h-1zM25 23h1v1h-1zM27 23h1v1h-1zM28 23h1v1h-1zM30 23h1v1h-1zM31 23h1v1h-1zM0 24h1v1h-1zM1 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM10 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM16 24h1v1h-1zM20 24h1v1h-1zM23 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM29 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM9 25h1v1h-1zM10 25h1v1h-1zM12 25h1v1h-1zM14 25h1v1h-1zM15 25h1v1h-1zM16 25h1v1h-1zM17 25h1v1h-1zM18 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM30 25h1v1h-1zM31 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM10 26h1v1h-1zM13 26h1v1h-1zM14 26h1v1h-1zM15 26h1v1h-1zM16 26h1v1h-1zM17 26h1v1h-1zM19 26h1v1h-1zM20 26h1v1h-1zM21 26h1v1h-1zM22 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM30 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM9 27h1v1h-1zM11 27h1v1h-1zM12 27h1v1h-1zM14 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM22 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM8 28h1v1h-1zM9 28h1v1h-1zM13 28h1v1h-1zM15 28h1v1h-1zM16 28h1v1h-1zM17 28h1v1h-1zM20 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM10 29h1v1h-1zM13 29h1v1h-1zM16 29h1v1h-1zM18 29h1v1h-1zM21 29h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM24 29h1v1h-1zM25 29h1v1h-1zM27 29h1v1h-1zM31 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM9 30h1v1h-1zM11 30h1v1h-1zM14 30h1v1h-1zM15 30h1v1h-1zM17 30h1v1h-1zM18 30h1v1h-1zM19 30h1v1h-1zM24 30h1v1h-1zM25 30h1v1h-1zM27 30h1v1h-1zM28 30h1v1h-1zM29 30h1v1h-1zM31 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM14 31h1v1h-1zM22 31h1v1h-1zM26 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM29 31h1v1h-1zM30 31h1v1h-1zM31 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM10 32h1v1h-1zM11 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM20 32h1v1h-1zM23 32h1v1h-1zM24 32h1v1h-1zM26 32h1v1h-1zM27 32h1v1h-1zM28 32h1v1h-1z\" fill=\"#1d2b23\"/></svg>";

function link(url) {
  return `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
}

const pages = [
  { type: "ack", title: "Acknowledgement of Country" },
  {
    type: "title",
    title: "Title page",
    team: "Power Ranger",
    members: [
      "Edbert Wisely",
      "Fatih Putranda Lesmana",
      "Glenny Veneesha",
      "Hangyeon Cho",
      "Karell Yusdygo",
      "Yiming Bian"
    ],
    tutorial: "Tutorial 1 – Carina",
    designArea: "Augmenting the Ranger Program",
    opportunity: "Weed management innovation",
    site: "https://weedranger.github.io/",
    forWhom: "EWB Challenge"
  },

  /* ---- Executive Summary / Landing page (team's text, EWB format) ---- */
  {
    type: "section", kicker: "EXECUTIVE SUMMARY", cls: "exec", long: true,
    title: "Executive Summary",
    heading: "Power Ranger – Offline Ranger Prioritisation &amp; Support App",
    blocks: [
      { p: "<b>Design Area(s):</b> Augmenting the Ranger Program (Project Opportunity 4.1 – Weed management innovation)" },
      { h: "Background" },
      { p: "The Lama Lama Ranger Program, supported by the Yintjingga Aboriginal Corporation (YAC), manages the natural and cultural resources across Lama Lama Country’s vast and remote landscape. However, seasonal wet conditions cause impassable roads and river crossings, severely restricting ranger mobility and communication. Because invasive weeds threaten native vegetation, biodiversity, and cultural access, rangers currently utilize manual logging, GPS tagging, and tools like I-Tracker and drones, yet struggle with remote monitoring and limited connectivity. To address these challenges, there is a critical need for an offline-capable solution that respects Indigenous data sovereignty, operates locally with minimal complexity, and seamlessly integrates with existing ranger workflows and the regional Weed Action Plan." },
      { h: "Proposal Summary" },
      { p: "The project aims to address the difficulty Lama Lama Rangers have in reliably detecting, monitoring and prioritising weed infestations across large, remote and seasonally inaccessible Country through an offline-first mobile application. The app saves each infestation’s photo, GPS location, species and treatment on the Ranger’s phone and synchronises it when a connection returns. It flags sites due for follow-up and ranks them by urgency, so Rangers can decide where to work next while their existing practices and knowledge stay at the centre." },
      { h: "Overview of Design" },
      { bullets: [
        "The Offline Ranger Prioritisation &amp; Support App achieves reliable weed record-keeping and prioritisation without internet access by saving every record on the phone first and uploading it to a central database when connectivity returns.",
        "The implementation is supported through a cross-platform Flutter application, a Supabase database, Ranger training, field testing and documentation.",
        "The design includes the following components: a mobile app with local storage, photo and GPS capture using the phone, a fixed list of the six priority species from the Weed Action Plan, a prioritisation dashboard with follow-up reminders, a Supabase database with role-based access, and public weed reports that are checked before they are listed.",
        "Lama Lama Rangers use the app in the field to record sites, track treatments and plan return visits. Yintjingga Aboriginal Corporation administrators manage access and review reports, so the Rangers and the corporation stay in control of their information."
      ] },
      { h: "Key Considerations" },
      { bullets: [
        "<b>Sourcing:</b> The design needs no specialist hardware and is intended to run on smartphones Rangers already use. The database is an external subscription service (Supabase), so it is sourced externally rather than locally.",
        "<b>Maintenance:</b> The database subscription must be renewed, the app updated, user accounts managed and a support contact named. Phones are easy to replace and the app can be updated remotely.",
        "<b>Implementation:</b> GPS and photo capture must be tested on the Rangers’ own devices, secure authentication and access controls configured, and synchronisation tested for failures and conflicting updates. Android devices use APK files, which avoids a Google Play registration fee. Apple Developer Program enrolment is needed only if iOS devices are used.",
        "<b>Prototype results:</b> Initial prototype tests of offline logging, synchronisation, staying signed in, priority order and ease of use were reported as successful.",
        "<b>Assumptions and risks:</b> Rangers have compatible smartphones, and the six-species Weed Action Plan remains the priority list. Development is assumed to take 180 hours at A$100 per hour, so paying a developer for later changes could be costly."
      ] },
      { h: "Proposed Materials and Cost Summary" },
      { p: "The estimated total cost is about A$18,630, which covers a one-off A$18,000 for outsourcing app development (180 hours at 100 per hour). Supabase database subscription is A$40 per month and A$150 per year for app distribution, along with existing smartphones and ranger training time." }
    ]
  },

  { type: "contents", title: "Contents" },
  {
    type: "chapter", chapter: 1,
    title: "Project Details",
    details: {
      designArea: "4 - Augmenting the Ranger Program",
      designOpportunities: "4.1 - Weed management innovation",
      importance: "The Lama Lama Ranger Program is supported by Yintjingga Aboriginal Corporation (YAC), which plays an important role in managing Country and connecting to environmental, economic and cultural values. However, seasonal conditions can create challenges for Ranger activities. During the wet season, roads and tracks may become difficult or impossible to use, limiting Rangers’ access to weed infestation sites. It highlights the need for more efficient and reliable approaches to weed mapping, monitoring and treatment."
    }
  },

  /* ---- 2. Background ---- */
  {
    type: "section", chapter: 2,
    title: "Background",
    tag: "BACKGROUND",
    blocks: [
      { h: "Context" },
      { p: "The Lama Lama Ranger Program is jointly managed by the Queensland Government and the Indigenous community. Rangers are responsible for managing the natural and cultural resources across Lama Lama Country, including a wide range of land and sea management activities." },
      { p: "Lama Lama Country is large and remote, with diverse terrain and ecosystems. That means the application should be tailored to local conditions, including offline capacity, easy of operation and maintenance, and require minimal training." },
      { h: "Significance" },
      { p: "Weed management is an important part of managing Lama Lama Country because invasive weeds impact environmental, economic and cultural values (Yintjingga Aboriginal Corporation, n.d.-b). Invasive weeds can threaten native vegetation, reduce biodiversity and affect access to important areas of Lama Lama Country." }
    ]
  },
  {
    type: "section", chapter: 2, cont: true,
    title: "Current Solution and Objectives",
    heading: "Current Solution",
    blocks: [
      { p: "The current practice involves photographing, logging GPS location, applying herbicide, and returning after approximately one month to assess treatment effectiveness (Engineers Without Borders Australia, 2026b)." },
      { steps: [
        ["Locate Area", "Identify and scout active weed infestation sites manually across Country."],
        ["Photo Log", "Photograph and identify weed species for treatment."],
        ["GPS Tagging", "Record and track the locations of weed infestations."],
        ["Weed Treatment", "Apply herbicides appropriate to weed species."],
        ["Reassessment", "Return to infestation sites approximately one month later to assess treatment effectiveness."]
      ] },
      { p: "Besides, Rangers have integrated digital technologies such as Fulcrum, I-Tracker and drones with the knowledge passed by the Elders during this process (Engineers Without Borders Australia, 2026b)." },
      { h: "Objectives" },
      { p: "Establishing an application that can improve efficiency and reliability of weed management work across Lama Lama Country. It should support large-scale weed monitoring and help rangers track the effectiveness of treatment. It is also important to keep costs low and respect Indigenous community priorities and cultural requirements." }
    ]
  },

  /* ---- 3. Problem description ---- */
  {
    type: "section", chapter: 3,
    title: "Problem Description",
    tag: "THE CHALLENGE",
    blocks: [
      { p: "While physical removal is important, the true challenge of weed management on Lama Lama Country lies in reliably detecting, monitoring, and managing infestations across such vast, remote areas. Weeds Australia (n.d.) states that “an important part of any weed control program is monitoring the response of weeds and desirable vegetation” to evaluate whether management goals and control actions have actually worked." },
      { p: "Four factors remain as key challenges:" },
      { folders: [
        ["Access", "During the wet season, roads and river crossings may be impassable (Engineers Without Borders Australia, 2026a). As a result, rangers’ mobility is highly restricted, therefore offline capability is crucial to sustain field operations when connectivity is unavailable."],
        ["Monitoring", "Infestations on Lama Lama Country are spread across an extensive landscape. Tracking their precise locations, treatment history, and subsequent regrowth remains a significant operational challenge. Monitoring is required to determine whether applied treatments are effective and to identify where further control actions are necessary (Weeds Australia, n.d.)."],
        ["Decision-making", "As the ranger program is seasonal (Engineers Without Borders Australia, 2026b), this creates rangers with varying levels of field expertise. Some of the rangers may need help in identifying priority infestations and selecting appropriate actions. So, a decision-support system is important to improve consistency while complementing ranger knowledge."],
        ["Operations", "As stated in Engineers Without Borders Australia (2026c), any proposed solution must rely on standard spare parts instead of specialized components. This ensures local self-reliance, avoiding maintenance requirements from technicians from Cairns."]
      ] }
    ]
  },
  {
    type: "section", chapter: 3, cont: true,
    title: "User statement",
    heading: "",
    blocks: [
      { p: "Given these challenges, an infestation record with offline capability is the ideal solution, as it could greatly benefit the Rangers even in the wet season, when access and connectivity are limited. Features such as a location tracker, photos and treatment history could help Rangers return to the treated site on time rather than relying on memory, complemented by a feature that could allow Rangers to see which sites need prioritisation. Moreover, a tool that can be maintained locally, with Rangers and YAC having control of their information, should also be part of the solution." },
      { p: "Therefore, one user statement is developed:" },
      { quote: "Lama Lama Rangers need to reliably detect, monitor, and prioritise weed infestations across large, remote and seasonally inaccessible areas while integrating with their existing practices.", cite: "USER STATEMENT" }
    ]
  },
  {
    type: "section", chapter: 3, cont: true, toc: true,
    title: "Evaluation Criteria",
    heading: "Evaluation Criteria",
    blocks: [
      { p: "Five criteria were selected to compare potential solutions:" },
      { criteria: [
        ["Effectiveness", 35, "The usefulness of the proposed design to enhance the weed management process."],
        ["Remote field operability", 20, "The suitability of the solution for remote terrain and seasonal access constraints."],
        ["Offline usability", 20, "The ability to record and access information without internet connectivity."],
        ["Maintainability", 15, "Ease of maintenance, affordability, and long-term operation."],
        ["Minimal training", 10, "The simplicity and accessibility of the design to ensure rangers with varying levels of experience can operate it effectively."]
      ] },
      { h: "Criteria Weightings" },
      { p: "Effectiveness (35) carries the most weight because it is how the solution can meet the user need. Offline usability (20) and remote field operability (20) share the same weight of 20 because most of Lama Lama Country has little signal and infestations are spread over large, remote areas (Engineers Without Borders Australia, 2026b). Maintainability (15) follows because long supply chains make repairs slow, and minimal training (10) has the smallest weighting score because training can be planned during implementation. These criteria and weightings were partially derived from the operational priorities and constraints outlined by Engineers Without Borders Australia (2026b)." }
    ]
  },

  /* ---- 4. Design process & decision-making ---- */
  {
    type: "section", chapter: 4,
    title: "Design Process & Decision-Making",
    tag: "DESIGN PROCESS",
    blocks: [
      { p: "The focus is on finding a solution that could operate within the practical conditions of Lama Lama Country. Particular attention for the proposed solution was given to offline capability, ease of use, field conditions, maintainability, and the ability to improve weed-management system." },
      { p: "We used the user need and project constraints to guide ideation, screening and final selection." },
      { h: "Design Solutions Options" },
      { optfig: { n: 1, name: "Portable Spot-Spray Device", text: "A portable field device designed to apply herbicide directly to identified weed infestations. It supports targeted treatment while Rangers are working to check identified infestations.", src: "images/fig1-spot-spray.jpg", title: "[Lama Lama Ranger using a portable spot-spray device]", source: "OpenAI, 2026" } },
      { optfig: { n: 2, name: "Offline Ranger Prioritisation & Support App", text: "An offline application that records weed locations, photos, treatment details, and follow-up information. It also organises infestation records to help Rangers monitor and prioritise sites.", src: "images/fig2-offline-app.jpg", title: "[Lama Lama Ranger using an offline weed management application]", source: "OpenAI, 2026" } }
    ]
  },
  {
    type: "section", chapter: 4, cont: true,
    title: "Design Solutions Options (continued)",
    heading: "",
    blocks: [
      { optfig: { n: 3, name: "AI Photo-Based Weed Identification", text: "An image-recognition tool that analyses photographs of weeds to assist with species identification. The identified weed information can then be used to support field recording and management.", src: "images/fig3-photo-id.jpg", title: "[Lama Lama Ranger using AI photo-based weed identification]", source: "OpenAI, 2026" } },
      { optfig: { n: 4, name: "Drone + Machine-Learning Aerial Survey", text: "A drone-based system that captures aerial imagery across larger areas of Country. Machine-learning analysis is used to identify and map possible weed infestations from the collected imagery.", src: "images/fig4-drone.jpg", title: "[Drone detecting weed infestations]", source: "OpenAI, 2026" } }
    ]
  },
  { type: "matrix", chapter: 4, cont: true, toc: true, title: "Weighted Decision Matrix" },
  { type: "matrix-detail", chapter: 4, cont: true, title: "Scores explained" },
  { type: "podium", chapter: 4, cont: true, toc: true, title: "The Selected Solution" },
  { type: "why", chapter: 4, cont: true, toc: true, title: "Alignment with user Need Criteria" },

  /* ---- 5. Proposed solution ---- */
  {
    type: "section", chapter: 5,
    title: "Proposed Solution",
    tag: "PROPOSED SOLUTION",
    blocks: [
      { h: "Overview" },
      { p: "The proposed solution is an Offline Ranger Prioritization & Support App designed to support the weed management and environmental monitoring activities carried out by Lama Lama Rangers (Yintjingga Aboriginal Corporation, n.d.-a). The app is not intended to replace their knowledge or create a separate weed management process. Instead, it brings infestation records, treatment information and follow-up activities into one workflow. The main goal is to make field records easier to access and help Rangers decide which locations need attention next, particularly when working across remote areas with unreliable internet access." },
      { h: "How the app works" },
      { p: "The process begins when a Ranger identifies a weed infestation during fieldwork. Using the app, the Ranger would create a site record containing a photograph, GPS location and weed species. The species could be selected from a fixed list based on the existing six-species Weed Action Plan (Yintjingga Aboriginal Corporation, n.d.-b). The Ranger could also enter the treatment date and describe the action taken. Keeping these details together means that the same record can be updated during later visits, rather than treating each observation as a separate entry." },
      { p: "This table summarises the main steps of the proposed application, from recording weed infestations to follow-up monitoring." },
      { table: {
        n: 2, title: "Proposed Application Workflow", cls: "workflow",
        head: ["Step", "Function", "Description"],
        rows: [
          ["1", "Weed Recording", "Record photographs, GPS locations and weed species."],
          ["2", "Offline Storage", "Save field records locally without internet access."],
          ["3", "Data synchronisation", "Synchronise saved records when connectivity becomes available."],
          ["4", "Prioritisation", "Identify sites requiring attention through the dashboard."],
          ["5", "Follow-up Monitoring", "Schedule reassessments and update treatment records."]
        ]
      } },
      { p: "After a new site is recorded, its information would appear in a prioritisation dashboard. The dashboard is proposed to show infestation locations, treatment status and sites requiring follow-up. However, the app should support Ranger judgement, not make final treatment decisions automatically. Priority rules would need to be agreed with the Ranger team before implementation." },
      { p: "The next stage is follow-up monitoring. When a treatment is entered, the app would keep its date and use it to generate a reminder for reassessment. During a return visit, the Ranger could add new photographs, update the site’s condition and record whether further treatment is needed." },
      { p: "<b>How it is built:</b> This application is built using Flutter, which means that it can be run across multiple devices, such as mobile, web, and desktop services using only a single codebase (Google, n.d.-a). This application integrates Supabase as the backend and database provider for storing infestation records, treatment histories, and photographs. Supabase’s Pro plan starts from A$40/month (around A$480 annually), liable to exchange rates and additional usage charges (Supabase, n.d.). The application stores the field records locally, so rangers could still record the eradication or infestation process without internet connectivity. When internet connection is available, the application will synchronise the changes that are stored in the local storage with the central database. However, it is crucial to note that Flutter does not provide a dedicated local storage and synchronisation method, which is needed for offline functionality (Google, n.d.-b)." },
      { h: "Compatibility" },
      { p: "The proposed application aims to complement existing field data practices, including the I-Tracker tools previously used by Lama Lama Rangers (NESP Resilient Landscapes Hub, 2014). However, direct integration with I-Tracker has not yet been confirmed and would require further investigation." }
    ]
  },

  /* ---- 6. Prototyping and testing ---- */
  {
    type: "section", chapter: 6,
    title: "Prototyping and Testing",
    tag: "PROTOTYPE",
    blocks: [
      { p: "Prototyping allows designers to evaluate proposed solutions, identify potential design problems, and refine their ideas before committing to full implementation (Camburn et al., 2017). For the Offline Ranger Prioritisation & Support App, that idea is simple. A ranger can record and prioritise weeds on Country with no phone signal, and the information is still there when the phone reconnects." },
      { h: "What was built" },
      { bullets: [
        "A working cross-platform prototype that can be opened in a browser or on a phone, built by the team using a hosted database (Supabase) and OpenStreetMap maps.",
        { t: "Four parts were prototyped, because they carry the most risk and the most value:", sub: [
          "sign-in that keeps the session, so a lost connection does not lock a ranger out",
          "offline logging of a weed with its species, photo and GPS location",
          "a site list ranked by urgency, with “Critical” and “Pending treatment” groups",
          "a public report form, where any report is reviewed by an administrator before it is listed"
        ] },
        "The prototype uses the six priority species from the existing Weed Action Plan, so the screens match how rangers already work."
      ] }
    ]
  },
  {
    type: "section", chapter: 6, cont: true,
    title: "How it was tested",
    heading: "How it was tested",
    blocks: [
      { p: "Each test below targets one of the needs in the user needs statement: working without coverage, keeping reliable records, and showing what to do first." },
      { table: {
        n: 3, title: "Prototype tests", cls: "tests", resultCol: 2,
        head: ["Test", "Method", "Result"],
        rows: [
          ["Offline logging", "Put the phone in flight mode, log a weed with a photo and location, then check it is saved on the device", "Successful"],
          ["Sync", "Turn the connection back on and check the record reaches the database once, with nothing lost or duplicated", "Successful"],
          ["Stay signed in", "Sign in, lose the connection, close and reopen the app", "Successful"],
          ["Priority order", "Add overdue and untreated sites and check the most urgent appear first", "Successful"],
          ["Ease of use", "Ask a new user to log a weed without help, and note the steps taken and any errors", "Achieved"]
        ]
      } },
      { h: "Testing limitations" },
      { p: "All tests were carried out locally by the team, simulating no coverage with flight mode, rather than by Rangers working on Country. The prototype has therefore not yet been tested in real field conditions, such as remote terrain, heat, long days without signal or the wet season." }
    ]
  },

  {
    type: "section", chapter: 6, cont: true, toc: true,
    title: "Prototype demonstration",
    heading: "Prototype demonstration",
    blocks: [
      { video: { n: 7, src: "video/demo_recording.mp4", title: "Demonstration of the Offline Ranger Prioritisation & Support App prototype", source: "Recording by the authors",
        aside: { tryapp: "https://edbertprounity.github.io/ranger-weed-app/", apk: "apk/ranger_app.apk" } } }
    ]
  },

  /* ---- 7. Implementation ---- */
  {
    type: "section", chapter: 7,
    title: "Implementation",
    tag: "IMPLEMENTATION",
    blocks: [
      { p: "<b>Deployment:</b> As the application works fully across different platforms, Rangers can simply install the application on their devices. Moreover, Lama Lama Rangers already record field data digitally with Fulcrum and I-Tracker (Engineers Without Borders Australia, 2026b; NESP Resilient Landscapes Hub, 2014), this means Ranger can easily adapt to this proposed technology. Training can therefore be short." },
      { p: "However, several testing such as GPS recording and photo capture capability on their devices must be tested, allowing the application to work reliably. The rollout follows three phase approach:" },
      { phases: [
        ["Build and internal testing", "GPS, photos and sync must be tested on any device that will be used in-field."],
        ["Ranger pilot trials in no-coverage zones", "A small group of Rangers uses this design during the dry season, which then their feedback will be consider for the next changes."],
        ["Full wet season operational deployment", "All Rangers use the app, and it is reviewed at the end of the first wet season."]
      ] },
      { p: "<b>Application distribution:</b> This application will be distributed as APK files for Android devices to avoid Google Play registration fee. As for Apple devices, Apple Developer Program enrolment may be required for distribution, which costs A$150, liable to exchange rates and taxes. The final distribution method depends on the devices used by the Rangers and Apple’s applicable distribution requirement (Apple, n.d.)." }
    ]
  },

  /* ---- 8. Costing analysis ---- */
  {
    type: "section", chapter: 8,
    title: "Costing Analysis",
    tag: "COSTING ANALYSIS",
    blocks: [
      { hours: {
        n: 4, title: "Estimated Development Time",
        rows: [
          ["Requirement and architecture", 8, 12],
          ["Flutter setup and UI", 15, 25],
          ["Local database", 15, 25],
          ["GPS and photo capture", 18, 28],
          ["Offline synchronization", 25, 40],
          ["Supabase backend and security", 18, 28],
          ["Reminders and prioritization", 12, 20],
          ["Testing and deployment", 20, 30],
          ["Documentation and training", 6, 10],
          ["Integration and contingency", 8, 12]
        ],
        note: "Estimated hours were generated with ChatGPT (OpenAI, 2026)."
      } }
    ]
  },
  {
    type: "section", chapter: 8, cont: true,
    title: "Estimated Costs",
    heading: "",
    blocks: [
      { p: "The hourly rate for a full stack developer is A$82 - A$131 (Second Talent, 2026). Given those data, this project is assumed to have taken 180 hours development time with A$100 hourly rate." },
      { table: {
        n: 5, title: "Estimated Costs", cls: "costs",
        head: ["Cost item", "Cost basis", "Estimated Cost"],
        rows: [
          ["App development", "A$100/hour x 180 hours", "A$18,000"],
          ["Supabase subscription", "A$40/month x 12 months", "A$480"],
          ["App distribution", "A$150/year x 1 year", "A$150"]
        ],
        total: ["Total Cost", "", "A$18,630"],
        note: "Development hours estimated with ChatGPT (OpenAI, 2026). Hourly rate from Second Talent (2026); database pricing from Supabase (n.d.), US$25 a month converted to about A$40; app distribution fee from Apple (n.d.)."
      } }
    ]
  },

  /* ---- 9. Other considerations ---- */
  {
    type: "section", chapter: 9,
    title: "Other considerations",
    tag: "CONSIDERATIONS",
    blocks: [
      { p: "The Lama Lama Rangers play an important role in protecting Country through weed management, wildlife conservation, and environmental monitoring (Yintjingga Aboriginal Corporation, n.d.-a). The team expects the community to welcome the app because it supports the Rangers’ existing work, uses their own priority species list, and does not change how they care for Country." },
      { consider: {
        name: "Social considerations",
        risk: "Rangers may feel the app replaces their knowledge, or that it monitors them, because each record carries the ranger’s name.",
        response: [
          "Rangers make every decision. The app records and organises what they find, and the species list comes from their own Weed Action Plan.",
          "Yintjingga and the rangers agree, and write down, how records will and will not be used.",
          "Training is ranger-led and done in the field, so the skills stay in the community."
        ]
      } }
    ]
  },
  {
    type: "section", chapter: 9, cont: true,
    title: "Cultural and environmental considerations",
    heading: "",
    blocks: [
      { consider: {
        name: "Cultural considerations",
        risk: "GPS records show exactly where rangers have been, which could expose culturally sensitive or restricted places. Information about Country could also end up outside community control.",
        response: [
          "Yintjingga holds the database account and decides who can see, use and share the data, in line with Indigenous data sovereignty principles.",
          "Role-based access limits who can view and edit records.",
          "Elders and Traditional Owners are consulted, and give consent, before any data is stored.",
          "Restricted areas can be left unrecorded, and the public report form never publishes locations.",
          "Only Rangers approves any images, names or language used in the app."
        ]
      } },
      { consider: {
        name: "Environmental considerations",
        risk: "Inaccurate GPS location or outdated week records could lead rangers to wrong sites or overlook new infestation",
        response: [
          "Allow Rangers to verify and update weed locations during field visits",
          "Include the date of each observation and reminders to recheck treated sites",
          "Keep Rangers responsible for confirming infestation locations and deciding treatment priorities."
        ]
      } }
    ]
  },
  {
    type: "section", chapter: 9, cont: true,
    title: "Maintenance and budget considerations",
    heading: "",
    blocks: [
      { consider: {
        name: "Maintenance considerations",
        risk: "Supabase subscription must be renewed over a certain period, without a clear delegation application may not work.",
        response: [
          "Assign someone internally to manage subscription."
        ]
      } },
      { consider: {
        name: "Budget considerations",
        risk: "Future changes are costly as development was valued at A$18,000, so paying a developer later for new features could be expensive.",
        response: [
          "The source code and documentation are handed over, so any developer can pick it up.",
          "The client builds one new feature at a time, in priority order, rather than commissioning everything at once.",
          "Extra work is funded through grants or volunteer support."
        ]
      } }
    ]
  },

  /* ---- 10. Recommendations ---- */
  {
    type: "section", chapter: 10,
    title: "Recommendations",
    tag: "RECOMMENDATIONS",
    blocks: [
      { p: "The current design works well, however, it can be improved by integrating some extensive technologies." },
      { recs: { start: 1, items: [
        { title: "AI Integration", text: "An on-device image-recognition model could identify weed species from photos without internet access, addressing the connectivity limits of the stand-alone AI option (Option 3). Model updates could be delivered with regular app updates.", fig: { n: 8, title: "[Artificial intelligence concept image]", src: "images/rec1-ai.png", source: "Adobe, n.d." } },
        { title: "Connectivity &amp; Sync", text: "Advanced conflict resolution algorithms and Bluetooth P2P mesh sharing for deep remote camps.", fig: { n: 9, title: "[Network Illustration]", src: "images/rec2-network.png", source: "Coeo Solutions, n.d." } }
      ] } }
    ]
  },
  {
    type: "section", chapter: 10, cont: true,
    title: "Recommendations (continued)",
    heading: "",
    blocks: [
      { recs: { start: 3, items: [
        { title: "Plug-ins", text: "High-resolution aerial drone integrated to the application to perform large area scanning and possibly treatment for specific weeds.", fig: { n: 10, title: "[DJI Air 3 drone]", src: "images/rec3-drone.png", source: "DJI, 2023" } },
        { title: "Executive Dashboard", text: "Centralized web analytics for Yintjingga Aboriginal Corporation grant tracking and environmental reporting.", fig: { n: 11, title: "[Executive Dashboard Illustration]", src: "images/rec4-dashboard.png", source: "Augmented Tech Labs, 2025" } }
      ] } }
    ]
  },

  /* ---- References: the list lives in REFERENCES below and flows across
     these two pages — page 1 takes as many as fit on screen ---- */
  { type: "references", part: 1, title: "References" },
  { type: "references", part: 2, cont: true, title: "References (continued)" },

  /* ---- Appendices (supporting documents) ---- */
  {
    type: "appendix", n: 1, title: "Appendix 1: Team Meeting Charter",
    file: "docs/team_charter.docx", label: "Team charter (Word document)"
  },
  {
    type: "appendix", n: 2, title: "Appendix 2: Team Meeting Minutes",
    file: "docs/team_meeting_minutes.docx", label: "Team meeting minutes (Word document)"
  },
  {
    type: "appendix", n: 3, title: "Appendix 3: Use of AI",
    blocks: [
      { shots: [
        ["AI was used to draft APA 7<sup>th</sup> style reference", ["images/ai1.jpg"]],
        ["AI was used to estimate needed development hours", ["images/ai2.jpg", "images/ai3.jpg"]],
        ["AI was used to generate the template for the website", ["images/ai4.jpg"]],
        ["AI was used to ask how to generate executive summary", ["images/ai5.jpg"]],
        ["AI was used to verify the quality of executive summary", ["images/ai6.jpg"]],
        ["AI was partially used to merge content among peers", ["images/ai7.jpg"]],
        ["AI was used to merge content to the website", ["images/ai8.jpg"]],
        ["AI was used to generate pictures as visualization", ["images/ai9.jpg"]],
        ["AI was used to check the content", ["images/ai10.jpg"]]
      ] }
    ]
  },
  {
    type: "declaration", title: "Teamwork Declaration",
    heading: "Team member contributions to Assessment Task 3 Website",
    rows: [
      ["Edbert Wisely", "Developed the implementation plan, costings, anticipated considerations, and recommendations. Led the website design and contributed to integrating and presenting the report content on the website."],
      ["Fatih Putranda Lesmana", "Developed the prototyping and testing section, including prototype functionality, testing results, and other considerations. Merged the members’ report sections into one file and contributed to reviewing the final report and website."],
      ["Glenny Veneesha", "Developed the problem definition, scope, and project management sections. Contributed ideas for the website body and participated in reviewing the report and website content."],
      ["Hangyeon Cho", "Developed the proposed solution section based on the team’s design process. Checked citations and references and contributed to reviewing the report’s consistency and accuracy."],
      ["Karell Yusdygo", "Developed the design process and decision-making section, including the alternative solutions, evaluation criteria, and weighted decision matrix. Reviewed the members’ sections and helped coordinate team meetings."],
      ["Yiming Bian", "Developed the introduction to Lama Lama Country and background research. Contributed ideas for the website interface and body and participated in reviewing the final report and website."]
    ]
  }
];


/* References (APA 7), in alphabetical order. */
const REFERENCES = [
  `Adobe. (n.d.). [Artificial intelligence concept image] [Image]. Psychology Today. ${link("https://www.psychologytoday.com/us/blog/finding-purpose/202510/can-ai-really-think")}`,
  `Apple. (n.d.). <i>Apple Developer Program</i>. Apple Developer. ${link("https://developer.apple.com/programs/")}`,
  `Augmented Tech Labs. (2025). [Executive dashboard examples for C-suite decision making] [Image]. ${link("https://www.augmentedtechlabs.com/blog/9-executive-dashboard-examples")}`,
  `Camburn, B., Viswanathan, V., Linsey, J., Anderson, D., Jensen, D., Crawford, R., Otto, K., & Wood, K. (2017). Design prototyping methods: State of the art in strategies, techniques, and guidelines. <i>Design Science, 3</i>, Article e13. ${link("https://doi.org/10.1017/dsj.2017.10")}`,
  `Coeo Solutions. (n.d.). [Network and connectivity issues] [Image]. ${link("https://www.coeosolutions.com/network-and-connectivity-issues")}`,
  `DJI. (2023). [DJI Air 3 drone] [Photograph]. UAV Coach. ${link("https://uavcoach.com/dji-air-3/")}`,
  `Engineers Without Borders Australia. (2026a). <i>About Tropical North Queensland</i>. EWB Challenge. ${link("https://ewbchallenge.org/challenge/port-stewart-lama-lama/about-tropical-north-queensland/")}`,
  `Engineers Without Borders Australia. (2026b). <i>Design Area 4 – Augmenting the ranger program: Weed management innovation</i>. EWB Challenge. ${link("https://ewbchallenge.org/challenge/port-stewart-lama-lama/design-area-4-augmenting-the-ranger-program/")}`,
  `Engineers Without Borders Australia. (2026c). <i>Design considerations</i>. EWB Challenge. ${link("https://ewbchallenge.org/challenge/port-stewart-lama-lama/design-considerations/")}`,
  `Google. (n.d.-a). <i>Development</i>. Flutter. ${link("https://flutter.dev/development")}`,
  `Google. (n.d.-b). <i>Offline-first support</i>. Flutter Docs. ${link("https://docs.flutter.dev/app-architecture/design-patterns/offline-first")}`,
  `NESP Resilient Landscapes Hub. (2014, December 10). <i>Monitoring Lama Lama wetlands</i>. ${link("https://nesplandscapes.edu.au/2014/12/10/monitoring-lama-lama-wetlands/")}`,
  `OpenAI. (2026). <i>ChatGPT</i> (October 25 version) [Large language model]. ${link("https://chatgpt.com/")}`,
  `Second Talent. (2026, October). <i>Cost to hire freelance developers in Australia</i>. ${link("https://www.secondtalent.com/cost-to-hire/australia/")}`,
  `Supabase. (n.d.). <i>Pricing &amp; fees</i>. ${link("https://supabase.com/pricing")}`,
  `Weeds Australia. (n.d.). <i>Monitoring</i>. ${link("https://weeds.org.au/manage/monitoring/")}`,
  `Yintjingga Aboriginal Corporation. (n.d.-a). <i>Lama Lama rangers</i>. Welcome to Lama Lama Country. ${link("https://www.lamalama.org.au/lama-lama-rangers/")}`,
  `Yintjingga Aboriginal Corporation. (n.d.-b). <i>Weed monitoring</i>. Welcome to Lama Lama Country. ${link("https://www.lamalama.org.au/weed-monitoring/")}`
];


/* =========================================================
   2. SET-UP
   ========================================================= */

if (pages.length % 2) pages.push({ type: "blank", title: "End paper" });

const PAGES = pages.length;
const SPREADS = PAGES / 2;
const COVER = "cover";
const BACK = "back";
const BLANK = "blank";

const $ = (selector) => document.querySelector(selector);
const stage = $("#stage");
const book = $("#book");
const spread = $("#spread");
const pageLeft = $("#page-left");
const pageRight = $("#page-right");
const leafLayer = $("#leaf-layer");
const bookmarks = $("#bookmarks");
const prevBtn = $("#prev");
const nextBtn = $("#next");
const prevLabel = $("#prev-label");
const nextLabel = $("#next-label");
const progressLabel = $("#progress-label");
const progressFill = $("#progress-fill");
const pageSelect = $("#page-select");
const cornerNext = $("#corner-next");
const cornerPrev = $("#corner-prev");
const edgeLeft = $("#edge-left");
const edgeRight = $("#edge-right");
const announcer = $("#announcer");
const foldout = $("#foldout");

const wideQuery = matchMedia("(min-width: 901px)");
const calmQuery = matchMedia("(prefers-reduced-motion: reduce)");

let mode = wideQuery.matches ? "spread" : "single";
let view = -1;          // spread mode: -1 cover, 0…SPREADS-1 spreads, SPREADS back cover
                        // single mode: -1 cover, 0…PAGES-1 pages,   PAGES back cover
let busy = false;
let queued = null;
let runTarget = null;
let epoch = 0;
let drag = null;
let swipe = null;

const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

const lastView = () => (mode === "spread" ? SPREADS : PAGES);
const itemAt = (v) => (v < 0 ? COVER : v >= PAGES ? BACK : v);
const leftOf = (v) => (v < 0 ? 0 : v >= SPREADS ? PAGES - 2 : v * 2);
const rightOf = (v) => {
  if (mode !== "spread") return itemAt(v);
  return v < 0 ? 1 : v >= SPREADS ? PAGES - 1 : v * 2 + 1;
};
const viewOfPage = (i) => (mode === "spread" ? Math.floor(i / 2) : i);

/* =========================================================
   3. PAGE MARKUP
   ========================================================= */

function pageHTML(item, side, light = false) {
  if (item === COVER) return coverHTML();
  if (item === BACK) return backCoverHTML();

  const hinge = side === "left" ? "hinge-right" : "hinge-left";
  if (item === BLANK || item === null || item === undefined) {
    return `<div class="page-sheet ${hinge}"></div>`;
  }

  const page = pages[item];
  if (page.type === "blank") return `<div class="page-sheet ${hinge} endpaper"></div>`;
  const num = pad(item + 1);
  const title = `<span>WEED MANAGEMENT <i>·</i> LAMA LAMA COUNTRY</span>`;
  const foot = `<span>WEED MANAGEMENT IN LAMA LAMA COUNTRY</span>`;
  const n = `<span class="num">${num}</span>`;
  const head = side === "left" ? n + title : title + n;
  const folio = side === "left" ? n + foot : foot + n;

  return `<div class="page-sheet ${hinge}" data-type="${page.type}">
    <header class="run-head">${head}</header>
    <div class="page-body">${light ? lightHTML(page, item) : bodyHTML(page, item)}</div>
    <footer class="folio">${folio}</footer>
  </div>`;
}

function coverHTML() {
  return `<div class="cover">
    <span class="cover-emblem" aria-hidden="true">✳</span>
    <span class="cover-kicker">A DESIGN REPORT</span>
    <p class="cover-title">Weed Management<br>in Lama Lama Country:<br>A Design Proposal</p>
    <p class="cover-sub">Weed management in Lama Lama Country</p>
    <span class="cover-rule"></span>
    <button type="button" class="cover-btn" data-action="open">OPEN THE BOOK <span aria-hidden="true">→</span></button>
    <span class="cover-foot">AN EWB CHALLENGE REPORT</span>
  </div>`;
}

function backCoverHTML() {
  return `<div class="cover cover-back">
    <span class="cover-emblem" aria-hidden="true">✳</span>
    <p class="cover-blurb">A design report on weed management in Lama Lama Country, made with respect for Country.</p>
    <span class="cover-rule"></span>
    <div class="cover-actions">
      <button type="button" class="cover-btn" data-action="reopen"><span aria-hidden="true">←</span> REOPEN</button>
      <button type="button" class="cover-btn" data-action="to-cover">BACK TO COVER</button>
    </div>
    <span class="cover-foot">AN EWB CHALLENGE · DESIGN PROPOSAL</span>
  </div>`;
}

function lightHTML(page, index) {
  return `<div class="light">
    <span class="light-num">${pad(index + 1)}</span>
    <span class="light-title">${page.title}</span>
    <span class="light-lines">${"<i></i>".repeat(7)}</span>
  </div>`;
}

function promptHTML(text) {
  return `<div class="writing-prompt"><span>YOUR NOTES GO HERE</span><p>${text}</p></div>`;
}

function bodyHTML(page, index) {
  switch (page.type) {
    case "ack":
      return `<div class="ack">
        <h2 class="page-title">Acknowledgement of Country</h2>
        <p class="lead">We acknowledge and pay respect to the Traditional Owners of the land on which we meet; the Gadigal people of the Eora Nation. It is upon their ancestral lands that UTS stands.</p>
        <p class="lead">We also pay respect to the Elders both past and present, acknowledging them as the traditional custodians of knowledge for this land.</p>
      </div>`;

    case "title":
      return `<div class="opening">
        <h1 class="opening-title">Weed Management<br>in Lama Lama Country:<br>A Design Proposal</h1>
        <span class="rule" aria-hidden="true"></span>
        <p class="edition">ASSESSMENT TASK 3: TEAM WEBSITE <i>·</i> 31265 COMMUNICATION FOR IT PROFESSIONALS</p>
        <dl class="credits">
          <div><dt>GROUP NAME</dt><dd>${page.team}</dd></div>
          <div><dt>TEAM MEMBERS</dt><dd><ul class="team-members">${page.members.map((member) => `<li>${member}</li>`).join("")}</ul></dd></div>
          <div><dt>TUTORIAL NUMBER AND ZONE</dt><dd>${page.tutorial}</dd></div>
          <div><dt>DESIGN AREA</dt><dd>${page.designArea}</dd></div>
          <div><dt>PROJECT OPPORTUNITY</dt><dd>${page.opportunity}</dd></div>
          <div><dt>LINK OF WEBSITE</dt><dd><a href="${page.site}" target="_blank" rel="noopener">${page.site.replace("https://", "").replace(/\/$/, "")}</a></dd></div>
        </dl>
      </div>`;

    case "contents":
      return `<div class="contents">
        <span class="kicker">CONTENTS</span>
        <h2 class="page-title">Inside this field book</h2>
        <ol class="toc">${pages
          .map((entry, i) => {
            if (["ack", "title", "contents"].includes(entry.type) || entry.type === "blank" || (entry.cont && !entry.toc)) return "";
            const mark = entry.type === "appendix" ? `A${entry.n}` : entry.cont ? "" : entry.chapter ? pad(entry.chapter) : "✳";
            return `<li><button type="button" data-goto="${i}">
              <span class="toc-label"><b>${mark}</b>${entry.title}</span>
              <span class="toc-dots" aria-hidden="true"></span>
              <span class="toc-num">${pad(i + 1)}</span>
            </button></li>`;
          })
          .join("")}</ol>
        <div class="read-key" aria-label="How to read this book">
          <span class="read-key-h">How to read this book</span>
          <span><b aria-hidden="true">☝</b>Tap anything marked “Tap”</span>
          <span><b aria-hidden="true">◢</b>Drag a page corner to turn</span>
          <span><b aria-hidden="true">↓</b>Scroll long pages</span>
          <span><b aria-hidden="true">← →</b>Arrow keys turn pages</span>
        </div>
      </div>`;

    case "chapter":
      return `<div class="chapter${page.details ? " has-map" : ""}">
        <div class="page-copy">
          ${page.details ? "" : `<span class="kicker">CHAPTER ${pad(page.chapter)} <i>·</i> ${page.tag}</span>`}
          <h2 class="page-title">${page.title}</h2>
          ${page.details ? `<div class="project-details">
            <ul class="design-details">
              <li>Design Area: ${page.details.designArea}</li>
              <li>Project Opportunity: ${page.details.designOpportunities}</li>
            </ul>
            <section class="importance">
              <h3>Why is this important?</h3>
              <p>${page.details.importance}</p>
            </section>
          </div>` : `<p class="lead">${page.lead}</p>${promptHTML(page.prompt)}`}
        </div>
        ${page.details ? foldedMapHTML() : `<figure class="page-art" aria-hidden="true">
          <span class="art-orbit"></span>
          <span class="art-seed">r</span>
          <figcaption class="art-caption">${page.art.toUpperCase()}</figcaption>
        </figure>`}
      </div>`;

    case "section":
      return `<div class="section${page.cls ? " " + page.cls : ""}">
        <span class="kicker">${page.kicker ? (page.cont ? page.kicker + " <i>·</i> CONTINUED" : page.kicker) : `CHAPTER ${pad(page.chapter)} <i>·</i> ${page.cont ? "CONTINUED" : page.tag}`}</span>
        ${page.heading === "" ? "" : `<h2 class="page-title${page.long || page.title.length > 40 ? " is-long" : page.cont ? " is-sub" : ""}">${page.heading || page.title}</h2>`}
        ${page.blocks.map(blockHTML).join("")}
      </div>`;

    case "matrix":
      return `<div class="section">
        <span class="kicker">CHAPTER ${pad(page.chapter)} <i>·</i> CONTINUED</span>
        <h2 class="page-title is-sub">${page.title}</h2>
        <p class="sec-p">Each option was scored against the five weighted criteria. Pick a criterion to focus on it, or build the score to watch each total add up.</p>
        ${matrixHTML()}
      </div>`;

    case "matrix-detail":
      return `<div class="section">
        <span class="kicker">CHAPTER ${pad(page.chapter)} <i>·</i> CONTINUED</span>
        ${detailHTML()}
      </div>`;

    case "podium":
      return `<div class="section">
        <span class="kicker">CHAPTER ${pad(page.chapter)} <i>·</i> CONTINUED</span>
        <h2 class="page-title is-sub">The Selected Solution is…</h2>
        ${podiumHTML()}
      </div>`;

    case "why":
      return `<div class="section">
        <span class="kicker">CHAPTER ${pad(page.chapter)} <i>·</i> CONTINUED</span>
        <h2 class="page-title is-sub">${page.title}</h2>

        ${whyHTML()}
      </div>`;

    case "declaration":
      return `<div class="section declaration">
        <span class="kicker">TEAMWORK DECLARATION</span>
        <h2 class="page-title is-sub">${page.heading}</h2>
        <div class="table-scroll"><table class="decl-table">
          <thead><tr><th scope="col">Group Member Name</th><th scope="col">Project Contributions</th></tr></thead>
          <tbody>${page.rows.map(([n, c]) => `<tr><th scope="row">${n}</th><td>${c}</td></tr>`).join("")}</tbody>
        </table></div>
      </div>`;

    case "appendix": {
      if (page.empty) {
        return `<div class="section appendix">
          <span class="kicker">SUPPORTING DOCUMENTS</span>
          <h2 class="page-title is-sub">${page.title}</h2>
          <div class="appendix-empty">${page.empty}</div>
        </div>`;
      }
      if (page.blocks) {
        return `<div class="section appendix">
          <span class="kicker">SUPPORTING DOCUMENTS</span>
          <h2 class="page-title is-sub">${page.title}</h2>
          ${page.blocks.map(blockHTML).join("")}
        </div>`;
      }
      const name = page.file.split("/").pop();
      return `<div class="section appendix">
        <span class="kicker">SUPPORTING DOCUMENTS</span>
        <h2 class="page-title is-sub">${page.title}</h2>
        ${page.lead ? `<p class="sec-p">${page.lead}</p>` : ""}
        <a class="doc-card" href="${page.file}" download>
          <span class="doc-ico" aria-hidden="true">DOCX</span>
          <span class="doc-text"><b>${page.label}</b><span>${name}</span></span>
          <span class="doc-dl"><span aria-hidden="true">↓</span> Download</span>
        </a>
      </div>`;
    }

    case "references": {
      const n = refProbe ? REFERENCES.length : refSplit();
      const items = page.part === 1 ? REFERENCES.slice(0, n) : REFERENCES.slice(n);
      return `<div class="refs${page.cont ? " is-cont" : ""}">
        ${page.cont ? "" : `<h2 class="page-title refs-title">${page.title}</h2>`}
        <ul class="ref-list">${items.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>`;
    }

    case "end":
      return `<div class="ending">
        <span class="emblem" aria-hidden="true">✳</span>
        <h2 class="page-title">${page.title}</h2>
        <p class="lead">${page.lead}</p>
        <span class="rule" aria-hidden="true"></span>
        <button type="button" class="ink-btn" data-action="close">CLOSE THE BOOK <span aria-hidden="true">→</span></button>
      </div>`;

    default:
      return `<div class="notes-lines">${"<i></i>".repeat(12)}</div>`;
  }
}

/* building blocks for "section" pages */
function blockHTML(b) {
  if (b.h) return `<h3 class="sec-h">${b.h}</h3>`;
  if (b.p) return `<p class="sec-p">${b.p}</p>`;
  if (b.steps) {
    return `<ol class="steps">${b.steps
      .map(([name, text], i) => `<li><span class="step-no">${i + 1}</span><span class="step-text"><b>${name}</b>${text}</span></li>`)
      .join("")}</ol>`;
  }
  if (b.cards) {
    return `<div class="cards">${b.cards
      .map(([name, text], i) => `<article class="card"><span class="card-no">${pad(i + 1)}</span><h4>${name}</h4><p>${text}</p></article>`)
      .join("")}</div>`;
  }
  if (b.folders) {
    return `<div class="tap-row"><p class="tap-hint"><span class="tap-ico" aria-hidden="true">☝</span>Tap a folder to open it</p><span class="tap-count" data-folder-count>1 of ${b.folders.length} opened</span></div>
    <div class="folders" data-widget="folders">${b.folders
      .map(([name, text], i) => `<section class="folder${i === 0 ? " is-open is-seen" : ""}" style="--i:${i}">
        <button type="button" class="folder-tab" data-folder aria-expanded="${i === 0}">
          <span class="folder-no">${pad(i + 1)}</span><span class="folder-name">${name}</span>
        </button>
        <div class="folder-body">
          <span class="folder-no">${pad(i + 1)}</span>
          <h4>${name}</h4>
          <p>${text}</p>
        </div>
      </section>`)
      .join("")}</div>`;
  }
  if (b.tryapp) {
    return `<div class="try-app">
      <span class="try-qr">${QR_SVG}</span>
      <div class="try-text">
        <h4><span class="kicker">TRY THE PROTOTYPE</span>Ranger App</h4>
        <p>Scan with a phone and add it to the home screen, or open it in your browser. Android users can also install the app file.</p>
        <span class="try-actions">
          <a class="try-btn" href="${b.tryapp}" target="_blank" rel="noopener">Open the prototype <span aria-hidden="true">↗</span></a>
          ${b.apk ? `<a class="try-btn is-alt" href="${b.apk}" download>Download APK (Android) <span aria-hidden="true">↓</span></a>` : ""}
        </span>
      </div>
    </div>`;
  }
  if (b.quote) {
    return `<blockquote class="statement"><p>${b.quote}</p>${b.cite ? `<cite>${b.cite}</cite>` : ""}</blockquote>`;
  }
  if (b.options) {
    return `<ol class="opts">${b.options
      .map(([name, text, fig], i) => `<li>
        <span class="opt-no">${i + 1}</span>
        <div><h4>${name}</h4><p>${text}<span class="opt-fig">See Figure ${fig}</span></p></div>
      </li>`)
      .join("")}</ol>`;
  }
  if (b.figures) {
    return `<div class="figs">${b.figures
      .map((f) => `<figure class="apa-fig">
        <figcaption><b>Figure ${f.n}</b><i>${f.title}</i></figcaption>
        <img src="${f.src}" alt="${f.title}" loading="lazy" decoding="async">
        <span class="fig-src">(Source: ${f.source})</span>
      </figure>`)
      .join("")}</div>`;
  }
  if (b.criteria) {
    // bars are drawn against the full 100%, so 35% fills about a third
    const total = b.criteria.reduce((sum, c) => sum + c[1], 0);
    return `<ul class="criteria">${b.criteria
      .map(([name, weight, text]) => `<li>
        <span class="crit-top"><b>${name}</b><span>${weight}%</span></span>
        <span class="crit-bar" aria-hidden="true"><i style="width:${weight}%"></i></span>
        <p>${text}</p>
      </li>`)
      .join("")}</ul>
      <span class="crit-scale" aria-hidden="true"><span>0%</span><span>Weights total ${total}%</span><span>100%</span></span>`;
  }
  if (b.optfig) {
    const o = b.optfig;
    return `<div class="optfig">
      <h4 class="opt-h"><span class="opt-no">${o.n}</span><span>${o.name}</span></h4>
      <p class="sec-p">${o.text}</p>
      <figure class="apa-fig fig-inline">
        <figcaption><b>Figure ${o.n}</b><i>${o.title}</i></figcaption>
        <img src="${o.src}" alt="${o.title}" loading="lazy" decoding="async">
        <span class="fig-src">(Source: ${o.source})</span>
      </figure>
    </div>`;
  }
  if (b.scale) {
    return `<ul class="scale">${ratingScale
      .map((r, i) => `<li><span class="rate rate-${["full", "most", "part", "weak"][i]}">${r.label}</span><b>${r.range}</b><p>${r.text}</p></li>`)
      .join("")}</ul>`;
  }
  if (b.flow) {
    const start = b.start || 1;
    return `<ol class="flow" start="${start}">${b.flow
      .map(([label, text], i) => `<li><span class="flow-no">${start + i}</span><div><b>${label}</b><p>${text}</p></div></li>`)
      .join("")}</ol>`;
  }
  if (b.pillars) {
    return `<ul class="pillars">${b.pillars.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join("")}</ul>`;
  }
  if (b.bullets) {
    const item = (x) => (typeof x === "string" ? `<li>${x}</li>` : `<li>${x.t}<ul>${x.sub.map((s) => `<li>${s}</li>`).join("")}</ul></li>`);
    return `<ul class="bullets">${b.bullets.map(item).join("")}</ul>`;
  }
  if (b.recs) {
    const r = b.recs;
    return `<ol class="recs" start="${r.start}">${r.items
      .map((it, i) => `<li>
        <p class="rec-text"><span class="rec-no">${r.start + i}</span><span><b>${it.title}:</b> <i>${it.text}</i></span></p>
        <figure class="apa-fig rec-fig">
          <figcaption><b>Figure ${it.fig.n}</b><i>${it.fig.title}</i></figcaption>
          <img src="${it.fig.src}" alt="${it.fig.title}" loading="lazy" decoding="async">
          <span class="fig-src">(${it.fig.source})</span>
        </figure>
      </li>`)
      .join("")}</ol>`;
  }
  if (b.minutes) {
    const m = b.minutes;
    const actions = (rows) => `<div class="table-scroll"><table class="min-actions">
        <thead><tr><th scope="col">Action Item</th><th scope="col">Responsible Person</th><th scope="col">Due Date</th></tr></thead>
        <tbody>${rows.map(([a, p, d]) => `<tr><td>${a}</td><td>${p}</td><td>${d}</td></tr>`).join("")}</tbody>
      </table></div>`;
    return `<section class="minutes">
      <h3 class="sec-h">${m.title}</h3>
      <p class="min-len">${m.length}</p>
      <dl class="min-info">${m.info.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      ${m.caption ? `<p class="apa-note">${m.caption}</p>` : ""}
      <h4 class="min-h">Agenda</h4>
      <ul class="bullets">${m.agenda.map((a) => `<li>${a}</li>`).join("")}</ul>
      ${m.actionsTitle ? `<h4 class="min-h">${m.actionsTitle}</h4>` : ""}
      ${actions(m.actions)}
      ${m.other ? `<h4 class="min-h">Other items</h4><ul class="bullets">${m.other.map((a) => `<li>${a}</li>`).join("")}</ul>` : ""}
    </section>`;
  }
  if (b.shots) {
    return `<div class="shots">${b.shots
      .map(([cap, srcs]) => `<figure class="shot">
        <figcaption><i>${cap}</i></figcaption>
        <span class="shot-imgs">${srcs.map((src) => `<img src="${src}" alt="Screenshot: ${cap.replace(/<[^>]+>/g, "")}" loading="lazy" decoding="async">`).join("")}</span>
      </figure>`)
      .join("")}</div>`;
  }
  if (b.table) {
    const t = b.table;
    const cell = (v, i) => (i === t.resultCol ? `<td><span class="result">${v}</span></td>` : `<td>${v}</td>`);
    return `<div class="apa-table ${t.cls || ""}">
      <p class="apa-label"><b>Table ${t.n}</b><i>${t.title}</i></p>
      <div class="table-scroll"><table>
        <thead><tr>${t.head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
        <tbody>${t.rows.map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((v, i) => cell(v, i + 1)).join("")}</tr>`).join("")}</tbody>
        ${t.total ? `<tfoot><tr><th scope="row">${t.total[0]}</th>${t.total.slice(1).map((v) => `<td>${v}</td>`).join("")}</tr></tfoot>` : ""}
      </table></div>
      ${t.note ? `<p class="apa-note"><i>Note.</i> ${t.note}</p>` : ""}
    </div>`;
  }
  if (b.hours) {
    const h = b.hours;
    const max = Math.max(...h.rows.map((r) => r[2]));
    const lo = h.rows.reduce((s, r) => s + r[1], 0);
    const hi = h.rows.reduce((s, r) => s + r[2], 0);
    return `<div class="apa-table hours">
      <p class="apa-label"><b>Table ${h.n}</b><i>${h.title}</i></p>
      <div class="table-scroll"><table>
        <thead><tr><th scope="col">Development Task</th><th scope="col">Estimated Hours</th><th scope="col" class="hr-bar-h"><span class="visually-hidden">Range</span></th></tr></thead>
        <tbody>${h.rows
          .map(([task, a, z]) => `<tr><th scope="row">${task}</th><td>${a}–${z}</td>
            <td class="hr-bar" aria-hidden="true"><span><i style="left:${(a / max) * 100}%;width:${((z - a) / max) * 100}%"></i><em style="width:${(a / max) * 100}%"></em></span></td></tr>`)
          .join("")}</tbody>
        <tfoot><tr><th scope="row">Total</th><td>${lo}–${hi} hours</td><td></td></tr></tfoot>
      </table></div>
      ${h.note ? `<p class="apa-note"><i>Note.</i> ${h.note}</p>` : ""}
    </div>`;
  }
  if (b.consider) {
    const c = b.consider;
    return `<article class="consider">
      <h3>${c.name}</h3>
      <p class="c-risk"><span>Risk</span>${c.risk}</p>
      <div class="c-resp"><span>Response</span><ul>${c.response.map((r) => `<li>${r}</li>`).join("")}</ul></div>
    </article>`;
  }
  if (b.stats) {
    return `<div class="stats">${b.stats.map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("")}</div>`;
  }
  if (b.risks) {
    return `<p class="risks-h">Risks and responses</p><ul class="risks">${b.risks
      .map(([r, a, resp]) => `<li><b>${r}:</b> ${a}${resp ? `<span class="r-resp">Response</span><ul>${resp.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}</li>`)
      .join("")}</ul>`;
  }
  if (b.phases) {
    return `<ol class="phases">${b.phases
      .map((t, i) => {
        const [name, desc] = Array.isArray(t) ? t : [t, ""];
        return `<li><span class="ph-no">Phase ${i + 1}</span><span class="ph-t">${name}</span>${desc ? `<span class="ph-d">${desc}</span>` : ""}</li>`;
      })
      .join("")}</ol>`;
  }
  if (b.video) {
    const v = b.video;
    return `<figure class="apa-fig video-fig is-vertical" data-video>
      <figcaption><b>Figure ${v.n}</b><i>${v.title}</i></figcaption>
      <div class="video-layout">
        <div class="video-phone">
          <div class="video-frame">
            <video controls playsinline preload="metadata" aria-label="${v.title}">
              <source src="${v.src}" type="video/mp4">
              <p class="video-fallback">This browser can’t play the video here. <a href="${v.src}" download>Download it</a> to watch.</p>
            </video>
            <p class="video-missing">The video can’t be shown here. The file may not be uploaded yet, or this browser can’t play it. Use the download link.</p>
          </div>
        </div>
        <div class="video-side">
          <span class="fig-src">(Source: ${v.source})</span>
          <a class="dl-link" href="${v.src}" download><span aria-hidden="true">↓</span> Download the video (MP4)</a>
          ${v.aside ? blockHTML(v.aside) : ""}
        </div>
      </div>
    </figure>`;
  }
  if (b.todo) {
    return `<p class="todo"><b>NOTE FOR THE TEAM</b>${b.todo}</p>`;
  }
  return "";
}

/* =========================================================
   3b. INTERACTIVE PAGES — decision matrix, podium, app walkthrough
   ========================================================= */

const ui = { crit: "all", view: "bars", need: "detect", feature: 0 };

const totalOf = (s) => criteria.reduce((sum, c) => sum + s.scores[c.key], 0);
const ranked = () => [...solutions].sort((a, b) => totalOf(b) - totalOf(a));

function ratingOf(score, max) {
  const pct = (score / max) * 100;
  if (pct >= 90) return { label: "Fully meets", cls: "full" };
  if (pct >= 70) return { label: "Mostly meets", cls: "most" };
  if (pct >= 50) return { label: "Partly meets", cls: "part" };
  return { label: "Weak", cls: "weak" };
}

function scaleKeyHTML() {
  const cls = ["full", "most", "part", "weak"];
  return `<div class="scale-key"><span class="scale-key-h">Rating scale</span><ul>${ratingScale
    .map((r, i) => `<li><span class="rate rate-${cls[i]}">${r.label}</span><b>${r.range}</b><span>${r.text}</span></li>`)
    .join("")}</ul></div>`;
}

const MATRIX_NOTE = `<p class="apa-note"><i>Note.</i> Criteria partly adapted from EWB (2026b). All scores are the team’s own.</p>`;

function chipsHTML() {
  const chip = (key, label, max) =>
    `<button type="button" class="chip" data-dm-crit="${key}" aria-pressed="${ui.crit === key}">${label}${max ? `<span>${max}</span>` : ""}</button>`;
  return `<p class="tap-hint"><span class="tap-ico" aria-hidden="true">☝</span>Tap a criterion to focus on it</p><div class="chips" role="group" aria-label="Show criterion">
    ${chip("all", "All criteria")}${criteria.map((c) => chip(c.key, c.name, c.max)).join("")}
  </div>`;
}

function matrixHTML() {
  const list = ranked();
  const bars = ui.view === "bars";
  return `<div class="dm" data-widget="matrix" data-crit="${ui.crit}">
    ${chipsHTML()}
    <div class="dm-tools">
      ${bars ? `<button type="button" class="dm-tool" data-dm-build><span aria-hidden="true">▶</span> Build the score</button>` : ""}
      <button type="button" class="dm-tool" data-dm-view="${bars ? "table" : "bars"}">${bars ? "Table view" : "Bar view"}</button>
    </div>
    <p class="apa-label"><b>Table 1</b><i>Weighted Decision Matrix</i></p>
    ${bars ? barsHTML(list) : tableHTML(list)}
    ${MATRIX_NOTE}
  </div>`;
}

function barsHTML(list) {
  return `<div class="dm-head" aria-hidden="true">
      <span class="dm-cols">${criteria.map((c) => `<span style="flex:${c.max}" class="${ui.crit === c.key ? "on" : ""}">${c.short}</span>`).join("")}</span>
      <span class="dm-total-h">Total</span>
    </div>
    <ol class="dm-rows">${list
      .map((s, oi) => `<li class="dm-row${s.selected ? " is-top" : ""}">
        <span class="dm-name"><b>${s.name}</b>${s.selected ? `<span class="dm-badge">Highest</span>` : ""}</span>
        <span class="dm-line">
          <span class="dm-bar" role="img" aria-label="${s.name}: ${criteria.map((c) => `${c.name} ${s.scores[c.key]} of ${c.max}`).join(", ")}">
            ${criteria
              .map((c, ci) => `<span class="dm-seg${ui.crit === c.key ? " on" : ""}" style="flex:${c.max}">
                <i class="dm-fill" style="width:${((s.scores[c.key] / c.max) * 100).toFixed(1)}%;--ci:${ci};--oi:${oi}"></i>
                ${ui.crit === c.key ? `<em>${s.scores[c.key]}/${c.max}</em>` : ""}
              </span>`)
              .join("")}
          </span>
          <span class="dm-total"><b data-total="${totalOf(s)}">${totalOf(s)}</b><small>/100</small></span>
        </span>
      </li>`)
      .join("")}</ol>`;
}

function tableHTML(list) {
  return `<div class="dm-table-wrap"><table class="dm-table">
    <thead><tr><th scope="col">Solution</th>${criteria
      .map((c) => `<th scope="col" class="${ui.crit === c.key ? "on" : ""}">${c.name} (${c.max})</th>`)
      .join("")}<th scope="col">Total (100)</th></tr></thead>
    <tbody>${list
      .map((s) => `<tr class="${s.selected ? "is-top" : ""}"><th scope="row">${s.name}</th>${criteria
        .map((c) => `<td class="${ui.crit === c.key ? "on" : ""}">${s.scores[c.key]}</td>`)
        .join("")}<td><b>${totalOf(s)}</b></td></tr>`)
      .join("")}</tbody>
  </table></div>`;
}

function detailHTML() {
  const c = criteria.find((x) => x.key === ui.crit);
  const list = ranked();
  if (!c) {
    return `<div class="dm-detail" data-widget="detail">
      <h2 class="page-title is-sub">Scores explained</h2>
      ${chipsHTML()}
      ${scaleKeyHTML()}
      <h3 class="sec-h">All criteria</h3>
      <p class="sec-p">Each option’s rating on every criterion. Pick a criterion above to read the reasons.</p>
      <ul class="overview">${list
        .map((s) => `<li class="${s.selected ? "is-top" : ""}">
          <span class="ov-top"><b>${s.name}</b><span class="ov-total">${totalOf(s)}<small>/100</small></span></span>
          <span class="ov-chips">${criteria
            .map((k) => {
              const r = ratingOf(s.scores[k.key], k.max);
              return `<span class="rate rate-${r.cls}" title="${k.name}: ${r.label}">${k.short} ${s.scores[k.key]}/${k.max}</span>`;
            })
            .join("")}</span>
        </li>`)
        .join("")}</ul>
      ${MATRIX_NOTE}
    </div>`;
  }
  return `<div class="dm-detail" data-widget="detail">
    <h2 class="page-title is-sub">Scores explained</h2>
    ${chipsHTML()}
    ${scaleKeyHTML()}
    <h3 class="sec-h">${c.name} · ${c.max} of 100 points</h3>
    <p class="sec-p">Rating and reason for each option:</p>
    <ul class="reasons">${list
      .map((s) => {
        const score = s.scores[c.key];
        const r = ratingOf(score, c.max);
        return `<li class="${s.selected ? "is-top" : ""}">
          <span class="r-top"><b>${s.name}</b><span class="rate rate-${r.cls}">${r.label}</span><span class="r-score">${score} / ${c.max}</span></span>
          <p>${s.reasons[c.key]}</p>
        </li>`;
      })
      .join("")}</ul>
    ${MATRIX_NOTE}
  </div>`;
}

/* ---------- podium ---------- */

function confettiHTML() {
  const colors = ["#b8765c", "#596d55", "#e1c49e", "#7d9a8e", "#d79a78", "#28382f"];
  let html = "";
  for (let i = 0; i < 34; i += 1) {
    const r = (n) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
    const a = Math.abs(r(1)), b = Math.abs(r(2)), c = Math.abs(r(3));
    html += `<i style="--x:${((a - 0.5) * 300).toFixed(0)}px;--y:${(70 + b * 130).toFixed(0)}px;--r:${(c * 720 - 360).toFixed(0)}deg;--d:${(b * 0.35).toFixed(2)}s;--c:${colors[i % colors.length]};--w:${i % 3 ? 7 : 5}px;--h:${i % 2 ? 11 : 6}px"></i>`;
  }
  return html;
}

function podiumHTML() {
  const list = ranked();
  const order = [list[1], list[0], list[2], list[3]].filter(Boolean);
  const heights = { 1: 74, 2: 56, 3: 49, 4: 42 };
  const delays = { 4: 0.1, 3: 0.45, 2: 0.8, 1: 1.55 };
  const winner = list[0];
  return `<div class="podium-wrap" data-widget="podium">
    <div class="tap-row"><p class="tap-hint"><span class="tap-ico" aria-hidden="true">☝</span>Tap a column to turn it over</p><span class="tap-count" data-pod-count>0 of ${list.length} viewed</span></div>
    <div class="podium-bar">
      <p class="podium-winner"><span>Selected:</span> ${winner.name} · ${totalOf(winner)}/100</p>
      <button type="button" class="dm-tool" data-replay><span aria-hidden="true">↻</span> Replay reveal</button>
    </div>
    <div class="podium">
      <span class="spotlight" aria-hidden="true"></span>
      <span class="confetti" aria-hidden="true">${confettiHTML()}</span>
      ${order
        .map((s) => {
          const rank = list.indexOf(s) + 1;
          return `<div class="pslot${rank === 1 ? " is-first" : ""}" style="--h:${heights[rank]}%;--delay:${delays[rank]}s">
            <button type="button" class="pcol" data-pick="${s.id}" aria-pressed="false"
                aria-label="Rank ${rank}: ${s.name}, ${totalOf(s)} out of 100. Turn over to see the score by criterion.">
              <span class="pcol-inner">
                <span class="pcol-front">
                  <span class="pcol-rank">${rank}</span>
                  <span class="pcol-name">${s.short}</span>
                  ${rank === 1 ? `<span class="pcol-chip">★ Selected</span>` : ""}
                  <span class="pcol-score"><b>${totalOf(s)}</b><small>/100</small></span>
                  <span class="pcol-tap">↻ Tap to see scores</span>
                </span>
                <span class="pcol-back">
                  <span class="pb-rank">#${rank} · ${totalOf(s)}/100</span>
                  <span class="pb-name">${s.name}</span>
                  <span class="pb-label${s.selected ? " is-yes" : ""}">Score by criterion</span>
                  <span class="pb-list">${criteria.map((k) => `<span>${k.name}: ${s.scores[k.key]}/${k.max}</span>`).join("")}</span>
                  <span class="pb-back">↻ Tap to turn back</span>
                </span>
              </span>
            </button>
          </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

/* make the podium tall enough for the turned card's text, so nothing is cut off */
function fitPodium(pod, slot, share) {
  pod.style.height = "";
  if (!slot) return;
  const base = pod.getBoundingClientRect().height;
  const gaps = parseFloat(getComputedStyle(pod).columnGap) || 0;
  const n = pod.querySelectorAll(".pslot").length;
  const width = (pod.clientWidth - gaps * (n - 1)) * share;
  const probe = slot.querySelector(".pcol-back").cloneNode(true);
  probe.style.cssText = `position:absolute;visibility:hidden;top:0;left:0;right:auto;bottom:auto;width:${width}px;height:auto;transform:none;`;
  pod.append(probe);
  const need = probe.scrollHeight + 4;
  probe.remove();
  if (need > base) pod.style.height = `${Math.ceil(need)}px`;
}

function flipColumn(btn, demo = false) {
  const pod = btn.closest(".podium");
  if (!demo) {
    const wrap = pod.closest(".podium-wrap");
    wrap.classList.add("was-used");
    clearTimeout(wrap._demo);
    btn.closest(".pslot").classList.add("is-seen");
    const seen = pod.querySelectorAll(".pslot.is-seen").length;
    const total = pod.querySelectorAll(".pslot").length;
    const count = wrap.querySelector("[data-pod-count]");
    if (count) {
      count.textContent = seen === total ? `All ${total} viewed ✓` : `${seen} of ${total} viewed`;
      count.classList.toggle("is-done", seen === total);
    }
  }
  const slots = [...pod.querySelectorAll(".pslot")];
  const slot = btn.closest(".pslot");
  const was = slot.classList.contains("is-flipped");
  slots.forEach((x) => {
    x.classList.remove("is-flipped");
    x.querySelector(".pcol").setAttribute("aria-pressed", "false");
  });
  if (!was) {
    slot.classList.add("is-flipped");
    btn.setAttribute("aria-pressed", "true");
  }
  const k = slots.indexOf(slot);
  pod.classList.toggle("has-flip", !was);
  const fr = slots.map((_, i) => (i === k ? 2.4 : 0.9));
  pod.style.gridTemplateColumns = was ? "" : fr.map((f) => `minmax(0, ${f}fr)`).join(" ");
  fitPodium(pod, was ? null : slot, fr[k] / fr.reduce((a, b) => a + b, 0));
}

/* ---------- app walkthrough ---------- */

function whyHTML() {
  const need = appNeeds.find((n) => n.key === ui.need) || appNeeds[0];
  const feature = need.features[ui.feature] || need.features[0];
  const screen = appScreens[feature.screen];
  return `<div class="why" data-widget="why">
    <p class="tap-hint"><span class="tap-ico" aria-hidden="true">☝</span>Tap a need, then a feature, to highlight it on the screen</p>
    <div class="needs" role="tablist" aria-label="User needs">${appNeeds
      .map((n) => `<button type="button" role="tab" class="need" data-need="${n.key}" aria-selected="${n.key === need.key}">
        <b>${n.name}</b><span>${n.need}</span>
      </button>`)
      .join("")}</div>
    <div class="why-body">
      <figure class="phone-fig">
        <figcaption><b>Figure ${screen.fig}</b><i>Offline Ranger Prioritisation &amp; Support App: ${screen.name}</i></figcaption>
        <span class="phone">
          <span class="phone-screen">
            <img src="${screen.src}" alt="Offline Ranger Prioritisation & Support App: ${screen.name}" decoding="async">
            ${feature.boxes
              .map(([l, t, r, b]) => `<span class="hl" style="left:${l}%;top:${t}%;width:${r - l}%;height:${b - t}%"></span>`)
              .join("")}
          </span>
        </span>
        <span class="fig-src">(Screenshot by the authors)</span>
      </figure>
      <div class="feats">
        <span class="feats-k">RANGERS NEED TO…</span>
        <p class="feats-need">${need.need.charAt(0).toLowerCase() + need.need.slice(1)}.</p>
        <ol class="feat-list">${need.features
          .map((f, i) => `<li><button type="button" class="feat" data-feature="${i}" aria-pressed="${f === feature}">
            <span class="feat-no">${i + 1}</span>
            <span class="feat-body">
              <b>${f.title}</b>
              <span class="feat-text">${f.text}</span>
              <span class="feat-tags"><span class="tag tag-screen">${appScreens[f.screen].name}</span><span class="tag">${f.tag}</span></span>
            </span>
          </button></li>`)
          .join("")}</ol>
      </div>
    </div>
  </div>`;
}

/* ---------- widget refresh + arrival animations ---------- */

const WIDGETS = { matrix: matrixHTML, detail: detailHTML, why: whyHTML };

function refreshWidgets(names) {
  [pageLeft, pageRight].forEach((side) => {
    names.forEach((name) => {
      side.querySelectorAll(`[data-widget="${name}"]`).forEach((el) => {
        el.outerHTML = WIDGETS[name]();
      });
      side.querySelectorAll(`[data-widget="${name}"]`).forEach((el) => {
        el.dataset.played = "";
      });
    });
  });
}

function buildScore(dm) {
  if (!dm || !dm.querySelector(".dm-fill")) return;
  dm.classList.remove("is-building");
  dm.classList.add("is-zero");
  void dm.offsetWidth;
  dm.classList.remove("is-zero");
  dm.classList.add("is-building");
  const duration = calmQuery.matches ? 0 : 2500;
  dm.querySelectorAll("[data-total]").forEach((el) => {
    const end = Number(el.dataset.total);
    tween({ from: 0, to: end, duration, ease: easeOut, update: (v) => { el.textContent = Math.round(v); } });
  });
}

function revealPodium(wrap) {
  const pod = wrap.querySelector(".podium");
  pod.classList.remove("has-flip");
  pod.style.gridTemplateColumns = "";
  pod.style.height = "";
  wrap.querySelectorAll(".pslot").forEach((x) => x.classList.remove("is-flipped"));
  wrap.classList.remove("is-revealed");
  void wrap.offsetWidth;
  wrap.classList.add("is-revealed");
}

function updateScrollCue(body) {
  const sheet = body.closest(".page-sheet");
  if (sheet) sheet.classList.toggle("has-more", body.scrollHeight - body.clientHeight - body.scrollTop > 12);
}

spread.addEventListener("scroll", (event) => {
  if (event.target.classList && event.target.classList.contains("page-body")) updateScrollCue(event.target);
}, true);

const demoDone = { podium: false };

spread.addEventListener("error", (event) => {
  const t = event.target;
  if (t && (t.tagName === "SOURCE" || t.tagName === "VIDEO")) {
    const fig = t.closest("[data-video]");
    if (fig) fig.classList.add("is-missing");
  }
}, true);

function sizeFolders(box) {
  box.style.height = "";
  if (getComputedStyle(box).flexDirection === "column") return;
  const folders = [...box.querySelectorAll(".folder")];
  const gap = parseFloat(getComputedStyle(box).columnGap) || 0;
  const closed = folders.find((f) => !f.classList.contains("is-open"));
  const tab = closed ? closed.getBoundingClientRect().width : 56;
  const width = box.clientWidth - (folders.length - 1) * (tab + gap);
  let need = 0;
  folders.forEach((f) => {
    const probe = f.querySelector(".folder-body").cloneNode(true);
    probe.style.cssText = `position:absolute;visibility:hidden;left:0;top:0;right:auto;bottom:auto;width:${width}px;height:auto;opacity:1;transform:none;`;
    box.append(probe);
    need = Math.max(need, probe.scrollHeight);
    probe.remove();
  });
  const min = parseFloat(getComputedStyle(box).minHeight) || 0;
  box.style.height = `${Math.ceil(Math.max(need + 8, min))}px`;
}

function sizeAllFolders() {
  [pageLeft, pageRight].forEach((side) => side.querySelectorAll(".folders").forEach(sizeFolders));
}
window.addEventListener("resize", () => requestAnimationFrame(sizeAllFolders));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeAllFolders);

function playArrivals() {
  sizeAllFolders();
  [pageLeft, pageRight].forEach((side) => side.querySelectorAll(".page-body").forEach(updateScrollCue));
  [pageLeft, pageRight].forEach((side) => {
    side.querySelectorAll('[data-widget="podium"]:not([data-played])').forEach((w) => {
      w.dataset.played = "";
      revealPodium(w);
      if (!demoDone.podium && !calmQuery.matches) {
        demoDone.podium = true;
        const first = w.querySelector(".pslot.is-first .pcol");
        w._demo = setTimeout(() => {
          if (!first.isConnected || w.classList.contains("was-used")) return;
          flipColumn(first, true);
          w._demo = setTimeout(() => {
            if (first.isConnected && !w.classList.contains("was-used")) flipColumn(first, true);
          }, 2600);
        }, 3300);
      }
    });
    side.querySelectorAll('[data-widget="matrix"]:not([data-played])').forEach((w) => {
      w.dataset.played = "";
      buildScore(w);
    });
    side.querySelectorAll('[data-widget]:not([data-played])').forEach((w) => {
      w.dataset.played = "";
    });
  });
}

spread.addEventListener("click", (event) => {
  const el = event.target.closest("[data-dm-crit], [data-dm-build], [data-dm-view], [data-pick], [data-replay], [data-need], [data-feature], [data-folder]");
  if (!el || el.closest(".leaf")) return;
  const d = el.dataset;

  if ("folder" in d) {
    const folder = el.closest(".folder");
    const all = folder.parentElement.querySelectorAll(".folder");
    all.forEach((f) => {
      const open = f === folder;
      f.classList.toggle("is-open", open);
      f.querySelector(".folder-tab").setAttribute("aria-expanded", String(open));
    });
    folder.classList.add("is-seen");
    folder.parentElement.classList.add("was-used");
    const seen = folder.parentElement.querySelectorAll(".is-seen").length;
    const count = folder.closest(".page-body").querySelector("[data-folder-count]");
    if (count) {
      count.textContent = seen === all.length ? `All ${all.length} opened ✓` : `${seen} of ${all.length} opened`;
      count.classList.toggle("is-done", seen === all.length);
    }
    return;
  }

  if (d.dmCrit) {
    ui.crit = d.dmCrit;
    refreshWidgets(["matrix", "detail"]);
  } else if ("dmBuild" in d) {
    buildScore(el.closest(".dm"));
  } else if (d.dmView) {
    ui.view = d.dmView;
    refreshWidgets(["matrix"]);
  } else if (d.pick) {
    flipColumn(el);
  } else if ("replay" in d) {
    revealPodium(el.closest(".podium-wrap"));
  } else if (d.need) {
    ui.need = d.need;
    ui.feature = 0;
    refreshWidgets(["why"]);
  } else if (d.feature) {
    ui.feature = Number(d.feature);
    refreshWidgets(["why"]);
  }
});

/* =========================================================
   4. STATIC PAGES
   ========================================================= */

function setSide(side, item) {
  const el = side === "left" ? pageLeft : pageRight;
  const key = `${mode}|${item}`;
  if (el.dataset.key === key) return;
  el.dataset.key = key;
  el.innerHTML = item === null || item === undefined ? "" : pageHTML(item, side);
}

/* side: "front" keeps the right half (front cover), "back" keeps the left half (back cover) */
function setClosed(value, side = "front") {
  stage.style.setProperty("--closed", value.toFixed(4));
  stage.style.setProperty("--cf", side === "front" ? value.toFixed(4) : "0");
  stage.style.setProperty("--cb", side === "back" ? value.toFixed(4) : "0");
  stage.dataset.closeSide = side;
}

function renderStatic() {
  leafLayer.replaceChildren();
  if (mode === "spread") {
    setSide("left", leftOf(view));
    setSide("right", rightOf(view));
    if (view < 0) addStaticLeaf({ side: "right", front: COVER, back: 0 }, 0);
    if (view >= SPREADS) addStaticLeaf({ side: "right", front: rightOf(SPREADS - 1), back: BACK }, 1);
    setClosed(view < 0 || view >= SPREADS ? 1 : 0, view >= SPREADS ? "back" : "front");
  } else {
    setSide("left", null);
    setSide("right", itemAt(view));
    setClosed(0);
  }
  updateChrome();
  requestAnimationFrame(playArrivals);
}

function addStaticLeaf(step, p) {
  const leaf = createLeaf({ ...step, order: 0, count: 1, persp: perspective(), isStatic: true });
  applyLeaf(leaf, p);
}

function visiblePages() {
  if (view < 0 || view >= lastView()) return [];
  return mode === "spread" ? [view * 2, view * 2 + 1] : [view];
}

function updateChrome() {
  const last = lastView();
  const closedFront = view < 0;
  const closedBack = view >= last;
  const visible = visiblePages();

  stage.dataset.mode = mode;
  stage.dataset.state = closedFront ? "closed-front" : closedBack ? "closed-back" : "open";

  prevBtn.disabled = closedFront;
  nextBtn.disabled = closedBack;
  prevLabel.textContent = closedBack ? "REOPEN" : view === 0 ? "COVER" : "PREVIOUS";
  nextLabel.textContent = closedFront ? "OPEN BOOK" : closedBack ? "THE END" : view === last - 1 ? "CLOSE BOOK" : "NEXT";

  progressLabel.textContent = closedFront
    ? "COVER"
    : closedBack
      ? "BACK COVER"
      : `${visible.map((i) => pad(i + 1)).join("–")} / ${pad(PAGES)}`;
  progressFill.style.width = `${((view + 1) / (last + 1)) * 100}%`;

  bookmarks.querySelectorAll(".tab").forEach((tab, i) => {
    if (visible.includes(i)) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  pageSelect.value = closedFront ? "cover" : closedBack ? "back" : String(visible[0]);

  const share = (view + 1) / (last + 1);
  const shut = mode === "spread" && (closedFront || closedBack);
  edgeLeft.style.setProperty("--w", `${shut ? 0 : 2 + 10 * share}px`);
  edgeRight.style.setProperty("--w", `${shut ? 12 : 2 + 10 * (1 - share)}px`);

  cornerNext.hidden = dragTarget("right") === null;
  cornerPrev.hidden = dragTarget("left") === null;

  try {
    const url = visible.length ? `#page-${pad(visible[0] + 1)}` : location.pathname + location.search;
    history.replaceState(null, "", url);
  } catch (error) {
    /* some file:// contexts block this; navigation still works */
  }
}

function announce() {
  const last = lastView();
  if (view < 0) announcer.textContent = "Front cover. Select Open book to begin.";
  else if (view >= last) announcer.textContent = "Back cover.";
  else {
    announcer.textContent = visiblePages()
      .map((i) => `Page ${i + 1}: ${pages[i].title}`)
      .join(". ");
  }
}


/* ---------- references: fill page 1, carry the rest to page 2 ---------- */

let refProbe = false;
let refCache = { key: "", n: Math.ceil(REFERENCES.length / 2) };

function refSplit() {
  const rect = pageRight.getBoundingClientRect();
  const key = `${mode}|${Math.round(rect.width)}x${Math.round(rect.height)}`;
  if (refCache.key === key || !rect.width || !rect.height) return refCache.n;
  const first = pages.findIndex((p) => p.type === "references" && p.part === 1);
  const probe = document.createElement("section");
  probe.className = "page";
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText = `position:absolute;left:-10000px;top:0;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
  refProbe = true;
  probe.innerHTML = pageHTML(first, "left");
  refProbe = false;
  spread.append(probe);
  const lis = [...probe.querySelectorAll(".ref-list li")];
  // leave room for the list's bottom padding and the last item's margin, so page 1 never scrolls
  const pad = parseFloat(getComputedStyle(probe.querySelector(".refs")).paddingBottom) || 0;
  const gap = lis.length ? parseFloat(getComputedStyle(lis[0]).marginBottom) || 0 : 0;
  const limit = probe.querySelector(".page-body").getBoundingClientRect().bottom - pad - gap - 2;
  const fit = lis.filter((li) => li.getBoundingClientRect().bottom <= limit).length;
  probe.remove();
  refCache = { key, n: clamp(fit, 1, REFERENCES.length - 1) };
  return refCache.n;
}

function refreshReferences() {
  refCache.key = "";
  if (busy) return;
  const refPages = pages.map((p, i) => (p.type === "references" ? i : -1)).filter((i) => i >= 0);
  if (!visiblePages().some((i) => refPages.includes(i))) return;
  pageLeft.dataset.key = "";
  pageRight.dataset.key = "";
  renderStatic();
}

let resizeTimer = 0;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refreshReferences, 200);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshReferences);

/* =========================================================
   5. TURNING LEAVES
   A leaf is one sheet of paper. Its front is the page you lift;
   its back is exactly the page that will be there when it lands,
   so nothing swaps or jumps at the end of a turn.
   ========================================================= */

function perspective() {
  return Math.round(Math.max(1500, spread.clientWidth * (mode === "spread" ? 2.2 : 3)));
}

function stepFor(v, forward) {
  if (mode === "spread") {
    if (forward) {
      if (v < 0) return { side: "right", front: COVER, back: 0, kind: "open" };
      if (v === SPREADS - 1) return { side: "right", front: rightOf(v), back: BACK, kind: "close" };
      return { side: "right", front: rightOf(v), back: leftOf(v + 1) };
    }
    if (v === 0) return { side: "right", front: COVER, back: 0, kind: "unopen", reverse: true };
    if (v >= SPREADS) return { side: "right", front: rightOf(SPREADS - 1), back: BACK, kind: "reopen", reverse: true };
    return { side: "left", front: leftOf(v), back: rightOf(v - 1) };
  }
  return forward
    ? { side: "single", front: itemAt(v) }
    : { side: "single", front: itemAt(v - 1), reverse: true };
}

function createLeaf({ side, front, back, light = false, order = 0, count = 1, reverse = false, kind = null, persp, isStatic = false }) {
  const leaf = document.createElement("div");
  leaf.className = `leaf leaf-${side}${isStatic ? " is-static" : ""}`;
  const frontSide = side === "left" ? "left" : "right";
  const backSide = side === "left" ? "right" : "left";
  const backHTML = side === "single" ? pageHTML(BLANK, "left") : pageHTML(back, backSide, light);
  leaf.innerHTML = `
    <div class="face face-front">${pageHTML(front, frontSide, light)}<i class="shade"></i></div>
    <div class="face face-back">${backHTML}<i class="shade"></i></div>`;
  leaf.meta = { side, order, count, reverse, kind, persp };
  if (!isStatic) leaf.inert = true;
  leafLayer.append(leaf);
  return leaf;
}

/* p runs 0 → 1: 0 = lying flat where it starts, 1 = lying flat on the other side */
function applyLeaf(leaf, p) {
  const m = leaf.meta;
  const angle = m.side === "left" ? 180 * p : -180 * p;
  leaf.style.transform = `perspective(${m.persp}px) rotateY(${angle.toFixed(2)}deg)`;
  leaf.style.setProperty("--lift", Math.sin(Math.PI * p).toFixed(3));
  leaf.style.setProperty("--shade-front", Math.min(1, p * 2).toFixed(3));
  leaf.style.setProperty("--shade-back", Math.min(1, (1 - p) * 2).toFixed(3));
  const onStartSide = m.reverse ? p > 0.5 : p < 0.5;
  leaf.style.zIndex = onStartSide ? 100 + m.count - m.order : 300 + m.order;
  if (m.side === "single") leaf.style.opacity = p > 0.5 ? "0" : "1";
  if (m.kind) setClosed(closedness(m.kind, p), m.kind === "close" || m.kind === "reopen" ? "back" : "front");
}

/* how far the book is folded shut while a cover moves */
function closedness(kind, p) {
  const reveal = kind === "open" || kind === "unopen" ? -Math.cos(Math.PI * p) : Math.cos(Math.PI * p);
  return 1 - clamp(reveal * 1.12, 0, 1);
}

function tween({ from, to, duration, delay = 0, ease = easeInOut, update }) {
  return new Promise((resolve) => {
    update(from);
    const start = performance.now() + delay;
    const frame = (now) => {
      const t = duration <= 0 ? 1 : clamp((now - start) / duration, 0, 1);
      update(from + (to - from) * ease(t));
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

function prepareTurn(from, to) {
  const forward = to > from;
  const steps = [];
  for (let v = from; v !== to; v += forward ? 1 : -1) steps.push(stepFor(v, forward));

  leafLayer.replaceChildren();

  // Reveal only the side the leaves are lifting off. The other side
  // updates when the last leaf lands on it.
  if (mode === "spread") {
    if (forward) setSide("right", rightOf(to));
    else setSide("left", leftOf(to));
  } else if (forward) {
    setSide("right", itemAt(to));
  }

  const n = steps.length;
  const persp = perspective();
  const leaves = steps.map((step, k) =>
    createLeaf({ ...step, order: k, count: n, persp, light: n > 2 && k > 0 && k < n - 1 })
  );
  leaves.forEach((leaf) => applyLeaf(leaf, leaf.meta.reverse ? 1 : 0));
  stage.dataset.turning = "";
  return { from, to, leaves, epoch };
}

function finishTurn(turn) {
  view = turn.to;
  renderStatic();
  delete stage.dataset.turning;
  announce();
}

async function animateTurn(from, to) {
  const turn = prepareTurn(from, to);
  const n = turn.leaves.length;
  // Riffle: leaves leave quickly at first, then spacing widens so the
  // turning slows down as it nears the page you asked for.
  const span = Math.min(220 + n * 60, 1100);

  await Promise.all(
    turn.leaves.map((leaf, k) => {
      const m = leaf.meta;
      const start = m.reverse ? 1 : 0;
      let duration = m.kind ? 1150 : 820;
      let delay = 0;
      let ease = easeInOut;
      if (n > 1) {
        const last = k === n - 1;
        delay = span * Math.pow(k / (n - 1), 1.6);
        duration = last ? 700 : 340;
        ease = last ? easeInOut : easeSine;
      }
      return tween({ from: start, to: 1 - start, duration, delay, ease, update: (p) => applyLeaf(leaf, p) });
    })
  );

  if (turn.epoch !== epoch) throw new Error("turn cancelled");
  finishTurn(turn);
}

async function runPhases(target) {
  const last = lastView();
  if (mode === "spread") {
    // the cover always opens or closes on its own, then the pages riffle
    if (view < 0 && target > 0) await animateTurn(-1, 0);
    else if (view >= last && target < last - 1) await animateTurn(last, last - 1);

    if (target < 0 && view > 0) await animateTurn(view, 0);
    else if (target >= last && view < last - 1) await animateTurn(view, last - 1);
  }
  if (view !== target) await animateTurn(view, target);
}

function goTo(target) {
  target = clamp(target, -1, lastView());
  if (busy) {
    queued = target;
    return;
  }
  if (target === view) return;

  if (calmQuery.matches) {
    view = target;
    renderStatic();
    book.classList.remove("is-fading");
    void book.offsetWidth;
    book.classList.add("is-fading");
    announce();
    return;
  }

  busy = true;
  runTarget = target;
  const myEpoch = epoch;
  runPhases(target)
    .catch(() => {})
    .finally(() => {
      if (myEpoch !== epoch) return;
      busy = false;
      runTarget = null;
      if (queued !== null) {
        const next = queued;
        queued = null;
        goTo(next);
      }
    });
}

function step(direction) {
  const base = queued ?? runTarget ?? view;
  goTo(base + direction);
}

function goToPage(i) {
  goTo(viewOfPage(i));
}

/* =========================================================
   6. DRAG A CORNER TO TURN
   ========================================================= */

function dragTarget(side) {
  const last = lastView();
  if (mode === "spread") {
    if (side === "right") return view < last ? view + 1 : null;
    return view >= 0 ? view - 1 : null;
  }
  if (side === "right") return view < last ? view + 1 : null;
  return view > -1 ? view - 1 : null;
}

function onCornerDown(event) {
  if (busy || drag || (event.pointerType === "mouse" && event.button !== 0)) return;
  const side = event.currentTarget === cornerNext ? "right" : "left";
  const target = dragTarget(side);
  if (target === null) return;
  event.preventDefault();
  event.currentTarget.setPointerCapture(event.pointerId);
  const rect = spread.getBoundingClientRect();
  drag = {
    id: event.pointerId,
    target,
    x0: event.clientX,
    y0: event.clientY,
    turn: null,
    p: 0,
    q: 0,
    q0: null,
    hinge: mode === "spread" ? rect.left + rect.width / 2 : rect.left,
    width: mode === "spread" ? rect.width / 2 : rect.width,
    epoch
  };
}

function onCornerMove(event) {
  if (!drag || event.pointerId !== drag.id) return;
  if (!drag.turn) {
    if (Math.hypot(event.clientX - drag.x0, event.clientY - drag.y0) < 6 || calmQuery.matches) return;
    busy = true;
    drag.turn = prepareTurn(view, drag.target);
  }
  const leaf = drag.turn.leaves[0];
  const m = leaf.meta;
  // the page's free edge follows the pointer: edge = hinge ± width·cos(angle)
  let c = (event.clientX - drag.hinge) / drag.width;
  if (m.side === "left") c = -c;
  const p = Math.acos(clamp(c, -1, 1)) / Math.PI;
  const q = m.reverse ? 1 - p : p;
  if (drag.q0 === null) drag.q0 = q;
  drag.p = p;
  drag.q = q;
  applyLeaf(leaf, p);
}

async function onCornerUp(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const d = drag;
  drag = null;

  if (!d.turn) {
    if (event.type === "pointerup") goTo(d.target);
    return;
  }

  const leaf = d.turn.leaves[0];
  const m = leaf.meta;
  const done = event.type === "pointerup" && (d.q > 0.5 || d.q - d.q0 > 0.2);
  const endP = m.reverse ? (done ? 0 : 1) : done ? 1 : 0;

  await tween({
    from: d.p,
    to: endP,
    duration: Math.max(180, 650 * Math.abs(endP - d.p)),
    ease: easeOut,
    update: (p) => applyLeaf(leaf, p)
  });

  if (d.epoch !== epoch) return;
  if (done) finishTurn(d.turn);
  else {
    renderStatic();
    delete stage.dataset.turning;
  }
  busy = false;
  if (queued !== null) {
    const next = queued;
    queued = null;
    goTo(next);
  }
}

[cornerNext, cornerPrev].forEach((corner) => {
  corner.addEventListener("pointerdown", onCornerDown);
  corner.addEventListener("pointermove", onCornerMove);
  corner.addEventListener("pointerup", onCornerUp);
  corner.addEventListener("pointercancel", onCornerUp);
});

/* swipe anywhere on a touch screen */
spread.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" || event.target.closest(".corner, button, a, select")) return;
  swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
});

spread.addEventListener("pointerup", (event) => {
  if (!swipe || event.pointerId !== swipe.id) return;
  const dx = event.clientX - swipe.x;
  const dy = event.clientY - swipe.y;
  swipe = null;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
});

spread.addEventListener("pointercancel", () => {
  swipe = null;
});

/* =========================================================
   7. FOLD-OUT MAP
   Coastline: Natural Earth (public domain), via world-atlas.
   Port Stewart 14.07°S 143.69°E. The shaded glow marks the
   general area of Lama Lama Country, not a boundary.
   Wide screens unfold left/right; phones unfold top/bottom.
   ========================================================= */

const LANDSCAPE_MAP_SVG = "<svg class=\"loc-map is-land\" viewBox=\"0 0 1500 700\" preserveAspectRatio=\"none\" role=\"img\" aria-label=\"Map of Cape York Peninsula, Queensland, showing Lama Lama Country on the east coast around Port Stewart and Princess Charlotte Bay.\"> <defs> <pattern id=\"ls-sea-__U__\" width=\"12\" height=\"12\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(30)\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"12\" stroke=\"#9db3aa\" stroke-width=\"1\" opacity=\".42\"/></pattern> <radialGradient id=\"ls-glow-__U__\"><stop offset=\"0\" stop-color=\"#b8765c\" stop-opacity=\".45\"/><stop offset=\".65\" stop-color=\"#b8765c\" stop-opacity=\".17\"/><stop offset=\"1\" stop-color=\"#b8765c\" stop-opacity=\"0\"/></radialGradient> <clipPath id=\"ls-land-__U__\"><path d=\"M-5,163.0L-0.9,160.6L-1.9,159.7L-5,160.4L-5,154.1L-5,154.1L-4.8,154.0L-3.5,153.2L-1.9,152.6L-0.2,152.6L1.3,153.3L4.7,151.3L8.0,148.6L10.6,147.0L10.9,146.5L11.3,145.3L12.2,145.0L13.2,144.8L13.9,144.5L15.2,142.4L14.6,140.7L13.9,139.1L13.2,137.0L14.2,136.1L16.2,136.3L18.5,137.2L19.5,138.0L18.2,141.6L16.5,144.8L10.9,150.8L8.0,154.3L6.6,155.6L3.3,156.0L2.7,156.5L2.3,157.3L-0.5,159.2L0.0,159.8L4.0,158.6L6.0,157.9L11.9,157.3L13.2,156.8L15.9,155.4L17.9,155.2L17.9,155.9L16.5,156.7L12.2,157.9L9.6,159.4L6.3,162.4L4.0,165.5L0.7,168.4L-0.2,169.0L-2.8,171.1L-4.8,172.7L-5,172.8L-5,163.0ZM-5,180.8L-4.8,181.1L-3.2,182.3L-1.5,183.8L-0.9,184.9L0.7,188.0L2.7,184.2L4.0,183.0L5.3,183.6L6.0,183.6L6.6,180.9L7.6,179.2L11.6,176.5L14.6,173.1L15.2,172.7L15.9,173.0L16.5,173.9L16.9,174.9L17.2,175.5L17.5,176.0L18.2,175.2L19.2,173.6L19.5,172.7L20.2,172.5L21.5,172.7L22.5,172.3L28.1,166.6L30.4,164.9L30.1,166.6L28.8,168.5L27.1,170.1L26.1,170.8L25.8,171.1L24.8,172.5L24.8,173.0L24.5,173.9L24.1,174.4L21.2,176.1L20.2,176.9L19.5,177.7L19.5,178.8L19.8,179.6L20.5,180.1L20.8,180.7L21.5,183.0L23.1,183.8L24.8,183.3L26.4,182.3L27.8,181.4L29.4,180.6L31.1,180.6L31.7,182.6L31.1,183.8L30.4,184.1L29.4,184.2L29.1,184.5L29.1,185.3L27.8,188.0L24.5,192.0L24.1,192.9L24.1,193.9L24.5,195.0L24.8,195.8L25.5,195.5L26.8,194.8L26.8,195.6L26.4,197.7L27.1,199.8L27.4,201.7L28.4,202.6L30.1,201.8L30.4,200.9L30.4,200.1L30.7,199.3L32.1,199.0L32.4,199.1L32.7,199.6L33.0,200.1L33.0,200.6L33.7,200.9L34.4,200.7L34.7,200.4L38.3,199.8L39.0,199.8L40.0,200.2L41.0,201.8L41.3,202.1L43.3,202.0L45.3,201.7L48.6,200.2L51.5,197.9L53.2,194.8L56.2,187.4L58.8,183.0L59.1,181.4L58.8,179.8L57.5,178.7L55.8,177.9L54.2,177.7L52.9,178.0L50.9,178.4L49.2,178.5L46.9,178.7L45.9,176.9L45.3,176.5L42.6,176.9L42.0,176.5L41.6,174.9L42.3,174.1L43.3,173.8L45.9,173.3L46.6,171.2L51.5,165.1L52.9,163.6L54.8,163.5L55.5,163.6L56.2,163.6L58.5,161.1L60.8,159.4L63.8,156.4L64.7,155.6L65.7,155.2L66.7,153.5L68.0,153.8L69.4,154.3L72.3,153.3L73.7,151.6L76.3,151.0L77.3,150.3L77.3,148.8L77.9,149.2L78.6,150.2L78.3,151.1L77.0,152.1L75.6,153.2L74.0,154.1L72.7,154.3L71.0,154.9L69.4,154.9L68.4,155.7L68.7,157.6L69.4,159.0L70.4,159.5L71.7,158.3L73.0,157.8L74.3,158.3L75.6,162.5L76.6,166.3L79.3,166.6L78.6,169.3L78.9,172.8L79.6,175.2L81.6,176.9L82.6,178.4L84.9,181.1L85.9,183.0L86.2,183.6L88.8,185.3L91.5,185.3L93.8,183.8L95.8,181.7L95.1,180.7L94.5,180.1L92.1,179.5L90.8,178.2L89.8,176.8L87.9,178.0L88.2,176.1L90.8,176.3L92.5,175.0L95.1,174.2L97.1,175.0L99.4,177.1L101.1,179.0L103.4,179.0L105.7,179.8L108.7,183.4L110.3,186.0L111.0,189.1L110.6,191.7L112.6,192.3L114.3,191.4L115.6,191.2L114.6,193.3L113.9,193.7L113.3,194.1L112.3,194.2L110.6,194.2L108.7,195.3L104.4,199.6L98.1,207.4L97.1,209.0L96.1,209.8L95.8,208.2L97.1,206.6L98.7,204.2L99.1,203.7L99.4,202.8L99.4,201.7L98.7,200.9L97.8,200.7L97.1,201.2L96.4,201.8L96.1,202.1L93.5,203.6L93.1,206.6L93.8,210.2L95.1,212.8L93.5,212.8L92.5,213.1L89.8,216.7L87.9,221.8L89.5,224.5L88.8,225.8L86.9,225.2L82.9,224.8L81.2,225.9L80.6,227.7L81.2,229.4L82.6,230.5L82.6,232.8L82.2,233.7L82.6,234.7L82.6,235.8L81.6,236.9L80.3,236.9L79.3,236.1L78.6,234.8L78.6,233.2L77.6,230.7L77.3,229.6L77.3,229.1L76.6,228.8L76.0,228.6L75.3,228.6L74.3,229.1L73.7,229.8L73.7,231.0L74.3,232.1L74.3,233.4L74.3,234.4L72.3,234.5L71.0,232.1L69.4,230.9L68.7,231.5L69.0,233.2L69.7,236.4L70.0,238.0L70.4,238.8L73.7,241.5L75.3,240.7L75.6,242.6L75.3,244.7L76.6,244.5L77.6,244.5L81.6,247.1L83.9,248.5L84.2,250.6L85.9,252.5L85.5,253.4L85.2,254.1L84.2,253.6L83.6,252.8L83.2,252.5L82.2,251.8L82.2,251.2L81.9,250.9L80.6,251.2L78.6,254.1L77.3,253.9L77.3,250.9L76.3,249.5L75.0,249.3L75.0,249.5L74.3,250.4L74.3,250.6L73.7,250.6L73.0,249.8L72.3,249.9L71.0,250.4L70.7,250.9L70.7,252.2L70.7,252.8L71.0,253.6L71.7,254.1L72.0,254.4L73.3,254.5L73.3,255.0L73.3,255.7L74.3,257.6L77.3,258.4L75.0,262.5L74.0,267.4L72.3,266.3L70.7,266.8L69.7,268.5L69.4,270.9L69.4,274.3L68.7,275.7L67.4,276.5L67.4,275.5L67.4,274.7L66.7,273.1L66.1,273.1L65.4,274.3L62.1,275.5L61.1,277.8L59.1,280.8L57.8,282.1L56.8,283.2L55.8,283.0L55.8,282.1L54.8,281.9L54.8,280.6L57.1,279.3L56.8,278.2L56.2,277.3L56.5,276.2L57.8,276.2L58.8,276.8L60.4,275.8L61.1,274.1L60.4,272.8L59.1,271.2L59.5,268.4L58.8,266.9L59.1,261.9L59.5,259.0L58.8,258.0L56.8,257.2L55.8,257.2L54.5,258.7L53.8,259.9L53.2,261.4L53.5,262.8L54.8,264.2L53.8,265.8L54.2,267.3L53.8,268.2L51.9,268.4L50.5,267.9L49.2,265.0L48.2,265.0L47.2,265.8L46.6,266.9L47.2,268.5L47.9,270.0L47.9,271.4L46.6,272.5L45.9,272.0L45.3,272.0L44.9,272.7L44.9,273.8L44.9,273.1L44.3,274.7L43.3,274.9L41.6,275.1L40.0,277.6L39.0,275.4L38.0,272.3L40.0,269.0L39.6,266.6L39.0,264.4L38.0,264.6L35.0,267.7L33.4,271.6L33.4,274.4L32.4,274.6L31.4,273.8L30.7,273.9L30.4,274.4L30.1,275.8L30.7,280.3L30.4,282.2L29.7,282.2L29.1,279.8L28.8,277.3L28.1,275.1L26.1,273.1L24.8,273.5L23.5,274.6L22.5,278.7L21.5,280.0L21.2,277.6L20.2,277.0L18.5,277.9L17.2,279.5L16.9,281.3L14.9,283.5L14.9,287.5L17.5,288.1L18.2,288.4L18.5,289.2L18.5,290.3L17.9,290.8L18.2,291.9L19.5,292.1L21.8,291.9L22.1,291.9L22.5,292.9L22.5,293.8L22.1,295.1L20.5,294.9L19.5,295.3L18.2,296.5L16.2,294.0L14.6,293.4L12.6,294.0L12.2,295.7L12.6,298.0L12.6,300.4L13.6,303.7L13.2,304.8L12.9,305.3L12.2,305.8L11.6,306.3L11.6,307.4L11.3,309.4L11.9,310.9L13.6,314.4L14.9,315.7L17.9,314.4L17.9,314.9L18.2,316.0L18.5,316.5L15.5,317.7L14.9,320.1L16.5,322.5L19.5,323.5L22.8,322.8L25.1,320.9L28.4,316.5L28.8,315.7L28.8,315.0L28.8,314.5L29.7,313.9L30.4,313.7L31.4,313.9L31.7,314.2L32.4,314.4L32.7,315.3L32.1,316.1L30.4,317.7L29.7,318.8L28.4,323.5L25.8,328.1L26.4,329.0L26.4,330.3L25.8,332.6L25.5,333.0L25.1,333.4L24.8,334.0L24.8,334.9L24.8,337.2L24.8,337.8L22.1,341.0L18.5,343.2L16.5,360.0L17.2,365.6L15.2,365.1L13.6,365.3L11.9,366.1L11.6,367.2L10.9,367.8L8.6,368.3L8.3,368.6L8.0,368.6L6.0,369.9L6.0,370.2L3.3,372.3L1.0,375.3L-4.2,385.6L-4.8,387.5L-5,387.6L-5,180.8ZM-5,448.0L-4.8,448.2L-2.2,450.1L-1.2,451.1L-0.5,452.7L1.3,452.2L3.3,452.8L5.0,454.0L6.0,454.9L6.6,455.7L12.6,458.6L15.2,460.9L17.9,464.1L20.8,467.0L24.5,468.2L25.8,468.6L29.4,470.5L31.1,471.6L33.7,474.2L34.7,474.8L35.7,475.3L38.0,475.8L40.6,478.0L44.3,479.6L45.9,480.8L47.2,481.7L47.6,482.2L48.9,486.6L49.9,493.6L50.5,495.1L51.5,496.2L55.8,499.3L57.5,500.2L61.8,500.5L63.8,501.0L68.4,506.0L70.7,507.5L72.0,508.9L74.0,510.2L76.3,510.7L77.0,510.4L77.9,509.7L78.9,509.2L79.9,509.5L80.3,510.2L80.9,512.8L81.6,513.6L85.9,516.8L86.9,517.9L90.2,522.4L91.2,523.1L91.8,523.9L91.2,525.6L90.5,527.6L90.2,529.0L91.2,531.0L92.8,531.1L94.5,530.1L95.1,528.7L95.8,527.6L97.4,527.6L101.4,528.4L104.4,528.2L105.0,528.4L106.0,528.9L108.0,530.6L108.7,531.0L110.3,530.8L110.3,530.3L110.0,529.0L110.6,527.1L112.0,526.1L115.6,524.2L116.2,524.0L117.9,526.8L121.2,529.7L125.5,531.9L129.5,533.2L131.1,534.5L131.8,534.8L133.7,535.0L134.4,535.3L135.4,535.6L140.0,539.0L141.0,539.8L141.3,540.9L144.0,543.8L150.3,548.7L151.9,549.3L154.2,549.3L154.9,549.5L155.5,550.3L155.9,551.3L156.9,551.4L157.8,551.3L158.5,551.3L160.8,553.4L161.5,553.8L162.8,554.0L164.8,553.4L165.8,553.2L167.8,553.5L177.7,557.2L180.3,559.2L184.3,560.3L185.6,561.1L188.6,565.9L189.2,567.4L194.5,575.3L195.2,576.4L196.5,578.8L200.8,582.7L204.4,585.8L208.7,588.9L209.0,588.9L214.6,595.6L218.3,597.6L222.9,601.8L225.9,603.7L229.2,604.9L230.5,605.7L232.8,606.2L233.8,606.3L234.4,606.6L235.4,607.9L235.8,608.3L237.4,608.7L243.0,608.3L245.7,609.4L249.6,611.5L253.9,612.9L258.9,611.5L268.1,611.5L269.1,611.7L271.8,614.4L272.7,614.9L274.1,615.2L276.7,616.8L278.0,617.5L282.7,618.4L286.0,620.4L288.6,621.0L297.8,621.7L301.5,622.7L304.1,624.6L306.1,630.6L309.1,632.9L315.0,635.9L313.4,639.0L313.7,643.9L314.7,648.9L315.7,652.3L319.6,660.1L322.6,663.8L325.6,666.1L329.5,667.2L337.5,667.9L340.8,668.7L341.8,669.3L344.1,671.4L347.4,673.1L348.0,673.7L349.3,675.0L353.3,677.9L357.3,682.0L359.3,683.8L361.9,684.6L364.5,684.9L372.1,687.2L374.4,687.4L375.8,688.3L376.8,689.3L385.3,692.4L386.0,693.4L388.0,696.9L391.3,700.0L392.3,700.5L403.2,701.5L414.4,700.2L429.2,696.9L431.2,696.1L431.9,695.5L432.9,694.3L434.9,694.0L438.8,693.9L440.1,693.2L441.8,692.4L444.1,690.1L445.1,689.6L447.1,689.5L448.1,688.8L448.7,688.2L451.4,686.5L454.0,683.9L455.3,683.0L459.6,682.3L460.3,681.5L460.9,680.2L461.6,678.6L462.6,677.6L464.6,676.8L466.9,676.1L468.5,676.0L469.9,675.0L470.9,673.1L473.2,665.9L474.2,657.8L475.1,654.2L475.8,653.3L477.8,651.0L478.4,648.1L478.8,647.3L479.4,646.0L480.4,639.8L480.1,638.0L479.4,636.3L479.1,634.5L480.1,632.9L488.7,621.8L491.7,613.6L492.3,613.3L494.0,613.1L494.6,612.9L495.3,612.3L497.3,609.6L502.2,604.2L502.9,602.8L503.2,601.3L504.5,598.1L505.5,591.8L506.5,590.2L507.8,590.5L510.1,586.6L510.8,584.3L511.1,582.4L511.8,580.5L511.8,579.3L511.5,578.7L510.8,578.2L510.5,577.2L510.5,575.5L511.1,574.2L513.1,571.4L513.8,569.8L514.1,567.9L515.4,564.2L516.1,562.4L516.1,558.5L516.4,557.5L517.1,556.1L517.7,554.2L523.0,544.8L523.7,542.9L521.7,540.9L518.7,531.1L518.7,530.3L519.1,529.2L520.7,527.9L521.0,526.8L521.4,522.9L524.3,503.6L528.6,487.4L536.2,469.2L536.9,467.6L536.9,464.4L537.2,462.6L537.9,461.3L539.5,461.2L538.9,459.3L539.9,457.8L541.5,456.8L542.5,455.2L542.5,453.6L541.8,452.0L542.2,450.8L544.5,450.8L543.8,449.0L544.1,447.1L544.8,445.1L545.1,442.9L544.8,441.0L543.8,439.0L543.2,437.6L541.8,436.5L541.8,435.8L542.5,434.9L540.2,432.0L539.5,430.2L533.9,405.9L533.9,399.8L533.6,398.2L532.3,394.9L531.9,392.9L531.9,388.8L532.9,384.9L538.2,370.4L539.2,366.4L539.5,362.4L538.9,357.9L537.5,354.3L535.6,351.4L532.9,348.8L528.6,342.3L527.0,334.5L527.3,326.0L532.3,306.7L534.6,302.1L534.9,300.0L535.2,299.1L538.2,295.6L538.9,294.2L541.5,287.6L541.8,285.4L542.8,285.9L543.8,286.0L544.8,285.9L545.8,285.4L544.5,283.8L544.8,282.4L545.8,281.3L546.1,280.0L546.5,279.0L547.4,277.3L547.4,276.5L547.4,275.5L547.1,274.4L547.1,273.5L546.8,273.1L546.5,272.5L545.8,272.0L544.8,271.6L544.5,271.1L544.1,270.4L543.8,270.0L542.8,269.0L542.2,267.9L541.2,265.4L540.8,263.9L540.5,257.4L539.5,253.4L539.2,253.1L538.5,252.8L537.9,252.3L537.5,251.5L537.5,250.7L539.5,247.5L540.5,246.1L541.5,244.4L541.8,242.8L543.2,244.2L544.5,243.3L546.5,241.7L549.8,240.1L551.7,238.0L553.1,235.8L553.7,234.0L554.1,232.6L556.4,226.7L557.0,224.0L557.4,222.5L558.3,221.5L559.3,221.5L559.3,222.5L559.0,224.8L559.3,224.8L560.7,222.6L562.3,223.1L563.6,224.7L564.9,226.3L565.9,231.8L565.9,235.9L565.9,238.0L566.6,239.0L567.6,239.6L570.2,244.2L569.9,242.5L570.2,240.6L569.9,238.5L568.6,235.2L567.9,231.2L566.9,229.9L574.9,227.4L576.5,225.9L574.2,226.1L571.2,225.9L568.9,225.5L566.9,224.8L565.6,222.9L564.9,222.0L560.3,220.5L559.3,220.2L560.7,219.0L564.3,217.1L566.3,215.5L568.3,214.8L569.2,214.0L569.9,213.7L571.2,213.7L573.2,213.7L570.9,212.9L569.2,212.0L568.3,212.0L566.6,213.7L565.3,213.2L564.0,213.2L560.7,213.7L558.3,213.7L557.0,213.2L555.7,212.5L554.7,211.5L553.4,209.1L552.7,208.0L551.4,207.4L547.4,206.1L551.4,203.6L552.7,202.1L552.4,201.5L548.1,201.8L546.8,201.5L545.1,200.2L544.8,200.7L544.5,200.9L544.5,202.6L544.5,208.3L544.8,208.5L547.1,208.5L547.8,209.0L548.1,209.9L547.1,210.2L545.1,209.9L541.2,211.7L538.9,211.7L538.2,209.6L538.5,208.2L547.4,188.0L549.1,182.2L549.8,180.7L551.1,180.4L554.7,181.7L556.4,181.7L557.4,181.2L558.3,181.1L557.4,180.6L556.7,179.8L556.4,179.0L556.4,177.7L555.7,177.7L555.4,178.4L555.0,179.2L554.4,179.6L553.4,179.5L553.1,178.4L553.4,177.1L554.4,173.3L556.0,169.7L557.4,164.1L560.3,159.4L564.0,155.7L567.6,154.6L566.9,156.5L566.3,158.1L566.3,159.5L567.9,165.1L568.3,167.0L568.3,168.9L571.2,163.2L572.5,162.4L573.5,162.7L577.8,165.5L578.8,162.7L578.5,161.6L576.8,161.1L575.5,158.4L574.9,157.6L573.9,156.8L572.9,156.8L572.2,157.0L571.2,156.7L570.6,153.7L570.9,149.1L572.5,141.2L576.5,136.3L576.8,135.0L576.2,133.6L576.5,131.2L587.7,96.9L588.1,94.8L587.7,89.5L588.1,87.4L588.4,86.0L589.7,82.8L590.4,79.4L590.0,71.5L589.1,63.7L589.7,60.6L591.7,58.7L596.0,57.8L596.6,58.5L597.6,57.6L599.3,57.0L601.3,56.6L603.2,56.5L605.2,56.0L606.9,55.1L609.2,52.1L612.5,48.4L612.8,47.2L613.2,45.8L614.8,41.5L615.5,39.9L616.8,38.7L618.1,38.4L622.1,38.7L622.4,38.4L624.0,37.1L624.4,36.8L624.7,36.6L625.0,36.5L625.4,36.2L625.7,36.2L626.0,36.3L626.0,36.9L626.0,37.6L626.0,38.0L627.4,38.8L630.7,40.6L632.0,41.5L632.3,42.1L632.0,43.1L631.3,44.0L631.0,44.7L630.0,45.3L628.7,45.9L628.0,46.2L627.4,47.2L626.7,49.2L626.0,50.2L625.4,50.5L623.4,51.0L623.1,51.4L622.4,53.8L622.7,56.0L623.1,58.1L621.7,60.4L623.7,59.8L625.4,58.4L626.4,56.3L626.7,54.3L627.7,53.2L630.0,52.7L632.0,53.0L633.0,54.3L634.0,58.9L634.3,58.9L635.3,58.7L636.3,59.0L636.9,60.7L636.3,63.7L636.9,65.6L637.9,63.6L639.9,62.5L642.2,62.3L643.9,63.0L644.2,63.9L644.8,66.7L645.2,67.7L646.2,69.0L647.2,70.2L648.2,73.2L648.5,75.9L648.8,78.7L649.8,80.9L650.1,81.3L649.5,82.1L648.8,83.5L648.5,85.7L648.5,88.5L649.1,91.2L650.8,92.9L651.8,92.8L652.8,94.1L653.4,95.8L653.8,97.2L654.1,98.2L655.4,100.1L655.7,101.0L655.4,101.8L654.8,102.7L653.8,103.8L651.8,107.6L651.1,110.0L651.5,111.0L652.8,111.9L652.8,114.0L652.4,118.1L652.8,119.0L654.1,120.8L654.4,121.9L655.1,134.2L654.4,142.1L654.8,143.5L655.7,144.8L660.7,148.9L662.0,148.8L665.0,151.9L666.6,152.7L669.3,152.4L670.9,151.9L674.6,150.2L676.9,149.7L678.9,150.5L683.5,155.4L684.1,155.4L685.8,155.2L688.4,154.6L689.4,154.8L690.4,155.9L689.4,156.8L688.1,157.1L686.1,157.3L677.2,171.6L676.5,172.0L675.9,172.2L675.2,172.8L675.2,174.6L675.2,174.9L675.9,177.4L675.6,178.5L675.6,179.5L675.2,180.3L674.6,181.1L674.9,181.4L675.2,182.0L675.9,182.3L674.9,184.1L674.6,185.8L674.6,189.8L675.2,190.4L676.9,191.0L680.2,191.4L683.5,190.7L684.5,191.0L686.1,192.3L686.8,192.6L690.7,195.3L691.1,195.6L691.4,196.4L692.4,198.0L692.7,199.4L693.1,205.3L693.4,207.4L694.4,209.1L696.0,210.6L697.0,211.2L700.6,212.3L702.0,212.5L703.3,212.9L704.6,214.0L707.3,216.4L707.3,217.1L705.3,219.6L704.3,221.3L704.9,222.1L705.3,222.9L702.3,227.7L702.0,229.3L701.0,234.5L701.0,239.8L700.3,241.5L702.3,239.0L703.0,239.6L704.3,240.2L705.3,240.4L706.3,239.9L707.6,238.8L708.6,238.8L709.6,239.3L710.6,239.6L712.9,239.3L714.2,238.6L715.5,237.9L717.2,237.1L712.9,245.5L714.2,248.5L714.5,252.5L713.5,259.9L715.8,271.6L715.8,283.8L716.2,285.1L716.5,285.7L719.8,288.3L719.8,289.4L721.1,291.0L721.8,291.9L721.8,293.0L721.8,293.8L720.8,299.7L720.8,301.5L722.1,302.3L721.8,304.0L719.1,309.3L718.5,312.5L717.5,318.0L716.5,321.7L716.2,323.5L716.5,325.1L718.1,328.6L718.5,330.3L719.1,331.3L721.8,335.6L722.4,336.2L722.1,339.1L722.4,340.2L723.1,341.2L723.4,342.1L724.1,342.9L729.7,347.4L730.4,348.5L731.4,354.3L731.0,355.9L732.0,357.9L732.3,366.9L736.0,379.3L739.3,385.3L741.3,388.0L743.6,390.4L744.9,391.3L746.2,392.1L747.5,392.6L749.2,392.9L752.5,393.1L753.1,393.7L753.8,395.5L754.8,394.4L755.8,393.9L758.1,393.6L762.1,391.3L765.4,389.9L769.7,385.4L771.0,384.5L772.6,383.8L773.9,382.4L774.9,380.8L775.6,379.3L775.9,376.8L775.9,374.2L776.3,372.0L777.6,370.9L777.9,371.4L778.6,372.1L778.9,372.8L779.2,372.3L779.6,372.1L779.9,372.0L780.2,371.5L780.5,371.5L782.2,374.7L782.5,375.3L783.9,375.8L784.8,375.8L785.8,375.8L786.8,376.6L799.4,370.9L800.4,370.2L802.0,365.8L802.3,365.0L802.7,364.8L802.7,364.0L802.7,362.7L803.0,362.2L803.7,362.4L805.0,363.0L806.3,363.5L807.0,364.3L807.6,365.1L808.0,365.6L808.9,366.4L812.9,372.1L811.9,373.7L811.6,375.8L811.6,379.7L812.2,381.6L814.2,381.7L816.2,380.6L817.2,379.3L817.5,380.8L817.2,382.7L816.5,384.5L815.5,385.1L815.2,386.2L815.5,391.3L815.9,392.9L816.5,393.6L819.2,395.5L819.5,396.5L820.5,398.9L821.2,399.8L823.1,400.3L827.1,399.3L828.4,399.5L829.7,400.8L830.7,402.4L832.1,404.0L834.4,404.6L840.3,404.8L841.6,405.3L842.3,406.1L842.6,406.7L842.6,407.5L843.0,408.5L843.6,409.3L845.3,410.7L844.9,411.2L845.6,415.8L845.6,416.6L846.6,417.6L852.2,421.4L853.5,423.5L855.8,422.2L857.8,423.0L859.8,424.6L862.1,425.4L863.4,425.6L865.1,426.4L866.4,426.7L867.7,426.5L870.0,425.9L871.3,425.9L870.4,428.5L871.0,430.6L876.3,436.8L877.6,437.1L879.6,436.5L882.6,436.5L881.3,439.0L874.3,449.0L873.7,450.9L872.3,457.7L872.7,459.3L874.0,462.0L874.6,464.6L875.6,465.5L876.6,466.2L877.9,466.3L879.3,466.0L879.9,465.2L880.6,462.5L882.2,463.8L882.9,465.7L882.2,467.4L878.6,468.9L877.0,470.3L876.6,472.1L878.3,473.5L877.3,474.5L877.0,475.5L877.3,476.4L877.0,477.4L876.3,477.7L875.0,478.5L874.3,478.8L873.7,480.4L873.3,482.5L873.3,484.0L874.3,483.3L875.0,483.3L876.3,487.0L876.6,489.0L875.3,489.9L875.0,490.3L875.0,491.2L875.3,492.0L876.0,492.5L876.0,492.8L879.3,495.4L879.6,495.9L880.3,498.0L880.6,498.9L880.3,499.7L878.9,501.7L879.3,502.1L879.6,502.5L883.2,510.5L884.2,511.8L884.6,513.1L883.9,517.6L883.9,519.2L884.2,520.2L884.9,520.6L885.2,521.0L885.2,521.8L884.6,522.9L883.6,524.8L883.2,526.1L883.6,527.9L884.2,529.0L886.2,531.0L890.2,536.3L892.1,539.7L893.1,542.9L893.1,546.4L891.2,552.9L890.8,556.3L892.8,557.5L893.1,558.0L893.8,560.5L893.8,561.9L893.1,563.2L890.5,565.9L888.8,569.0L888.8,576.1L887.5,579.3L887.9,580.5L888.2,581.4L889.2,582.2L890.2,582.7L891.8,581.9L893.5,583.0L894.1,585.0L894.5,586.9L895.1,587.9L898.4,591.3L899.4,594.5L901.1,596.3L901.4,596.8L901.7,598.2L902.7,599.9L904.0,601.3L908.3,605.0L909.3,605.7L911.6,606.6L912.3,607.3L912.9,608.1L913.3,610.2L913.6,611.2L914.6,612.0L916.2,612.9L917.2,613.6L918.9,618.1L920.5,619.1L921.9,620.9L922.2,621.7L921.9,623.0L920.9,623.3L919.9,623.5L918.9,624.0L918.9,625.2L919.6,626.2L920.5,627.2L921.5,628.6L921.5,629.3L921.5,630.9L921.9,631.6L922.9,631.9L923.5,631.7L924.2,631.1L923.2,629.1L922.9,627.4L923.2,625.9L923.8,625.2L924.5,624.8L927.1,622.3L927.8,621.4L929.5,622.5L930.4,623.5L931.4,623.6L933.7,621.7L934.4,620.9L935.1,620.4L935.7,620.1L936.7,620.1L938.4,620.6L938.7,621.7L938.0,622.8L937.7,623.3L936.7,624.3L936.7,624.6L936.4,625.1L937.1,625.6L937.1,625.9L936.4,628.0L935.7,628.8L935.1,629.3L934.4,629.9L932.8,633.3L932.1,634.5L931.8,636.6L931.8,638.4L932.4,639.8L933.7,640.5L934.4,641.3L938.0,648.2L938.7,650.2L939.0,652.3L939.0,654.6L939.7,656.0L943.0,660.9L945.3,666.9L946.3,668.4L947.9,669.8L948.9,670.3L949.6,671.3L949.3,675.5L949.6,681.2L948.9,682.2L949.9,684.4L952.2,687.8L954.9,690.3L955.9,691.7L956.2,693.5L955.5,694.8L953.2,696.9L952.2,698.4L951.9,700.5L952.1,705L-5,705ZM352.0,636.4L351.3,637.9L352.0,639.0L353.0,639.8L353.3,640.5L352.6,642.3L351.3,642.9L348.4,643.1L347.7,643.4L347.4,644.0L347.0,644.4L345.7,644.4L345.1,643.9L344.7,643.2L344.7,642.7L344.7,642.4L343.1,642.4L341.4,643.1L340.4,644.4L340.1,646.5L339.4,646.5L339.4,646.0L339.4,645.7L339.1,645.5L338.8,645.0L337.5,642.4L338.1,641.1L339.8,640.5L341.8,638.8L344.1,635.1L345.4,633.7L346.0,632.9L345.7,631.2L347.0,632.0L351.0,634.8ZM308.7,616.2L310.4,615.5L312.7,614.7L314.7,614.7L315.0,616.2L314.0,616.8L311.7,617.0L311.4,617.8L311.0,619.1L310.4,619.6L309.7,619.3L309.4,618.1L309.4,617.3L309.4,616.8L309.4,616.3ZM367.8,579.3L368.5,580.5L368.5,582.2L368.2,584.0L367.8,585.3L367.5,584.8L366.8,583.9L366.5,583.4L365.5,584.3L365.5,585.1L365.9,586.0L365.9,586.9L365.5,587.4L364.5,587.1L362.9,586.4L360.9,586.8L358.9,587.4L357.3,588.4L356.6,589.8L355.6,588.7L353.6,585.3L353.0,584.7L353.0,584.3L352.0,583.5L351.3,583.2L351.0,583.7L350.7,584.0L349.0,586.0L348.0,586.1L345.7,586.3L345.4,586.4L345.1,587.6L346.0,588.2L347.0,588.5L348.0,588.5L349.0,589.2L348.7,590.3L347.7,591.1L346.7,591.0L345.7,590.2L344.7,590.0L344.1,590.3L343.4,591.3L344.1,594.2L344.1,595.2L343.4,595.8L342.4,597.4L342.4,597.7L342.7,598.2L342.1,599.4L341.4,600.5L340.4,601.0L339.4,600.7L338.1,598.7L337.1,598.4L335.8,599.2L334.8,602.9L333.5,603.7L331.8,604.1L329.9,605.7L328.2,606.3L322.3,606.3L321.3,606.0L320.6,604.9L318.0,601.3L317.0,600.3L317.3,602.3L317.7,605.0L317.3,607.1L316.3,607.0L315.7,608.3L314.7,609.2L313.7,609.2L313.7,606.5L313.0,604.7L313.0,603.7L313.4,603.1L314.0,602.3L314.7,601.3L315.0,600.0L315.3,597.7L315.7,596.0L316.3,594.4L317.7,593.2L319.6,591.4L320.3,590.2L320.6,588.2L321.0,587.2L321.6,586.6L322.6,586.1L323.6,586.0L324.3,585.5L326.2,582.9L326.9,581.9L328.9,581.1L330.9,580.8L334.8,580.8L345.4,578.5L350.7,575.5L354.0,574.8L356.0,575.1L356.9,575.8L357.3,576.9L358.3,578.0L359.6,578.8L361.2,579.2L364.5,579.3L364.5,579.8L364.2,580.9L363.9,581.3L365.5,581.8L366.5,580.8L366.8,579.5ZM86.9,504.9L87.5,506.5L88.8,507.1L90.2,507.8L90.8,508.7L90.2,510.4L89.2,512.3L86.2,516.0L85.5,515.2L84.2,514.4L83.2,513.1L82.2,511.5L81.9,509.7L82.6,507.8L83.9,506.8L85.5,506.0ZM98.7,503.0L100.1,503.9L101.7,505.4L102.1,506.8L100.7,507.5L99.7,507.1L99.1,505.8L98.1,505.5L97.1,505.8L96.8,506.5L97.8,508.7L98.1,509.1L98.4,509.4L98.1,510.0L98.1,510.5L97.4,510.8L96.4,511.5L94.5,512.8L93.5,513.1L92.5,512.6L92.8,510.4L93.5,508.3L93.5,506.2L92.5,503.6L94.1,503.3L97.4,503.6ZM124.2,513.2L124.5,514.1L125.2,514.4L125.8,514.7L126.8,515.5L126.5,518.2L125.5,520.0L123.8,522.4L121.2,521.3L120.9,519.7L120.5,518.6L120.2,517.6L119.2,517.3L117.9,517.1L117.2,516.8L115.9,513.2L115.6,512.4L115.9,510.4L115.6,509.5L114.6,509.5L113.9,509.7L113.3,509.5L112.6,509.5L112.3,511.3L112.0,511.2L111.6,511.2L111.3,510.5L111.6,508.4L111.6,506.8L112.0,505.4L112.6,504.2L113.9,502.8L114.9,504.2L115.6,505.0L116.2,504.7L115.6,502.1L116.2,501.8L117.2,500.4L116.6,498.3L117.6,498.3L118.6,498.3L119.2,499.1L119.5,501.5L121.5,502.6L122.5,501.7L123.2,501.7L123.2,503.4L124.8,503.9L124.5,507.1L124.5,511.0L124.8,512.4ZM81.9,493.1L80.6,495.4L80.6,500.1L79.3,502.3L78.3,501.8L76.6,502.1L75.6,501.5L75.0,502.3L74.3,502.6L73.0,503.0L72.7,502.6L72.0,502.5L71.0,501.5L72.3,500.9L72.3,499.7L72.0,498.6L71.0,497.6L72.7,496.5L73.3,495.9L73.7,495.1L73.7,493.9L73.3,493.1L73.7,492.7L75.3,492.5L77.3,491.9L78.9,490.9L80.6,490.9ZM107.7,497.6L106.3,498.0L105.7,498.6L105.4,499.6L105.7,501.0L105.0,501.2L104.4,501.3L103.4,502.3L103.0,501.8L103.0,501.5L102.7,501.3L102.7,501.0L103.0,500.9L103.0,500.5L102.7,499.7L102.1,498.8L102.4,498.4L103.0,498.1L103.4,497.6L103.4,497.3L103.7,496.5L104.0,496.0L103.7,495.6L102.7,494.8L102.7,494.4L103.0,492.8L104.0,491.4L105.4,490.1L106.3,489.3L105.7,491.5L106.0,493.6ZM4.0,429.3L3.7,431.4L3.7,432.5L2.3,432.2L0.4,432.0L-1.5,433.6L-2.8,433.3L-3.2,432.6L-2.2,431.8L-1.5,431.2L-0.5,430.4L-0.2,429.3L-0.2,428.6L-1.2,428.5L-1.2,428.0L-0.5,427.7L-0.2,426.7L0.4,426.2L2.3,426.5L3.3,427.7ZM99.4,330.0L99.4,329.5L99.7,329.0L100.1,328.7L100.4,328.4L99.7,329.0L99.7,329.5ZM51.9,319.3L51.9,320.6L51.9,321.1L51.9,321.6L51.2,322.2L50.2,322.7L49.2,322.5L48.2,322.8L47.9,324.3L49.2,324.3L49.9,325.1L50.5,326.2L51.2,327.5L49.6,327.6L48.6,328.7L48.6,330.5L47.9,331.9L46.9,332.7L45.9,333.2L44.6,333.5L43.6,333.2L44.3,332.6L44.3,332.1L44.3,331.6L44.3,331.1L44.9,330.6L43.9,329.5L42.6,325.7L41.6,324.7L39.6,325.5L39.3,327.6L39.6,330.2L39.6,331.9L36.7,330.6L36.0,329.8L36.0,321.1L39.3,322.7L40.6,322.8L41.0,321.2L41.3,319.5L42.3,317.6L43.3,316.0L44.9,315.2L45.6,315.2L46.9,315.7L48.2,316.1L48.6,316.8L49.2,317.9L50.2,318.5L51.2,319.0ZM112.6,364.3L112.3,364.5L112.0,364.3L111.6,364.3L111.3,365.0L111.3,365.8L112.0,366.7L112.0,367.2L112.3,367.5L112.9,368.3L113.3,369.1L112.9,369.6L111.6,370.1L111.3,371.2L112.0,372.5L112.6,373.4L111.6,373.1L111.0,373.3L111.0,373.9L111.3,374.7L110.3,373.9L109.3,373.6L108.7,374.1L108.3,375.3L105.0,373.6L103.4,373.3L102.1,374.1L101.1,373.1L99.1,372.5L95.4,372.1L93.8,371.5L92.8,371.4L91.5,371.8L87.9,374.1L84.2,373.6L67.7,367.5L67.1,367.4L65.4,365.9L64.4,365.6L63.4,365.8L60.4,366.7L58.1,368.5L56.8,369.0L56.5,369.0L55.8,369.1L55.2,368.8L55.5,367.5L56.2,366.9L58.1,365.8L59.1,365.0L62.1,363.8L63.1,362.9L64.1,360.3L65.1,359.4L65.4,358.6L65.1,357.5L64.1,355.5L63.4,352.5L63.1,346.9L63.1,343.9L64.4,338.5L64.7,335.6L64.4,334.3L63.4,332.9L62.8,331.3L63.1,330.0L64.4,329.2L65.7,329.8L68.0,331.9L68.7,331.4L71.0,331.4L72.3,331.4L73.7,330.0L73.0,328.7L74.0,327.0L74.6,327.3L75.6,329.2L77.0,330.2L77.9,328.1L78.6,328.6L79.9,329.4L79.9,326.8L81.2,327.5L82.6,327.1L83.2,326.0L81.9,324.7L81.2,325.5L80.6,323.9L80.6,322.4L79.9,321.1L77.9,321.1L78.6,320.1L78.9,319.2L78.6,318.5L77.3,318.4L77.9,317.6L78.6,317.1L79.6,316.9L80.6,317.1L81.9,317.4L82.2,317.7L81.9,318.0L81.9,318.4L81.9,318.8L81.9,320.0L81.9,320.3L82.2,320.4L82.9,320.3L83.2,319.8L83.2,319.6L83.6,319.3L83.9,318.8L84.6,318.5L85.5,319.0L87.2,316.5L87.5,315.5L87.9,314.7L90.2,314.7L91.2,313.9L91.8,315.5L91.8,317.6L90.8,319.5L88.2,320.8L87.5,321.7L87.5,323.0L87.9,323.9L88.8,324.6L89.8,324.7L90.8,324.7L91.8,324.7L91.5,325.5L90.2,327.5L90.8,328.9L90.8,330.0L91.2,331.0L92.5,331.9L93.8,332.4L98.4,333.2L100.1,332.9L101.4,332.1L102.4,330.6L102.7,329.0L102.4,328.4L101.7,327.9L101.1,328.1L100.4,328.3L101.1,327.8L101.4,327.5L102.7,323.5L104.0,324.3L106.7,323.8L108.3,324.3L108.7,324.9L109.6,326.2L110.0,327.6L110.3,328.7L109.3,329.8L106.7,332.6L105.7,333.8L104.0,339.1L100.7,338.1L98.1,339.4L95.8,342.0L95.1,345.0L95.4,346.8L96.1,347.6L97.1,348.0L98.1,348.8L98.4,348.8L99.4,349.3L99.7,349.9L99.1,350.1L98.4,350.3L97.8,350.6L97.1,351.2L97.1,352.0L95.4,351.4L94.5,352.0L94.1,353.1L94.5,354.6L93.5,353.5L92.5,353.0L91.2,353.1L90.2,354.1L90.5,355.2L90.5,356.5L90.2,359.1L91.2,362.9L91.2,364.0L91.8,364.6L92.8,365.0L94.5,365.1L97.1,364.8L97.4,364.8L97.1,364.2L97.1,362.7L97.8,361.3L99.7,362.2L105.4,366.7L106.3,366.9L107.3,365.9L108.0,365.0L108.7,363.8L109.3,362.6L109.6,361.1L110.3,361.1L111.3,361.8L112.3,361.8L113.9,361.3L115.3,361.1L114.3,361.8L113.6,362.7ZM38.0,293.8L38.0,291.3L36.7,289.9L36.3,288.1L34.0,286.8L36.3,287.0L37.7,289.2L39.0,289.5L40.3,291.6L42.0,294.2L42.3,294.8L42.6,295.4L43.6,295.6L43.9,296.2L43.6,297.7L41.0,295.7L41.0,297.7L39.6,297.3L39.6,298.9L40.3,301.2L39.0,303.2L38.7,305.6L37.3,304.3L37.7,302.8L39.0,301.2L38.3,300.2L37.7,299.4L36.7,297.3ZM100.4,166.0L100.7,166.8L101.1,168.7L100.7,170.1L101.4,171.2L100.7,171.9L100.1,171.7L99.4,170.8L98.4,169.0L98.7,166.8ZM52.2,156.7L54.5,157.6L53.2,160.2L50.2,162.5L46.9,163.6L45.6,164L44.6,164.7L43.6,165.5L42.3,166.2L41.0,166.2L39.3,165.9L38.0,165.2L37.3,164.3L37.7,163.3L37.7,162.4L37.7,161.4L37.3,160.5L38.7,161.1L39.6,161.9L40.3,162.1L41.3,161.4L43,159.5L43.6,158.9L44.9,159.0L44.6,159.5L44.3,160.3L44.3,161.3L44.6,161.7L45.3,161.6L46.9,161.1L47.6,161.1L49.2,160.3L51.2,157.3ZM68.0,148.9L68.7,146.5L68.7,143.8L69.4,141.5L71.0,139.9L71.0,141.6L69.4,146.2L69.4,147.2L69.7,147.8L69.7,148.4L69.4,149.5L68.7,150.0L68.4,150.2L68.0,149.7ZM80.9,135.0L82.2,134.0L82.6,134.2L82.6,135.0L81.9,136.1L79.9,137.7L79.3,138.6L78.6,139.9L77.0,139.6L74.0,140.0L73.0,139.3L74.0,138.0L74.6,137.7L76.6,138.0L77.6,137.7L78.9,136.7ZM21.5,131.4L20.8,129.1L23.8,127.1L27.8,125.2L30.4,126.1L27.4,129.6L26.1,131.5L24.1,132.3ZM64.1,112.9L67.1,111.0L68.4,109.8L69.4,108.4L69.7,110.6L69.0,112.5L67.4,114.3L62.4,117.1L61.4,117.4L61.1,117.9L59.8,120.6L55.2,122.8L54.5,123.6L53.8,123.9L53.5,123.8L52.9,123.3L52.9,123.0L51.5,123.8L50.5,125.0L49.2,126.3L46.6,127.1L46.6,126.3L43.3,129.0L41.6,129.6L42.0,129.1L42.3,128.7L42.3,128.2L43,125.8L43.6,125.0L44.9,124.7L46.6,123.9L47.6,122.5L48.6,120.6L49.9,118.9L51.5,118.1L51.5,118.9L53.2,120.6L54.8,121.7L55.5,120.9L55.8,120.1L59.1,116.2L59.5,116.5L59.8,116.8L60.1,115.4L61.4,114.4ZM95.4,69.0L93.8,74.0L92.8,78.1L91.5,81.6L91.2,84.6L90.5,84.9L90.2,85.1L89.8,85.1L87.9,86.2L86.9,89.2L83.9,92.0L82.9,96.1L81.6,96.6L79.6,100.5L75.3,105.4L74.6,106.7L73.7,107.0L73.3,106.4L72.7,105.9L72.0,106.2L70.7,107.8L69.4,107.2L70.7,105.9L71.3,104.8L69.7,103.8L71.0,102.6L74.0,100.5L77.0,98.5L77.0,97.7L78.6,95.9L78.6,93.7L79.3,91.8L81.9,87.4L85.5,82.7L88.5,81.9L89.5,78.4L90.5,76.5L90.5,74.3L91.8,73.4L92.5,72.7L92.8,71.3L91.5,70.1L93.1,68.0L93.5,68.3L93.8,68.5L94.1,68.6L94.5,68.8L94.8,67.8L95.4,67.1ZM599.0,34.1L601.3,36.3L601.6,37.4L601.6,38.7L601.3,39.0L600.9,39.0L599.9,38.8L599.0,38.8L597.0,39.6L595.7,39.9L594.7,40.4L593.7,41.5L593.0,42.8L593.0,43.7L589.7,42.5L589.1,41.8L588.1,40.1L586.7,38.2L586.1,35.8L586.4,32.8L586.7,32.4L587.1,32.1L587.4,31.7L589.1,31.6L589.4,31.3L589.7,31.0L590.4,30.3L592.0,29.4L592.4,29.4L592.4,28.9L593.3,27.2L595.3,27.6L596.6,29.9ZM599.6,25.9L602.6,25.4L604.9,26.9L605.6,29.1L603.6,31.0L600.9,31.7L599.0,30.3L598.3,28.0ZM603.1,-5L602.3,-3.6L600.9,-4.1L600.0,-5L603.1,-5Z\"/></clipPath> </defs> <rect width=\"1500\" height=\"700\" fill=\"#e4ece6\"/><rect width=\"1500\" height=\"700\" fill=\"url(#ls-sea-__U__)\"/> <path d=\"M-5,163.0L-0.9,160.6L-1.9,159.7L-5,160.4L-5,154.1L-5,154.1L-4.8,154.0L-3.5,153.2L-1.9,152.6L-0.2,152.6L1.3,153.3L4.7,151.3L8.0,148.6L10.6,147.0L10.9,146.5L11.3,145.3L12.2,145.0L13.2,144.8L13.9,144.5L15.2,142.4L14.6,140.7L13.9,139.1L13.2,137.0L14.2,136.1L16.2,136.3L18.5,137.2L19.5,138.0L18.2,141.6L16.5,144.8L10.9,150.8L8.0,154.3L6.6,155.6L3.3,156.0L2.7,156.5L2.3,157.3L-0.5,159.2L0.0,159.8L4.0,158.6L6.0,157.9L11.9,157.3L13.2,156.8L15.9,155.4L17.9,155.2L17.9,155.9L16.5,156.7L12.2,157.9L9.6,159.4L6.3,162.4L4.0,165.5L0.7,168.4L-0.2,169.0L-2.8,171.1L-4.8,172.7L-5,172.8L-5,163.0ZM-5,180.8L-4.8,181.1L-3.2,182.3L-1.5,183.8L-0.9,184.9L0.7,188.0L2.7,184.2L4.0,183.0L5.3,183.6L6.0,183.6L6.6,180.9L7.6,179.2L11.6,176.5L14.6,173.1L15.2,172.7L15.9,173.0L16.5,173.9L16.9,174.9L17.2,175.5L17.5,176.0L18.2,175.2L19.2,173.6L19.5,172.7L20.2,172.5L21.5,172.7L22.5,172.3L28.1,166.6L30.4,164.9L30.1,166.6L28.8,168.5L27.1,170.1L26.1,170.8L25.8,171.1L24.8,172.5L24.8,173.0L24.5,173.9L24.1,174.4L21.2,176.1L20.2,176.9L19.5,177.7L19.5,178.8L19.8,179.6L20.5,180.1L20.8,180.7L21.5,183.0L23.1,183.8L24.8,183.3L26.4,182.3L27.8,181.4L29.4,180.6L31.1,180.6L31.7,182.6L31.1,183.8L30.4,184.1L29.4,184.2L29.1,184.5L29.1,185.3L27.8,188.0L24.5,192.0L24.1,192.9L24.1,193.9L24.5,195.0L24.8,195.8L25.5,195.5L26.8,194.8L26.8,195.6L26.4,197.7L27.1,199.8L27.4,201.7L28.4,202.6L30.1,201.8L30.4,200.9L30.4,200.1L30.7,199.3L32.1,199.0L32.4,199.1L32.7,199.6L33.0,200.1L33.0,200.6L33.7,200.9L34.4,200.7L34.7,200.4L38.3,199.8L39.0,199.8L40.0,200.2L41.0,201.8L41.3,202.1L43.3,202.0L45.3,201.7L48.6,200.2L51.5,197.9L53.2,194.8L56.2,187.4L58.8,183.0L59.1,181.4L58.8,179.8L57.5,178.7L55.8,177.9L54.2,177.7L52.9,178.0L50.9,178.4L49.2,178.5L46.9,178.7L45.9,176.9L45.3,176.5L42.6,176.9L42.0,176.5L41.6,174.9L42.3,174.1L43.3,173.8L45.9,173.3L46.6,171.2L51.5,165.1L52.9,163.6L54.8,163.5L55.5,163.6L56.2,163.6L58.5,161.1L60.8,159.4L63.8,156.4L64.7,155.6L65.7,155.2L66.7,153.5L68.0,153.8L69.4,154.3L72.3,153.3L73.7,151.6L76.3,151.0L77.3,150.3L77.3,148.8L77.9,149.2L78.6,150.2L78.3,151.1L77.0,152.1L75.6,153.2L74.0,154.1L72.7,154.3L71.0,154.9L69.4,154.9L68.4,155.7L68.7,157.6L69.4,159.0L70.4,159.5L71.7,158.3L73.0,157.8L74.3,158.3L75.6,162.5L76.6,166.3L79.3,166.6L78.6,169.3L78.9,172.8L79.6,175.2L81.6,176.9L82.6,178.4L84.9,181.1L85.9,183.0L86.2,183.6L88.8,185.3L91.5,185.3L93.8,183.8L95.8,181.7L95.1,180.7L94.5,180.1L92.1,179.5L90.8,178.2L89.8,176.8L87.9,178.0L88.2,176.1L90.8,176.3L92.5,175.0L95.1,174.2L97.1,175.0L99.4,177.1L101.1,179.0L103.4,179.0L105.7,179.8L108.7,183.4L110.3,186.0L111.0,189.1L110.6,191.7L112.6,192.3L114.3,191.4L115.6,191.2L114.6,193.3L113.9,193.7L113.3,194.1L112.3,194.2L110.6,194.2L108.7,195.3L104.4,199.6L98.1,207.4L97.1,209.0L96.1,209.8L95.8,208.2L97.1,206.6L98.7,204.2L99.1,203.7L99.4,202.8L99.4,201.7L98.7,200.9L97.8,200.7L97.1,201.2L96.4,201.8L96.1,202.1L93.5,203.6L93.1,206.6L93.8,210.2L95.1,212.8L93.5,212.8L92.5,213.1L89.8,216.7L87.9,221.8L89.5,224.5L88.8,225.8L86.9,225.2L82.9,224.8L81.2,225.9L80.6,227.7L81.2,229.4L82.6,230.5L82.6,232.8L82.2,233.7L82.6,234.7L82.6,235.8L81.6,236.9L80.3,236.9L79.3,236.1L78.6,234.8L78.6,233.2L77.6,230.7L77.3,229.6L77.3,229.1L76.6,228.8L76.0,228.6L75.3,228.6L74.3,229.1L73.7,229.8L73.7,231.0L74.3,232.1L74.3,233.4L74.3,234.4L72.3,234.5L71.0,232.1L69.4,230.9L68.7,231.5L69.0,233.2L69.7,236.4L70.0,238.0L70.4,238.8L73.7,241.5L75.3,240.7L75.6,242.6L75.3,244.7L76.6,244.5L77.6,244.5L81.6,247.1L83.9,248.5L84.2,250.6L85.9,252.5L85.5,253.4L85.2,254.1L84.2,253.6L83.6,252.8L83.2,252.5L82.2,251.8L82.2,251.2L81.9,250.9L80.6,251.2L78.6,254.1L77.3,253.9L77.3,250.9L76.3,249.5L75.0,249.3L75.0,249.5L74.3,250.4L74.3,250.6L73.7,250.6L73.0,249.8L72.3,249.9L71.0,250.4L70.7,250.9L70.7,252.2L70.7,252.8L71.0,253.6L71.7,254.1L72.0,254.4L73.3,254.5L73.3,255.0L73.3,255.7L74.3,257.6L77.3,258.4L75.0,262.5L74.0,267.4L72.3,266.3L70.7,266.8L69.7,268.5L69.4,270.9L69.4,274.3L68.7,275.7L67.4,276.5L67.4,275.5L67.4,274.7L66.7,273.1L66.1,273.1L65.4,274.3L62.1,275.5L61.1,277.8L59.1,280.8L57.8,282.1L56.8,283.2L55.8,283.0L55.8,282.1L54.8,281.9L54.8,280.6L57.1,279.3L56.8,278.2L56.2,277.3L56.5,276.2L57.8,276.2L58.8,276.8L60.4,275.8L61.1,274.1L60.4,272.8L59.1,271.2L59.5,268.4L58.8,266.9L59.1,261.9L59.5,259.0L58.8,258.0L56.8,257.2L55.8,257.2L54.5,258.7L53.8,259.9L53.2,261.4L53.5,262.8L54.8,264.2L53.8,265.8L54.2,267.3L53.8,268.2L51.9,268.4L50.5,267.9L49.2,265.0L48.2,265.0L47.2,265.8L46.6,266.9L47.2,268.5L47.9,270.0L47.9,271.4L46.6,272.5L45.9,272.0L45.3,272.0L44.9,272.7L44.9,273.8L44.9,273.1L44.3,274.7L43.3,274.9L41.6,275.1L40.0,277.6L39.0,275.4L38.0,272.3L40.0,269.0L39.6,266.6L39.0,264.4L38.0,264.6L35.0,267.7L33.4,271.6L33.4,274.4L32.4,274.6L31.4,273.8L30.7,273.9L30.4,274.4L30.1,275.8L30.7,280.3L30.4,282.2L29.7,282.2L29.1,279.8L28.8,277.3L28.1,275.1L26.1,273.1L24.8,273.5L23.5,274.6L22.5,278.7L21.5,280.0L21.2,277.6L20.2,277.0L18.5,277.9L17.2,279.5L16.9,281.3L14.9,283.5L14.9,287.5L17.5,288.1L18.2,288.4L18.5,289.2L18.5,290.3L17.9,290.8L18.2,291.9L19.5,292.1L21.8,291.9L22.1,291.9L22.5,292.9L22.5,293.8L22.1,295.1L20.5,294.9L19.5,295.3L18.2,296.5L16.2,294.0L14.6,293.4L12.6,294.0L12.2,295.7L12.6,298.0L12.6,300.4L13.6,303.7L13.2,304.8L12.9,305.3L12.2,305.8L11.6,306.3L11.6,307.4L11.3,309.4L11.9,310.9L13.6,314.4L14.9,315.7L17.9,314.4L17.9,314.9L18.2,316.0L18.5,316.5L15.5,317.7L14.9,320.1L16.5,322.5L19.5,323.5L22.8,322.8L25.1,320.9L28.4,316.5L28.8,315.7L28.8,315.0L28.8,314.5L29.7,313.9L30.4,313.7L31.4,313.9L31.7,314.2L32.4,314.4L32.7,315.3L32.1,316.1L30.4,317.7L29.7,318.8L28.4,323.5L25.8,328.1L26.4,329.0L26.4,330.3L25.8,332.6L25.5,333.0L25.1,333.4L24.8,334.0L24.8,334.9L24.8,337.2L24.8,337.8L22.1,341.0L18.5,343.2L16.5,360.0L17.2,365.6L15.2,365.1L13.6,365.3L11.9,366.1L11.6,367.2L10.9,367.8L8.6,368.3L8.3,368.6L8.0,368.6L6.0,369.9L6.0,370.2L3.3,372.3L1.0,375.3L-4.2,385.6L-4.8,387.5L-5,387.6L-5,180.8ZM-5,448.0L-4.8,448.2L-2.2,450.1L-1.2,451.1L-0.5,452.7L1.3,452.2L3.3,452.8L5.0,454.0L6.0,454.9L6.6,455.7L12.6,458.6L15.2,460.9L17.9,464.1L20.8,467.0L24.5,468.2L25.8,468.6L29.4,470.5L31.1,471.6L33.7,474.2L34.7,474.8L35.7,475.3L38.0,475.8L40.6,478.0L44.3,479.6L45.9,480.8L47.2,481.7L47.6,482.2L48.9,486.6L49.9,493.6L50.5,495.1L51.5,496.2L55.8,499.3L57.5,500.2L61.8,500.5L63.8,501.0L68.4,506.0L70.7,507.5L72.0,508.9L74.0,510.2L76.3,510.7L77.0,510.4L77.9,509.7L78.9,509.2L79.9,509.5L80.3,510.2L80.9,512.8L81.6,513.6L85.9,516.8L86.9,517.9L90.2,522.4L91.2,523.1L91.8,523.9L91.2,525.6L90.5,527.6L90.2,529.0L91.2,531.0L92.8,531.1L94.5,530.1L95.1,528.7L95.8,527.6L97.4,527.6L101.4,528.4L104.4,528.2L105.0,528.4L106.0,528.9L108.0,530.6L108.7,531.0L110.3,530.8L110.3,530.3L110.0,529.0L110.6,527.1L112.0,526.1L115.6,524.2L116.2,524.0L117.9,526.8L121.2,529.7L125.5,531.9L129.5,533.2L131.1,534.5L131.8,534.8L133.7,535.0L134.4,535.3L135.4,535.6L140.0,539.0L141.0,539.8L141.3,540.9L144.0,543.8L150.3,548.7L151.9,549.3L154.2,549.3L154.9,549.5L155.5,550.3L155.9,551.3L156.9,551.4L157.8,551.3L158.5,551.3L160.8,553.4L161.5,553.8L162.8,554.0L164.8,553.4L165.8,553.2L167.8,553.5L177.7,557.2L180.3,559.2L184.3,560.3L185.6,561.1L188.6,565.9L189.2,567.4L194.5,575.3L195.2,576.4L196.5,578.8L200.8,582.7L204.4,585.8L208.7,588.9L209.0,588.9L214.6,595.6L218.3,597.6L222.9,601.8L225.9,603.7L229.2,604.9L230.5,605.7L232.8,606.2L233.8,606.3L234.4,606.6L235.4,607.9L235.8,608.3L237.4,608.7L243.0,608.3L245.7,609.4L249.6,611.5L253.9,612.9L258.9,611.5L268.1,611.5L269.1,611.7L271.8,614.4L272.7,614.9L274.1,615.2L276.7,616.8L278.0,617.5L282.7,618.4L286.0,620.4L288.6,621.0L297.8,621.7L301.5,622.7L304.1,624.6L306.1,630.6L309.1,632.9L315.0,635.9L313.4,639.0L313.7,643.9L314.7,648.9L315.7,652.3L319.6,660.1L322.6,663.8L325.6,666.1L329.5,667.2L337.5,667.9L340.8,668.7L341.8,669.3L344.1,671.4L347.4,673.1L348.0,673.7L349.3,675.0L353.3,677.9L357.3,682.0L359.3,683.8L361.9,684.6L364.5,684.9L372.1,687.2L374.4,687.4L375.8,688.3L376.8,689.3L385.3,692.4L386.0,693.4L388.0,696.9L391.3,700.0L392.3,700.5L403.2,701.5L414.4,700.2L429.2,696.9L431.2,696.1L431.9,695.5L432.9,694.3L434.9,694.0L438.8,693.9L440.1,693.2L441.8,692.4L444.1,690.1L445.1,689.6L447.1,689.5L448.1,688.8L448.7,688.2L451.4,686.5L454.0,683.9L455.3,683.0L459.6,682.3L460.3,681.5L460.9,680.2L461.6,678.6L462.6,677.6L464.6,676.8L466.9,676.1L468.5,676.0L469.9,675.0L470.9,673.1L473.2,665.9L474.2,657.8L475.1,654.2L475.8,653.3L477.8,651.0L478.4,648.1L478.8,647.3L479.4,646.0L480.4,639.8L480.1,638.0L479.4,636.3L479.1,634.5L480.1,632.9L488.7,621.8L491.7,613.6L492.3,613.3L494.0,613.1L494.6,612.9L495.3,612.3L497.3,609.6L502.2,604.2L502.9,602.8L503.2,601.3L504.5,598.1L505.5,591.8L506.5,590.2L507.8,590.5L510.1,586.6L510.8,584.3L511.1,582.4L511.8,580.5L511.8,579.3L511.5,578.7L510.8,578.2L510.5,577.2L510.5,575.5L511.1,574.2L513.1,571.4L513.8,569.8L514.1,567.9L515.4,564.2L516.1,562.4L516.1,558.5L516.4,557.5L517.1,556.1L517.7,554.2L523.0,544.8L523.7,542.9L521.7,540.9L518.7,531.1L518.7,530.3L519.1,529.2L520.7,527.9L521.0,526.8L521.4,522.9L524.3,503.6L528.6,487.4L536.2,469.2L536.9,467.6L536.9,464.4L537.2,462.6L537.9,461.3L539.5,461.2L538.9,459.3L539.9,457.8L541.5,456.8L542.5,455.2L542.5,453.6L541.8,452.0L542.2,450.8L544.5,450.8L543.8,449.0L544.1,447.1L544.8,445.1L545.1,442.9L544.8,441.0L543.8,439.0L543.2,437.6L541.8,436.5L541.8,435.8L542.5,434.9L540.2,432.0L539.5,430.2L533.9,405.9L533.9,399.8L533.6,398.2L532.3,394.9L531.9,392.9L531.9,388.8L532.9,384.9L538.2,370.4L539.2,366.4L539.5,362.4L538.9,357.9L537.5,354.3L535.6,351.4L532.9,348.8L528.6,342.3L527.0,334.5L527.3,326.0L532.3,306.7L534.6,302.1L534.9,300.0L535.2,299.1L538.2,295.6L538.9,294.2L541.5,287.6L541.8,285.4L542.8,285.9L543.8,286.0L544.8,285.9L545.8,285.4L544.5,283.8L544.8,282.4L545.8,281.3L546.1,280.0L546.5,279.0L547.4,277.3L547.4,276.5L547.4,275.5L547.1,274.4L547.1,273.5L546.8,273.1L546.5,272.5L545.8,272.0L544.8,271.6L544.5,271.1L544.1,270.4L543.8,270.0L542.8,269.0L542.2,267.9L541.2,265.4L540.8,263.9L540.5,257.4L539.5,253.4L539.2,253.1L538.5,252.8L537.9,252.3L537.5,251.5L537.5,250.7L539.5,247.5L540.5,246.1L541.5,244.4L541.8,242.8L543.2,244.2L544.5,243.3L546.5,241.7L549.8,240.1L551.7,238.0L553.1,235.8L553.7,234.0L554.1,232.6L556.4,226.7L557.0,224.0L557.4,222.5L558.3,221.5L559.3,221.5L559.3,222.5L559.0,224.8L559.3,224.8L560.7,222.6L562.3,223.1L563.6,224.7L564.9,226.3L565.9,231.8L565.9,235.9L565.9,238.0L566.6,239.0L567.6,239.6L570.2,244.2L569.9,242.5L570.2,240.6L569.9,238.5L568.6,235.2L567.9,231.2L566.9,229.9L574.9,227.4L576.5,225.9L574.2,226.1L571.2,225.9L568.9,225.5L566.9,224.8L565.6,222.9L564.9,222.0L560.3,220.5L559.3,220.2L560.7,219.0L564.3,217.1L566.3,215.5L568.3,214.8L569.2,214.0L569.9,213.7L571.2,213.7L573.2,213.7L570.9,212.9L569.2,212.0L568.3,212.0L566.6,213.7L565.3,213.2L564.0,213.2L560.7,213.7L558.3,213.7L557.0,213.2L555.7,212.5L554.7,211.5L553.4,209.1L552.7,208.0L551.4,207.4L547.4,206.1L551.4,203.6L552.7,202.1L552.4,201.5L548.1,201.8L546.8,201.5L545.1,200.2L544.8,200.7L544.5,200.9L544.5,202.6L544.5,208.3L544.8,208.5L547.1,208.5L547.8,209.0L548.1,209.9L547.1,210.2L545.1,209.9L541.2,211.7L538.9,211.7L538.2,209.6L538.5,208.2L547.4,188.0L549.1,182.2L549.8,180.7L551.1,180.4L554.7,181.7L556.4,181.7L557.4,181.2L558.3,181.1L557.4,180.6L556.7,179.8L556.4,179.0L556.4,177.7L555.7,177.7L555.4,178.4L555.0,179.2L554.4,179.6L553.4,179.5L553.1,178.4L553.4,177.1L554.4,173.3L556.0,169.7L557.4,164.1L560.3,159.4L564.0,155.7L567.6,154.6L566.9,156.5L566.3,158.1L566.3,159.5L567.9,165.1L568.3,167.0L568.3,168.9L571.2,163.2L572.5,162.4L573.5,162.7L577.8,165.5L578.8,162.7L578.5,161.6L576.8,161.1L575.5,158.4L574.9,157.6L573.9,156.8L572.9,156.8L572.2,157.0L571.2,156.7L570.6,153.7L570.9,149.1L572.5,141.2L576.5,136.3L576.8,135.0L576.2,133.6L576.5,131.2L587.7,96.9L588.1,94.8L587.7,89.5L588.1,87.4L588.4,86.0L589.7,82.8L590.4,79.4L590.0,71.5L589.1,63.7L589.7,60.6L591.7,58.7L596.0,57.8L596.6,58.5L597.6,57.6L599.3,57.0L601.3,56.6L603.2,56.5L605.2,56.0L606.9,55.1L609.2,52.1L612.5,48.4L612.8,47.2L613.2,45.8L614.8,41.5L615.5,39.9L616.8,38.7L618.1,38.4L622.1,38.7L622.4,38.4L624.0,37.1L624.4,36.8L624.7,36.6L625.0,36.5L625.4,36.2L625.7,36.2L626.0,36.3L626.0,36.9L626.0,37.6L626.0,38.0L627.4,38.8L630.7,40.6L632.0,41.5L632.3,42.1L632.0,43.1L631.3,44.0L631.0,44.7L630.0,45.3L628.7,45.9L628.0,46.2L627.4,47.2L626.7,49.2L626.0,50.2L625.4,50.5L623.4,51.0L623.1,51.4L622.4,53.8L622.7,56.0L623.1,58.1L621.7,60.4L623.7,59.8L625.4,58.4L626.4,56.3L626.7,54.3L627.7,53.2L630.0,52.7L632.0,53.0L633.0,54.3L634.0,58.9L634.3,58.9L635.3,58.7L636.3,59.0L636.9,60.7L636.3,63.7L636.9,65.6L637.9,63.6L639.9,62.5L642.2,62.3L643.9,63.0L644.2,63.9L644.8,66.7L645.2,67.7L646.2,69.0L647.2,70.2L648.2,73.2L648.5,75.9L648.8,78.7L649.8,80.9L650.1,81.3L649.5,82.1L648.8,83.5L648.5,85.7L648.5,88.5L649.1,91.2L650.8,92.9L651.8,92.8L652.8,94.1L653.4,95.8L653.8,97.2L654.1,98.2L655.4,100.1L655.7,101.0L655.4,101.8L654.8,102.7L653.8,103.8L651.8,107.6L651.1,110.0L651.5,111.0L652.8,111.9L652.8,114.0L652.4,118.1L652.8,119.0L654.1,120.8L654.4,121.9L655.1,134.2L654.4,142.1L654.8,143.5L655.7,144.8L660.7,148.9L662.0,148.8L665.0,151.9L666.6,152.7L669.3,152.4L670.9,151.9L674.6,150.2L676.9,149.7L678.9,150.5L683.5,155.4L684.1,155.4L685.8,155.2L688.4,154.6L689.4,154.8L690.4,155.9L689.4,156.8L688.1,157.1L686.1,157.3L677.2,171.6L676.5,172.0L675.9,172.2L675.2,172.8L675.2,174.6L675.2,174.9L675.9,177.4L675.6,178.5L675.6,179.5L675.2,180.3L674.6,181.1L674.9,181.4L675.2,182.0L675.9,182.3L674.9,184.1L674.6,185.8L674.6,189.8L675.2,190.4L676.9,191.0L680.2,191.4L683.5,190.7L684.5,191.0L686.1,192.3L686.8,192.6L690.7,195.3L691.1,195.6L691.4,196.4L692.4,198.0L692.7,199.4L693.1,205.3L693.4,207.4L694.4,209.1L696.0,210.6L697.0,211.2L700.6,212.3L702.0,212.5L703.3,212.9L704.6,214.0L707.3,216.4L707.3,217.1L705.3,219.6L704.3,221.3L704.9,222.1L705.3,222.9L702.3,227.7L702.0,229.3L701.0,234.5L701.0,239.8L700.3,241.5L702.3,239.0L703.0,239.6L704.3,240.2L705.3,240.4L706.3,239.9L707.6,238.8L708.6,238.8L709.6,239.3L710.6,239.6L712.9,239.3L714.2,238.6L715.5,237.9L717.2,237.1L712.9,245.5L714.2,248.5L714.5,252.5L713.5,259.9L715.8,271.6L715.8,283.8L716.2,285.1L716.5,285.7L719.8,288.3L719.8,289.4L721.1,291.0L721.8,291.9L721.8,293.0L721.8,293.8L720.8,299.7L720.8,301.5L722.1,302.3L721.8,304.0L719.1,309.3L718.5,312.5L717.5,318.0L716.5,321.7L716.2,323.5L716.5,325.1L718.1,328.6L718.5,330.3L719.1,331.3L721.8,335.6L722.4,336.2L722.1,339.1L722.4,340.2L723.1,341.2L723.4,342.1L724.1,342.9L729.7,347.4L730.4,348.5L731.4,354.3L731.0,355.9L732.0,357.9L732.3,366.9L736.0,379.3L739.3,385.3L741.3,388.0L743.6,390.4L744.9,391.3L746.2,392.1L747.5,392.6L749.2,392.9L752.5,393.1L753.1,393.7L753.8,395.5L754.8,394.4L755.8,393.9L758.1,393.6L762.1,391.3L765.4,389.9L769.7,385.4L771.0,384.5L772.6,383.8L773.9,382.4L774.9,380.8L775.6,379.3L775.9,376.8L775.9,374.2L776.3,372.0L777.6,370.9L777.9,371.4L778.6,372.1L778.9,372.8L779.2,372.3L779.6,372.1L779.9,372.0L780.2,371.5L780.5,371.5L782.2,374.7L782.5,375.3L783.9,375.8L784.8,375.8L785.8,375.8L786.8,376.6L799.4,370.9L800.4,370.2L802.0,365.8L802.3,365.0L802.7,364.8L802.7,364.0L802.7,362.7L803.0,362.2L803.7,362.4L805.0,363.0L806.3,363.5L807.0,364.3L807.6,365.1L808.0,365.6L808.9,366.4L812.9,372.1L811.9,373.7L811.6,375.8L811.6,379.7L812.2,381.6L814.2,381.7L816.2,380.6L817.2,379.3L817.5,380.8L817.2,382.7L816.5,384.5L815.5,385.1L815.2,386.2L815.5,391.3L815.9,392.9L816.5,393.6L819.2,395.5L819.5,396.5L820.5,398.9L821.2,399.8L823.1,400.3L827.1,399.3L828.4,399.5L829.7,400.8L830.7,402.4L832.1,404.0L834.4,404.6L840.3,404.8L841.6,405.3L842.3,406.1L842.6,406.7L842.6,407.5L843.0,408.5L843.6,409.3L845.3,410.7L844.9,411.2L845.6,415.8L845.6,416.6L846.6,417.6L852.2,421.4L853.5,423.5L855.8,422.2L857.8,423.0L859.8,424.6L862.1,425.4L863.4,425.6L865.1,426.4L866.4,426.7L867.7,426.5L870.0,425.9L871.3,425.9L870.4,428.5L871.0,430.6L876.3,436.8L877.6,437.1L879.6,436.5L882.6,436.5L881.3,439.0L874.3,449.0L873.7,450.9L872.3,457.7L872.7,459.3L874.0,462.0L874.6,464.6L875.6,465.5L876.6,466.2L877.9,466.3L879.3,466.0L879.9,465.2L880.6,462.5L882.2,463.8L882.9,465.7L882.2,467.4L878.6,468.9L877.0,470.3L876.6,472.1L878.3,473.5L877.3,474.5L877.0,475.5L877.3,476.4L877.0,477.4L876.3,477.7L875.0,478.5L874.3,478.8L873.7,480.4L873.3,482.5L873.3,484.0L874.3,483.3L875.0,483.3L876.3,487.0L876.6,489.0L875.3,489.9L875.0,490.3L875.0,491.2L875.3,492.0L876.0,492.5L876.0,492.8L879.3,495.4L879.6,495.9L880.3,498.0L880.6,498.9L880.3,499.7L878.9,501.7L879.3,502.1L879.6,502.5L883.2,510.5L884.2,511.8L884.6,513.1L883.9,517.6L883.9,519.2L884.2,520.2L884.9,520.6L885.2,521.0L885.2,521.8L884.6,522.9L883.6,524.8L883.2,526.1L883.6,527.9L884.2,529.0L886.2,531.0L890.2,536.3L892.1,539.7L893.1,542.9L893.1,546.4L891.2,552.9L890.8,556.3L892.8,557.5L893.1,558.0L893.8,560.5L893.8,561.9L893.1,563.2L890.5,565.9L888.8,569.0L888.8,576.1L887.5,579.3L887.9,580.5L888.2,581.4L889.2,582.2L890.2,582.7L891.8,581.9L893.5,583.0L894.1,585.0L894.5,586.9L895.1,587.9L898.4,591.3L899.4,594.5L901.1,596.3L901.4,596.8L901.7,598.2L902.7,599.9L904.0,601.3L908.3,605.0L909.3,605.7L911.6,606.6L912.3,607.3L912.9,608.1L913.3,610.2L913.6,611.2L914.6,612.0L916.2,612.9L917.2,613.6L918.9,618.1L920.5,619.1L921.9,620.9L922.2,621.7L921.9,623.0L920.9,623.3L919.9,623.5L918.9,624.0L918.9,625.2L919.6,626.2L920.5,627.2L921.5,628.6L921.5,629.3L921.5,630.9L921.9,631.6L922.9,631.9L923.5,631.7L924.2,631.1L923.2,629.1L922.9,627.4L923.2,625.9L923.8,625.2L924.5,624.8L927.1,622.3L927.8,621.4L929.5,622.5L930.4,623.5L931.4,623.6L933.7,621.7L934.4,620.9L935.1,620.4L935.7,620.1L936.7,620.1L938.4,620.6L938.7,621.7L938.0,622.8L937.7,623.3L936.7,624.3L936.7,624.6L936.4,625.1L937.1,625.6L937.1,625.9L936.4,628.0L935.7,628.8L935.1,629.3L934.4,629.9L932.8,633.3L932.1,634.5L931.8,636.6L931.8,638.4L932.4,639.8L933.7,640.5L934.4,641.3L938.0,648.2L938.7,650.2L939.0,652.3L939.0,654.6L939.7,656.0L943.0,660.9L945.3,666.9L946.3,668.4L947.9,669.8L948.9,670.3L949.6,671.3L949.3,675.5L949.6,681.2L948.9,682.2L949.9,684.4L952.2,687.8L954.9,690.3L955.9,691.7L956.2,693.5L955.5,694.8L953.2,696.9L952.2,698.4L951.9,700.5L952.1,705L-5,705ZM352.0,636.4L351.3,637.9L352.0,639.0L353.0,639.8L353.3,640.5L352.6,642.3L351.3,642.9L348.4,643.1L347.7,643.4L347.4,644.0L347.0,644.4L345.7,644.4L345.1,643.9L344.7,643.2L344.7,642.7L344.7,642.4L343.1,642.4L341.4,643.1L340.4,644.4L340.1,646.5L339.4,646.5L339.4,646.0L339.4,645.7L339.1,645.5L338.8,645.0L337.5,642.4L338.1,641.1L339.8,640.5L341.8,638.8L344.1,635.1L345.4,633.7L346.0,632.9L345.7,631.2L347.0,632.0L351.0,634.8ZM308.7,616.2L310.4,615.5L312.7,614.7L314.7,614.7L315.0,616.2L314.0,616.8L311.7,617.0L311.4,617.8L311.0,619.1L310.4,619.6L309.7,619.3L309.4,618.1L309.4,617.3L309.4,616.8L309.4,616.3ZM367.8,579.3L368.5,580.5L368.5,582.2L368.2,584.0L367.8,585.3L367.5,584.8L366.8,583.9L366.5,583.4L365.5,584.3L365.5,585.1L365.9,586.0L365.9,586.9L365.5,587.4L364.5,587.1L362.9,586.4L360.9,586.8L358.9,587.4L357.3,588.4L356.6,589.8L355.6,588.7L353.6,585.3L353.0,584.7L353.0,584.3L352.0,583.5L351.3,583.2L351.0,583.7L350.7,584.0L349.0,586.0L348.0,586.1L345.7,586.3L345.4,586.4L345.1,587.6L346.0,588.2L347.0,588.5L348.0,588.5L349.0,589.2L348.7,590.3L347.7,591.1L346.7,591.0L345.7,590.2L344.7,590.0L344.1,590.3L343.4,591.3L344.1,594.2L344.1,595.2L343.4,595.8L342.4,597.4L342.4,597.7L342.7,598.2L342.1,599.4L341.4,600.5L340.4,601.0L339.4,600.7L338.1,598.7L337.1,598.4L335.8,599.2L334.8,602.9L333.5,603.7L331.8,604.1L329.9,605.7L328.2,606.3L322.3,606.3L321.3,606.0L320.6,604.9L318.0,601.3L317.0,600.3L317.3,602.3L317.7,605.0L317.3,607.1L316.3,607.0L315.7,608.3L314.7,609.2L313.7,609.2L313.7,606.5L313.0,604.7L313.0,603.7L313.4,603.1L314.0,602.3L314.7,601.3L315.0,600.0L315.3,597.7L315.7,596.0L316.3,594.4L317.7,593.2L319.6,591.4L320.3,590.2L320.6,588.2L321.0,587.2L321.6,586.6L322.6,586.1L323.6,586.0L324.3,585.5L326.2,582.9L326.9,581.9L328.9,581.1L330.9,580.8L334.8,580.8L345.4,578.5L350.7,575.5L354.0,574.8L356.0,575.1L356.9,575.8L357.3,576.9L358.3,578.0L359.6,578.8L361.2,579.2L364.5,579.3L364.5,579.8L364.2,580.9L363.9,581.3L365.5,581.8L366.5,580.8L366.8,579.5ZM86.9,504.9L87.5,506.5L88.8,507.1L90.2,507.8L90.8,508.7L90.2,510.4L89.2,512.3L86.2,516.0L85.5,515.2L84.2,514.4L83.2,513.1L82.2,511.5L81.9,509.7L82.6,507.8L83.9,506.8L85.5,506.0ZM98.7,503.0L100.1,503.9L101.7,505.4L102.1,506.8L100.7,507.5L99.7,507.1L99.1,505.8L98.1,505.5L97.1,505.8L96.8,506.5L97.8,508.7L98.1,509.1L98.4,509.4L98.1,510.0L98.1,510.5L97.4,510.8L96.4,511.5L94.5,512.8L93.5,513.1L92.5,512.6L92.8,510.4L93.5,508.3L93.5,506.2L92.5,503.6L94.1,503.3L97.4,503.6ZM124.2,513.2L124.5,514.1L125.2,514.4L125.8,514.7L126.8,515.5L126.5,518.2L125.5,520.0L123.8,522.4L121.2,521.3L120.9,519.7L120.5,518.6L120.2,517.6L119.2,517.3L117.9,517.1L117.2,516.8L115.9,513.2L115.6,512.4L115.9,510.4L115.6,509.5L114.6,509.5L113.9,509.7L113.3,509.5L112.6,509.5L112.3,511.3L112.0,511.2L111.6,511.2L111.3,510.5L111.6,508.4L111.6,506.8L112.0,505.4L112.6,504.2L113.9,502.8L114.9,504.2L115.6,505.0L116.2,504.7L115.6,502.1L116.2,501.8L117.2,500.4L116.6,498.3L117.6,498.3L118.6,498.3L119.2,499.1L119.5,501.5L121.5,502.6L122.5,501.7L123.2,501.7L123.2,503.4L124.8,503.9L124.5,507.1L124.5,511.0L124.8,512.4ZM81.9,493.1L80.6,495.4L80.6,500.1L79.3,502.3L78.3,501.8L76.6,502.1L75.6,501.5L75.0,502.3L74.3,502.6L73.0,503.0L72.7,502.6L72.0,502.5L71.0,501.5L72.3,500.9L72.3,499.7L72.0,498.6L71.0,497.6L72.7,496.5L73.3,495.9L73.7,495.1L73.7,493.9L73.3,493.1L73.7,492.7L75.3,492.5L77.3,491.9L78.9,490.9L80.6,490.9ZM107.7,497.6L106.3,498.0L105.7,498.6L105.4,499.6L105.7,501.0L105.0,501.2L104.4,501.3L103.4,502.3L103.0,501.8L103.0,501.5L102.7,501.3L102.7,501.0L103.0,500.9L103.0,500.5L102.7,499.7L102.1,498.8L102.4,498.4L103.0,498.1L103.4,497.6L103.4,497.3L103.7,496.5L104.0,496.0L103.7,495.6L102.7,494.8L102.7,494.4L103.0,492.8L104.0,491.4L105.4,490.1L106.3,489.3L105.7,491.5L106.0,493.6ZM4.0,429.3L3.7,431.4L3.7,432.5L2.3,432.2L0.4,432.0L-1.5,433.6L-2.8,433.3L-3.2,432.6L-2.2,431.8L-1.5,431.2L-0.5,430.4L-0.2,429.3L-0.2,428.6L-1.2,428.5L-1.2,428.0L-0.5,427.7L-0.2,426.7L0.4,426.2L2.3,426.5L3.3,427.7ZM99.4,330.0L99.4,329.5L99.7,329.0L100.1,328.7L100.4,328.4L99.7,329.0L99.7,329.5ZM51.9,319.3L51.9,320.6L51.9,321.1L51.9,321.6L51.2,322.2L50.2,322.7L49.2,322.5L48.2,322.8L47.9,324.3L49.2,324.3L49.9,325.1L50.5,326.2L51.2,327.5L49.6,327.6L48.6,328.7L48.6,330.5L47.9,331.9L46.9,332.7L45.9,333.2L44.6,333.5L43.6,333.2L44.3,332.6L44.3,332.1L44.3,331.6L44.3,331.1L44.9,330.6L43.9,329.5L42.6,325.7L41.6,324.7L39.6,325.5L39.3,327.6L39.6,330.2L39.6,331.9L36.7,330.6L36.0,329.8L36.0,321.1L39.3,322.7L40.6,322.8L41.0,321.2L41.3,319.5L42.3,317.6L43.3,316.0L44.9,315.2L45.6,315.2L46.9,315.7L48.2,316.1L48.6,316.8L49.2,317.9L50.2,318.5L51.2,319.0ZM112.6,364.3L112.3,364.5L112.0,364.3L111.6,364.3L111.3,365.0L111.3,365.8L112.0,366.7L112.0,367.2L112.3,367.5L112.9,368.3L113.3,369.1L112.9,369.6L111.6,370.1L111.3,371.2L112.0,372.5L112.6,373.4L111.6,373.1L111.0,373.3L111.0,373.9L111.3,374.7L110.3,373.9L109.3,373.6L108.7,374.1L108.3,375.3L105.0,373.6L103.4,373.3L102.1,374.1L101.1,373.1L99.1,372.5L95.4,372.1L93.8,371.5L92.8,371.4L91.5,371.8L87.9,374.1L84.2,373.6L67.7,367.5L67.1,367.4L65.4,365.9L64.4,365.6L63.4,365.8L60.4,366.7L58.1,368.5L56.8,369.0L56.5,369.0L55.8,369.1L55.2,368.8L55.5,367.5L56.2,366.9L58.1,365.8L59.1,365.0L62.1,363.8L63.1,362.9L64.1,360.3L65.1,359.4L65.4,358.6L65.1,357.5L64.1,355.5L63.4,352.5L63.1,346.9L63.1,343.9L64.4,338.5L64.7,335.6L64.4,334.3L63.4,332.9L62.8,331.3L63.1,330.0L64.4,329.2L65.7,329.8L68.0,331.9L68.7,331.4L71.0,331.4L72.3,331.4L73.7,330.0L73.0,328.7L74.0,327.0L74.6,327.3L75.6,329.2L77.0,330.2L77.9,328.1L78.6,328.6L79.9,329.4L79.9,326.8L81.2,327.5L82.6,327.1L83.2,326.0L81.9,324.7L81.2,325.5L80.6,323.9L80.6,322.4L79.9,321.1L77.9,321.1L78.6,320.1L78.9,319.2L78.6,318.5L77.3,318.4L77.9,317.6L78.6,317.1L79.6,316.9L80.6,317.1L81.9,317.4L82.2,317.7L81.9,318.0L81.9,318.4L81.9,318.8L81.9,320.0L81.9,320.3L82.2,320.4L82.9,320.3L83.2,319.8L83.2,319.6L83.6,319.3L83.9,318.8L84.6,318.5L85.5,319.0L87.2,316.5L87.5,315.5L87.9,314.7L90.2,314.7L91.2,313.9L91.8,315.5L91.8,317.6L90.8,319.5L88.2,320.8L87.5,321.7L87.5,323.0L87.9,323.9L88.8,324.6L89.8,324.7L90.8,324.7L91.8,324.7L91.5,325.5L90.2,327.5L90.8,328.9L90.8,330.0L91.2,331.0L92.5,331.9L93.8,332.4L98.4,333.2L100.1,332.9L101.4,332.1L102.4,330.6L102.7,329.0L102.4,328.4L101.7,327.9L101.1,328.1L100.4,328.3L101.1,327.8L101.4,327.5L102.7,323.5L104.0,324.3L106.7,323.8L108.3,324.3L108.7,324.9L109.6,326.2L110.0,327.6L110.3,328.7L109.3,329.8L106.7,332.6L105.7,333.8L104.0,339.1L100.7,338.1L98.1,339.4L95.8,342.0L95.1,345.0L95.4,346.8L96.1,347.6L97.1,348.0L98.1,348.8L98.4,348.8L99.4,349.3L99.7,349.9L99.1,350.1L98.4,350.3L97.8,350.6L97.1,351.2L97.1,352.0L95.4,351.4L94.5,352.0L94.1,353.1L94.5,354.6L93.5,353.5L92.5,353.0L91.2,353.1L90.2,354.1L90.5,355.2L90.5,356.5L90.2,359.1L91.2,362.9L91.2,364.0L91.8,364.6L92.8,365.0L94.5,365.1L97.1,364.8L97.4,364.8L97.1,364.2L97.1,362.7L97.8,361.3L99.7,362.2L105.4,366.7L106.3,366.9L107.3,365.9L108.0,365.0L108.7,363.8L109.3,362.6L109.6,361.1L110.3,361.1L111.3,361.8L112.3,361.8L113.9,361.3L115.3,361.1L114.3,361.8L113.6,362.7ZM38.0,293.8L38.0,291.3L36.7,289.9L36.3,288.1L34.0,286.8L36.3,287.0L37.7,289.2L39.0,289.5L40.3,291.6L42.0,294.2L42.3,294.8L42.6,295.4L43.6,295.6L43.9,296.2L43.6,297.7L41.0,295.7L41.0,297.7L39.6,297.3L39.6,298.9L40.3,301.2L39.0,303.2L38.7,305.6L37.3,304.3L37.7,302.8L39.0,301.2L38.3,300.2L37.7,299.4L36.7,297.3ZM100.4,166.0L100.7,166.8L101.1,168.7L100.7,170.1L101.4,171.2L100.7,171.9L100.1,171.7L99.4,170.8L98.4,169.0L98.7,166.8ZM52.2,156.7L54.5,157.6L53.2,160.2L50.2,162.5L46.9,163.6L45.6,164L44.6,164.7L43.6,165.5L42.3,166.2L41.0,166.2L39.3,165.9L38.0,165.2L37.3,164.3L37.7,163.3L37.7,162.4L37.7,161.4L37.3,160.5L38.7,161.1L39.6,161.9L40.3,162.1L41.3,161.4L43,159.5L43.6,158.9L44.9,159.0L44.6,159.5L44.3,160.3L44.3,161.3L44.6,161.7L45.3,161.6L46.9,161.1L47.6,161.1L49.2,160.3L51.2,157.3ZM68.0,148.9L68.7,146.5L68.7,143.8L69.4,141.5L71.0,139.9L71.0,141.6L69.4,146.2L69.4,147.2L69.7,147.8L69.7,148.4L69.4,149.5L68.7,150.0L68.4,150.2L68.0,149.7ZM80.9,135.0L82.2,134.0L82.6,134.2L82.6,135.0L81.9,136.1L79.9,137.7L79.3,138.6L78.6,139.9L77.0,139.6L74.0,140.0L73.0,139.3L74.0,138.0L74.6,137.7L76.6,138.0L77.6,137.7L78.9,136.7ZM21.5,131.4L20.8,129.1L23.8,127.1L27.8,125.2L30.4,126.1L27.4,129.6L26.1,131.5L24.1,132.3ZM64.1,112.9L67.1,111.0L68.4,109.8L69.4,108.4L69.7,110.6L69.0,112.5L67.4,114.3L62.4,117.1L61.4,117.4L61.1,117.9L59.8,120.6L55.2,122.8L54.5,123.6L53.8,123.9L53.5,123.8L52.9,123.3L52.9,123.0L51.5,123.8L50.5,125.0L49.2,126.3L46.6,127.1L46.6,126.3L43.3,129.0L41.6,129.6L42.0,129.1L42.3,128.7L42.3,128.2L43,125.8L43.6,125.0L44.9,124.7L46.6,123.9L47.6,122.5L48.6,120.6L49.9,118.9L51.5,118.1L51.5,118.9L53.2,120.6L54.8,121.7L55.5,120.9L55.8,120.1L59.1,116.2L59.5,116.5L59.8,116.8L60.1,115.4L61.4,114.4ZM95.4,69.0L93.8,74.0L92.8,78.1L91.5,81.6L91.2,84.6L90.5,84.9L90.2,85.1L89.8,85.1L87.9,86.2L86.9,89.2L83.9,92.0L82.9,96.1L81.6,96.6L79.6,100.5L75.3,105.4L74.6,106.7L73.7,107.0L73.3,106.4L72.7,105.9L72.0,106.2L70.7,107.8L69.4,107.2L70.7,105.9L71.3,104.8L69.7,103.8L71.0,102.6L74.0,100.5L77.0,98.5L77.0,97.7L78.6,95.9L78.6,93.7L79.3,91.8L81.9,87.4L85.5,82.7L88.5,81.9L89.5,78.4L90.5,76.5L90.5,74.3L91.8,73.4L92.5,72.7L92.8,71.3L91.5,70.1L93.1,68.0L93.5,68.3L93.8,68.5L94.1,68.6L94.5,68.8L94.8,67.8L95.4,67.1ZM599.0,34.1L601.3,36.3L601.6,37.4L601.6,38.7L601.3,39.0L600.9,39.0L599.9,38.8L599.0,38.8L597.0,39.6L595.7,39.9L594.7,40.4L593.7,41.5L593.0,42.8L593.0,43.7L589.7,42.5L589.1,41.8L588.1,40.1L586.7,38.2L586.1,35.8L586.4,32.8L586.7,32.4L587.1,32.1L587.4,31.7L589.1,31.6L589.4,31.3L589.7,31.0L590.4,30.3L592.0,29.4L592.4,29.4L592.4,28.9L593.3,27.2L595.3,27.6L596.6,29.9ZM599.6,25.9L602.6,25.4L604.9,26.9L605.6,29.1L603.6,31.0L600.9,31.7L599.0,30.3L598.3,28.0ZM603.1,-5L602.3,-3.6L600.9,-4.1L600.0,-5L603.1,-5Z\" fill=\"#f6f2e4\" stroke=\"#596d55\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/> <text x=\"262.9\" y=\"260\" class=\"lm-sea lm-big\">Gulf of Carpentaria</text> <text x=\"993.8\" y=\"210\" class=\"lm-sea lm-big\">Coral Sea</text> <text x=\"890.4\" y=\"394.8\" class=\"lm-sea\">Princess</text><text x=\"890.4\" y=\"416.8\" class=\"lm-sea\">Charlotte Bay</text> <text x=\"507.70000000000005\" y=\"642.1\" class=\"lm-region\" transform=\"rotate(-58 507.70000000000005 642.1)\">CAPE YORK PENINSULA</text> <ellipse clip-path=\"url(#ls-land-__U__)\" cx=\"720.4\" cy=\"370.15\" rx=\"95\" ry=\"80\" fill=\"url(#ls-glow-__U__)\"/> <g class=\"lm-town\"> <circle cx=\"685.7\" cy=\"342.1\" r=\"4\"/><text x=\"675.7\" y=\"347.1\" text-anchor=\"end\">Coen</text><circle cx=\"562.9\" cy=\"218.1\" r=\"4\"/><text x=\"572.9\" y=\"223.1\">Weipa</text><circle cx=\"873.8\" cy=\"486.6\" r=\"4\"/><text x=\"863.8\" y=\"491.6\" text-anchor=\"end\">Cooktown</text><circle cx=\"922.2\" cy=\"624.9\" r=\"4\"/><text x=\"912.2\" y=\"629.9\" text-anchor=\"end\">Cairns</text><circle cx=\"611.5\" cy=\"55\" r=\"4\"/><text x=\"601.5\" y=\"60\" text-anchor=\"end\">Bamaga</text> </g> <g transform=\"translate(730.4 353.5)\"><path d=\"M0 0 C-4 -10 -15 -18 -15 -28 A15 15 0 1 1 15 -28 C15 -18 4 -10 0 0Z\" fill=\"#b8765c\" stroke=\"#faf8f0\" stroke-width=\"2.4\"/><circle cy=\"-28\" r=\"5.5\" fill=\"#faf8f0\"/></g> <text x=\"754.4\" y=\"295.5\" class=\"lm-main\">Lama Lama Country</text> <text x=\"754.4\" y=\"319.5\" class=\"lm-sub\">PORT STEWART</text> <g transform=\"translate(1440 70)\" class=\"lm-north\"><path d=\"M0 -24 L9 9 L0 3 L-9 9Z\" fill=\"#596d55\"/><text y=\"30\" text-anchor=\"middle\">N</text></g> <g transform=\"translate(1364.9 660)\" class=\"lm-scale\"><rect width=\"42.55\" height=\"6\" fill=\"#596d55\"/><rect x=\"42.55\" width=\"42.55\" height=\"6\" fill=\"#faf8f0\" stroke=\"#596d55\"/><text y=\"-8\">0</text><text x=\"85.1\" y=\"-8\" text-anchor=\"end\">100 km</text></g> <g transform=\"translate(40 465)\" class=\"lm-inset\"><rect x=\"-10\" y=\"-10\" width=\"210\" height=\"199\" rx=\"3\" fill=\"#faf8f0\" stroke=\"#d8d3c3\"/><path d=\"M157.0,148.3L159.6,148.7L159.9,155.6L158.4,157.6L158.0,162.4L156.4,160.8L153.4,165L152.5,164.6L149.8,164.4L147.2,159.3L146.6,155.4L144.0,150.4L144.2,147.7L147.0,148.2L151.2,150.2L153.6,149.4ZM63.1,101.6L58.5,104.3L54.7,105.5L53.9,108.2L52.3,110.3L48.6,110.5L45.8,110.9L42.0,110.0L38.9,110.5L35.9,110.8L33.3,113.6L32.0,113.4L29.8,114.9L27.7,116.5L24.5,116.3L21.6,116.3L17.0,113L14.6,111.9L14.7,108.9L16.9,108.2L17.6,107.0L17.5,105.2L18.0,101.6L17.5,98.5L15.2,93.4L14.5,90.5L14.7,87.6L13.0,84.4L12.9,82.9L10.9,81.0L10.4,77.1L7.9,73.2L7.3,71.2L9.2,73.3L7.7,68.8L9.9,70.2L11.2,72.0L11.1,69.6L9.0,65.8L8.5,64.3L7.5,62.8L8.0,60.1L8.9,58.9L9.5,56.5L9.0,53.7L10.8,50.4L11.1,53.9L13.0,50.7L16.5,49.1L18.7,47.1L22.0,45.4L24.0,45.1L25.2,45.6L28.6,43.9L31.2,43.4L31.9,42.4L33.1,42.0L35.5,42.1L40.0,40.7L42.4,38.7L43.5,36.2L46.1,33.9L46.3,32.0L46.4,29.6L49.4,25.7L51.3,29.6L53.1,28.7L51.6,26.6L53.0,24.3L54.9,25.3L55.4,21.9L57.8,19.7L58.8,17.9L61.0,17.1L61.1,15.9L63.0,16.4L63.1,15.3L65.0,14.6L67.1,14.0L70.3,16.1L72.8,18.7L75.5,18.8L78.2,19.2L77.3,16.7L79.4,13.1L81.4,11.9L80.7,10.8L82.6,8.3L85.2,6.7L87.5,7.2L91.1,6.4L91.1,4.1L87.9,2.6L90.2,2.0L93.1,3.1L95.4,4.9L99.1,6.1L100.3,5.6L103.0,7.0L105.5,5.7L107.2,6.1L108.2,5.2L110.2,7.4L109.0,9.8L107.4,11.6L105.9,11.8L106.4,13.6L105.1,15.8L103.6,18.0L103.9,19.3L107.3,21.8L110.7,23.3L112.9,24.8L116.1,27.5L117.3,27.5L119.6,28.7L120.3,30.1L124.4,31.6L127.3,30.1L128.2,27.6L129.0,25.6L129.6,23.1L130.9,19.5L130.3,17.3L130.6,16.0L130.1,13.5L130.7,10.1L131.5,9.2L130.8,7.7L131.9,5.3L132.7,2.9L132.8,1.6L134.4,0L135.7,2.1L136.0,4.9L137.1,5.4L137.2,7.3L138.8,9.6L139.2,12.1L139.0,13.8L140.6,17.3L143.4,15.6L144.8,17.5L146.9,19.3L146.4,21.3L147.4,25.1L148.0,27.4L149.1,28.0L150.3,31.9L149.9,34.2L151.3,37.4L156.0,39.8L159.1,42.0L162.0,44.0L161.5,45.1L164.0,48.0L165.7,53.1L167.4,52.1L169.2,54.1L170.2,53.4L171.0,58.4L174.1,61.3L176.1,63.2L179.5,67.1L180.7,70.9L180.8,73.7L180.5,76.7L182.6,80.9L182.4,85.3L181.6,87.6L180.4,92.1L180.5,95.0L179.7,98.7L177.7,103.4L174.5,105.9L172.9,109.9L171.5,112.5L170.2,117.1L168.5,119.8L167.4,123.8L166.8,127.6L167.0,129.3L164.6,131.2L159.7,131.4L155.6,133.7L153.7,135.8L151.0,138.2L147.4,135.8L144.7,134.8L145.4,131.9L143.0,132.9L139.2,137.0L135.5,135.5L133.0,134.6L130.5,134.2L126.3,132.6L123.4,129.2L122.6,125.0L121.6,122.3L119.5,120.1L115.3,119.5L116.7,116.9L115.7,112.9L113.5,116.6L109.7,117.6L111.9,114.6L112.6,111.6L114.3,109.0L113.9,105.2L110.4,109.6L107.7,111.4L106.0,115.6L102.6,113.4L102.7,110.6L100.0,106.8L97.7,104.9L98.5,103.7L92.9,100.6L89.9,100.4L85.7,97.9L77.9,98.4L72.2,100.3L67.3,102.0Z\" fill=\"#e6e9dc\" stroke=\"#596d55\" stroke-width=\".9\"/><polyline points=\"114.8,26.2 114.8,70.6 127.9,70.6 127.9,85.4 162.3,85.4 168.9,83.4 182.6,81.3\" fill=\"none\" stroke=\"#596d55\" stroke-width=\".8\" stroke-dasharray=\"3 3\"/><rect x=\"120.0\" y=\"-1.6\" width=\"41.0\" height=\"33.3\" fill=\"rgba(184,118,92,.2)\" stroke=\"#b8765c\" stroke-width=\"1.6\"/><text x=\"95\" y=\"181\" text-anchor=\"middle\">AUSTRALIA</text><text x=\"136.8\" y=\"44.6\">QLD</text></g> </svg>";
const LOCATION_MAP_SVG = "<svg class=\"loc-map\" viewBox=\"0 0 400 520\" role=\"img\" aria-labelledby=\"locmap-title-__U__ locmap-desc-__U__\"> <title id=\"locmap-title-__U__\">Location of Lama Lama Country</title> <desc id=\"locmap-desc-__U__\">Map of Cape York Peninsula, Queensland. Lama Lama Country is on the east coast around Port Stewart and Princess Charlotte Bay, about 590 kilometres north-north-west of Cairns.</desc> <defs> <pattern id=\"lm-sea-__U__\" width=\"9\" height=\"9\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(30)\"> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"9\" stroke=\"#9db3aa\" stroke-width=\"0.8\" opacity=\".45\"/> </pattern> <radialGradient id=\"lm-glow-__U__\"> <stop offset=\"0\" stop-color=\"#b8765c\" stop-opacity=\".42\"/> <stop offset=\".65\" stop-color=\"#b8765c\" stop-opacity=\".16\"/> <stop offset=\"1\" stop-color=\"#b8765c\" stop-opacity=\"0\"/> </radialGradient> </defs> <rect width=\"400\" height=\"520\" fill=\"#e4ece6\"/> <rect width=\"400\" height=\"520\" fill=\"url(#lm-sea-__U__)\"/> <path d=\"M-5,506.0L-4.7,506.0L-3.7,505.2L-3.0,503.7L-1.2,498.3L-0.5,492.1L0.2,489.3L0.7,488.6L2.2,486.9L2.7,484.6L3.0,484.0L3.5,483.0L4.2,478.3L4.0,476.9L3.5,475.6L3.2,474.2L4.0,473.0L10.6,464.5L12.8,458.2L13.3,458.0L14.6,457.9L15.1,457.7L15.6,457.2L17.1,455.1L20.9,451.1L21.4,449.9L21.7,448.8L22.7,446.4L23.4,441.5L24.2,440.3L25.2,440.5L27.0,437.6L27.5,435.8L27.7,434.4L28.2,432.9L28.2,432.0L28.0,431.5L27.5,431.1L27.2,430.4L27.2,429.0L27.7,428.1L29.3,426.0L29.8,424.7L30.0,423.2L31.0,420.4L31.5,419.0L31.5,416.1L31.8,415.3L32.3,414.2L32.8,412.8L36.8,405.6L37.3,404.1L35.8,402.6L33.6,395.1L33.6,394.5L33.8,393.6L35.1,392.7L35.3,391.8L35.6,388.8L37.8,374.1L41.1,361.6L46.9,347.7L47.4,346.5L47.4,344.1L47.7,342.7L48.2,341.7L49.5,341.6L49.0,340.1L49.7,339.0L51.0,338.3L51.7,337.1L51.7,335.8L51.2,334.6L51.5,333.6L53.3,333.6L52.8,332.3L53.0,330.8L53.5,329.3L53.8,327.6L53.5,326.1L52.8,324.7L52.2,323.6L51.2,322.7L51.2,322.2L51.7,321.5L50.0,319.3L49.5,317.9L45.2,299.3L45.2,294.6L44.9,293.4L43.9,290.9L43.7,289.4L43.7,286.2L44.4,283.3L48.5,272.1L49.2,269.1L49.5,266.0L49.0,262.6L48.0,259.8L46.4,257.6L44.4,255.6L41.1,250.6L39.9,244.7L40.1,238.2L43.9,223.4L45.7,219.9L45.9,218.3L46.2,217.6L48.5,214.9L49.0,213.8L51.0,208.8L51.2,207.1L52.0,207.5L52.8,207.6L53.5,207.5L54.3,207.1L53.3,205.9L53.5,204.8L54.3,203.9L54.5,203.0L54.8,202.2L55.5,200.9L55.5,200.3L55.5,199.6L55.3,198.7L55.3,198.0L55.0,197.7L54.8,197.2L54.3,196.9L53.5,196.5L53.3,196.1L53.0,195.7L52.8,195.3L52.0,194.6L51.5,193.7L50.7,191.8L50.5,190.7L50.2,185.7L49.5,182.6L49.2,182.4L48.7,182.2L48.2,181.8L48.0,181.2L48.0,180.6L49.5,178.1L50.2,177.0L51.0,175.7L51.2,174.5L52.2,175.6L53.3,174.9L54.8,173.6L57.3,172.4L58.8,170.8L59.8,169.1L60.3,167.8L60.6,166.7L62.4,162.2L62.9,160.2L63.1,158.9L63.9,158.2L64.6,158.2L64.6,158.9L64.4,160.8L64.6,160.8L65.6,159.1L66.9,159.4L67.9,160.6L68.9,161.9L69.7,166.1L69.7,169.3L69.7,170.8L70.2,171.6L70.9,172.1L73.0,175.6L72.7,174.3L73.0,172.8L72.7,171.2L71.7,168.7L71.2,165.6L70.4,164.7L76.5,162.7L77.8,161.6L76.0,161.7L73.7,161.6L72.0,161.2L70.4,160.8L69.4,159.3L68.9,158.6L65.4,157.5L64.6,157.2L65.6,156.3L68.4,154.8L69.9,153.6L71.4,153.1L72.2,152.5L72.7,152.3L73.7,152.3L75.2,152.3L73.5,151.7L72.2,150.9L71.4,150.9L70.2,152.3L69.2,151.9L68.2,151.9L65.6,152.3L63.9,152.3L62.9,151.9L61.8,151.3L61.1,150.6L60.1,148.7L59.6,147.9L58.6,147.4L55.5,146.4L58.6,144.5L59.6,143.4L59.3,142.9L56.0,143.2L55.0,142.9L53.8,141.9L53.5,142.3L53.3,142.4L53.3,143.8L53.3,148.1L53.5,148.3L55.3,148.3L55.8,148.6L56.0,149.3L55.3,149.6L53.8,149.3L50.7,150.7L49.0,150.7L48.5,149.1L48.7,148.0L55.5,132.6L56.8,128.1L57.3,127.0L58.3,126.8L61.1,127.8L62.4,127.8L63.1,127.4L63.9,127.3L63.1,126.9L62.6,126.3L62.4,125.7L62.4,124.7L61.8,124.7L61.6,125.2L61.3,125.8L60.8,126.2L60.1,126.1L59.8,125.2L60.1,124.2L60.8,121.3L62.1,118.5L63.1,114.3L65.4,110.7L68.2,107.9L70.9,107.0L70.4,108.5L69.9,109.7L69.9,110.8L71.2,115.0L71.4,116.5L71.4,117.9L73.7,113.6L74.7,113.0L75.5,113.2L78.8,115.4L79.5,113.2L79.3,112.4L78.0,112.0L77.0,109.9L76.5,109.3L75.7,108.7L75.0,108.7L74.5,108.8L73.7,108.6L73.2,106.3L73.5,102.8L74.7,96.7L77.8,93.0L78.0,92.0L77.5,90.9L77.8,89.1L86.4,62.9L86.6,61.3L86.4,57.2L86.6,55.6L86.9,54.5L87.9,52.1L88.4,49.5L88.1,43.4L87.4,37.5L87.9,35.1L89.4,33.6L92.7,32.9L93.2,33.5L93.9,32.8L95.2,32.3L96.7,32.1L98.2,32.0L99.7,31.6L101.0,30.9L102.8,28.6L105.3,25.8L105.6,24.8L105.8,23.7L107.1,20.5L107.6,19.3L108.6,18.3L109.6,18.1L112.6,18.3L112.9,18.1L114.1,17.1L114.4,16.9L114.6,16.8L114.9,16.6L115.2,16.4L115.4,16.4L115.7,16.5L115.7,17.0L115.7,17.5L115.7,17.8L116.7,18.4L119.2,19.8L120.2,20.5L120.5,21.0L120.2,21.7L119.7,22.4L119.4,22.9L118.7,23.4L117.7,23.9L117.2,24.1L116.7,24.8L116.2,26.4L115.7,27.1L115.2,27.4L113.6,27.7L113.4,28.1L112.9,29.9L113.1,31.6L113.4,33.2L112.4,35.0L113.9,34.5L115.2,33.4L115.9,31.8L116.2,30.3L116.9,29.4L118.7,29.1L120.2,29.3L121.0,30.3L121.7,33.8L122.0,33.8L122.7,33.6L123.5,33.9L124.0,35.2L123.5,37.5L124.0,39.0L124.8,37.4L126.3,36.5L128.0,36.4L129.3,36.9L129.6,37.6L130.1,39.8L130.3,40.5L131.1,41.5L131.8,42.5L132.6,44.7L132.8,46.8L133.1,49.0L133.8,50.7L134.1,50.9L133.6,51.5L133.1,52.6L132.8,54.3L132.8,56.5L133.3,58.5L134.6,59.8L135.4,59.7L136.1,60.7L136.6,62.0L136.9,63.1L137.1,63.8L138.1,65.3L138.4,66.0L138.1,66.6L137.6,67.3L136.9,68.2L135.4,71.1L134.9,72.9L135.1,73.6L136.1,74.4L136.1,75.9L135.9,79.1L136.1,79.8L137.1,81.1L137.4,82.0L137.9,91.4L137.4,97.5L137.6,98.6L138.4,99.5L142.2,102.7L143.2,102.5L145.5,105.0L146.7,105.6L148.8,105.3L150.0,105.0L152.8,103.6L154.6,103.3L156.1,103.9L159.6,107.6L160.1,107.6L161.4,107.5L163.4,107.0L164.2,107.2L164.9,108.0L164.2,108.7L163.2,109.0L161.6,109.1L154.8,120.0L154.3,120.4L153.8,120.5L153.3,121.0L153.3,122.3L153.3,122.5L153.8,124.5L153.6,125.3L153.6,126.1L153.3,126.7L152.8,127.3L153.0,127.5L153.3,128.0L153.8,128.2L153.0,129.6L152.8,130.9L152.8,133.9L153.3,134.4L154.6,134.9L157.1,135.2L159.6,134.7L160.4,134.9L161.6,135.9L162.1,136.1L165.2,138.2L165.4,138.4L165.7,139.0L166.4,140.2L166.7,141.3L166.9,145.8L167.2,147.4L168.0,148.7L169.2,149.8L170.0,150.3L172.8,151.2L173.8,151.3L174.8,151.7L175.8,152.5L177.8,154.3L177.8,154.8L176.3,156.8L175.5,158.1L176.0,158.7L176.3,159.3L174.0,162.9L173.8,164.2L173.0,168.2L173.0,172.2L172.5,173.5L174.0,171.6L174.5,172.1L175.5,172.5L176.3,172.7L177.0,172.3L178.1,171.5L178.8,171.5L179.6,171.8L180.3,172.1L182.1,171.8L183.1,171.3L184.1,170.7L185.4,170.1L182.1,176.6L183.1,178.9L183.4,181.9L182.6,187.6L184.4,196.5L184.4,205.9L184.6,206.9L184.9,207.3L187.4,209.3L187.4,210.1L188.4,211.4L188.9,212.1L188.9,212.9L188.9,213.6L188.2,218.1L188.2,219.4L189.2,220.0L188.9,221.4L186.9,225.4L186.4,227.8L185.6,232.1L184.9,234.9L184.6,236.2L184.9,237.5L186.1,240.1L186.4,241.5L186.9,242.2L188.9,245.5L189.4,246.0L189.2,248.2L189.4,249.0L189.9,249.8L190.2,250.5L190.7,251.1L195.0,254.5L195.5,255.4L196.2,259.8L196.0,261.0L196.8,262.6L197.0,269.4L199.8,279.0L202.3,283.5L203.8,285.6L205.6,287.4L206.6,288.2L207.6,288.8L208.6,289.1L209.9,289.4L212.4,289.5L212.9,290.0L213.4,291.3L214.2,290.5L214.9,290.1L216.7,289.9L219.7,288.2L222.3,287.1L225.6,283.6L226.6,282.9L227.8,282.4L228.8,281.3L229.6,280.1L230.1,279.0L230.4,277.0L230.4,275.1L230.6,273.4L231.6,272.5L231.9,272.9L232.4,273.5L232.6,274.0L232.9,273.6L233.1,273.5L233.4,273.4L233.6,273.0L233.9,273.0L235.2,275.4L235.4,275.9L236.4,276.3L237.2,276.3L237.9,276.3L238.7,276.9L248.3,272.5L249.0,272.0L250.3,268.6L250.6,268.0L250.8,267.9L250.8,267.2L250.8,266.3L251.1,265.9L251.6,266.0L252.6,266.5L253.6,266.9L254.1,267.5L254.6,268.1L254.9,268.5L255.6,269.1L258.6,273.5L257.9,274.7L257.6,276.3L257.6,279.2L258.1,280.7L259.7,280.8L261.2,280.0L261.9,279.0L262.2,280.1L261.9,281.6L261.4,282.9L260.7,283.4L260.4,284.2L260.7,288.2L260.9,289.4L261.4,289.9L263.4,291.3L263.7,292.1L264.5,293.9L265.0,294.6L266.5,295.0L269.5,294.3L270.5,294.4L271.5,295.4L272.3,296.6L273.3,297.8L275.1,298.3L279.6,298.4L280.6,298.8L281.1,299.4L281.4,299.9L281.4,300.5L281.6,301.3L282.1,301.9L283.4,303.0L283.2,303.3L283.7,306.9L283.7,307.5L284.4,308.2L288.7,311.2L289.7,312.8L291.5,311.8L293.0,312.4L294.5,313.6L296.3,314.2L297.3,314.4L298.6,315.0L299.6,315.2L300.6,315.1L302.4,314.6L303.4,314.6L302.6,316.6L303.1,318.2L307.2,323.0L308.2,323.2L309.7,322.7L312.0,322.7L310.9,324.7L305.6,332.3L305.1,333.8L304.1,338.9L304.4,340.1L305.4,342.2L305.9,344.2L306.6,344.9L307.4,345.4L308.4,345.5L309.4,345.3L309.9,344.7L310.4,342.6L311.7,343.6L312.2,345.0L311.7,346.4L308.9,347.5L307.7,348.6L307.4,350.0L308.7,351.1L307.9,351.8L307.7,352.5L307.9,353.3L307.7,354.0L307.2,354.3L306.1,354.9L305.6,355.1L305.1,356.4L304.9,357.9L304.9,359.1L305.6,358.6L306.1,358.6L307.2,361.4L307.4,362.9L306.4,363.6L306.1,363.9L306.1,364.6L306.4,365.2L306.9,365.6L306.9,365.8L309.4,367.8L309.7,368.2L310.2,369.8L310.4,370.5L310.2,371.1L309.2,372.6L309.4,373.0L309.7,373.2L312.5,379.4L313.2,380.3L313.5,381.3L313.0,384.8L313.0,386.0L313.2,386.7L313.7,387.1L314.0,387.4L314.0,388.0L313.5,388.8L312.7,390.3L312.5,391.3L312.7,392.7L313.2,393.5L314.7,395.0L317.8,399.1L319.3,401.7L320.0,404.1L320.0,406.8L318.5,411.8L318.3,414.4L319.8,415.3L320.0,415.7L320.5,417.6L320.5,418.7L320.0,419.7L318.0,421.8L316.8,424.1L316.8,429.5L315.7,432.0L316.0,432.9L316.2,433.6L317.0,434.2L317.8,434.6L319.0,434.0L320.3,434.9L320.8,436.3L321.0,437.8L321.6,438.6L324.1,441.2L324.8,443.6L326.1,445.0L326.4,445.4L326.6,446.5L327.4,447.7L328.4,448.8L331.7,451.7L332.4,452.2L334.2,452.9L334.7,453.4L335.2,454.0L335.4,455.6L335.7,456.4L336.5,457.0L337.7,457.7L338.5,458.2L339.7,461.7L341.0,462.4L342.0,463.8L342.3,464.4L342.0,465.4L341.3,465.7L340.5,465.8L339.7,466.2L339.7,467.1L340.2,467.9L341.0,468.6L341.8,469.7L341.8,470.2L341.8,471.5L342.0,472.0L342.8,472.2L343.3,472.1L343.8,471.6L343.0,470.1L342.8,468.8L343.0,467.6L343.5,467.1L344.0,466.8L346.1,464.9L346.6,464.2L347.8,465.0L348.6,465.8L349.3,465.9L351.1,464.4L351.6,463.8L352.1,463.4L352.6,463.2L353.4,463.2L354.6,463.6L354.9,464.4L354.4,465.3L354.1,465.7L353.4,466.4L353.4,466.6L353.1,467.0L353.6,467.4L353.6,467.6L353.1,469.3L352.6,469.9L352.1,470.2L351.6,470.7L350.4,473.3L349.8,474.2L349.6,475.8L349.6,477.2L350.1,478.3L351.1,478.8L351.6,479.4L354.4,484.7L354.9,486.2L355.2,487.8L355.2,489.6L355.7,490.7L358.2,494.4L360.0,499.0L360.7,500.1L362.0,501.2L362.7,501.6L363.2,502.4L363.0,505.6L363.2,509.9L362.7,510.7L363.5,512.4L365.3,515.0L367.3,516.9L368.0,518.0L368.3,519.4L367.8,520.4L366.0,522.0L365.3,523.1L365.0,524.7L365.0,525L-5,525ZM94.9,14.8L96.7,16.5L97.0,17.4L97.0,18.3L96.7,18.6L96.5,18.6L95.7,18.4L94.9,18.4L93.4,19.0L92.4,19.3L91.7,19.6L90.9,20.5L90.4,21.5L90.4,22.2L87.9,21.2L87.4,20.7L86.6,19.4L85.6,18.0L85.1,16.2L85.3,13.9L85.6,13.5L85.8,13.3L86.1,13.0L87.4,12.9L87.6,12.7L87.9,12.4L88.4,11.9L89.6,11.2L89.9,11.2L89.9,10.8L90.6,9.5L92.2,9.9L93.2,11.6ZM95.4,8.6L97.7,8.2L99.5,9.3L100.0,11.0L98.5,12.4L96.5,13.0L94.9,11.9L94.4,10.1Z\" fill=\"#f6f2e4\" stroke=\"#596d55\" stroke-width=\"1.1\" stroke-linejoin=\"round\"/> <text x=\"14\" y=\"62\" class=\"lm-sea\">Gulf of</text><text x=\"14\" y=\"80\" class=\"lm-sea\">Carpentaria</text> <text x=\"292\" y=\"150\" class=\"lm-sea\">Coral Sea</text> <text x=\"268\" y=\"272\" class=\"lm-sea lm-small\">Princess</text> <text x=\"268\" y=\"287\" class=\"lm-sea lm-small\">Charlotte Bay</text> <text x=\"170\" y=\"494\" class=\"lm-region\" transform=\"rotate(-62 170 494)\">CAPE YORK PENINSULA</text> <clipPath id=\"lm-land-__U__\"><path d=\"M-5,506.0L-4.7,506.0L-3.7,505.2L-3.0,503.7L-1.2,498.3L-0.5,492.1L0.2,489.3L0.7,488.6L2.2,486.9L2.7,484.6L3.0,484.0L3.5,483.0L4.2,478.3L4.0,476.9L3.5,475.6L3.2,474.2L4.0,473.0L10.6,464.5L12.8,458.2L13.3,458.0L14.6,457.9L15.1,457.7L15.6,457.2L17.1,455.1L20.9,451.1L21.4,449.9L21.7,448.8L22.7,446.4L23.4,441.5L24.2,440.3L25.2,440.5L27.0,437.6L27.5,435.8L27.7,434.4L28.2,432.9L28.2,432.0L28.0,431.5L27.5,431.1L27.2,430.4L27.2,429.0L27.7,428.1L29.3,426.0L29.8,424.7L30.0,423.2L31.0,420.4L31.5,419.0L31.5,416.1L31.8,415.3L32.3,414.2L32.8,412.8L36.8,405.6L37.3,404.1L35.8,402.6L33.6,395.1L33.6,394.5L33.8,393.6L35.1,392.7L35.3,391.8L35.6,388.8L37.8,374.1L41.1,361.6L46.9,347.7L47.4,346.5L47.4,344.1L47.7,342.7L48.2,341.7L49.5,341.6L49.0,340.1L49.7,339.0L51.0,338.3L51.7,337.1L51.7,335.8L51.2,334.6L51.5,333.6L53.3,333.6L52.8,332.3L53.0,330.8L53.5,329.3L53.8,327.6L53.5,326.1L52.8,324.7L52.2,323.6L51.2,322.7L51.2,322.2L51.7,321.5L50.0,319.3L49.5,317.9L45.2,299.3L45.2,294.6L44.9,293.4L43.9,290.9L43.7,289.4L43.7,286.2L44.4,283.3L48.5,272.1L49.2,269.1L49.5,266.0L49.0,262.6L48.0,259.8L46.4,257.6L44.4,255.6L41.1,250.6L39.9,244.7L40.1,238.2L43.9,223.4L45.7,219.9L45.9,218.3L46.2,217.6L48.5,214.9L49.0,213.8L51.0,208.8L51.2,207.1L52.0,207.5L52.8,207.6L53.5,207.5L54.3,207.1L53.3,205.9L53.5,204.8L54.3,203.9L54.5,203.0L54.8,202.2L55.5,200.9L55.5,200.3L55.5,199.6L55.3,198.7L55.3,198.0L55.0,197.7L54.8,197.2L54.3,196.9L53.5,196.5L53.3,196.1L53.0,195.7L52.8,195.3L52.0,194.6L51.5,193.7L50.7,191.8L50.5,190.7L50.2,185.7L49.5,182.6L49.2,182.4L48.7,182.2L48.2,181.8L48.0,181.2L48.0,180.6L49.5,178.1L50.2,177.0L51.0,175.7L51.2,174.5L52.2,175.6L53.3,174.9L54.8,173.6L57.3,172.4L58.8,170.8L59.8,169.1L60.3,167.8L60.6,166.7L62.4,162.2L62.9,160.2L63.1,158.9L63.9,158.2L64.6,158.2L64.6,158.9L64.4,160.8L64.6,160.8L65.6,159.1L66.9,159.4L67.9,160.6L68.9,161.9L69.7,166.1L69.7,169.3L69.7,170.8L70.2,171.6L70.9,172.1L73.0,175.6L72.7,174.3L73.0,172.8L72.7,171.2L71.7,168.7L71.2,165.6L70.4,164.7L76.5,162.7L77.8,161.6L76.0,161.7L73.7,161.6L72.0,161.2L70.4,160.8L69.4,159.3L68.9,158.6L65.4,157.5L64.6,157.2L65.6,156.3L68.4,154.8L69.9,153.6L71.4,153.1L72.2,152.5L72.7,152.3L73.7,152.3L75.2,152.3L73.5,151.7L72.2,150.9L71.4,150.9L70.2,152.3L69.2,151.9L68.2,151.9L65.6,152.3L63.9,152.3L62.9,151.9L61.8,151.3L61.1,150.6L60.1,148.7L59.6,147.9L58.6,147.4L55.5,146.4L58.6,144.5L59.6,143.4L59.3,142.9L56.0,143.2L55.0,142.9L53.8,141.9L53.5,142.3L53.3,142.4L53.3,143.8L53.3,148.1L53.5,148.3L55.3,148.3L55.8,148.6L56.0,149.3L55.3,149.6L53.8,149.3L50.7,150.7L49.0,150.7L48.5,149.1L48.7,148.0L55.5,132.6L56.8,128.1L57.3,127.0L58.3,126.8L61.1,127.8L62.4,127.8L63.1,127.4L63.9,127.3L63.1,126.9L62.6,126.3L62.4,125.7L62.4,124.7L61.8,124.7L61.6,125.2L61.3,125.8L60.8,126.2L60.1,126.1L59.8,125.2L60.1,124.2L60.8,121.3L62.1,118.5L63.1,114.3L65.4,110.7L68.2,107.9L70.9,107.0L70.4,108.5L69.9,109.7L69.9,110.8L71.2,115.0L71.4,116.5L71.4,117.9L73.7,113.6L74.7,113.0L75.5,113.2L78.8,115.4L79.5,113.2L79.3,112.4L78.0,112.0L77.0,109.9L76.5,109.3L75.7,108.7L75.0,108.7L74.5,108.8L73.7,108.6L73.2,106.3L73.5,102.8L74.7,96.7L77.8,93.0L78.0,92.0L77.5,90.9L77.8,89.1L86.4,62.9L86.6,61.3L86.4,57.2L86.6,55.6L86.9,54.5L87.9,52.1L88.4,49.5L88.1,43.4L87.4,37.5L87.9,35.1L89.4,33.6L92.7,32.9L93.2,33.5L93.9,32.8L95.2,32.3L96.7,32.1L98.2,32.0L99.7,31.6L101.0,30.9L102.8,28.6L105.3,25.8L105.6,24.8L105.8,23.7L107.1,20.5L107.6,19.3L108.6,18.3L109.6,18.1L112.6,18.3L112.9,18.1L114.1,17.1L114.4,16.9L114.6,16.8L114.9,16.6L115.2,16.4L115.4,16.4L115.7,16.5L115.7,17.0L115.7,17.5L115.7,17.8L116.7,18.4L119.2,19.8L120.2,20.5L120.5,21.0L120.2,21.7L119.7,22.4L119.4,22.9L118.7,23.4L117.7,23.9L117.2,24.1L116.7,24.8L116.2,26.4L115.7,27.1L115.2,27.4L113.6,27.7L113.4,28.1L112.9,29.9L113.1,31.6L113.4,33.2L112.4,35.0L113.9,34.5L115.2,33.4L115.9,31.8L116.2,30.3L116.9,29.4L118.7,29.1L120.2,29.3L121.0,30.3L121.7,33.8L122.0,33.8L122.7,33.6L123.5,33.9L124.0,35.2L123.5,37.5L124.0,39.0L124.8,37.4L126.3,36.5L128.0,36.4L129.3,36.9L129.6,37.6L130.1,39.8L130.3,40.5L131.1,41.5L131.8,42.5L132.6,44.7L132.8,46.8L133.1,49.0L133.8,50.7L134.1,50.9L133.6,51.5L133.1,52.6L132.8,54.3L132.8,56.5L133.3,58.5L134.6,59.8L135.4,59.7L136.1,60.7L136.6,62.0L136.9,63.1L137.1,63.8L138.1,65.3L138.4,66.0L138.1,66.6L137.6,67.3L136.9,68.2L135.4,71.1L134.9,72.9L135.1,73.6L136.1,74.4L136.1,75.9L135.9,79.1L136.1,79.8L137.1,81.1L137.4,82.0L137.9,91.4L137.4,97.5L137.6,98.6L138.4,99.5L142.2,102.7L143.2,102.5L145.5,105.0L146.7,105.6L148.8,105.3L150.0,105.0L152.8,103.6L154.6,103.3L156.1,103.9L159.6,107.6L160.1,107.6L161.4,107.5L163.4,107.0L164.2,107.2L164.9,108.0L164.2,108.7L163.2,109.0L161.6,109.1L154.8,120.0L154.3,120.4L153.8,120.5L153.3,121.0L153.3,122.3L153.3,122.5L153.8,124.5L153.6,125.3L153.6,126.1L153.3,126.7L152.8,127.3L153.0,127.5L153.3,128.0L153.8,128.2L153.0,129.6L152.8,130.9L152.8,133.9L153.3,134.4L154.6,134.9L157.1,135.2L159.6,134.7L160.4,134.9L161.6,135.9L162.1,136.1L165.2,138.2L165.4,138.4L165.7,139.0L166.4,140.2L166.7,141.3L166.9,145.8L167.2,147.4L168.0,148.7L169.2,149.8L170.0,150.3L172.8,151.2L173.8,151.3L174.8,151.7L175.8,152.5L177.8,154.3L177.8,154.8L176.3,156.8L175.5,158.1L176.0,158.7L176.3,159.3L174.0,162.9L173.8,164.2L173.0,168.2L173.0,172.2L172.5,173.5L174.0,171.6L174.5,172.1L175.5,172.5L176.3,172.7L177.0,172.3L178.1,171.5L178.8,171.5L179.6,171.8L180.3,172.1L182.1,171.8L183.1,171.3L184.1,170.7L185.4,170.1L182.1,176.6L183.1,178.9L183.4,181.9L182.6,187.6L184.4,196.5L184.4,205.9L184.6,206.9L184.9,207.3L187.4,209.3L187.4,210.1L188.4,211.4L188.9,212.1L188.9,212.9L188.9,213.6L188.2,218.1L188.2,219.4L189.2,220.0L188.9,221.4L186.9,225.4L186.4,227.8L185.6,232.1L184.9,234.9L184.6,236.2L184.9,237.5L186.1,240.1L186.4,241.5L186.9,242.2L188.9,245.5L189.4,246.0L189.2,248.2L189.4,249.0L189.9,249.8L190.2,250.5L190.7,251.1L195.0,254.5L195.5,255.4L196.2,259.8L196.0,261.0L196.8,262.6L197.0,269.4L199.8,279.0L202.3,283.5L203.8,285.6L205.6,287.4L206.6,288.2L207.6,288.8L208.6,289.1L209.9,289.4L212.4,289.5L212.9,290.0L213.4,291.3L214.2,290.5L214.9,290.1L216.7,289.9L219.7,288.2L222.3,287.1L225.6,283.6L226.6,282.9L227.8,282.4L228.8,281.3L229.6,280.1L230.1,279.0L230.4,277.0L230.4,275.1L230.6,273.4L231.6,272.5L231.9,272.9L232.4,273.5L232.6,274.0L232.9,273.6L233.1,273.5L233.4,273.4L233.6,273.0L233.9,273.0L235.2,275.4L235.4,275.9L236.4,276.3L237.2,276.3L237.9,276.3L238.7,276.9L248.3,272.5L249.0,272.0L250.3,268.6L250.6,268.0L250.8,267.9L250.8,267.2L250.8,266.3L251.1,265.9L251.6,266.0L252.6,266.5L253.6,266.9L254.1,267.5L254.6,268.1L254.9,268.5L255.6,269.1L258.6,273.5L257.9,274.7L257.6,276.3L257.6,279.2L258.1,280.7L259.7,280.8L261.2,280.0L261.9,279.0L262.2,280.1L261.9,281.6L261.4,282.9L260.7,283.4L260.4,284.2L260.7,288.2L260.9,289.4L261.4,289.9L263.4,291.3L263.7,292.1L264.5,293.9L265.0,294.6L266.5,295.0L269.5,294.3L270.5,294.4L271.5,295.4L272.3,296.6L273.3,297.8L275.1,298.3L279.6,298.4L280.6,298.8L281.1,299.4L281.4,299.9L281.4,300.5L281.6,301.3L282.1,301.9L283.4,303.0L283.2,303.3L283.7,306.9L283.7,307.5L284.4,308.2L288.7,311.2L289.7,312.8L291.5,311.8L293.0,312.4L294.5,313.6L296.3,314.2L297.3,314.4L298.6,315.0L299.6,315.2L300.6,315.1L302.4,314.6L303.4,314.6L302.6,316.6L303.1,318.2L307.2,323.0L308.2,323.2L309.7,322.7L312.0,322.7L310.9,324.7L305.6,332.3L305.1,333.8L304.1,338.9L304.4,340.1L305.4,342.2L305.9,344.2L306.6,344.9L307.4,345.4L308.4,345.5L309.4,345.3L309.9,344.7L310.4,342.6L311.7,343.6L312.2,345.0L311.7,346.4L308.9,347.5L307.7,348.6L307.4,350.0L308.7,351.1L307.9,351.8L307.7,352.5L307.9,353.3L307.7,354.0L307.2,354.3L306.1,354.9L305.6,355.1L305.1,356.4L304.9,357.9L304.9,359.1L305.6,358.6L306.1,358.6L307.2,361.4L307.4,362.9L306.4,363.6L306.1,363.9L306.1,364.6L306.4,365.2L306.9,365.6L306.9,365.8L309.4,367.8L309.7,368.2L310.2,369.8L310.4,370.5L310.2,371.1L309.2,372.6L309.4,373.0L309.7,373.2L312.5,379.4L313.2,380.3L313.5,381.3L313.0,384.8L313.0,386.0L313.2,386.7L313.7,387.1L314.0,387.4L314.0,388.0L313.5,388.8L312.7,390.3L312.5,391.3L312.7,392.7L313.2,393.5L314.7,395.0L317.8,399.1L319.3,401.7L320.0,404.1L320.0,406.8L318.5,411.8L318.3,414.4L319.8,415.3L320.0,415.7L320.5,417.6L320.5,418.7L320.0,419.7L318.0,421.8L316.8,424.1L316.8,429.5L315.7,432.0L316.0,432.9L316.2,433.6L317.0,434.2L317.8,434.6L319.0,434.0L320.3,434.9L320.8,436.3L321.0,437.8L321.6,438.6L324.1,441.2L324.8,443.6L326.1,445.0L326.4,445.4L326.6,446.5L327.4,447.7L328.4,448.8L331.7,451.7L332.4,452.2L334.2,452.9L334.7,453.4L335.2,454.0L335.4,455.6L335.7,456.4L336.5,457.0L337.7,457.7L338.5,458.2L339.7,461.7L341.0,462.4L342.0,463.8L342.3,464.4L342.0,465.4L341.3,465.7L340.5,465.8L339.7,466.2L339.7,467.1L340.2,467.9L341.0,468.6L341.8,469.7L341.8,470.2L341.8,471.5L342.0,472.0L342.8,472.2L343.3,472.1L343.8,471.6L343.0,470.1L342.8,468.8L343.0,467.6L343.5,467.1L344.0,466.8L346.1,464.9L346.6,464.2L347.8,465.0L348.6,465.8L349.3,465.9L351.1,464.4L351.6,463.8L352.1,463.4L352.6,463.2L353.4,463.2L354.6,463.6L354.9,464.4L354.4,465.3L354.1,465.7L353.4,466.4L353.4,466.6L353.1,467.0L353.6,467.4L353.6,467.6L353.1,469.3L352.6,469.9L352.1,470.2L351.6,470.7L350.4,473.3L349.8,474.2L349.6,475.8L349.6,477.2L350.1,478.3L351.1,478.8L351.6,479.4L354.4,484.7L354.9,486.2L355.2,487.8L355.2,489.6L355.7,490.7L358.2,494.4L360.0,499.0L360.7,500.1L362.0,501.2L362.7,501.6L363.2,502.4L363.0,505.6L363.2,509.9L362.7,510.7L363.5,512.4L365.3,515.0L367.3,516.9L368.0,518.0L368.3,519.4L367.8,520.4L366.0,522.0L365.3,523.1L365.0,524.7L365.0,525L-5,525ZM94.9,14.8L96.7,16.5L97.0,17.4L97.0,18.3L96.7,18.6L96.5,18.6L95.7,18.4L94.9,18.4L93.4,19.0L92.4,19.3L91.7,19.6L90.9,20.5L90.4,21.5L90.4,22.2L87.9,21.2L87.4,20.7L86.6,19.4L85.6,18.0L85.1,16.2L85.3,13.9L85.6,13.5L85.8,13.3L86.1,13.0L87.4,12.9L87.6,12.7L87.9,12.4L88.4,11.9L89.6,11.2L89.9,11.2L89.9,10.8L90.6,9.5L92.2,9.9L93.2,11.6ZM95.4,8.6L97.7,8.2L99.5,9.3L100.0,11.0L98.5,12.4L96.5,13.0L94.9,11.9L94.4,10.1Z\"/></clipPath> <ellipse clip-path=\"url(#lm-land-__U__)\" cx=\"191.5\" cy=\"271.95\" rx=\"54\" ry=\"44\" fill=\"url(#lm-glow-__U__)\"/> <g class=\"lm-town\"> <circle cx=\"161.3\" cy=\"250.5\" r=\"2.6\"/><text x=\"155.3\" y=\"253.5\" text-anchor=\"end\">Coen</text> <circle cx=\"67.4\" cy=\"155.6\" r=\"2.6\"/><text x=\"74.4\" y=\"158.6\">Weipa</text> <circle cx=\"305.3\" cy=\"361.1\" r=\"2.6\"/><text x=\"298.3\" y=\"364.1\" text-anchor=\"end\">Cooktown</text> <circle cx=\"342.3\" cy=\"466.9\" r=\"2.6\"/><text x=\"335.3\" y=\"469.9\" text-anchor=\"end\">Cairns</text> </g> <g class=\"lm-pin\" transform=\"translate(195.5 259.2)\"> <path d=\"M0 0 C-3 -7 -10 -12 -10 -19 A10 10 0 1 1 10 -19 C10 -12 3 -7 0 0Z\" fill=\"#b8765c\" stroke=\"#faf8f0\" stroke-width=\"1.6\"/> <circle cy=\"-19\" r=\"3.6\" fill=\"#faf8f0\"/> </g> <g class=\"lm-label\"> <text x=\"209.5\" y=\"213.2\" class=\"lm-main\">Lama Lama</text> <text x=\"209.5\" y=\"235.2\" class=\"lm-main\">Country</text> <text x=\"209.5\" y=\"251.2\" class=\"lm-sub\">Port Stewart</text> </g> <g transform=\"translate(366 40)\" class=\"lm-north\"> <path d=\"M0 -16 L6 6 L0 2 L-6 6Z\" fill=\"#596d55\"/> <text y=\"20\" text-anchor=\"middle\">N</text> </g> <g transform=\"translate(308.9 498)\" class=\"lm-scale\"> <rect width=\"32.55\" height=\"4\" fill=\"#596d55\"/><rect x=\"32.55\" width=\"32.55\" height=\"4\" fill=\"#faf8f0\" stroke=\"#596d55\" stroke-width=\".8\"/> <text y=\"-5\">0</text><text x=\"65.1\" y=\"-6\" text-anchor=\"end\">100 km</text> </g> <g transform=\"translate(12 386)\" class=\"lm-inset\"> <rect x=\"-6\" y=\"-6\" width=\"142\" height=\"130\" rx=\"2\" fill=\"#faf8f0\" stroke=\"#d8d3c3\"/> <path d=\"M107.1,100.7L108.8,100.9L109.0,105.6L108.0,107.0L107.7,110.2L106.7,109.1L104.6,112L104.0,111.7L102.2,111.6L100.4,108.1L100.0,105.5L98.3,102.0L98.4,100.2L100.3,100.6L103.1,101.9L104.8,101.4ZM43.3,69.0L40.2,70.8L37.6,71.6L37.1,73.4L36.0,74.9L33.5,75.0L31.6,75.3L29.0,74.6L26.9,75.0L24.8,75.2L23.1,77.1L22.2,76.9L20.7,77.9L19.3,79.1L17.2,78.9L15.2,78.9L12.0,76.7L10.4,76.0L10.5,73.9L12.0,73.4L12.5,72.6L12.4,71.4L12.7,68.9L12.4,66.9L10.8,63.4L10.4,61.4L10.5,59.5L9.3,57.3L9.2,56.3L7.9,54.9L7.5,52.3L5.9,49.7L5.4,48.3L6.7,49.7L5.8,46.7L7.2,47.6L8.1,48.9L8.0,47.2L6.6,44.6L6.3,43.6L5.6,42.6L5.9,40.8L6.5,40.0L6.9,38.3L6.6,36.5L7.8,34.2L8.1,36.6L9.3,34.4L11.7,33.3L13.2,32.0L15.4,30.8L16.8,30.6L17.6,31.0L19.9,29.8L21.7,29.4L22.2,28.8L22.9,28.5L24.6,28.5L27.7,27.6L29.3,26.2L30.0,24.6L31.8,23.0L31.9,21.7L32.0,20.0L34.1,17.4L35.3,20.1L36.6,19.5L35.5,18.0L36.4,16.5L37.7,17.2L38.1,14.8L39.7,13.3L40.4,12.1L41.9,11.6L42.0,10.7L43.3,11.1L43.3,10.3L44.6,9.9L46.1,9.5L48.2,10.9L49.9,12.7L51.7,12.7L53.6,13.0L53.0,11.3L54.4,8.9L55.7,8.1L55.3,7.3L56.6,5.6L58.4,4.5L59.9,4.9L62.4,4.3L62.3,2.8L60.1,1.8L61.7,1.3L63.7,2.1L65.2,3.3L67.7,4.1L68.6,3.8L70.4,4.7L72.1,3.9L73.3,4.1L73.9,3.5L75.3,5.0L74.5,6.7L73.4,7.9L72.4,8.0L72.7,9.2L71.8,10.7L70.8,12.2L71.0,13.1L73.4,14.8L75.6,15.8L77.2,16.8L79.3,18.7L80.1,18.7L81.7,19.4L82.1,20.4L85.0,21.5L86.9,20.4L87.5,18.7L88.1,17.4L88.4,15.7L89.4,13.2L88.9,11.8L89.2,10.9L88.8,9.1L89.2,6.8L89.8,6.2L89.3,5.2L90.0,3.6L90.6,1.9L90.7,1.1L91.8,0L92.6,1.4L92.8,3.3L93.5,3.7L93.7,5.0L94.7,6.5L95.0,8.2L94.8,9.3L95.9,11.7L97.8,10.6L98.8,11.9L100.2,13.1L99.9,14.4L100.5,17.0L101.0,18.6L101.7,19.0L102.5,21.6L102.3,23.2L103.2,25.3L106.4,27.0L108.5,28.5L110.5,29.8L110.1,30.6L111.8,32.6L112.9,36.0L114.1,35.3L115.3,36.7L116.1,36.2L116.6,39.6L118.7,41.6L120.0,42.9L122.3,45.5L123.2,48.1L123.3,50.0L123.0,52.1L124.5,54.9L124.3,57.9L123.8,59.5L123.0,62.5L123.0,64.5L122.5,67.0L121.1,70.1L119.0,71.9L117.9,74.6L116.9,76.4L116.0,79.5L114.9,81.3L114.1,84.0L113.7,86.6L113.9,87.8L112.2,89.0L108.9,89.2L106.1,90.7L104.8,92.2L103.0,93.8L100.6,92.1L98.7,91.5L99.2,89.5L97.6,90.2L95.0,93.0L92.4,91.9L90.8,91.3L89.1,91.1L86.2,90.0L84.3,87.7L83.7,84.9L83.1,83.0L81.6,81.5L78.8,81.1L79.7,79.3L79.0,76.6L77.6,79.1L74.9,79.8L76.5,77.8L76.9,75.7L78.1,74.0L77.8,71.4L75.4,74.4L73.6,75.6L72.5,78.5L70.1,77.0L70.2,75.1L68.4,72.5L66.8,71.2L67.4,70.4L63.6,68.3L61.5,68.2L58.7,66.5L53.4,66.8L49.5,68.0L46.2,69.2Z\" fill=\"#e6e9dc\" stroke=\"#596d55\" stroke-width=\".7\"/> <polyline points=\"78.4,17.8 78.4,48 87.3,48 87.3,58 110.7,58 115.1,56.6 124.4,55.2\" fill=\"none\" stroke=\"#596d55\" stroke-width=\".6\" stroke-dasharray=\"2 2\"/> <rect x=\"87\" y=\"-0.5\" width=\"16.900000000000006\" height=\"21.7\" fill=\"rgba(184,118,92,.18)\" stroke=\"#b8765c\" stroke-width=\"1.2\"/> <text x=\"65\" y=\"121\" text-anchor=\"middle\">AUSTRALIA</text> <text x=\"96.4\" y=\"32\" class=\"lm-qld\">QLD</text> </g> </svg>";

let mapUid = 0;
const tallQuery = matchMedia("(max-width: 720px)");

function mapSVG(portrait = false) {
  mapUid += 1;
  return (portrait ? LOCATION_MAP_SVG : LANDSCAPE_MAP_SVG).replaceAll("__U__", `m${mapUid}`);
}

function foldedMapHTML() {
  return `<div class="map-teaser">
    <button type="button" class="folded-map" data-action="unfold-map" aria-label="Unfold the map of Lama Lama Country">
      <span class="fold-thumb" aria-hidden="true">${[0, 1, 2]
        .map((i) => `<i class="ft ft-${i}"><span class="ft-art" style="left:-${i * 100}%">${mapSVG()}</span></i>`)
        .join("")}</span>
      <span class="folded-cta"><span class="tap-ico" aria-hidden="true">☝</span> TAP TO UNFOLD THE MAP <span aria-hidden="true">→</span></span>
    </button>
    <p class="map-teaser-cap">Where is Lama Lama Country? East Cape York Peninsula, Queensland.</p>
  </div>`;
}

function buildFoldout() {
  const portrait = tallQuery.matches;
  foldout.dataset.orient = portrait ? "portrait" : "landscape";
  foldout.querySelectorAll(".fold-art").forEach((el) => {
    el.innerHTML = mapSVG(portrait);
  });
}

let foldTrigger = null;
let foldTimer = 0;

function openFoldout(trigger) {
  clearTimeout(foldTimer);
  buildFoldout();
  foldTrigger = trigger;
  foldout.hidden = false;
  stage.inert = true;
  void foldout.offsetWidth;
  foldout.classList.add("is-open");
  setTimeout(() => foldout.querySelector(".fold-close").focus({ preventScroll: true }), 60);
}

function closeFoldout() {
  foldout.classList.remove("is-open");
  stage.inert = false;
  foldTimer = setTimeout(() => {
    foldout.hidden = true;
  }, calmQuery.matches ? 0 : 1300);
  if (foldTrigger && foldTrigger.isConnected) foldTrigger.focus({ preventScroll: true });
}

foldout.addEventListener("click", (event) => {
  if (event.target.closest("[data-action='fold-map']")) closeFoldout();
});

/* =========================================================
   8. CONTROLS
   ========================================================= */

spread.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action], [data-goto]");
  if (!el || el.closest(".leaf:not(.is-static)")) return;

  if (el.dataset.goto) {
    goToPage(Number(el.dataset.goto));
    return;
  }
  const action = el.dataset.action;
  if (action === "open") goTo(0);
  else if (action === "close") goTo(lastView());
  else if (action === "reopen") goTo(lastView() - 1);
  else if (action === "to-cover") goTo(-1);
  else if (action === "unfold-map") openFoldout(el);
});

prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));

pages.forEach((page, i) => {
  const tab = document.createElement("a");
  tab.className = "tab";
  tab.href = `#page-${pad(i + 1)}`;
  tab.title = `${pad(i + 1)} — ${page.title}`;
  tab.setAttribute("aria-label", `Go to page ${pad(i + 1)}: ${page.title}`);
  tab.innerHTML = `<span>${pad(i + 1)}</span>`;
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    goToPage(i);
  });
  bookmarks.append(tab);
});

pageSelect.innerHTML =
  `<option value="cover">Front cover</option>` +
  pages.map((page, i) => `<option value="${i}">${pad(i + 1)} — ${page.title}</option>`).join("") +
  `<option value="back">Back cover</option>`;

pageSelect.addEventListener("change", () => {
  const value = pageSelect.value;
  if (value === "cover") goTo(-1);
  else if (value === "back") goTo(lastView());
  else goToPage(Number(value));
});

document.addEventListener("keydown", (event) => {
  if (!foldout.hidden) {
    if (event.key === "Escape") closeFoldout();
    return;
  }
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target instanceof Element && event.target.closest("input, textarea, select")) return;

  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    step(1);
  } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    step(-1);
  } else if (event.key === "Home") {
    goTo(0);
  } else if (event.key === "End") {
    goTo(lastView() - 1);
  }
});

/* switch between two-page and one-page layouts without losing your place */
wideQuery.addEventListener("change", () => {
  const last = lastView();
  const anchor = view < 0 ? "cover" : view >= last ? "back" : mode === "spread" ? view * 2 : view;
  epoch += 1;
  busy = false;
  queued = null;
  runTarget = null;
  drag = null;
  delete stage.dataset.turning;
  mode = wideQuery.matches ? "spread" : "single";
  view = anchor === "cover" ? -1 : anchor === "back" ? lastView() : viewOfPage(anchor);
  renderStatic();
});

/* =========================================================
   9. START
   ========================================================= */

const fromHash = location.hash.match(/^#page-(\d+)$/);
if (fromHash) view = viewOfPage(clamp(Number(fromHash[1]) - 1, 0, PAGES - 1));

stage.dataset.mode = mode;
renderStatic();
announce();
