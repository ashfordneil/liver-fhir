import React from 'react';
import css from './ExaminationView.module.css';
import {default as ExaminationOption, ExaminationOptionProps} from '../ExaminationOption/ExaminationOption';

interface ExaminationViewProps {
    optionProps: ExaminationOptionProps[];
    findings: string;
};

// Shows the examination options and findings
const ExaminationView: React.FC<ExaminationViewProps> = (props) => {
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
                {props.findings}
            </div>
        </div>
    )
}

export default ExaminationView;
