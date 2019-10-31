import React, { Fragment } from 'react';
import { hydrate } from 'react-dom';

const HYDRATION_DATA_TYPE = 'application/hydration-data';
const HYDRATION_MARKER_TYPE = 'application/hydration-marker';

let currentHid = 0;
let data = {};

function flushHydrationData() {
  const replacer = (key, value) => {
    const propsToRemove = ['__source', '__self'];
    return propsToRemove.includes(key) ? undefined : value;
  };
  const serializedHydrationData = JSON.stringify(data, replacer);
  currentHid = 0;
  data = {};
  return serializedHydrationData;
}

export function HydrationData() {
  const __html = flushHydrationData();
  return <script type={HYDRATION_DATA_TYPE} dangerouslySetInnerHTML={{ __html }} />;
}

function storeProps(Component, props) {
  const hid = (++currentHid).toString();
  const componentName = getComponentTypeHydrationId(Component);
  data[hid] = { componentName, props };
  return hid;
}

export const withHydration = (Component, { alwaysHydrate } = {}) => (props) => {
  const hid = storeProps(Component, props);
  return (
    <>
      <script type={HYDRATION_MARKER_TYPE} data-hid={hid} data-always-hydrate={!!alwaysHydrate} />
      <div>
        <Component {...props} />
      </div>
    </>
  );
};

function getComponentTypeHydrationId(component) {
  const { typeHydrationId } = component;
  if (!typeHydrationId) {
    throw new Error(`Can only hydrate components with a \`typeHydrationId\` property defined. ${component.name}`);
  }
  return typeHydrationId;
}

function createComponentMap(components) {
  return components.reduce(
    (map, component) => ({
      ...map,
      [getComponentTypeHydrationId(component)]: component,
    }),
    {}
  );
}

export function hydrateComponents(components, container, Wrapper) {
  const markers = Array.from(container.querySelectorAll(`script[type="${HYDRATION_MARKER_TYPE}"]`));
  const dataScript = container.querySelector(`script[type="${HYDRATION_DATA_TYPE}"]`);
  const data = JSON.parse(dataScript.innerHTML);
  const componentMap = createComponentMap(components);

  const observer = new IntersectionObserver((entries) => {
    for(const entry of entries) {
      const hydrateRootElement = entry.target;
      const markerElement = hydrateRootElement.previousElementSibling;

      if(entry.isIntersecting || markerElement.getAttribute('data-always-hydrate') === 'true') {
        const { componentName, props } = data[markerElement.getAttribute('data-hid')];
        const Component = componentMap[componentName];

        if (Component) {
          hydrate(
            <Wrapper>
              <Component {...props} />
            </Wrapper>,
            hydrateRootElement
          );
        }

        observer.unobserve(entry.target);
      }
    }
  });

  for (const marker of markers) {
    observer.observe(marker.nextElementSibling);
  }
}
