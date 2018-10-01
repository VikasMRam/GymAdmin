import React from 'react';
import { storiesOf } from '@storybook/react';

import SaveCommunityForm from '.';

const mainImage = 'https://d1qiigpe5txw4q.cloudfront.net/uploads/e47618a1f18f541e199ab6f97ebb19ef/Jim%2520business%2520photo_sd.jpg';

storiesOf('Organisms|SaveCommunityForm', module)
  .add('default', () => <SaveCommunityForm mainImage={mainImage} />);
