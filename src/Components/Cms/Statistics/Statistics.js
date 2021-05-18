import React from 'react';
import StatisticsKeywords from "./StatisticsKeywords/StatisticsKeywords";
import StatisticsSoldOverall from "./StatisticsSoldOverall/StatisticsSoldOverall";
import StatisticsSoldBrand from "./StatisticsSoldBrand/StatisticsSoldBrand";
import './Statistics.css';

function Statistics ({token}) {
    return(
        <div className="statisticsOverview">
            <div className="statisticsSearch">
                <StatisticsKeywords token={token} />
            </div>

            <div className="statisticsBestSoldOverall">
                <StatisticsSoldOverall token={token} />
            </div>

            <div className="statisticsBestSoldBrand">
                <StatisticsSoldBrand token={token} />
            </div>
        </div>
    )
}

export default Statistics;