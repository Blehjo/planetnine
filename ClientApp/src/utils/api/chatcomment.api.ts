import axios from "axios";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/chat";

export async function getSingleChatComment(chatcommentId: number): Promise<ChatComment> {
  const response = await axios({
    method: 'get',
    url: `${api}/${chatcommentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllChatComments(): Promise<ChatComment[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  const result = await response.data;
  return result;
}

export async function getUserChatComments(userId: number): Promise<ChatComment[]> {
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

export async function getUsersChatComments(): Promise<ChatComment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/chats`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getChatComments(): Promise<ChatComment[]> {
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

export async function addChatComment(chatcommentValue: string, mediaLink: string): Promise<ChatComment[]> { 
  const response = await axios({
    method: 'post',
    url: api,
    data: { 
      chatcommentValue,
      mediaLink
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editChatComment(chatcommentId: number, chatcommentValue: string): Promise<ChatComment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${chatcommentId}`, 
    data: {
      chatcommentId,
      chatcommentValue
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteChatComment(chatcommentId: number): Promise<ChatComment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${chatcommentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}