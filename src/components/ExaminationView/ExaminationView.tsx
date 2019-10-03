import React from 'react';
import css from './ExaminationView.module.css';
import { useSelector } from '../../store';
import {default as ExaminationOption, ExaminationOptionProps} from '../ExaminationOption/ExaminationOption';

interface ExaminationViewProps {
    optionProps: ExaminationOptionProps[];
    findings: string[];
};

// Shows the examination options and findings
const ExaminationViewRaw: React.FC<ExaminationViewProps> = (props) => {
    return (
        <div className={css.ExaminationView}>
            <div className={css.Header}>Examinations</div>
            <div className={css.ExaminationOptionList}>
                {props.optionProps.map(p => (
                  <div className={css.ExaminationOptionWrapper}>
                    <ExaminationOption {...p} />
                  </div>
                ))}
            </div>
            <div className={css.Header}>Findings</div>
            <div className={css.Findings}>
                {props.findings.map(f => <div>f</div>)}
            </div>
        </div>
    )
}

const ExaminationView: React.FC = () => {
    const examinations = useSelector(state => state.examinations);
    const completedExaminations = useSelector(state => state.completedExaminations);
    const examinationOptions = useSelector(state => state.examinationOptions[state.body]);

    const findings = completedExaminations.map(e => examinations[e].result.text);
    const optionProps = examinationOptions.map(e => ({
        text: examinations[e].name,
        disabled: completedExaminations.indexOf(e) !== -1 || undefined,
        examinationId: e,
    }));
    return <ExaminationViewRaw optionProps={optionProps} findings={findings}></ExaminationViewRaw>
}

export default ExaminationView;
