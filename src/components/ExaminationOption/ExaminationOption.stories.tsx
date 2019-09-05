import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ExaminationOption from './ExaminationOption';

storiesOf('ExaminationOption', module)
  .add('not disabled', () => <ExaminationOption text="A" />)
  .add('disabled', () => <ExaminationOption text="B" disabled={true} />);
