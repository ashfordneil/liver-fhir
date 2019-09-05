import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ExaminationView from './ExaminationView';

storiesOf('ExaminationView', module)
  .add('render', () => <ExaminationView optionProps={[{text: "A"}, {text: "B"}]} findings="Lorem ipsum" />);
