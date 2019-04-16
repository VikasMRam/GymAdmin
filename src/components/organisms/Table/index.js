import React from 'react';
import styled from 'styled-components';
import { shape, arrayOf, string, object } from 'prop-types';

import Th from 'sly/components/molecules/Th';
import { Td, LinkTd, TextTd, StageTd, DoubleLineTd } from 'sly/components/molecules/Td';

const Wrapper = styled.table`
  border-collapse: collapse;
`;

const Table = ({ headings, contents }) => {
  const headingComponents = headings.map(heading => <Th key={heading.text} sort={heading.sort} >{heading.text}</Th>);
  const contentComponents = contents.map((contentRow) => {
    const { id, rowItems } = contentRow;
    const rowComponent = rowItems.map((rowItem) => {
      const { type, data } = rowItem;
      if (type === 'link') {
        const { href, text } = data;
        return <LinkTd key={href} href={href} clip>{text}</LinkTd>;
      } else if (type === 'text') {
        const { text } = data;
        return <TextTd key={text} clip>{text}</TextTd>;
      } else if (type === 'stage') {
        const { text, currentStage, palette } = data;
        return <StageTd key={text} text={text} currentStage={currentStage} palette={palette} clip />;
      } else if (type === 'doubleLine') {
        const { firstLine, secondLine } = data;
        return <DoubleLineTd key={firstLine} firstLine={firstLine} secondLine={secondLine} clip />;
      }
      return <Td key={`Td_${id}`} />;
    });
    return <tr key={id}>{rowComponent}</tr>;
  });
  return (
    <Wrapper cellSpacing="0">
      <thead>
        <tr>
          {headingComponents}
        </tr>
      </thead>
      <tbody>
        {contentComponents}
      </tbody>
    </Wrapper>
  );
};

Table.propTypes = {
  headings: arrayOf(shape({
    text: string.isRequired,
    sort: string,
  })).isRequired,
  contents: arrayOf(shape({
    id: string.isRequired,
    rowItems: arrayOf(shape({
      type: string.isRequired,
      data: object.isRequired,
    }).isRequired),
  })),
};

export default Table;
