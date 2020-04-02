import React from 'react';
import { renderToString as renderToStringReact } from 'react-dom/server';

import { ApiContext } from './context';

const renderPass = async (element) => {
  const context = {
    promises: [],
    skipApiCalls: false,
  };

  const html = renderToStringReact((
    <ApiContext.Provider value={context}>
      {element}
    </ApiContext.Provider>
  ));

  // we don't mind the result, just completion
  const apiPromises = context.promises.map(promise => promise.catch(() => {}));

  await Promise.all(apiPromises);

  return {
    promises: context.promises,
    html,
  };
};

export default async function renderAndPrefetch(element) {
  let result;

  // we repeat until no component has requested new promises
  result = await renderPass(element);
  while (result.promises.length > 0) {
    result = await renderPass(element);
  }

  return result.html;
}
