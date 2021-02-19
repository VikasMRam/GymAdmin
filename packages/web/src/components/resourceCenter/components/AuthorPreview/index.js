import React from 'react';
import styled, { css } from 'styled-components';
import { string } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';
import { getKey, size } from 'sly/common/components/themes';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { Icon, Link } from 'sly/common/components/atoms';
import { startingWith, withBorder, withDisplay } from 'sly/common/components/helpers';

const AuthorFullName = styled(Block)(
  css`
    white-space: nowrap;
  `,
);
const WrittenBy = styled(Block)(
  false, // ????
  css`
    letter-spacing: ${size('spacing.nano')};
    text-transform: uppercase;
    
    ${startingWith(
    'tablet',
    css`
          margin: 0;
        `,
  )}
  `,
);
const WithDisplay = styled(Block)(withDisplay);

const ImgWrapper = styled(Block)(withBorder);

const AuthorPreview = ({
  url,
  alternativeText,
  firstName,
  fullName,
  shortDescription,
  slug,
}) => (
  <>
    <WithDisplay display="flex" flexWrap="wrap">
      <WrittenBy
        palette="slate.lighter-40"
        font="label"
        marginBottom="s"
        width="100%"
        startingWithTablet={{ display: 'none' }}
      >
        written by:
      </WrittenBy>
      <ImgWrapper
        width={size('element.xxxLarge')}
        minWidth={size('element.xxxLarge')}
        height={size('element.xxxLarge')}
        minHeight={size('element.xxxLarge')}
        borderRadius="50%"
        overflow="hidden"
        marginRight="s"
        marginBottom="s"
        startingWithTablet={{ marginRight: 'l', marginBottom: '0' }}
      >
        <ResponsiveImage
          css={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          // TODO: fix when the CMS starts giving the correct path
          src={`http://localhost:1337${url}`}
          alt={alternativeText}
        />
      </ImgWrapper>
      <WithDisplay display="flex" flexDirection="column">
        <WrittenBy
          palette="slate.lighter-40"
          font="label"
          marginBottom="s"
          width="100%"
          upToTablet={{ display: 'none' }}
          startingWithTablet={{ display: 'block' }}
        >
          written by:
        </WrittenBy>
        <AuthorFullName font="title-medium" margin="auto 0">{fullName}</AuthorFullName>
      </WithDisplay>
    </WithDisplay>
    <Block
      startingWithTablet={{
        marginLeft: `calc(${getKey('sizes.spacing.l')} + ${getKey('sizes.element.xxxLarge')})`,
      }}
    >
      <Block marginBottom="l" font="body-regular">{shortDescription}</Block>
      <Link to={`/resources/author/${slug}`}>
        {`View other articles written by ${firstName}`}
        <Icon icon="chevron" />
      </Link>
    </Block>
  </>
);

AuthorPreview.propTypes = {
  url: string,
  alternativeText: string,
  firstName: string,
  fullName: string,
  shortDescription: string,
  slug: string,
};

export default AuthorPreview;
//
// <Block
//   upToTablet={{}}
//   startingWithTablet={{}}
//   startingWithLapTop={{}}
// >
//   <Block></Block>
//   <Block></Block>
// </Block>
