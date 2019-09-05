import React from 'react';
import css from './PointsView.module.css';
import formatNumber from './../util/formatNumber';
import formatDuration from '../util/formatDuration';

type PointsViewProps = {
    moneySpent: number;
    timePassed: number;
};

const PointsView: React.FC<PointsViewProps> = (props) => {
    return <div className={css.PointsView}>
        <div className={css.Header}>Money</div><div>${formatNumber(props.moneySpent)}</div>
        <div className={css.Header}>Time</div><div>{formatDuration(props.timePassed)}</div>
    </div>;
}

export default PointsView;