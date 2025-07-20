import React from 'react';
import './OrgnizationAnalytics.css'
import FirstChart from '../orgnizationChartPages/FirstChart';
import SecondChart from '../orgnizationChartPages/SecondChart';
import ThirdChart from '../orgnizationChartPages/ThirdChart';
import FourthChart from '../orgnizationChartPages/FourthChart';
import FifthChart from '../orgnizationChartPages/FifthChart';

const OrgnizationAnalytics = () => {
  return <>
  

<div className="card-container">
      {/* Row 1 */}
      <div className="card-row">
        <div className="card card1">
            <FirstChart/>
        </div>
        <div className="card card2">
          <SecondChart/>
        </div>
        <div className="card card3">
          <ThirdChart/>
        </div>
      </div>

      {/* Row 2 */}
      <div className="card-row">
        <div className="card card4">
          <FourthChart/>
        </div>
        <div className="card card5">
          <FifthChart/>
        </div>
      </div>
    </div>


  </>
};

export default OrgnizationAnalytics;
