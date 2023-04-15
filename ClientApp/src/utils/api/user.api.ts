import axios from "axios";
import { User } from "../../store/user/user.types";
import { Pilot } from "../../store/pilot/pilot.types";

const api = "https://localhost:7098/api/user";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSingleUser(userId: number | undefined): Promise<User> {
  const response = await axios({
    method: 'get',
    url:`${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getSinglePilot(userId: number): Promise<Pilot> {
  const response = await axios({
    method: 'get',
    url:`${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsers(): Promise<User[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getPilots(): Promise<Pilot[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addUser(
  username: string, 
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  emailAddress: string,
  password: string,
  about: string,
  imageLink: string
): Promise<User> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      username,
      firstName,
      lastName,
      dateOfBirth,
      emailAddress,
      password,
      about,
      imageLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editUser(
  userId: number,
  username: string, 
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  emailAddress: string,
  password: string,
  about: string,
  imageLink: string
): Promise<User> {
  const response = await axios({
    method: 'put',
    url: `${api}/${userId}`, 
    data: {
      userId,
      username,
      firstName,
      lastName,
      dateOfBirth,
      emailAddress,
      password,
      about,
      imageLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteUser(userId: number): Promise<User> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}