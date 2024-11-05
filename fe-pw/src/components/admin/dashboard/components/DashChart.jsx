import { Component } from "react";
import Chart from "react-apexcharts";

class DashChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "XYZ MOTORS",
          data: [] // This will be populated dynamically
        }
      ],
      options: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom",
            show: true
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        title: {
          text: "Persentase kehadiran",
          align: "left"
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0); // Display in millions
            }
          },
          title: {
            text: "Price"
          }
        },
        xaxis: {
          type: "datetime"
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0); // Display in millions
            }
          }
        }
      },
      time: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateSeries();
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateSeries = () => {
    const newDate = new Date().getTime();
    const amplitude = 40000000;
    const offset = 50000000;
    const frequency = 0.05;

    const newValue = amplitude * Math.sin(this.state.time * frequency) + offset;

    this.setState((prevState) => ({
      series: [
        {
          data: [...prevState.series[0].data, [newDate, newValue]]
        }
      ],
      time: prevState.time + 1
    }));
  };

  render() {
    return (
      <div id="chart" className="bg-[#EDEDED] rounded-xl pt-2">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}

export default DashChart;
