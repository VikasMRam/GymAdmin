import React, { forwardRef, createContext, useContext, useEffect } from 'react';
import { string, node, object, oneOfType, number, bool } from 'prop-types';

import { isServer } from 'sly/web/config';
import Block from 'sly/common/system/Block';

export const IconContext = createContext(null);

const updateIcons = (iconContext) => {
  // this is how react-helmet does it
  const defs = document.querySelector('svg[data-sly-svgs] defs');
  const svgs = defs.querySelectorAll(':scope > svg');
  const oldSvgs = Array.prototype.slice.call(svgs);
  let indexToKeep = null;
  Object.entries(iconContext).forEach(([name, { svg }]) => {
    const id = `sly-svg-${name}`;
    // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
    if (
      oldSvgs.some((existingTag, index) => {
        indexToKeep = index;
        return existingTag.id === id;
      })
    ) {
      oldSvgs.splice(indexToKeep, 1);
    } else {
      const newSvg = document.createElement('svg');
      defs.appendChild(newSvg);
      newSvg.outerHTML = svg.replace('<svg ', `<svg id="${id}" `);
    }
  });
  oldSvgs.forEach(svg => svg.parentNode.removeChild(svg));
};

let animationFrameId = null;
const handleClientRender = (iconContext) => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  animationFrameId = requestAnimationFrame(() => {
    updateIcons(iconContext);
    animationFrameId = null;
  });
};

const useIconEffect = (name, svg) => {
  const iconContext = useContext(IconContext);
  // browser
  useEffect(() => {
    iconContext[name] = iconContext[name] || {
      svg,
      instances: 0,
    };
    iconContext[name].instances++;
    handleClientRender(iconContext);

    return () => {
      iconContext[name].instances--;
      if (iconContext[name].instances === 0) {
        delete iconContext[name];
      }
      handleClientRender(iconContext);
    };
  }, []);

  if (isServer) {
    iconContext[name] = iconContext[name] || {
      svg,
      instances: 0,
    };
    iconContext[name].instances++;
  }
};

const Icon = forwardRef(({ sx, svg, active, hoverColor, rotation, name, size, ...props }, ref) => {
  useIconEffect(name, svg);

  const svgStates = {};
  if (rotation) {
    svgStates['--rotation'] = `${rotation}deg`;
  }

  svgStates['--active-color'] = active
    ? 'currentColor'
    : 'transparent';

  if (hoverColor) {
    svgStates['--hover-color'] = 'transparent';
    svgStates[':hover'] = {
      '--hover-color': active ? 'transparent' : hoverColor,
    };
  }

  return (
    <Block
      as="svg"
      ref={ref}
      iconSize={size}
      _sx={{
        ...svgStates,
        verticalAlign: 'top',
      }}
      {...props}
    >
      <use href={`#sly-svg-${name}`} />
    </Block>
  );
});

Icon.displayName = 'Icon';

Icon.propTypes = {
  sx: object,
  svg: node.isRequired,
  size: string,
  rotation: oneOfType([number, string]),
  hoverColor: string,
  name: string,
  active: bool,
};

Icon.defaultProps = {
  size: 'm',
};

/**
 * Used in Html.js to render the icons ssr
 *
 * @param {Array<object>} icons
 */
export const iconToComponent = (icons) => {
  if (!icons) return null;
  const content = Object.entries(icons).map(([name, { svg }]) => svg.replace('<svg ', `<svg id="sly-svg-${name}" `));
  return (
    <svg data-sly-svgs="true">
      <defs
        dangerouslySetInnerHTML={{ __html: content.join('\n') }}
      />
    </svg>
  );
};

export default Icon;
