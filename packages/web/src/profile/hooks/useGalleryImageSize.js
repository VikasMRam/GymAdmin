import { useMemo } from 'react';

import {
  useBreakpoint,
  MOBILE,
  TABLET,
  PORTRAIT,
  LANDSCAPE,
} from 'sly/web/components/helpers/breakpoint';

const formats = [
  [MOBILE, PORTRAIT, 'a576x720'],
  [MOBILE, LANDSCAPE, 'a720x576'],
  [TABLET, PORTRAIT, 'a1080x864'],
];

export default function useGalleryImageSize () {
  const breakpoint = useBreakpoint();

  const imageSize = useMemo(() => {
    let result = 'a1280x1080';
    formats.some(([dev, ori, format]) => (breakpoint.is(dev, ori) && (result = format)));
    return result;
  }, [breakpoint]);

  return { imageSize };
}

