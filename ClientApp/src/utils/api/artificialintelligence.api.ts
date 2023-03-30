import axios from "axios";
import { ArtificialIntelligence } from "../../store/artificialintelligence/artificialintelligence.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/artificialintelligence";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleArtificialIntelligence(artificialIntelligenceId: number): Promise<ArtificialIntelligence> {
  const response = await axios({
    method: 'get',
    url: `${api}/${artificialIntelligenceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllArtificialIntelligences(): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserArtificialIntelligences(userId: number): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersArtificialIntelligences(): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/artificialIntelligences`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addArtificialIntelligence(name: string, role: string, imageLink: string): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      name,
      role,
      imageLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editArtificialIntelligence(artificialIntelligenceId: number, name: string, role: string, imageLink: string): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${artificialIntelligenceId}`, 
    data: {
      artificialIntelligenceId,
      name,
      role,
      imageLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteArtificialIntelligence(artificialIntelligenceId: number): Promise<ArtificialIntelligence[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${artificialIntelligenceId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}