import axios from 'axios';

export function ipInfo() {
  return axios.get('http://ip-api.com/json');
}
export function query ({codes, lang = 'en'}) {
  return axios.get(`/iatadatabase/query?codes=${codes}&lang=${lang}`)
}
