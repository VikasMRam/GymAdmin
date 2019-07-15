export const FAMILY_STAGE_NEW = 'New';
export const FAMILY_STAGE_CONTACT1 = '1st Contact Attempt';
export const FAMILY_STAGE_CONTACT2 = '2nd Contact Attempt';
export const FAMILY_STAGE_CONTACT3 = '3rd+ Contact Attempt';
export const FAMILY_STAGE_DISCUSSING_OPTIONS = 'Discussing Options';
export const FAMILY_STAGE_ACTIVE_TOURS = 'Active Tours';
export const FAMILY_STAGE_POST_TOURS = 'Post Tours';
export const FAMILY_STAGE_FAMILY_CHOSEN = 'Family Chose My Referral';
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

export const STAGE_CLIENT_TYPE_MAP = {
  Prospects: 'prospecting',
  Connected: 'connected',
  Closed: 'closed',
};

export const NOTE_COMMENTABLE_TYPE_CLIENT = 'Client';

export const NOTE_CTYPE_NOTE = 'note';

export const DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS = [
  'Other',
];

export const PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS = [
  'Outside territory',
  'Outside of territory',
];
