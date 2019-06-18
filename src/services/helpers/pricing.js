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

export const calculatePricing = (community, estimatedPrice) => {
  const { startingRate, name } = community;
  const mEstimatedPrice = { ...estimatedPrice };
  if (mEstimatedPrice && !mEstimatedPrice.providedAverage && mEstimatedPrice.providedAverage) {
    mEstimatedPrice.providedAverage = startingRate || mEstimatedPrice.providedAverage;
  }
  if (mEstimatedPrice && !mEstimatedPrice.providedAverage && mEstimatedPrice.estimatedAverage) {
    mEstimatedPrice.estimatedAverage = startingRate || mEstimatedPrice.estimatedAverage;
  }

  const estimatedPriceLabelMap = {
    providedAverage: name,
    estimatedAverage: name,
    cityAverage: 'Assisted living within 20 miles',
    homeCareMAverage: 'In-home care',
    adultDayAverage: 'Adult Daycare',
  };

  let sortedEstimatedPrice = [];
  let maxPrice = 0;
  let estimatedPriceBase = 0;
  if (mEstimatedPrice) {
    sortedEstimatedPrice = sortProperties(mEstimatedPrice);
    // remove items with 0 price
    sortedEstimatedPrice = sortedEstimatedPrice.filter(price => price[1] > 0);
    // if has both providedAverage & estimatedAverage return only one, precedence providerAverage > estimatedAverage
    const hasProvidedAverage = sortedEstimatedPrice.find(ep => ep[0] === 'providedAverage');
    const hasEstimatedAverage = sortedEstimatedPrice.find(ep => ep[0] === 'estimatedAverage');
    if (hasProvidedAverage && hasEstimatedAverage) {
      sortedEstimatedPrice = sortedEstimatedPrice.filter(ep => ep[0] !== 'estimatedAverage');
    }
    if (sortedEstimatedPrice.length) {
      // what if only providedAverage or estimatedAverage is non zero. just show nothing
      if (sortedEstimatedPrice.length === 1 &&
        (sortedEstimatedPrice[0][0] === 'providedAverage' || sortedEstimatedPrice[0][0] === 'estimatedAverage')) {
        sortedEstimatedPrice = [];
      } else {
        [, maxPrice] = sortedEstimatedPrice[sortedEstimatedPrice.length - 1];
      }
    }
    estimatedPriceBase = startingRate || mEstimatedPrice.providedAverage || mEstimatedPrice.estimatedAverage;
  }
  return {
    estimatedPriceLabelMap, maxPrice, estimatedPriceBase, sortedEstimatedPrice,
  };
};

export const findPercentage = (price, maxPrice) => ((price / maxPrice) * 100);


const getAveragePriceString = (priceStringOrNumber) => {
  // TODO FIXME: Return average when string contains ranges?
  let avgPriceS = priceStringOrNumber;
  if (priceStringOrNumber.match(/-/)) {
    try {
      const comps = priceStringOrNumber.split('-').map(e => e.trim().replace(/\D|,/g, ''));
      let sumPrice = 0;
      comps.map((e) => {
        sumPrice += parseFloat(e);
        return null;
      });
      avgPriceS = (sumPrice / comps.length).toString();
    } catch (e) {
      console.log('Bad price data');
    }
  }
  return avgPriceS;
};
export const buildPriceList = (community) => {
  const priceList = [];
  const { propInfo } = community;
  const {
    sharedSuiteRate,
    privateSuiteRate,
    studioApartmentRate,
    oneBedroomApartmentRate,
    twoBedroomApartmentRate,
  } = propInfo;
  if (sharedSuiteRate) {
    priceList.push({ label: 'Shared Suite', value: getAveragePriceString(sharedSuiteRate) });
  }
  if (privateSuiteRate) {
    priceList.push({ label: 'Private Suite', value: getAveragePriceString(privateSuiteRate) });
  }
  if (studioApartmentRate) {
    priceList.push({ label: 'Studio Apartment', value: getAveragePriceString(studioApartmentRate) });
  }
  if (oneBedroomApartmentRate) {
    priceList.push({ label: 'One Bedroom Apartment', value: getAveragePriceString(oneBedroomApartmentRate) });
  }
  if (twoBedroomApartmentRate) {
    priceList.push({ label: 'Two Bedroom Apartment', value: getAveragePriceString(twoBedroomApartmentRate) });
  }
  return priceList;
};
