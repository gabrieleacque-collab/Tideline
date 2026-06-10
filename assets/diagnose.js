import { diagnoses, roleMeta } from "./diagnoses.js";
import { clamp, inputs } from "./calculate.js";

export const thresholds = {
  high: 10,
  veryHigh: 22,
  low: -10,
  veryLow: -22,
  lowSavingsMonths: 4,
  lowSkill: 38,
  highSpec: 62,
  highInstitution: 62,
  lowAsset: 18
};

export const roleToKey = {
  farmer: "plant",
  fisher: "surf",
  landlord: "build",
  pirate: "wind",
  plant: "plant",
  surf: "surf",
  build: "build",
  wind: "wind"
};

export const keyToRole = {
  plant: "farmer",
  surf: "fisher",
  build: "landlord",
  wind: "pirate"
};

export const rolePositions = {
  farmer: { x: 24, y: 76 },
  fisher: { x: 76, y: 76 },
  landlord: { x: 24, y: 24 },
  pirate: { x: 76, y: 24 },
  mixed: { x: 50, y: 50 }
};

const comparisonBaselines = {
  stableIncome: 62,
  supportIncome: 0,
  assetIncome: 16,
  projectIncome: 28,
  specIncome: 10,
  savings: 8,
  debt: 32,
  skill: 66,
  institution: 48,
  familyLoad: 42,
  attention: 70,
  retainedPerMonth: 6000
};

export function roleLabel(role) {
  return roleMeta[role]?.name || role;
}

export function applyScenarioOffsets(defaultState, answers = []) {
  const state = { ...defaultState };
  const byId = Object.fromEntries(inputs.map(item => [item.id, item]));
  for (const answer of answers) {
    const offsets = answer?.option?.paramOffsets || answer?.paramOffsets || {};
    for (const [key, delta] of Object.entries(offsets)) {
      const meta = byId[key] || {};
      const min = meta.min ?? 0;
      const max = meta.max ?? 100;
      state[key] = clamp((state[key] ?? 0) + delta, min, max);
    }
  }
  return state;
}

function pickMode(labels, answers) {
  const counts = new Map();
  const weights = new Map();
  labels.forEach((label, index) => {
    counts.set(label, (counts.get(label) || 0) + 1);
    const offsets = answers[index]?.option?.paramOffsets || answers[index]?.paramOffsets || {};
    const weight = Object.values(offsets).reduce((sum, value) => sum + Math.abs(value), 0);
    weights.set(label, (weights.get(label) || 0) + weight);
  });
  return [...counts.keys()].sort((a, b) => {
    const countDiff = (counts.get(b) || 0) - (counts.get(a) || 0);
    if (countDiff) return countDiff;
    return (weights.get(b) || 0) - (weights.get(a) || 0);
  })[0] || "farmer";
}

export function inferSelfPosition(answers = []) {
  return pickMode(answers.map(answer => answer?.option?.structuralLabel || answer?.structuralLabel).filter(Boolean), answers);
}

export function inferStructuralPosition(state) {
  const landSeaAxis = (state.stableIncome + state.familyLoad + state.attention) - (state.projectIncome + state.specIncome + state.debt);
  const laborOwnAxis = (state.skill + state.stableIncome + state.projectIncome) - (state.assetIncome + state.institution + state.specIncome);
  if (landSeaAxis >= 0 && laborOwnAxis >= 0) return "farmer";
  if (landSeaAxis < 0 && laborOwnAxis >= 0) return "fisher";
  if (landSeaAxis >= 0 && laborOwnAxis < 0) return "landlord";
  return "pirate";
}

function distance(a, b) {
  const pa = rolePositions[a] || rolePositions.mixed;
  const pb = rolePositions[b] || rolePositions.mixed;
  return Math.hypot(pa.x - pb.x, pa.y - pb.y);
}

function aboveDefault(state, key, amount = thresholds.high) {
  const base = comparisonBaselines[key] ?? inputs.find(item => item.id === key)?.value ?? 0;
  return (state[key] ?? 0) - base >= amount;
}

function belowDefault(state, key, amount = thresholds.high) {
  const base = comparisonBaselines[key] ?? inputs.find(item => item.id === key)?.value ?? 0;
  return base - (state[key] ?? 0) >= amount;
}

function isMixed(state, selfPosition, structuralPosition) {
  const values = ["stableIncome", "projectIncome", "assetIncome", "specIncome", "skill", "institution", "attention", "debt"]
    .map(key => state[key] ?? 0);
  const spread = Math.max(...values) - Math.min(...values);
  return spread < 18 && selfPosition !== structuralPosition;
}

export function diagnose(answers = [], scores = null, state = {}) {
  const selfPosition = inferSelfPosition(answers);
  const structuralPosition = inferStructuralPosition(state);
  let code = "F";

  if (selfPosition === "farmer" && (structuralPosition === "pirate" || aboveDefault(state, "specIncome", thresholds.veryHigh))) {
    code = "A";
  } else if (selfPosition === "fisher" && (structuralPosition === "landlord" || (state.institution ?? 0) >= thresholds.highInstitution || aboveDefault(state, "institution"))) {
    code = "B";
  } else if (selfPosition === "farmer" && ((state.assetIncome ?? 0) <= thresholds.lowAsset || belowDefault(state, "assetIncome")) && (state.savings ?? 0) <= thresholds.lowSavingsMonths) {
    code = "C";
  } else if (selfPosition === "fisher" && (state.skill ?? 0) <= thresholds.lowSkill && (state.specIncome ?? 0) >= thresholds.highSpec) {
    code = "D";
  } else if (selfPosition === "landlord" && (state.skill ?? 0) <= thresholds.lowSkill && ((state.projectIncome ?? 0) < 18 || (state.attention ?? 0) > 74)) {
    code = "E";
  } else if (!isMixed(state, selfPosition, structuralPosition) && selfPosition === structuralPosition) {
    code = structuralPosition === "farmer" ? "C" : structuralPosition === "fisher" ? "D" : structuralPosition === "landlord" ? "E" : "A";
  }

  return {
    ...diagnoses[code],
    selfPosition,
    structuralPosition,
    blindDistance: distance(selfPosition, structuralPosition),
    selfPoint: rolePositions[selfPosition],
    structuralPoint: rolePositions[structuralPosition]
  };
}
