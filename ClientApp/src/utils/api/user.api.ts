import axios from "axios";
import { User } from "../../store/user/user.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/user"

export async function getSingleUser(userId: number): Promise<User[]> {
  return await axios({
    method: 'get',
    url:`${api}/${userId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUsers(): Promise<User[]> {
  return await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addUser(user: User): Promise<User> {
  return await axios({
    method: 'post',
    url: api,
    data: user,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function editUser(user: User): Promise<User> {
  return await axios({
    method: 'put',
    url: `${api}/${user.userId}`, 
    data: user,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function deleteUser(userId: number) {
  return await axios({
    method: 'delete',
    url: `${api}/${userId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}