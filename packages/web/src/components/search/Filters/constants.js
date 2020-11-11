// filter types
export const STATE = 'state';
export const CITY = 'city';
export const REGION = 'region';
export const TOC = 'toc';
export const SIZE = 'size';
export const GUIDE = 'own-guide';
export const BUDGET = 'budget';
export const RADIUS = 'radius';
export const SORT = 'sort';

// TOC
export const AL = 'assisted-living';
export const IL = 'independent-living';
export const MC = 'memory-care';
export const BNC = 'board-and-care-home';
export const CCRC = 'continuing-care-retirement-community';
export const AA = 'active-adult';
export const SNF = 'skilled-nursing-facility';

export const TOCS = {
  [AL]: {
    label: 'Assisted Living',
    value: AL,
    description: 'Ideal for seniors who need help with some activities of daily living,but are interested in a social, active lifestyle.',
    seoLabel: 'Assisted Living Facilities',
  },
  [IL]: {
    label: 'Independent Living',
    value: IL,
    description: 'For residents who want to enjoy retirement without the responsibilites of home upkeep and daily chores.',
    seoLabel: 'Independent Living Communities',
  },
  [BNC]: {
    label: 'Board and Care Home',
    value: BNC,
    description: 'Houses in residential neighborhoods that are equipped  and staffed to care for a small number o residents, usually 2-10.',
    seoLabel: 'Board and Care Homes',
  },
  [MC]: {
    label: 'Memory Care',
    value: MC,
    description: 'Facilities with safe designed environments for residents to improve quality of life, reduce confusion and prevent wandering.',
    seoLabel: 'Memory Care Facilities',
  },
  [CCRC]: {
    label: 'Continuing Care Retirement Communities',
    value: CCRC,
    description: 'For residents who want to age in place. Has accomodations for nursing home care, independent and assisted living.',
    seoLabel: 'Continuing Care Retirement Communities',
  },
  [AA]: {
    label: 'Active Adult (55+)',
    value: AA,
    description: 'Retirement communities where residents can stay ative and social.',
    seoLabel: 'Active Adult (55+)',
  },
  [SNF]: {
    label: 'Skilled Nursing Facilities',
    value: SNF,
    description: 'Safety and comfort for residents who need 24-hour medical supervision.',
    seoLabel: 'Skilled Nursing Facilities',
  },
};
