import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';

import useGalleryImageSize from './useGalleryImageSize';

const wrap = () => {
  const { result } = renderHook(() => useGalleryImageSize(), {
    wrapper: ({ children }) => <BreakpointProvider>{children}</BreakpointProvider>,
  });
  return result;
};

describe('useGalleryImageSize', () => {
  it('should give a default bounding box', () => {
    window.innerWidth = 2000;
    window.innerHeight = 1500;
    const { current } = wrap();

    expect(current.imageSize).toEqual('a1280x1080');
  });

  it('should give a mobile bounding box', () => {
    window.innerWidth = 600;
    window.innerHeight = 800;

    let result;
    result = wrap();
    expect(result.current.imageSize).toEqual('a576x720');

    window.innerWidth = 800;
    window.innerHeight = 600;
    result = wrap();
    expect(result.current.imageSize).toEqual('a720x576');
  });

  it('should give a tablet bounding box', () => {
    window.innerWidth = 800;
    window.innerHeight = 1200;

    let result;
    result = wrap();
    expect(result.current.imageSize).toEqual('a1080x864');

    // this could be laptop
    window.innerWidth = 1200;
    window.innerHeight = 800;
    result = wrap();
    expect(result.current.imageSize).toEqual('a1280x1080');
  });
});
