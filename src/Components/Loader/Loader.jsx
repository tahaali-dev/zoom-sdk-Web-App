import React from "react";
import { LineWave } from "react-loader-spinner";
//Imports-------------------

const Loader = () => {
  return (
    <LineWave
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};

export default Loader;
