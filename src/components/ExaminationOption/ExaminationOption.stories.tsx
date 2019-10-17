import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withRedux } from '../../../.storybook/decorators';

import ExaminationOption from './ExaminationOption';

storiesOf('ExaminationOption', module)
  .addDecorator(withRedux({}, []))
  // .add('not disabled', () => (
  //   <ExaminationOption text="A" examinationId={"1"} cost={{ money: 1, time: 10 }} />
  // ))
  // .add('disabled', () => <ExaminationOption text="B" disabled examinationId={"1"} cost={{money: 1, time: 10 }}/>);
