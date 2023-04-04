import axios from "axios";
import { Planet } from "../../store/planet/planet.types";

const api = "https://localhost:7098/api/planet";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSinglePlanet(planetId: number): Promise<Planet> {
  const response = await axios({
    method: 'get',
    url: `${api}/${planetId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getPlanets(): Promise<Planet[]> {
  const response = await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPlanets(): Promise<Planet[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersPlanets(): Promise<Planet[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addPlanet(planetName: string, planetMass: number, perihelion: number, aphelion: number, gravity: number, temperature: number, imageLink: string): Promise<Planet[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      planetName,
      planetMass,
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

export async function editPlanet(planetId: number, planetName: string, planetMass: number, perihelion: number, aphelion: number, gravity: number, temperature: number, imageLink: string): Promise<Planet[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${planetId}`, 
    data: {
      planetId,
      planetName,
      planetMass,
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

export async function deletePlanet(planetId: number): Promise<Planet[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${planetId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}