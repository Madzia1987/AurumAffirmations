import { LOVE_YOURSELF } from './love-yourself';
import { SELF_CONFIDENCE } from './self-confidence';
import { BUSINESS_SUCCESS } from './business-success';
import { ABUNDANCE } from './abundance';
import { DIVINE_POWER } from './divine-power';

export interface AffirmationCategory {
  title: string;
  introduction: string;
  affirmations: string[];
  ritual: string;
}

export const AFFIRMATION_CATEGORIES: Record<string, AffirmationCategory> = {
  'love-yourself': LOVE_YOURSELF,
  'self-confidence': SELF_CONFIDENCE,
  'business-success': BUSINESS_SUCCESS,
  'abundance': ABUNDANCE,
  'divine-power': DIVINE_POWER,
};

export const CATEGORIES_LIST = [
  { id: 'love-yourself', title: LOVE_YOURSELF.title, icon: '💖' },
  { id: 'self-confidence', title: SELF_CONFIDENCE.title, icon: '💎' },
  { id: 'business-success', title: BUSINESS_SUCCESS.title, icon: '🌠' },
  { id: 'abundance', title: ABUNDANCE.title, icon: '💰' },
  { id: 'divine-power', title: DIVINE_POWER.title, icon: '✨' },
];

export {
  LOVE_YOURSELF,
  SELF_CONFIDENCE,
  BUSINESS_SUCCESS,
  ABUNDANCE,
  DIVINE_POWER
};