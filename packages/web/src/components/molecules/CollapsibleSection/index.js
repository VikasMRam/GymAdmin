import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { bool, string, node, oneOf, object } from 'prop-types';

import { size, key, palette } from 'sly/common/components/themes';
import { Icon } from 'sly/common/components/atoms';
import { weight as weightPropType } from 'sly/common/propTypes/weight';
import { Heading, Block, space } from 'sly/common/system';
import useDimensions from 'sly/common/components/helpers/useDimensions';


const Section = styled.section`
  transition: padding-bottom ${key('transitions.default')};
  max-width: 100%;

  border: ${p => p.borderless ? 'none' : size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${p => p.borderless ? 'none' : size('spacing.small')};
`;

const contentHeight = ({ collapsed, maxHeight }) => (!collapsed ? `${maxHeight}px` : 0);

const ContentWrapper = styled.div`
height: ${contentHeight};
transition: height ${key('transitions.default')};
${ifProp('collapsed', css`
  overflow: hidden;
`, css`
  overflow: visible;
  animation: 0.4s delay-overflow;
`)};
@keyframes delay-overflow {
  from { overflow: hidden; }
}
`;


export const MainSection = styled(Block)`
  padding: 0 ${space('l')};
  padding-bottom: ${space('l')};
  ${ifProp('collapsed', css`
    padding-bottom: 0;
  `)};
  ${ifProp('noPadding', css`
    padding: 0;
  `)};
`;

const CollapsibleSection = ({
  children,
  title,
  collapsedDefault,
  size,
  innerRef,
  className,
  borderBottom,
  headingWeight,
  borderless,
  showIf,
  forMobileOnly,
  headingFont,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(collapsedDefault);
  const [measureRef, { height: maxHeight }] = useDimensions();

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);


  return showIf && (
    <Section
      as={Block}
      collapsed={collapsed}
      borderless={borderless}
      borderBottom={borderBottom}
      ref={innerRef}
      className={className}
    >
      <Block
        onClick={toggle}
        display="grid"
        justifyContent="space-between"
        gridTemplateColumns="auto auto"
        padding="m l"
        css={css({
          ':hover': {
            cursor: 'pointer',
          },
        })}
      >
        <Heading
          font={headingFont}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Heading>

        <Icon rotate={1} icon="chevron" palette="slate" flip={!collapsed} />

      </Block>
      <ContentWrapper maxHeight={maxHeight} collapsed={collapsed} {...props}>
        <div ref={measureRef}>
          {children}
        </div>
      </ContentWrapper>

    </Section>
  );
};

CollapsibleSection.propTypes = {
  children: node,
  title: string.isRequired,
  collapsedDefault: bool.isRequired,
  size: oneOf(['small', 'regular', 'large']),
  innerRef: object,
  className: string,
  headingWeight: weightPropType,
  borderBottom: string,
  borderless: bool,
  id: string,
  forMobileOnly: bool,
  showIf: bool,
  headingFont: string,
};

CollapsibleSection.defaultProps = {
  collapsedDefault: false,
  size: 'regular',
  headingWeight: 'medium',
  borderless: false,
  showIf: true,
  headingFont: 'title-s-azo',
};

export default CollapsibleSection;
