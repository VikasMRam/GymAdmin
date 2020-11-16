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
export const FAMILY_STATUS_TEST = 'Test';

export const ESTIMATED_MOVE_IN = 'estimated-move-in';
export const WAITLISTED = 'waitlisted';

export const FAMILY_CLOSE_CANNOT_HELP = 'Cannot Help';
export const FAMILY_CLOSE_UNRESPONSIVE = 'Unresponsive';
export const FAMILY_CLOSE_NOHELP = 'Doesn\'t want help';
export const FAMILY_CLOSE_NOTDECISIONMAKER = 'Not decision maker';
export const FAMILY_CLOSE_NOT_BILLABLE = 'Not Billable';
export const FAMILY_CLOSE_SNF = 'Rehab / SNF / Nursing home';
export const FAMILY_CLOSE_LOW_FUNDS = 'Low funds / Medicaid';
export const FAMILY_CLOSE_APARTMENT = '55+ / Apartment';
export const FAMILY_CLOSE_PASSED_AWAY = 'Passed away / hospice';
export const FAMILY_CLOSE_NO_FEE = 'No contract / No referral fee';
export const FAMILY_CLOSE_NOT_PRESENT = 'Not moving at this time';
export const FAMILY_CLOSE_EARLY = 'Early researcher / Looking 1+ year out';
export const FAMILY_CLOSE_IN_HOME_CARE = 'Looking for in home care';
export const FAMILY_CLOSE_CHANGED_MIND = 'No longer moving / Changed mind';
export const FAMILY_CLOSE_REJECT = 'Reject';
export const FAMILY_CLOSE_OUTSIDE = 'Outside territory';
export const FAMILY_CLOSE_ALREADY_WORKING = 'Working with family before Seniorly';
export const FAMILY_CLOSE_DUPLICATE = 'Duplicate Seniorly Lead';
export const FAMILY_CLOSE_INVALID_CONTACT = 'Invalid contact information';
export const FAMILY_CLOSE_NOT_LOOKING = 'Not looking for senior living';
export const FAMILY_CLOSE_MISC = 'Miscellaneous';

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
export const FAMILY_CLOSE_ORDERED = {};
FAMILY_CLOSE_ORDERED[FAMILY_CLOSE_CANNOT_HELP] = [FAMILY_CLOSE_UNRESPONSIVE, FAMILY_CLOSE_NOHELP, FAMILY_CLOSE_NOTDECISIONMAKER];
FAMILY_CLOSE_ORDERED[FAMILY_CLOSE_NOT_BILLABLE] = [FAMILY_CLOSE_SNF, FAMILY_CLOSE_LOW_FUNDS, FAMILY_CLOSE_APARTMENT, FAMILY_CLOSE_PASSED_AWAY, FAMILY_CLOSE_NO_FEE];
FAMILY_CLOSE_ORDERED[FAMILY_CLOSE_NOT_PRESENT] = [FAMILY_CLOSE_EARLY, FAMILY_CLOSE_IN_HOME_CARE, FAMILY_CLOSE_CHANGED_MIND];
FAMILY_CLOSE_ORDERED[FAMILY_CLOSE_REJECT] = [FAMILY_CLOSE_OUTSIDE, FAMILY_CLOSE_ALREADY_WORKING, FAMILY_CLOSE_DUPLICATE, FAMILY_CLOSE_INVALID_CONTACT, FAMILY_CLOSE_NOT_LOOKING];
FAMILY_CLOSE_ORDERED[FAMILY_CLOSE_MISC] = DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS;

export const SOURCE_OPTIONS = [
  'Direct Call',
  'Voicemail',
  'AnswerConnect',
  'Bot',
  'AD',
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

