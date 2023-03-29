import axios from "axios";
import { Message } from "../../store/message/message.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/message";

export async function getSingleMessage(messageId: number): Promise<Message> {
  const response = await axios({
    method: 'get',
    url: `${api}/${messageId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllMessages(): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserMessages(userId: number): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${userId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersMessages(): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/messages`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getMessages(): Promise<Message[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addMessage(messageValue: string): Promise<Message[]> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      messageValue
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editMessage(messageId: number, messageValue: string): Promise<Message[]> {
  const response =  await axios({ 
    method: 'put',
    url: `${api}/${messageId}`, 
    data: {
      messageId, 
      messageValue
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteMessage(messageId: number): Promise<Message[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${messageId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}