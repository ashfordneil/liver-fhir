import React from 'react';
import css from './ExaminationOption.module.css';


export interface ExaminationOptionProps {
    text: string;
    disabled?: boolean;
}

const ExaminationOption: React.FC<ExaminationOptionProps> = (props) => {
    return (
        <button disabled={props.disabled} className={css.ExaminationOption}>{props.text}</button>
    )
};

export default ExaminationOption;