import React, { useEffect, useState } from 'react';

export function useResourceBuffer(status) {
  const [buffer, setBuffer] = useState(status);

  useEffect(() => {
    if (status.hasFinished && status.result !== buffer.result) {
      setBuffer(status);
    }
  }, [status.hasFinished, status.result]);

  return buffer;
}

export function withResourceBuffer(resource) {
  return ChildComponent => (props) =>  {
    const resourceBuffer = useResourceBuffer(props.status[resource]);
    const parentBuffer = props.buffer || {};
    const buffer = {
      ...parentBuffer,
      [resource]: resourceBuffer,
    };
    return <ChildComponent {...props} buffer={buffer} />;
  };
}
