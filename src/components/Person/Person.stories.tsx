import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withRedux } from '../../../.storybook/decorators';

import Person from './Person';

storiesOf('Person', module)
  .addDecorator(withRedux({}, []))
  .add('render', () => <Person />);

