import { WHO_PERSON_OPTIONS } from 'sly/web/constants/wizards/assessment';

export const getLabelForWhoPersonOption = whoNeedsHelp => WHO_PERSON_OPTIONS.find(o => o.value === whoNeedsHelp).label;
