import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Heading, Block } from 'sly/web/components/atoms';
import Modal from 'sly/web/components/molecules/Modal';

storiesOf('Molecules|Modal', module)
  .add('default', () => (
    <Modal onClose={action('closed')} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .add('closeable', () => (
    <Modal onClose={action('closed')} closeable isOpen>
      <Heading>
        Hey ho,
        let&apos;s go
      </Heading>
      <Block>
        Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
      </Block>
    </Modal>
  ))
  .add('eBook', () => (
    <Modal onClose={action('closed')} closeable isOpen>
      <Heading>
        Hey ho,
        let&apos;s go
      </Heading>
      <Block>
        Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
      </Block>
    </Modal>
  ));
