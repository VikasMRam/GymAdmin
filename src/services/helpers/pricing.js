export const sortProperties = (obj) => {
  const sortable = [];
  Object.keys(obj).forEach((key) => {
    // each item is an array in format [key, value]
    sortable.push([key, obj[key]]);
  });

  // sort items by value
  sortable.sort((a, b) => a[1] - b[1]);
  // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  return sortable;
};

export const calculatePricing = ({
  community, estimatedPrice, address,
}) => {
  const mEstimatedPrice = { ...estimatedPrice };
  if (mEstimatedPrice && mEstimatedPrice.providedAverage) {
    mEstimatedPrice.providedAverage = community.startingRate || mEstimatedPrice.providedAverage;
  }
  if (mEstimatedPrice && mEstimatedPrice.estimatedAverage) {
    mEstimatedPrice.estimatedAverage = community.startingRate || mEstimatedPrice.estimatedAverage;
  }

  const estimatedPriceLabelMap = {
    providedAverage: community.name,
    estimatedAverage: community.name, // TODO: figure out correct label
    cityAverage: address.city,
    stateAverage: address.state,
    nationalAverage: address.country,
  };

  let sortedEstimatedPrice = [];
  let maxPrice = 0;
  let estimatedPriceBase = 0;
  if (mEstimatedPrice) {
    sortedEstimatedPrice = sortProperties(mEstimatedPrice);
    // remove items with 0 price
    sortedEstimatedPrice = sortedEstimatedPrice.filter(price => price[1] > 0);
    if (sortedEstimatedPrice.length) {
      // what if only providedAverage or estimatedAverage is non zero. just show nothing
      if (sortedEstimatedPrice.length === 1 &&
        (sortedEstimatedPrice[0][0] === 'providedAverage' || sortedEstimatedPrice[0][0] === 'estimatedAverage')) {
        sortedEstimatedPrice = [];
      } else {
        [, maxPrice] = sortedEstimatedPrice[sortedEstimatedPrice.length - 1];
      }
    }
    estimatedPriceBase = community.startingRate || mEstimatedPrice.providedAverage || mEstimatedPrice.estimatedAverage;
  }
  return {
    estimatedPriceLabelMap, maxPrice, estimatedPriceBase, sortedEstimatedPrice,
  };
};

export const findPercentage = (price, maxPrice) => ((price / maxPrice) * 100);
