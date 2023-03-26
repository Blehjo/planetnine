import axios from "axios";
import { Moon } from "../../store/moon/moon.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/moon";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleMoon(moonId: number): Promise<Moon> {
  return await axios({
    method: 'get',
    url: `${api}/${moonId}`,
    headers: headers,
    withCredentials: true
  });
}

export async function getMoons(): Promise<Moon[]> {
  return await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
}

export async function getUserMoons(): Promise<Moon[]> {
  return await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
}