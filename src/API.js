import axios from "axios";

const url = "https://api.exchangeratesapi.io/latest";
export async function getExchangeRate() {
  const respons = await axios.get(url);
  const data = respons.data;
  return data;
}
