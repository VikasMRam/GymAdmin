import React from 'react';
import { renderToString as reactRenderToString } from 'react-dom/server';

import { ApiContextProvider } from './context';

const renderPass = async (element) => {
  const context = {
    promises: [],
  };

  const html = reactRenderToString((
    <ApiContextProvider context={context}>
      {element}
    </ApiContextProvider>
  ));

  // we don't mind the result, just completion
  await Promise.all(context.promises.map(promise => promise.catch(() => {})));

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
