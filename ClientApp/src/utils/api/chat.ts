import axios from "axios";
import { Chat } from "../../store/chat/chat.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/chat";

export async function getSingleChat(chatId: number) {
  return await axios({
    method: 'get',
    url: `${api}/${chatId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export const getAllChats = async (): Promise<Chat[]> => {
  const chats = await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

 
}

export async function getUserChats(id: number) {
  return await axios({
    method: 'get',
    url: `${api}/user/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUsersChats() {
  return await axios({
    method: 'get',
    url: `${api}/user/chats`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getChats() {
  return await axios({
    method: 'get',
    url: `${api}/user`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addChat(chat: Chat) {
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

export async function editChat(chat: Chat) {
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

export async function deleteChat(chatId: number) {
  return await axios({
    method: 'delete',
    url: `${api}/${chatId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}