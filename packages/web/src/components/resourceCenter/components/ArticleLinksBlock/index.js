import React from 'react';
import styled, { css } from 'styled-components';
import { array, string } from 'prop-types';

import { withBorder } from 'sly/common/components/helpers';
import { size } from 'sly/common/components/themes';
import { host } from 'sly/web/config';
import { RESOURCE_CENTER_PATH } from "sly/web/constants/dashboardAppPaths";
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';

const Wrapper = styled(Block)(withBorder);
const Title = styled(Block)(
  false,
  css`
    font-size: 1.125rem;
    line-height: ${size('spacing.xl')};
  `,
);
const LinkItem = styled(Link)`
  display: block;
  margin-bottom: ${size('spacing.m')};
  font-size: 1.125rem;
  line-height: ${size('spacing.xl')};
`;

const LinksBlock = ({ title, description, links }) => {
  return (
    <Wrapper
      padding="l"
      background="viridian.lighter-90"
      borderRadius="small"
      startingWithTablet={{ padding: 'xl' }}
    >
      <Block font="title-large" marginBottom="xl">{title}</Block>
      <Title
        marginBottom="l"
        startingWithTablet={{ marginBottom: 'xl' }}
        startingWithLaptop={{ marginBottom: 'l' }}
      >
        {description}
      </Title>
      {links?.map(({ to, title, id }) => {
        const isResourceCenterRoute = to.includes(`${host}${RESOURCE_CENTER_PATH}`);
        return <LinkItem
          key={id}
          {...{ [isResourceCenterRoute ? 'to' : 'href']: isResourceCenterRoute ? to.replace(host, '') : to}}
        >
          {title}
        </LinkItem>
      })}
    </Wrapper>
  );
};

LinksBlock.propTypes = {
  title: string,
  description: string,
  links: array,
};

export default LinksBlock;
