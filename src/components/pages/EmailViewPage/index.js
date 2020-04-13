import React from 'react';

export default function EmailViewPage({ html }) {

  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

