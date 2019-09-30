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
export const findPercentage = (price, maxPrice) => ((price / maxPrice) * 100);


const getAveragePriceString = (priceStringOrNumber) => {
  let avgPriceS = priceStringOrNumber;
  if (priceStringOrNumber.match(/-/)) {
    try {
      const comps = priceStringOrNumber.split('-').map(e => e.trim().replace(/\D|,/g, ''));
      let sumPrice = 0;
      comps.map((e) => {
        sumPrice += parseFloat(e);
        return null;
      });
      avgPriceS = Math.round((sumPrice / comps.length)).toString();
    } catch (e) {
      console.log('Bad price data');
    }
  }
  return avgPriceS;
};


export const buildPriceList = (community) => {
  const priceList = [];
  const { propInfo, rgsAux } = community;
  const {
    sharedSuiteRate,
    privateSuiteRate,
    studioApartmentRate,
    oneBedroomApartmentRate,
    twoBedroomApartmentRate,
  } = propInfo;
  try {
    if (sharedSuiteRate && !sharedSuiteRate.match(/[A-Za-z]+/)) {
      priceList.push({ label: 'Shared Suite', value: getAveragePriceString(sharedSuiteRate) });
    }
    if (privateSuiteRate && !privateSuiteRate.match(/[A-Za-z]+/)) {
      priceList.push({ label: 'Private Suite', value: getAveragePriceString(privateSuiteRate) });
    }
    if (studioApartmentRate && !studioApartmentRate.match(/[A-Za-z]+/)) {
      priceList.push({ label: 'Studio Apartment', value: getAveragePriceString(studioApartmentRate) });
    }
    if (oneBedroomApartmentRate && !oneBedroomApartmentRate.match(/[A-Za-z]+/)) {
      priceList.push({ label: 'One Bedroom Apartment', value: getAveragePriceString(oneBedroomApartmentRate) });
    }
    if (twoBedroomApartmentRate && !twoBedroomApartmentRate.match(/[A-Za-z]+/)) {
      priceList.push({ label: 'Two Bedroom Apartment', value: getAveragePriceString(twoBedroomApartmentRate) });
    }
  } catch (e) {
    console.log('Non numeric prices');
  }

  return priceList;
};

export const buildEstimatedPriceList = (community) => {
  const priceList = [];
  const { rgsAux } = community;
  if (!rgsAux) {
    return priceList;
  }
  const { estimatedPrice } = rgsAux;
  if (!estimatedPrice) {
    return priceList;
  }
  const {
    sharedSuiteRate,
    privateSuiteRate,
    studioApartmentRate,
    oneBedroomApartmentRate,
    twoBedroomApartmentRate,
  } = estimatedPrice;
  try {
    if (sharedSuiteRate && sharedSuiteRate !== 0) {
      priceList.push({ label: 'Shared Suite', value: sharedSuiteRate });
    }
    if (privateSuiteRate && privateSuiteRate !== 0) {
      priceList.push({ label: 'Private Suite', value: privateSuiteRate });
    }
    if (studioApartmentRate && studioApartmentRate !== 0) {
      priceList.push({ label: 'Studio Apartment', value: studioApartmentRate });
    }
    if (oneBedroomApartmentRate && oneBedroomApartmentRate !== 0) {
      priceList.push({ label: 'One Bedroom Apartment', value: oneBedroomApartmentRate });
    }
    if (twoBedroomApartmentRate && twoBedroomApartmentRate !== 0) {
      priceList.push({ label: 'Two Bedroom Apartment', value: twoBedroomApartmentRate });
    }
  } catch (e) {
    console.log('Non numeric prices');
  }

  return priceList;
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
  const pricesList = buildPriceList(community);
  if (pricesList.length > 0) {
    estimatedPriceBase = pricesList[0].value;
  }
  return {
    estimatedPriceLabelMap, maxPrice, estimatedPriceBase, sortedEstimatedPrice,
  };
};

export const priceParser = str => str.replace(/[^\d]/g, '');
export const priceFormatter = value => value ? value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : value;
