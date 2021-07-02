import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { parse } from 'query-string';

import { domain } from 'sly/web/config';


const UserCookiesContainer = () => {
  const { location } = useHistory();
  const cookie = new Cookies();

  function isUUID ( uuid ) {
    let s = "" + uuid;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
  }


  const setUUIDCookie = useCallback(() => {
    const { search } = location;
    const qs = parse(search);

    if (qs.sly_uuid && !cookie.get('sly-session')) {
      const uuid = qs.sly_uuid;
      //validate uuid
      if (isUUID(uuid)) {
        //set cookie
        cookie.set('sly_uuid', uuid, {domain, path: '/', maxAge: 27000000});
      }
    }
  }, [location]);

  const setUTMParamsCookie = useCallback(() => {
    const { search } = location;
    const qs = parse(search);

    if (qs.utm_campaign) {
      const utmParams = {
        campaign: qs.utm_campaign,
        source: qs.utm_source || 'NA',
        medium: qs.utm_medium || 'NA',
        term: qs.utm_term || 'NA'
      };

      //set cookie with new utm. If utm cookie present append to it
      const utmCookie = cookie.get('sly_utm_cookie');
      const clicks = utmCookie.clicks || [];
      clicks.push(utmParams);
      utmCookie.clicks = clicks;
      cookie.set('sly_utm_cookie', JSON.stringify(utmCookie), {domain, path: '/', maxAge: 27000000});
      //used by api middleware to check and update uuid_aux of user
      cookie.set('sly_utm_updated', true, {domain, path: '/', maxAge: 27000000});
    }
  }, [location]);

  useEffect(() => {
    setUUIDCookie();
    setUTMParamsCookie();
  });

  return null;
};

UserCookiesContainer.typeHydrationId = 'UserCookiesContainer';

export default UserCookiesContainer;
