import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FileField from 'sly/components/molecules/FileField';
import S3Uploader from 'sly/services/s3Uploader/components/S3Uploader';

const getSignedUrl = () => Promise.resolve({ signedUrl: '/ping' });

storiesOf('Molecules|FileField', module)
  .add('default', () => (
    <FileField
      name="file"
      label="Upload Image"
    />
  ))
  .add('S3Uploader', () => (
    <S3Uploader
      name="file"
      getSignedUrl={getSignedUrl}
    />
  ));
