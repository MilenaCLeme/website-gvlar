import axios from 'axios';
import config from '@/config/config';
import { FilterPageProperty } from '@/types';

export async function getRandomProperties() {
  try {
    const response = await axios.get(`${config.apiUrl}/properties/random/list`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function pageWithFilter(id: number, body: FilterPageProperty) {
  try {
    const response = await axios.post(`${config.apiUrl}/properties/pagewithfilter/${id}`, {
      body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
