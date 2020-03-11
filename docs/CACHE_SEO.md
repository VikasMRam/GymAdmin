# Caching SEO Pages

Use cloudfront CDN to cache community profile and geo pages objects. The project is composed of these tasks:

- Postpone user data fetching to after load for those pages.
- Make experiments independent of user uuid.
- Enable cache in cloudfront
- Invalidate cache when needed

## Postpone user data fetching.

The aim is to give consistent results to cloudfront for pages that we want to cache, so we can't give different results depending on the user specific data. This will inevitably create some post load flashes, like the user saves and the user widget in the header.

We have to tag as cdn cacheable the client configs for community pages and geo pages (we have to create one for the geo pages). Also tag the endpoints that should not be called in server side when in a cacheable page, as user, uuidAux, user-saves, etc. 

An example of the expected behaviour described above is that when requesting a community profile (cdn cacheable), the server side render of the page will skip (cdn tagged) prefetch calls to user, uuidAux etc, but will request the community profile data, once the page loads in the browser and react takes over, the request to user and uuidAux will be done (triggering some flashes around the page).

## Make experiments independent of user uuid

Because the web server will not know the user uuid for requests of a cacheable page (because of cookie whitelisting described in next section), which is the current mechanism that we use to define the experiments for the user, we have to use a new cookie that specifies the combination of experiments rendered for that user, let's call this cookie sly-experiments.

To generate sly-experiments cookie: 

1. create a random hash
2. apply that to the set of experiments
3. create a cookie with the experiment/variant map

The web server should always generate a cookie for the experiments, and ignore the received cookie because receiving a sly-experiments cookie means that this request is happening after invalidation.

## Enable cache in cloudfront

Using the technique described [here](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html) under the section: Forward a whitelist of cookies that you specify. We would whitelist sly-experiments cookie, so this will be the only cookie allowed to reach origin. This would mean that if we have 2 experiments with 2 variants, we will cache 4 versions per profile page, but if we have 4 experiments we would cache 16 versions per page. To mitigate this, we can minimize the impact of experiments changing doing both of this things: 

1. Limiting the number of experiments we have running at any given point.
2. Separating the cdn-sensitive experiments to a different cookie:
    1. sly-experiments, sly-cdn-experiments
    2. tagging the cdn sensitive experiments as such

## Invalidate cache

- Community data change, invalidates:
  - Community profile page 
  - Related communities pages
  - for each TOC => for each State, city => list pages
- Experiments change, invalidates:
  - Everything
