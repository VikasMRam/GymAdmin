import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PropertyReviews from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { propRatings } = RhodaGoldmanPlaza;
const { ratingsArray } = propRatings;

const reviews = [
  {
    id: 1,
    name: 'Emily S',
    date: 'Apr 05, 2017',
    rating: 4,
    content: `Ida's Rest home was recommended to us by a friend who is in healthcare. 
        The location is very good, about two blocks away from a good selection of neighborhood shops 
        and small restaurants. Parking is residential and can be limited during lunch time or the evenings.
         Communication was excellent and Margret responded to emails and phone calls promptly; scheduling
          a tour was also easy. The home itself is a typical neighborhood house with the garage converted
           to accommodate non ambulatory residents. The rooms are not all universal in size, some are
            definitely smaller than others but there did not seem to be a difference in pricing. The rooms
             downstairs were darker than we would like, but certainly understandable, and one room was 
             connected to the communal bathroom which did not seem at all ideal. The community area is
              a very short distance from the bedrooms, which may be noisy depending on the resident's needs.
               Overall, this was a typical layout found in the majority of these types of care homes. 
               However, we found that the management's responsiveness and communication to be better
                than the other place we visited. The cost seems fair with the owner herself running errands,
                 cooking and picking up groceries/supplies at cost for the residents.`,
  },
  {
    id: 2,
    name: 'June',
    date: 'Oct 01, 2016',
    rating: 5,
    content: `My Aunt Mary spent her last 4 years at Ida's Rest Home in San Francisco. After visiting
     and spending time talking with my aunt over the years, we highly recommend Ida's Rest Home. 
     Margaret and her staff have maintained a high standard of care for all their residents. During her years 
     at Ida's Rest Home, my Aunt was in a comfortable home-like environment, able to experience friendly companionship,
      enjoy wonderful artistic and leisure activities in a safe and secure residence. All of her health concerns
       were addressed quickly with many medical support. Over the years, Margaret has gone beyond her duties at
        Ida's Rest Home in caring for my Aunt, using her personal time in my Aunt's interests. Special meals to 
        bring familiar taste buds back are provided. Everything done at Ida's Rest Home is well-thought-out, respectful 
        and in the interests of their residents. Even after residents have left, Margaret will many times keep 
        in touch with families, concerned for them as well. I am grateful to Ida's Rest Home for providing my Aunt
         with complete and loving care and I am sure a desired experience for your loved ones as well.`,
  },
];

const onLeaveReview = function () {
  console.log('On Click of onLeaveReview outside PropertyReviews ');
};

storiesOf('Organisms|PropertyReviews', module).add('default', () => (
  <PropertyReviews
    reviews={reviews}
    reviewRatings={ratingsArray}
    onLeaveReview={onLeaveReview}
  />
));
