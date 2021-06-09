import { WHO_PERSON_OPTIONS } from 'sly/web/assessment/constants';

export const getLabelForWhoPersonOption = whoNeedsHelp => WHO_PERSON_OPTIONS.find(o => o.value === whoNeedsHelp).label.toLowerCase();
