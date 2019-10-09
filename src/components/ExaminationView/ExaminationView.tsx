import React from 'react';
import css from './ExaminationView.module.css';
import { useSelector } from '../../store';
import {default as ExaminationOption, ExaminationOptionProps} from '../ExaminationOption/ExaminationOption';
import {BodyPart, Examination} from "../../store/state";

interface ExaminationViewProps {
    selectedBodyPart: BodyPart;
    optionProps: ExaminationOptionProps[];
    findings: Examination[];
};

const Finding: React.FC<Examination> = (props) => {
  return (
    <div className={css.Finding}>
      <h3 className={css.Finding__Result}>
        {props.result.text}
      </h3>
      <div className={css.Finding__Metadata}>
        {props.method} ({props.bodyPart})
      </div>
    </div>
  )
}

// Shows the examination options and findings
const ExaminationViewRaw: React.FC<ExaminationViewProps> = (props) => {
    return (
        <div className={css.ExaminationView}>
            <div className={css.Header}>{props.selectedBodyPart} - Examinations</div>
            <div className={css.ExaminationOptionList}>
                {props.optionProps.map((p, i) => (
                  <div key={i} className={css.ExaminationOptionWrapper}>
                    <ExaminationOption {...p} />
                  </div>
                ))}
            </div>
            <div className={css.Header}>Findings</div>
            <div className={css.Findings}>
                {props.findings.map((f, i) => <Finding key={i} {...f} />)}
            </div>
        </div>
    )
}

const ExaminationView: React.FC = () => {
    const selectedBodyPart = useSelector(state => state.body);
    const examinations = useSelector(state => state.examinations);
    const completedExaminations = useSelector(state => state.completedExaminations);
    const examinationOptions = useSelector(state => state.examinationOptions[state.body]);

    const findings = completedExaminations.flatMap(e => examinations[e]);
    const optionProps = examinationOptions.map(e => ({
        text: examinations[e][0].name,
        disabled: completedExaminations.indexOf(e) !== -1 || undefined,
        examinationId: e,
        cost: examinations[e][0].cost,
    }));
    return <ExaminationViewRaw selectedBodyPart={selectedBodyPart} optionProps={optionProps} findings={findings}></ExaminationViewRaw>
}

export default ExaminationView;
