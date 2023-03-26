import axios from "axios";
import { ArtificialIntelligence } from "../../store/artificialintelligence/artificialintelligence.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/artificialintelligence";

export async function getSingleArtificialIntelligence(artificialIntelligenceId: number) {
  return await axios({
    method: 'get',
    url: `${api}/${artificialIntelligenceId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getAllArtificialIntelligences(): Promise<ArtificialIntelligence[]> {
  return await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUserArtificialIntelligences(artificialIntelligenceId: number): Promise<ArtificialIntelligence[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/${artificialIntelligenceId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUsersArtificialIntelligences(): Promise<ArtificialIntelligence[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/artificialIntelligences`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addArtificialIntelligence(artificialintelligence: ArtificialIntelligence): Promise<ArtificialIntelligence[]> {
  return await axios({
    method: 'post',
    url: api,
    data: artificialintelligence,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function editArtificialIntelligence(artificialintelligence: ArtificialIntelligence): Promise<ArtificialIntelligence> {
  return await axios({
    method: 'put',
    url: `${api}/${artificialintelligence.artificialIntelligenceId}`, 
    data: artificialintelligence,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function deleteArtificialIntelligence(artificialIntelligenceId: number): Promise<ArtificialIntelligence[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${artificialIntelligenceId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}