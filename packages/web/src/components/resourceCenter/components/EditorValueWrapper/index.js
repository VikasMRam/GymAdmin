import React from 'react';
import styled, { css } from 'styled-components';
import { string } from 'prop-types';

import { getKey, palette, size } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';
import { startingWith } from 'sly/common/components/helpers';

const tableStyles = css`
  & figure.table {
    table {
      width: 100%;
      border: ${size('border.regular')} solid ${palette('slate', 'lighter-90')};
      border-collapse: collapse;
      border-radius: ${size('border.xxLarge')};
      border-style: hidden;
      box-shadow: 0 0 0 1px ${palette('slate', 'lighter-90')};
      margin-bottom: ${size('spacing.l')};
      
      ${startingWith('tablet', css({ marginBottom: size('spacing.xl') }))}
     
      & > thead,
      & > tbody {
        & > tr {
          border-bottom: ${size('border.regular')} solid ${palette('slate', 'lighter-90')};
          
          & > th, & > td {
            padding: ${size('spacing.m')} ${size('spacing.l')};
            font-size: ${size('text.body')};
            line-height: ${size('lineHeight.body')};
            text-align: left;
          }
        }
      }
      
      & > thead > tr {
        background: ${palette('slate', 'lighter-95')};
        
        th {
          padding-right: ${size('spacing.m')};
        }
      }
      
      & > tbody > tr {
        &:last-child {
          border-bottom: none;
        }
      }

      & figure.image {
        line-height: normal;
        height: ${size('spacing.l')};

        & > img {
          height: 100%;
        }
      }
    }
  }
`;

const DynamicItemWrapper = styled(Block)(
  false, // without it styles does not work
  css`
    & * {
      font-size: 1.125rem;
      line-height: ${size('spacing.xl')};
      word-break: break-word;
    }
    & > p {
      letter-spacing: 0;
      margin-bottom: ${size('spacing.l')};
      
      ${startingWith('tablet', css({ margin: `0 0 ${getKey('sizes.spacing.xl')}` }))}
    }
    
    & > ul, & > ol {
      margin: ${size('spacing.xs')} 0 ${size('spacing.xl')};
      padding-inline-start: ${size('spacing.l')};
      
      ${startingWith('tablet', css({ marginTop: 0 }))}
      
      li {
        margin-bottom: ${size('spacing.s')};
      }
    }

    & a {
      color: ${palette('viridian', 'base')};
    }
    
    ${tableStyles}
  `,
);

const EditorValueWrapper = ({ value, ...rest }) => (
  <DynamicItemWrapper
    dangerouslySetInnerHTML={{ __html: value }}
    width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
    startingWithTablet={{ width: size('layout.col6') }}
    startingWithLaptop={{ width: size('layout.col8') }}
    {...rest}
  />
);

EditorValueWrapper.propTypes = {
  value: string,
};

export default EditorValueWrapper;

