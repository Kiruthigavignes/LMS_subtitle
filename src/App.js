import React from "react";
import VideoGrid from "./component/video";
import videosData from './data';

const App = () => {
  const details = [
    "Module A- Financial Planning and Concepts",
    "Module B- Banking Operations & Digital Payments",
    "Module C- Life, Health, and General Insurance",
    "Module D- Credit and Debit Discipline",
    "Module E - Savings and Investments",
    "Module F - Planning for Retirement",
  ];

  return (
    <>
      <VideoGrid videos={videosData} details={details} />
    </>
  );
};

export default App;



