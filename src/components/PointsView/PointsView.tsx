import React from 'react';
import css from './PointsView.module.css';
import formatNumber from '../../util/formatNumber';
import formatDuration from '../../util/formatDuration';

interface PointsViewProps {
    moneySpent: number;
    timePassed: number;
};

// Renders a view of the number of points the user has spent so far in their use of the application.
const PointsView: React.FC<PointsViewProps> = (props) => {
    return <div className={css.PointsView}>
        <div className={css.Header}>Money</div><div>${formatNumber(props.moneySpent)}</div>
        <div className={css.Header}>Time</div><div>{formatDuration(props.timePassed)}</div>
    </div>;
}

export default PointsView;