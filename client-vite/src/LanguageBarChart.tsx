import ReactApexChart from "react-apexcharts";
import "../node_modules/flag-icons/css/flag-icons.css";

function LanguageBarChart(props) {
  const propDict = Object.values(props.inputData);

  const langsFullData = {
    en: {
      name: "English",
      flagEmoji: "fi fi-gb",
    },
    es: {
      name: "Spanish",
      flagEmoji: "fi fi-es",
    },
    fr: {
      name: "French",
      flagEmoji: "fi fi-fr",
    },
    de: {
      name: "German",
      flagEmoji: "fi fi-de",
    },
    pl: {
      name: "Polish",
      flagEmoji: "fi fi-pl",
    },
    pt: {
      name: "Portuguese",
      flagEmoji: "fi fi-pt",
    },
  };

  const langs = [];
  const values = [];
  const highestValue = Math.max(...propDict.map((o) => o.value));
  const lowestValue = Math.min(...propDict.map((o) => o.value));

  for (let i = 0; i < propDict.length; i++) {
    langs.push(langsFullData[propDict[i].key].name);

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
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
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
    stroke: {
      width: 1,
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
        color: "#9699a2",
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
