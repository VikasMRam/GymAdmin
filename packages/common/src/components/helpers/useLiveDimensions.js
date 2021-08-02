import { useState, useCallback, useLayoutEffect } from 'react';


function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();
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

function useDimensions({ liveMeasure = true }) {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node)),
        );
      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
    return () => {};
  }, [node]);

  return [ref, dimensions, node];
}

export default useDimensions;
