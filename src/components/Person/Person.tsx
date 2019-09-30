import React from 'react';
import css from './Person.module.css';
import {ReactComponent as PersonSVG} from './human.svg';
import {useDispatch} from "react-redux";
import {BodyPart} from "../../store/state";
import {SelectBodyPart} from "../../store/actions";

// Render a clickable person
const Person: React.FC = (props) => {
    const dispatch = useDispatch();
    const clickHandler = (e: MouseEvent) => {
        if (!e.target) return;
        // @ts-ignore
        const id = e.target.id;
        const lookup: {[key: string]: BodyPart} = {
            "head": "Head",
            "chest": "Chest",
            "abdomen": "Abdomen"
        };
        const bodyPart = lookup[id];
        if (bodyPart == null) {
            return;
        }
        const event = SelectBodyPart(bodyPart);
        dispatch(event);
    };
    return (
        <PersonSVG className={css.PersonSVG} onClick={clickHandler as any} />
    );
};

export default Person;
