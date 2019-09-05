import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PointsView from './PointsView';

storiesOf('PointsView', module)
  .add('zeros', () => <PointsView moneySpent={0} timePassed={0} />)
  .add('thousands', () => <PointsView moneySpent={1000} timePassed={0} />)
  .add('hours', () => <PointsView moneySpent={0} timePassed={3912} />);
