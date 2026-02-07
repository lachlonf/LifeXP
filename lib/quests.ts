import { Quest } from "./types";

export const CORE_QUESTS: Omit<Quest, "completed">[] = [
  {
    id: "core_read",
    title: "Read 20 pages",
    description: "Sharpen your mind. A little every day.",
    xp: 20,
    stat: "wisdom",
    type: "core",
  },
  {
    id: "core_gym",
    title: "Train your body",
    description: "Move your body and earn strength.",
    xp: 30,
    stat: "strength",
    type: "core",
  },
  {
    id: "core_meditate",
    title: "Meditate 10 minutes",
    description: "Quiet mind, stronger focus.",
    xp: 15,
    stat: "focus",
    type: "core",
  },
];

export const ROTATING_POOL: Omit<Quest, "completed">[] = [
  {
    id: "rot_outside",
    title: "Touch grass",
    description: "10 minutes outside. No screens.",
    xp: 10,
    stat: "focus",
    type: "rotating",
  },
  {
    id: "rot_meal",
    title: "Phone-free meal",
    description: "Eat one meal with no phone.",
    xp: 10,
    stat: "discipline",
    type: "rotating",
  },
  {
    id: "rot_journal",
    title: "Journal 5 lines",
    description: "Write a few lines. Anything.",
    xp: 15,
    stat: "wisdom",
    type: "rotating",
  },
];
