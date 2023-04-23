import ReactApexChart from "react-apexcharts";
import "../node_modules/flag-icons/css/flag-icons.css";
import { langsFullData } from "./Utils";

function LanguageBarChart(props) {
  const propDict = Object.values(props.inputData);

  const langs = [];
  const values = [];
  const langs_colors = [];
  const highestValue = Math.max(...propDict.map((o) => o.value));
  const lowestValue = Math.min(...propDict.map((o) => o.value));

  for (let i = 0; i < propDict.length; i++) {
    langs.push(langsFullData[propDict[i].key].name);
    langs_colors.push(langsFullData[propDict[i].key].langColor);

    // procent = (wartość - najniższa wartość ze zbioru) / (najwyższa wartość ze zbioru - najniższa wartość ze zbioru)
    let percentBetweenHighestAndLowest =
      (propDict[i].value - lowestValue) / (highestValue - lowestValue);
    // round to 2 decimal places

    values.push(Math.round(percentBetweenHighestAndLowest * 100) / 100);
  }

  const series = [
    {
      name: "Language",
      data: values,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      forecolor: "#fff",
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: langs_colors,
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return (
          opt.w.globals.labels[opt.dataPointIndex] + ":  " + val * 100 + "%"
        );
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    legend: {
      labels: {
        colors: "#fff",
      },
    },
    stroke: {
      width: 0.5,
      colors: ["#fff"],
    },
    xaxis: {
      categories: langs,
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: "#fff",
        },
      },
    },
    title: {
      text: "Language Bar Chart",
      align: "center",
      floating: true,
      style: {
        color: "#fff",
        fontSize: "20px",
      },
    },
    subtitle: {
      text: "Chart for probability of each language based on perceptrons dot products",
      align: "center",
      style: {
        color: "#fff",
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
        align: "center",
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="bar-chart transform -translate-x-32">
      <ReactApexChart
      // @ts-ignore00 because of ApexCharts types
        options={options}
        series={series}
        type="bar"
        height={350}
        width={600}
      />
    </div>
  );
}

export default LanguageBarChart;
