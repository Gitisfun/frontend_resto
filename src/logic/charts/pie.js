const pie = {
  series: [],
  chartOptions: {
    colors: ['#EA2027', '#0652DD', '#4cd137', '#FFC312', '#D980FA', '#12CBC4', '#ED4C67', '#006266', '#1B1464'],
    labels: [],
    chart: {
      width: 380,
      type: "donut",
    },
    legend: {
      position: "bottom",
      offsetY: 0,
      fontSize: '12px',
      fontWeight: 300,
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val.toFixed(2) + "%";
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    // legend: {
    //   position: "right",
    //   offsetY: 0,
    //   height: 230,
    // },
  },
};

export default pie;
