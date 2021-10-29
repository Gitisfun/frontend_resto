import colors from "../constants/colors"

const bar = {
  series: [
    {
      name: "Verkocht",
      data: [],
    },
  ],
  chartOptions: {
    chart: {
      height: 450,
      type: "bar",
    },
    colors: colors,
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: colors,
          fontSize: "7px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#485460"],
          fontSize: "12px",
          fontWeight: 600,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  },
};

export default bar;
