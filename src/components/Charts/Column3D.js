import React from "react";
import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Column3D = ({chartData}) => {
  const chartConfigs = {
    type: "column3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most popular",
        yAxisName: "Stars",
        xAxisName: "Repos",
        yAxisNameFontSize: "16px",
        xAxisNameFontSize: "16px"
      },
      // Chart Data
      data:chartData
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

export default Column3D;