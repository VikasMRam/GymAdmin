import React from 'react';
import styled, { css } from 'styled-components';
import { array, string } from 'prop-types';

import { host } from 'sly/web/config';
import { RESOURCE_CENTER_PATH } from "sly/web/constants/dashboardAppPaths";
import { space } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Heading from 'sly/common/system/Heading';
import Link from 'sly/common/system/Link';

const LinkItem = styled(Link)`
  display: block;
  margin-bottom: ${space('m')};
`;

const LinksBlock = ({ title, description, links }) => {
  return (
    <Block
      padding="l"
      background="viridian.lighter-90"
      border="round"
      sx$tablet={{ padding: 'xl' }}
    >
      <Heading font="title-l" marginBottom="xl">{title}</Heading>
      <Heading font="body-l"
        marginBottom="l"
        sx$tablet={{ marginBottom: 'xl' }}
        sx$laptop={{ marginBottom: 'l' }}
      >
        {description}
      </Heading>
      {links?.map(({ to, title, id }) => {
        const isResourceCenterRoute = to.includes(`${host}${RESOURCE_CENTER_PATH}`);
        const splitPath = to.split(host);
        return <LinkItem
          key={id}
          font="body-l"
          {...{ [isResourceCenterRoute ? 'to' : 'href']: isResourceCenterRoute ? splitPath[splitPath.length - 1] : to}}
        >
          {title}
        </LinkItem>
      })}
    </Block>
  );
};

LinksBlock.propTypes = {
  title: string,
  description: string,
  links: array,
};

export default LinksBlock;
