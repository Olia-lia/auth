import { fetchRequest } from "../utils/fetchContainer";

const BASE_URL = 'http://localhost:5000';

export const getResource = () => {
    return fetchRequest('GET', `${BASE_URL}/users`)
  }
  