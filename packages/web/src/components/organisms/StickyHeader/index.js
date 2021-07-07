import React, {  useEffect, useState } from 'react';
import { array, func, string } from 'prop-types';
import Helmet from 'react-helmet';

import Tabs from 'sly/web/components/molecules/Tabs';
import Tab from 'sly/web/components/molecules/Tab';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import { Box } from 'sly/common/system';
import SlyEvent from 'sly/web/services/helpers/events';

// Example format the sections array should be in. The render method filters the array for null/undefined so you can have conditional indecies
/*
const allSections = [
   { label: 'photos', id: 'gallery' },
   label: 'pricing', id: 'pricing-and-floor-plans' },
  { label: 'advisor', id: 'agent-section' },
   { label: 'about', id: 'community-about' },
  { label: 'amenities', id: 'amenities-section' },
  { label: 'reviews', id: 'reviews' },
] */


const TabWithIntersectionObserver = ({ setActiveTab, elementId, ...props }) => {
  useEffect(() => {
    const check = (items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          setActiveTab(item.target.id);
        }
      });
    };
    let observer;
    const elem = document.getElementById(elementId);
    if (elem) {
      observer = new IntersectionObserver(check, {
        marginRoot: '-50% 0px -50% 0px',
        threshold: 0.2,
      });
      observer.observe(elem);
    }
    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <Tab
      {...props}
    />
  );
};

TabWithIntersectionObserver.propTypes = {
  setActiveTab: func.isRequired,
  elementId: func.isRequired,
};


export default function StickyHeader({ sections, type }) {
  const [active, setActive] = useState(null);
  const [shouldShow, setShouldShow] = useState(false);

  // Filter sections for null/undefined indecies
  const presentSections = sections.filter(el => !!el);


  const sendViewEvent = (section) => {
    SlyEvent.getInstance().sendEvent({
      action: 'view',
      category: `${type}Profile-SectionView`,
      label: section,
      nonInteraction: true,
    });
  };

  const setActiveTab = (elementId) => {
    const sectionLabel = presentSections.filter(obj => obj.id === elementId)[0].label;
    setActive(`${sectionLabel}-sticky-header`);
    sendViewEvent(sectionLabel);
  };


  useEffect(() => {
    const checkForGallery = (items) => {
      items.forEach((item) => {
        if (!item.isIntersecting) {
          setShouldShow(true);
        }
        if (shouldShow && item.isIntersecting) {
          setShouldShow(false);
        }
      });
    };

    const gallery = document.getElementById('gallery');
    const observer = new IntersectionObserver(checkForGallery, {
      marginRoot: '0px 0px 0px 0px',
    });
    observer.observe(gallery);

    return () => {
      observer.disconnect();
    };
  }, [shouldShow]);

  return (
    <>
      {shouldShow &&
        <Box sx={{ position: 'fixed', zIndex: 1000, top: 0, padding: '0!important', width: '100%', borderRadius: '0px', background: 'white' }} >
          <Tabs
            margin="auto"
            sx$tablet={{
              width: 'col8',
            }}
            sx$laptop={{
              width: 'col12',
            }}
            css={{ border: 'none' }}
            activeTab={active}
          >
            {presentSections.map(({ label, id }) => (
              <TabWithIntersectionObserver
                setActiveTab={setActiveTab}
                id={`${label}-sticky-header`}
                key={label}
                elementId={id}
                href={`#${id}`}
                onClick={clickEventHandler(`${type}-stick-header`, label)}
              >
                {label}
              </TabWithIntersectionObserver>),
              )}
          </Tabs>
        </Box>
      }
      <Helmet>
        <style>
          {`
          html{
          scroll-padding-top: 50px;
          scroll-behavior: smooth;
          }
        `}
        </style>
      </Helmet>
    </>
  );
}

StickyHeader.propTypes = {
  sections: array,
  type: string,
};

StickyHeader.defaultProps = {
  type: 'community',
};
