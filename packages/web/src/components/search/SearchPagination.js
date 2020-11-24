import React from 'react';
import { object } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';
import { getKey } from 'sly/common/components/themes';
import Pagination from 'sly/web/components/molecules/Pagination';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import { getBreadCrumbsForLocation } from 'sly/web/services/helpers/url';

const SearchPagination = ({
  currentFilters,
  pagination,
}) => {
  const {
    current,
    total,
    start,
    end,
    count,
    basePath,
  } = pagination;

  return (

    <Block
      display="flex"
      direction="column"
      alignItems="center"
      padding="xLarge 0"
      upToTablet={{
        paddingBottom: getKey('sizes.spacing.xxLarge'),
      }}
    >
      {total > 0 &&
        <Pagination
          basePath={basePath}
          pageParam="page-number"
          current={current}
          total={total}
          collapsedInMobile
          css={{
            marginBottom: getKey('sizes.spacing.large'),
          }}
        />
      }
      {!!count && 
        <Block
          pad="xLarge"
          upToTablet={{
            display: 'none',
          }}
        >
          {start} - {end} of {count} results
        </Block>
      }
      {!!count && 
        <BreadCrumb
          items={getBreadCrumbsForLocation(currentFilters, true)}
          upToTablet={{
            display: 'none!important',
          }}
        />
      }
    </Block>
  );
};

SearchPagination.propTypes = {
  currentFilters: object,
  pagination: object,
};

export default SearchPagination;
