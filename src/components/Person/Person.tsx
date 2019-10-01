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
        const lookup: {[key: string]: BodyPart} = {
            "head": "Head",
            "eyes": "Eyes",
            "nose": "Nose",
            "chest": "Chest",
            "abdomen": "Abdomen",
            "arms": "Arms",
            "hands": "Hands",
            "pelvis": "Pelvis",
            "legs": "Legs",
            "feet": "Feet"
        };
        let target: HTMLElement | null = e.target as any;
        while (target != null && lookup[target.id] == null) {
            target = target.parentElement;
        }
        if (target != null) {
            const event = SelectBodyPart(lookup[target.id]);
            dispatch(event);
        }
    };
    return (
        <PersonSVG className={css.PersonSVG} onClick={clickHandler as any} />
    );
};

export default Person;
