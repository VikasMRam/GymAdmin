import { isBrowser } from 'sly/web/config';

export const isCtaRecorded = (ctaKey, entityId) => {
  if (!isBrowser) {
    return false;
  }
  const ls = localStorage.getItem(ctaKey);
  if (!ls) {
    return false;
  }
  return ls && ls.indexOf(entityId) > -1;
};

export const recordEntityCta = (ctaKey, entityId) => {
  if (!isBrowser) {
    return false;
  }
  const ls = localStorage.getItem(ctaKey);
  if (!ls) {
    localStorage.setItem(ctaKey, entityId);
  } else {
    localStorage.setItem(ctaKey, `${ls},${entityId}`);
  }
  return true;
};

// Helper to aid error checks
export const addToLocalStorage = (key, val) => {
  if (!isBrowser) {
    return false;
  }
  localStorage.setItem(key, val);
  // check browsers' private mode check
  const ls = localStorage.getItem(key);
  if (!ls || ls !== val) {
    return false;
  }
  return true;
};

export const retrieveLocalStorage = (key) => {
  if (!isBrowser) {
    return false;
  }
  // check browsers' private mode check
  const ls = localStorage.getItem(key);
  if (!ls) {
    return null;
  }
  return ls;
};
