import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withRedux } from '../../.storybook/decorators';

import App from './App';

storiesOf('App', module)
  .addDecorator(withRedux({}, []))
  .add('renders', () => <App />);
