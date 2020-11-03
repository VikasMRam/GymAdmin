import useResizeObserver from 'use-resize-observer';
import { useState, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

function getDimensionObject(rect) {
  const x = 'x' in rect ? rect.x : rect.left;
  const y = 'y' in rect ? rect.y : rect.top;

  return {
    width: rect.width,
    height: rect.height,
    left: x,
    top: y,
    x,
    y,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function useDimensions() {
  const [dimensions, setDimensions] = useState({});

  const ref = useRef();

  const onResize = useMemo(() => debounce(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDimensions(getDimensionObject(rect));
    }
  }, 150), [ref]);

  useResizeObserver({ ref, onResize });

  return [ref, dimensions];
}

export default useDimensions;
