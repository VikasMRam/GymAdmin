import React from 'react';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';
import { string, shape, oneOf, func } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
import { Image, Link } from 'sly/web/components/atoms';

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  color: ${palette('slate', 'base')};

  &:hover {
    color: ${palette('slate', 'base')};
  }

  ${switchProp('layout', {
    regular: css`
      border: ${size('border.regular')} solid ${palette('secondary', 'stroke')};
      padding: ${size('spacing.xLarge')};
      border-radius: ${size('spacing.small')};
      // TODO: @pranesh-seniorly this should be flexbox and should figure out sizes by itsef
      &:hover {
        cursor: pointer;
        background: ${palette('white', 'base')};
        box-shadow: 0 ${size('spacing.regular')} ${size('spacing.large')} ${palette('slate', 'filler')}80;
      }
    `,
  })}
`;

export const ImageWrapper = styled(Image)`
  z-index: 0;
  display: block;

${switchProp('layout', {
    regular: css`
        margin-bottom: ${size('spacing.xLarge')};
`,
    modal: css`
        margin-bottom: ${size('spacing.large')};
`,
  })}
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingWrapper = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.small')};
`;

const SubHeadingWrapper = styled.div`
  ${switchProp('layout', {
    modal: css`
      margin-bottom: ${size('spacing.large')};
`,
  })}
`;

const DescriptionWrapper = styled.div`
  color: ${palette('slate', 'filler')};
`;

const ProfileTile = ({
  layout,
  profile = {},
  ...props
}) => {
  const {
    heading,
    subHeading,
    imageUrl,
    description,
  } = (profile);

  return (
    <Wrapper layout={layout} {...props}>
      <ImageWrapper src={imageUrl} aspectRatio="16:9" layout={layout} />
      <InfoWrapper layout={layout}>
        <HeadingWrapper>{heading}</HeadingWrapper>
        {subHeading && <SubHeadingWrapper>{subHeading}</SubHeadingWrapper>}
        { layout === 'modal' && <DescriptionWrapper>{description}</DescriptionWrapper>}
      </InfoWrapper>
    </Wrapper>
  );
};

ProfileTile.propTypes = {
  profile: shape({
    heading: string.isRequired,
    subHeading: string,
    imageUrl: string.isRequired,
    description: string,
  }),
  layout: oneOf(['regular', 'modal']),
  onClick: func,
};

ProfileTile.defaultProps = {
  layout: 'regular',
};

export default ProfileTile;
