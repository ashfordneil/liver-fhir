import React from 'react';
import css from './ExaminationView.module.css';
import { useSelector } from '../../store';
import {default as ExaminationOption, ExaminationOptionProps} from '../ExaminationOption/ExaminationOption';
import {BodyPart} from "../../store/state";

interface ExaminationViewProps {
    selectedBodyPart: BodyPart;
    optionProps: ExaminationOptionProps[];
    findings: string[];
};

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
                {props.findings.map((f, i) => <div key={i}>{f}</div>)}
            </div>
        </div>
    )
}

const ExaminationView: React.FC = () => {
    const selectedBodyPart = useSelector(state => state.body);
    const examinations = useSelector(state => state.examinations);
    const completedExaminations = useSelector(state => state.completedExaminations);
    const examinationOptions = useSelector(state => state.examinationOptions[state.body]);

    const findings = completedExaminations.flatMap(e => examinations[e]).map(ex => ex.result.text);
    const optionProps = examinationOptions.map(e => ({
        text: examinations[e][0].name,
        disabled: completedExaminations.indexOf(e) !== -1 || undefined,
        examinationId: e,
        cost: examinations[e][0].cost,
    }));
    return <ExaminationViewRaw selectedBodyPart={selectedBodyPart} optionProps={optionProps} findings={findings}></ExaminationViewRaw>
}

export default ExaminationView;
