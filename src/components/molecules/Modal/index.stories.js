import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Heading, Block } from 'sly/components/atoms';

import Modal from '.';

storiesOf('Molecules|Modal', module)
  .add('default', () => (
    <Modal onClose={action('closed')} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .add('with heading', () => (
    <Modal onClose={action('closed')} heading={<h1>Hello</h1>} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .add('closeable', () => (
    <Modal onClose={action('closed')} closeable isOpen>
      <Heading>
        {`Hey ho, 
        let's go`}
      </Heading>
      <Block>
        Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
      </Block>
    </Modal>
  ));
