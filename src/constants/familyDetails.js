export const LOOKING_FOR = [
  { label: 'Self', value: 'Self' },
  { label: 'Parents', value: 'Parents' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Father', value: 'Father' },
  { label: 'Grandparents', value: 'Grandparents' },
  { label: 'Grandmother', value: 'Grandmother' },
  { label: 'Grandfather', value: 'Grandfather' },
  { label: 'Husband ', value: 'Husband ' },
  { label: 'Wife', value: 'Wife' },
  { label: 'Other', value: 'Other' },
];

export const GENDER = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
  { label: 'Not Specified', value: 'Not Specified' },
];

export const MONTHLY_BUDGET = [
  { label: '<2K', value: '<2K' },
  { label: '2K', value: '2K' },
  { label: '2K-3K', value: '2K-3K' },
  { label: '3K-4K', value: '3K-4K' },
  { label: '4K-5K', value: '4K-5K' },
  { label: '5K+', value: '5K+' },
];

export const TIME_TO_MOVE = [
  { label: 'Immediately', value: 'Immediately' },
  { label: '1-3 Months', value: '1-3 Months' },
  { label: '3 Months +', value: '3 Months +' },
];

export const FAMILY_STAGE_NEW = 'New';
export const FAMILY_STAGE_CONTACT1 = '1st Contact Attempt';
export const FAMILY_STAGE_CONTACT2 = '2nd Contact Attempt';
export const FAMILY_STAGE_CONTACT3 = '3rd Contact Attempt';
export const FAMILY_STAGE_DISCUSSING_OPTIONS = 'Discussing Options';
export const FAMILY_STAGE_ACTIVE_TOURS = 'Active Tours';
export const FAMILY_STAGE_POST_TOURS = 'Post Tours';
export const FAMILY_STAGE_FAMILY_CHOSEN = 'Family chose my referral';
export const FAMILY_STAGE_WON = 'Won';
export const FAMILY_STAGE_LOST = 'Lost';
export const FAMILY_STAGE_REJECTED = 'Rejected';

export const FAMILY_STAGE_ORDERED = {
  Prospects: [FAMILY_STAGE_NEW, FAMILY_STAGE_CONTACT1, FAMILY_STAGE_CONTACT2, FAMILY_STAGE_CONTACT3],
  Connected: [FAMILY_STAGE_DISCUSSING_OPTIONS, FAMILY_STAGE_ACTIVE_TOURS, FAMILY_STAGE_POST_TOURS, FAMILY_STAGE_FAMILY_CHOSEN],
  Closed: [FAMILY_STAGE_WON, FAMILY_STAGE_LOST, FAMILY_STAGE_REJECTED],
};

export const TOTAL_STAGES_COUNT = 5;

export const FAMILY_STATUS_ACTIVE = 'Active';
export const FAMILY_STATUS_ON_HOLD = 'On Hold';
export const FAMILY_STATUS_ARCHIVED = 'Archived';
export const FAMILY_STATUS_DELETED = 'Deleted';
