import axios from "axios";
import { Chat } from "../../store/chat/chat.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/chat";

export async function getSingleChat(chatId: number): Promise<Chat> {
  return await axios({
    method: 'get',
    url: `${api}/${chatId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getAllChats(): Promise<Chat[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data.json();
  return result;
}

// Gets chats from another user's page
export async function getUserChats(id: number): Promise<Chat[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

// Gets chats from user
export async function getUsersChats(): Promise<Chat[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/chats`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getChats(): Promise<Chat[]> {
  return await axios({
    method: 'get',
    url: `${api}/user`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addChat(title: string): Promise<Chat[]> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      title: title,
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editChat(chatId: number, title: string, userId: number): Promise<Chat[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${chatId}`, 
    data: {
      chatId, 
      title,
      userId
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteChat(chatId: number): Promise<Chat[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${chatId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}