import axios from "axios";
import { Moon } from "../../store/moon/moon.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/moon";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleMoon(moonId: number): Promise<Moon> {
  const response = await axios({
    method: 'get',
    url: `${api}/${moonId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getMoons(): Promise<Moon[]> {
  const response = await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserMoons(): Promise<Moon[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersMoons(): Promise<Moon[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addMoon(moonName: string, moonMass: number, perihelion: number, aphelion: number, gravity: number, temperature: number, imageLink: string, planetId: number): Promise<Moon[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      moonName,
      moonMass,
      perihelion,
      aphelion,
      gravity,
      temperature,
      imageLink, 
      planetId
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editMoon(moonId: number, moonName: string, moonMass: number, perihelion: number, aphelion: number, gravity: number, temperature: number, imageLink: string): Promise<Moon[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${moonId}`, 
    data: {
      moonId,
      moonName,
      moonMass,
      perihelion,
      aphelion,
      gravity,
      temperature,
      imageLink 
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteMoon(moonId: number): Promise<Moon[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${moonId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}