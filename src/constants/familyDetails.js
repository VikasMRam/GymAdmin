export const FAMILY_STAGE_NEW = 'New';
export const FAMILY_STAGE_CONTACT1 = '1st Contact Attempt';
export const FAMILY_STAGE_CONTACT2 = '2nd Contact Attempt';
export const FAMILY_STAGE_CONTACT3 = '3rd+ Contact Attempt';
export const FAMILY_STAGE_DISCUSSING_OPTIONS = 'Discussing Options';
export const FAMILY_STAGE_ACTIVE_TOURS = 'Active Tours';
export const FAMILY_STAGE_POST_TOURS = 'Post Tours';
export const FAMILY_STAGE_FAMILY_CHOSEN = 'Family Chose My Referral';
export const FAMILY_STAGE_WON = 'Won';
export const FAMILY_STAGE_LOST = 'Closed';
export const FAMILY_STAGE_REJECTED = 'Rejected';

export const FAMILY_STAGE_ORDERED = {
  New: [FAMILY_STAGE_NEW],
  Prospects: [FAMILY_STAGE_CONTACT1, FAMILY_STAGE_CONTACT2, FAMILY_STAGE_CONTACT3],
  Connected: [FAMILY_STAGE_DISCUSSING_OPTIONS, FAMILY_STAGE_ACTIVE_TOURS, FAMILY_STAGE_POST_TOURS, FAMILY_STAGE_FAMILY_CHOSEN],
  Closed: [FAMILY_STAGE_WON, FAMILY_STAGE_LOST, FAMILY_STAGE_REJECTED],
};

export const TOTAL_STAGES_COUNT = 5;

export const FAMILY_STATUS_ACTIVE = 'Active';
export const FAMILY_STATUS_HOT = 'HOT';
export const FAMILY_STATUS_ON_PAUSE = 'On Pause';
export const FAMILY_STATUS_ARCHIVED = 'Archived';
export const FAMILY_STATUS_LONG_TERM = 'Long Term';
export const FAMILY_STATUS_DELETED = 'Deleted';

export const ESTIMATED_MOVE_IN = 'estimated-move-in';
export const WAITLISTED = 'waitlisted';

export const STAGE_CLIENT_TYPE_MAP = {
  New: 'new',
  Prospects: 'prospecting',
  Connected: 'connected',
  Closed: 'closed',
};

export const DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS = [
  'Other',
];

export const PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS = [
  'Outside territory',
  'Outside of territory',
];

export const SOURCE_OPTIONS = [
  'Direct Call',
  'Voicemail',
  'Bot',
  'LiveChat',
  'Online',
  'Other',
];

export const LOOKING_FOR_OPTIONS = [
  'Self',
  'Parents',
  'Mother',
  'Father',
  'Grandparents',
  'Grandmother',
  'Grandfather',
  'Husband',
  'Wife',
  'Other',
];
export const TIME_TO_MOVE_OPTIONS = [
  'Immediately',
  '1-3 Months',
  '3 Months+',
];

export const STATUS_PALETTE_MAP = {};
STATUS_PALETTE_MAP[FAMILY_STATUS_ACTIVE] = 'green';
STATUS_PALETTE_MAP[FAMILY_STATUS_ARCHIVED] = 'gray';

export const STATUS_ICON_MAP = {};
STATUS_ICON_MAP[FAMILY_STATUS_ACTIVE] = 'active';
STATUS_ICON_MAP[FAMILY_STATUS_ARCHIVED] = 'archived';
STATUS_ICON_MAP[FAMILY_STATUS_LONG_TERM] = 'hourglass';
STATUS_ICON_MAP[FAMILY_STATUS_ON_PAUSE] = 'pause';

// todo temp till api meta is updated
export const ROOM_TYPES = [
  'Shared Suite',
  'Private Suite',
  '1 Bedroom',
  '2 Bedroom',
  'Other',
];

