import React, { useEffect, useState } from 'react';
import data_json from '../Chart.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export default function App() {

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  const [dataChart, setDataChart] = useState([])
  useEffect(() => {
let labels = [];
let values = [];

data_json.rates.forEach((el, index) => {
  labels.push(timeConverter(data_json.startTime + index *  data_json.interval));
  values.push(el);
  console.log(el);
});

setDataChart({
  labels,
  datasets:[
    {
      label: 'ex.com',
      data: values,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ]
})
}, [])

  return dataChart?.labels?.length && <Line options={options} data={dataChart} />;
}
