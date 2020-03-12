import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { ApiContextProvider } from './context';

const renderPass = async (element) => {
  const context = {
    promises: [],
  };

  const html = await new Promise((resolve, reject) => {
    const body = [];
    const bodyStream = renderToNodeStream((
      <ApiContextProvider context={context}>
        {element}
      </ApiContextProvider>
    ));
    bodyStream.on('data', (chunk) => {
      body.push(chunk.toString());
    });
    bodyStream.on('error', (err) => {
      reject(err);
    });
    bodyStream.on('end', () => {
      resolve(body.join(''));
    });
  });

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
