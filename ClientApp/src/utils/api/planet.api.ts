import axios from "axios";
import { Planet } from "../../store/planet/planet.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/planet";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSinglePlanet(planetId: number): Promise<Planet> {
  return await axios({
    method: 'get',
    url: `${api}/${planetId}`,
    headers: headers,
    withCredentials: true
  });
}

export async function getPlanets(): Promise<Planet[]> {
  return await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
}

export async function getUserPlanets(): Promise<Planet[]> {
  return await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
}