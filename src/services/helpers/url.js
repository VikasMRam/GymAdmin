
export default function getSearchUrl(matchParams) {
  /*
   { careType: 'assisted-living', state: 'califo', city: 'sf' }
   */
  var outUrl = {city:matchParams.city,state:matchParams.state,toc:matchParams.careType};
  return  outUrl;
}
