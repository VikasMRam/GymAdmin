import { isBrowser } from 'sly/config';

export const randomHexNumber = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};


export const copyToClipboard = (text) => {
  if (isBrowser) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => alert(`${text} copied to clipboard!`))
        .catch(() => alert(`Could not copy ${text} to clipboard!`));
    } else {
      alert(`Copy ${text} to clipboard unsupported!`);
    }
  }

};
