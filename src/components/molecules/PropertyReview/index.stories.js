import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PropertyReview from '.';

const content = `Ida's Rest home was recommended to us by a friend who is in healthcare. 
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
         cooking and picking up groceries/supplies at cost for the residents.`;

storiesOf('Molecules|PropertyReview', module).add('default', () => (
  <PropertyReview
    rating={3.5}
    name="Heather H"
    uri="/heather_h"
    date="Sept 10, 2018"
    content={content}
  />
));
