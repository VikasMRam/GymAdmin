import { useState, useRef, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

import useDimensions from './useDimensions';

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

function useScrollObserver() {
  const [scroll, setScroll] = useState({});
  const [ref, dimensions] = useDimensions();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function onScroll() {
      setScroll({
        scrollWidth: ref.current.scrollWidth, 
        scrollHeight: ref.current.scrollHeight,
        scrollLeft: ref.current.scrollLeft,
        scrollTop: ref.current.scrollTop,
      });
    }
    onScroll();

    const debounced = debounce(onScroll);

    ref.current.addEventListener('scroll', debounced);
    return function cleanup () {
      ref.current.removeEventListener('scroll', debounced); 
    }
  }, [ref, dimensions]);

  const combined = useMemo(() => ({
    ...scroll,
    ...dimensions,
    scrollX: scroll.scrollWidth - dimensions.clientWidth,
    scrollY: scroll.scrollHeight - dimensions.clientHeight,
  }), [scroll, dimensions]);

  return [ref, combined];
}

export default useScrollObserver;
