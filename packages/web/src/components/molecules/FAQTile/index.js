import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const Question = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Answer = styled.div`
  font-size: 18px;
`;

const FAQTile = ({ question, answer }) => (
  <>
    <Question>{question}</Question>
    <Answer>{answer}</Answer>
  </>
);

FAQTile.propTypes = {
  question: string.isRequired,
  answer: string.isRequired,
};

export default FAQTile;
