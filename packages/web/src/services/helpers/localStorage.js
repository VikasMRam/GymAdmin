import { isBrowser } from 'sly/web/config';

export const isCtaRecorded = (ctaKey,entityId) => {
  if (!isBrowser) {
    return false;
  }
  const ls = localStorage.getItem(ctaKey);
  if (!ls) {
    return false;
  }
  return ls && ls.indexOf(entityId) > -1;
};

export const recordEntityCta = (ctaKey,entityId) => {
  if (!isBrowser) {
    return false;
  }
  const ls = localStorage.getItem(ctaKey);
  if (!ls) {
    localStorage.setItem(ctaKey,entityId);
  } else {
    localStorage.setItem(ctaKey,`${ls},${entityId}`);
  }
  return true;
};
