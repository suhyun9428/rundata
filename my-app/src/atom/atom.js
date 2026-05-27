import { atom } from 'jotai';

export const activeValue = atom(null);
export const delElements = atom([]);

export const cardBackgroundAtom = atom({
  type: 'color', // 'color' 또는 'image'
  value: '#111111', 
});

export const elementLayoutsAtom = atom({
  gpx: { width: 180, height: 180, bottom: 0, right: 0 },
  distance: { top: 0, left: 0 },
  pace: { top: 40, left: 0 },
  time: { top: 80, left: 0 },
  heartrate: { top: 120, left: 0 },
  date: { top: 160, left: 0 },
  cadence: { top: 200, left: 0 },
});