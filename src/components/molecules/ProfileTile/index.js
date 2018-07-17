import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { switchProp } from 'styled-tools';
import { string, shape, oneOf, func } from 'prop-types';

import { size } from 'sly/components/themes';
import { Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${switchProp('layout', {
    regular: css`
      border: ${size('border.regular')} solid ${palette('primary', 3)};
      border-radius: ${size('spacing.small')};
        width: ${size('profileTile.wrapper.regular.width')};
        &:hover {
          cursor: pointer;
          background: #fff;
          border: ${size('border.regular')} solid ${palette('secondary', 0)};
          box-shadow: 0 ${size('spacing.regular')} ${size('spacing.large')} ${palette('grayscale', 0)}80;
        }
`,
    modal: css`
      width: ${size('profileTile.wrapper.modal.width')};
`,
  })}
`;

export const ImageWrapper = styled(Image)`
  object-fit: cover;
  z-index: 0;
  display: block;

${switchProp('layout', {
    regular: css`
        width: ${size('profileTile.image.regular.width')};
        height: ${size('profileTile.image.regular.height')};
        margin: ${size('spacing.xLarge')};
`,
    modal: css`
        width: ${size('profileTile.image.modal.width')};
        height: ${size('profileTile.image.modal.height')};
        margin-bottom: ${size('spacing.large')};
`,
  })}
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${switchProp('layout', {
    regular: css`
      margin: ${size('spacing.xLarge')};
      margin-top: 0;
`,
    modal: css`
      margin-top: 0;
    `,
  })}
`;

const HeadingWrapper = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.small')};
`;

const SubHeadingWrapper = styled.div`
  ${switchProp('layout', {
    regular: css`
      
    `,
    modal: css`
      margin-bottom: ${size('spacing.large')};
`,
  })}
`;

const DescriptionWrapper = styled.div`
  color: ${palette('grayscale', 1)};
`;

const ProfileTile = ({ profile, layout, onClick }) => {
  const {
    heading, subHeading, imageUrl, description,
  } = profile;
  return (
    <Wrapper layout={layout} onClick={onClick}>
      <ImageWrapper src={imageUrl} aspectRatio="16:9" layout={layout} />
      <InfoWrapper layout={layout}>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <SubHeadingWrapper layout={layout}>{subHeading}</SubHeadingWrapper >
        { layout === 'modal' && <DescriptionWrapper>{description}</DescriptionWrapper>}
      </InfoWrapper>
    </Wrapper>
  );
};

ProfileTile.propTypes = {
  profile: shape({
    heading: string.isRequired,
    subHeading: string.isRequired,
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
