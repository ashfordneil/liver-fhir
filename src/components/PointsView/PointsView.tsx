import React from 'react';
import css from './PointsView.module.css';
import { useSelector } from '../../store';
import formatNumber from '../../util/formatNumber';
import formatDuration from '../../util/formatDuration';

interface PointsViewProps {
    moneySpent: number;
    timePassed: number;
};

// Performs actual rendering for PointsView components
export const PointsViewRaw: React.FC<PointsViewProps> = (props) => {
    const className =
    props.timePassed < 12 * 60 ? css.good
    : props.timePassed < 15 * 60 ? css.medium
    : css.bad;

    return <div className={css.PointsView}>
      <div className={css.Header}>Time</div>
      <div className={className}>{formatDuration(props.timePassed)}</div>
    </div>;
}

// Renders a view of the number of points the user has spent so far in their use of the application.
const PointsView: React.FC = () => {
  const { moneySpent, timePassed } = useSelector(state => state.points);
  return <PointsViewRaw moneySpent={moneySpent} timePassed={timePassed} />;
}

export default PointsView;
