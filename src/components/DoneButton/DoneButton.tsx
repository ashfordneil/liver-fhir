import React from 'react';
import css from './DoneButton.module.css';

interface DoneButtonProps {
    onClick: () => void;
};

const DoneButton: React.FC<DoneButtonProps> = (props) => {
    return (
        <button onClick={props.onClick} className={css.DoneButton}>Done &#xbb;</button>
    )
};

export default DoneButton;