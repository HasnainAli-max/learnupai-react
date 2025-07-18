import React from 'react';
import './OrgnizationAnalytics.css'
import FirstChart from '../orgnizationChartPages/FirstChart';

const OrgnizationAnalytics = () => {
  return <>
  

<div className="card-container">
      {/* Row 1 */}
      <div className="card-row">
        <div className="card card1">
            <FirstChart/>
        </div>
        <div className="card card2">Card 2</div>
        <div className="card card3">Card 3</div>
      </div>

      {/* Row 2 */}
      <div className="card-row">
        <div className="card card4">Card 4</div>
        <div className="card card5">Card 5</div>
      </div>
    </div>


  </>
};

export default OrgnizationAnalytics;
