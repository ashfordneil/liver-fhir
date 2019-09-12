import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withRedux } from '../../../.storybook/decorators';

import PointsView, { PointsViewRaw } from './PointsView';
import { SpendPoints } from '../../store/actions';

storiesOf('PointsView', module)
  .addDecorator(withRedux({}, [
    { name: 'Add money', action: SpendPoints(10, 0) },
    { name: 'Add time', action: SpendPoints(0, 10) },
    { name: 'Add both', action: SpendPoints(5, 5) },
  ]))
  .add('zeros', () => <PointsViewRaw moneySpent={0} timePassed={0} />)
  .add('thousands', () => <PointsViewRaw moneySpent={1000} timePassed={0} />)
  .add('hours', () => <PointsViewRaw moneySpent={0} timePassed={3912} />)
  .add('redux', () => <PointsView />);
