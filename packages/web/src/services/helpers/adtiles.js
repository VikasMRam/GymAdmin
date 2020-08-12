import { tocs } from './search';

export const showShowZillowAd = (toc, city ) => {

  const zillowCities = ["portland", "sacramento", "riverside", "los-angeles", "san-diego",
    "las-vegas", "phoenix", "tucson", "fort-collins", "denver", "colorado-springs",
    "minneapolis", "dallas", "austin", "san-antonio", "houston", "atlanta", "nashville",
    "raleigh", "charlotte", "tampa", "orlando", "miami"];
  const validTocs =  tocs.filter(e =>
    e.value.match(/active-adult|independent-living|continuing-care-retirement-community/)).map(e => e.value);

  return validTocs.indexOf(toc) > -1 && zillowCities.indexOf(city) > -1
}
