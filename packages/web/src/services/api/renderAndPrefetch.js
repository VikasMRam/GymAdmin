import { renderToString } from 'react-dom/server';


export default async function renderAndPrefetch(element, apiContext) {
  let result;

  let apiPromises;
  // we repeat until no component has requested new promises
  do {
    result = renderToString(element);
    // we don't mind the result, just completion
    apiPromises = Object.values(apiContext.apiClient.store.promises).map(promise => promise.catch(() => {}));
    console.log('promises', apiPromises);
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(apiPromises);
  } while (apiPromises.length);

  return result;
}
