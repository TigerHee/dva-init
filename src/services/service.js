import axios from 'axios';

export function ipInfo() {
  return axios.get('https://ipinfo.compassflights.com');
}
export function query ({codes, lang = 'en'}) {
  return axios.get(`/iatadatabase/query?codes=${codes}&lang=${lang}`)
}
