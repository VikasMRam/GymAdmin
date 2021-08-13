import React from 'react';
import styled, { css } from 'styled-components';
import { key } from 'styled-theme';
import { string } from 'prop-types';

import Block from 'sly/common/system/Block';
import { sx, space, sx$tablet, color } from 'sly/common/system/sx';

const tableStyles = css`
  & figure.table {
    table {
      ${sx({ border: 'box' })}
      width: 100%;
      border-collapse: collapse;
      border-style: hidden;
      box-shadow: 0 0 0 1px ${key('palette.slate.lighter-90')};
      margin-bottom: ${key('space.l')};
      
      ${sx$tablet({ marginBottom: 'xl' })}
     
      & > thead,
      & > tbody {
        & > tr {
          ${sx({ borderBottom: 's', borderColor: 'slate.lighter-90' })}
          
          & > th, & > td {
            ${sx({ padding: 'm l', textAlign: 'left' })}
          }
        }
      }
      
      & > thead > tr {
        background: ${color('slate.lighter-95')};
        padding-right: ${space('m')};

        th {
          ${sx({ font: 'title-xs-azo' })}
        }
      }
      
      & > tbody > tr {
        &:last-child {
          border-bottom: none;
        }

        td {
          ${sx({ font: 'body-m' })}
        }
      }

      & figure.image {
        line-height: normal;
        height: ${key('space.l')};

        & > img {
          width: auto;
          height: 100%;
          margin-bottom: 0;
        }
      }
    }
  }
`;

const DynamicItemWrapper = styled(Block)`
  & * {
    font-size: 1.125rem;
    line-height: ${key('space.xl')};
    overflow-x: auto;
  }
  & > p {
    letter-spacing: 0;
    margin-bottom: ${key('space.l')};
    
    ${sx$tablet({ margin: '0 0 xl'})}
  }
  
  & > ul, & > ol {
    margin: ${key('space.xs')} 0 ${key('space.xl')};
    padding-inline-start: ${key('space.l')};
    
    ${sx$tablet({ marginTop: 0 })}
    
    li {
      margin-bottom: ${key('space.s')};
      overflow-x: visible;
    }
  }

  & a {
    color: ${key('color.viridian.base')};
  }

  & figure > img {
    width: 100%;
    height: auto;
    margin-bottom: ${space('l')};

    ${sx$tablet({ mb: 'xl' })}
  }
  
  ${tableStyles}
`;

const EditorValueWrapper = ({ value, ...rest }) => (
  <DynamicItemWrapper
    dangerouslySetInnerHTML={{ __html: value }}
    width={sx`calc(100% - ${space('m')} * 2)`}
    sx$tablet={{ width: 'col6' }}
    sx$laptop={{ width: 'col8' }}
    {...rest}
  />
);

EditorValueWrapper.propTypes = {
  value: string,
};

export default EditorValueWrapper;

