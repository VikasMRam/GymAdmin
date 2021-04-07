import React, { forwardRef } from 'react';
import { string } from 'prop-types';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Image from 'sly/common/system/Image';
import Chevron from 'sly/common/icons/Chevron';
import Link from 'sly/common/system/Link';
import Block from 'sly/common/system/Block';
import Heading from 'sly/common/system/Heading';
import Flex from 'sly/common/system/Flex';

const WrittenBy = forwardRef((props, ref) => (
  <Block
    palette="slate.lighter-40"
    font="label"
    marginBottom="s"
    width="100%"
    letterSpacing="1px"
    textTransform="uppercase"
    sx$tablet={{
      margin: 0,
    }}
    {...props}
  />
));

const AuthorPreview = ({
  path,
  alternativeText,
  firstName,
  fullName,
  shortDescription,
  slug,
}) => (
  <>
    <Flex flexWrap="wrap">
      <WrittenBy display={['block', 'none']}>
        written by:
      </WrittenBy>
      <Block
        size="5rem"
        borderRadius="50%"
        overflow="hidden"
        marginRight="s"
        marginBottom="s"
        sx$tablet={{ marginRight: 'l', marginBottom: '0' }}
      >
        <Image
          path={path}
          alt={alternativeText}
          aspectRatio="1:1"
          sources={[80]}
          sizes="5rem"
        />
      </Block>
      <Flex flexDirection="column">
        <WrittenBy display={['none', 'block']}>
          written by:
        </WrittenBy>
        <Heading as="h3" margin="auto 0" whiteSpace="nowrap">{fullName}</Heading>
      </Flex>
    </Flex>
    <Block
      sx$tablet={{
        paddingLeft: 'l',
        marginLeft: '5rem',
      }}
    >
      <Block marginBottom="l" font="body-m">{shortDescription}</Block>
      <Link to={`${RESOURCE_CENTER_PATH}/author/${slug}`}>
        {`View other articles written by ${firstName}`}
        <Chevron rotation="90" />
      </Link>
    </Block>
  </>
);

AuthorPreview.propTypes = {
  path: string,
  alternativeText: string,
  firstName: string,
  fullName: string,
  shortDescription: string,
  slug: string,
};

export default AuthorPreview;
