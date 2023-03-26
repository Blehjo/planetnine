import axios from "axios";
import { Favorite } from "../../store/favorite/favorite.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/favorite";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleFavorite(favoriteId: number): Promise<Favorite> {
  return await axios({
    method: 'get',
    url: `${api}/${favoriteId}`,
    headers: headers,
    withCredentials: true
  });
}

export async function getFavorites(): Promise<Favorite[]> {
  return await axios({
    method: 'get',
    url: api, 
    headers: headers,
    withCredentials: true
  });
}

export async function getUserFavorites(): Promise<Favorite[]> {
  return await axios({
    method: 'get',
    url: `${api}/users`, 
    headers: headers,
    withCredentials: true
  });
}

export async function addFavorite(favorite: Favorite) {
  return await axios({
    method: 'post',
    url: `${api}`,
    data: favorite,
    headers: headers,
    withCredentials: true
  })
}

export async function deleteFavorite(favoriteId: number): Promise<Favorite[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${favoriteId}`,
    headers: headers,
    withCredentials: true
  });
}