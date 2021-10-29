//import colors from "../constants/colors"

const lines = {
  series: [
    // {
    //   name: "Totaal",
    //   data: [],
    // },
    // {
    //   name: "Palm",
    //   data: [],
    // },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "text",
      categories: [],
      labels: {
        style: {
          fontSize: "9px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#3498db"],
          fontSize: "12px",
          fontWeight: 600,
        },
        formatter: function (value) {
          return "€ " + value.toFixed(2);
        }
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export default lines;
