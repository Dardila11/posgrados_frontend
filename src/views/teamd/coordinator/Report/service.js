import axios from 'axios';
const API_URL = 'https://mdquilindo.pythonanywhere.com/';


export const ReportService = report => {
    console.log(report)
    const url = `${API_URL}api/1.0/report/${report.year}/${report.type}`;
  //  console.log(url)
    return axios.get(url);
  };
