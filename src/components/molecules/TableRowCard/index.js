import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape, number, object } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import { Td, StageDiv, DoubleLineDiv } from 'sly/components/molecules/Td';
import Hr from 'sly/components/atoms/Hr';

const Wrapper = styled.div`
  padding: ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xLarge')};
`;

const HeadingLinkWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.large')};
  margin-right: -${size('spacing.large')};
`;

const TableRowCard = ({ heading, href, contents }) => {
  const contentComponents = contents.map((contentRow) => {
    const { id, rowItems } = contentRow;
    const itemsLength = rowItems.length;
    const rowComponent = rowItems.map((rowItem, i) => {
      const hrComponent = (itemsLength - 1 !== i && <StyledHr size="large" />);
      const { type, data } = rowItem;
      if (type === 'stage') {
        const { text, currentStage } = data;
        return (
          <Fragment key={text}>
            <StageDiv text={text} currentStage={currentStage} borderless />
            {hrComponent}
          </Fragment>
        );
      } else if (type === 'doubleLine') {
        const { firstLine, secondLine } = data;
        return (
          <Fragment key={firstLine}>
            <DoubleLineDiv firstLine={firstLine} secondLine={secondLine} borderless />
            {hrComponent}
          </Fragment>
        );
      }
      return <Td key={`Td_${id}`} />;
    });
    return <div key={id}>{rowComponent}</div>;
  });
  return (
    <Wrapper>
      <HeadingLinkWrapper>
        <Link href={href} size="caption" weight="medium">{heading}</Link>
      </HeadingLinkWrapper>
      {contentComponents}
    </Wrapper>
  );
};

TableRowCard.propTypes = {
  heading: string.isRequired,
  href: string.isRequired,
  contents: arrayOf(shape({
    id: number,
    rowItems: arrayOf(shape({
      type: string.isRequired,
      data: object.isRequired,
    }).isRequired),
  })),
};

export default TableRowCard;
