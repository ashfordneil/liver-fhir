import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DoneButton from './DoneButton';

storiesOf('DoneButton', module)
  .add('render', () => <DoneButton onClick={action("click")} />);
