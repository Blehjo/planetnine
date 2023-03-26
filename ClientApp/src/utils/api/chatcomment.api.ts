import axios from "axios";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/chat";

export async function getSingleChatComment(chatcommentId: number): Promise<ChatComment> {
  return await axios({
    method: 'get',
    url: `${api}/${chatcommentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getAllChatComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

 
}

export async function getUserChatComments(id: number): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUsersChatComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/chats`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getChatComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addChatComment(chatcomment: ChatComment): Promise<ChatComment[]> { 
  return await axios({
    method: 'post',
    url: api,
    data: chatcomment,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function editChatComment(chatcomment: ChatComment): Promise<ChatComment> {
  return await axios({
    method: 'put',
    url: `${api}/${chatcomment.chatCommentId}`, 
    data: chatcomment,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
}

export async function deleteChatComment(chatcommentId: number): Promise<ChatComment[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${chatcommentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}