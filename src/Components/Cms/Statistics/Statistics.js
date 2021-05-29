import React from 'react';
import StatisticsKeywords from "./StatisticsKeywords/StatisticsKeywords";
import StatisticsSoldOverall from "./StatisticsSoldOverall/StatisticsSoldOverall";
import StatisticsSoldBrand from "./StatisticsSoldBrand/StatisticsSoldBrand";
import './Statistics.css';



function Statistics ({token, isManufacturerAuthenticated}) {
    return(
        <div className="statisticsOverview">
            <div className="statisticsSearch">
                <p>Top 10 meest gezochte woorden:</p>
                <StatisticsKeywords token={token} />
            </div>

            <div className="statisticsBestSoldOverall">
                <p>Best verkopende producten algemeen:</p>
                <StatisticsSoldOverall token={token} />
            </div>

            {isManufacturerAuthenticated &&
                <div className="statisticsBestSoldBrand">
                    <p>Best verkopende eigen producten :</p>
                    <StatisticsSoldBrand token={token}/>
                </div>
            }
        </div>
    )
}

export default Statistics;