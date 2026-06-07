import { hiddenDefaults, inputs } from './calculate.js';

export const STORAGE_KEY = 'tidelineTestSnapshot';

export function createDefaultState() {
  return { ...hiddenDefaults, ...Object.fromEntries(inputs.map(item => [item.id, item.value])) };
}

export function saveTestSnapshot(snapshot) {
  const payload = JSON.stringify({ ...snapshot, savedAt: Date.now() });
  sessionStorage.setItem(STORAGE_KEY, payload);
  localStorage.setItem(STORAGE_KEY, payload);
}

export function loadTestSnapshot() {
  const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (error) { return null; }
}
