import axios from "axios";
import { Message } from "../../store/message/message.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/message";

export async function getSingleMessage(messageId: number): Promise<Message> {
  return await axios({
    method: 'get',
    url: `${api}/${messageId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getAllMessages(): Promise<Message[]> {
  return await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addMessage(message: Message): Promise<Message[]> {
  return await axios({
    method: 'post',
    url: api,
    data: message,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function editMessage(message: Message): Promise<Message> {
  return await axios({ 
    method: 'put',
    url: `${api}/${message.messageId}`, 
    data: message,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
}

export async function deleteMessage(messageId: number): Promise<Message[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${messageId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}