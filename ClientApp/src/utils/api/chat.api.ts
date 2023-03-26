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
  return await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

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

export async function addChat(chat: Chat): Promise<Chat[]> {
  const { title } = chat;
  return await axios({
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
}

export async function editChat(chat: Chat): Promise<Chat> {
  return await axios({
    method: 'put',
    url: `${api}/${chat.chatId}`, 
    data: chat,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
}

export async function deleteChat(chatId: number): Promise<Chat[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${chatId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}