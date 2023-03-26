import axios from "axios";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/AiComment";

export async function getSingleAiComment(aiCommentId: number): Promise<ChatComment> {
  return await axios({
    method: 'get',
    url: `${api}/${aiCommentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getAllAiComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: api,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUserAiComments(id: number): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getUsersAiComments(): Promise<ChatComment[]> {
  return await axios({
    method: 'get',
    url: `${api}/user/AiComments`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addAiComment(aiComment: ChatComment): Promise<ChatComment[]> {
  return await axios({
    method: 'post',
    url: api,
    data: aiComment,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function editAiComment(aiComment: ChatComment): Promise<ChatComment> {
  return await axios({
    method: 'put',
    url: `${api}/${aiComment.chatCommentId}`, 
    data: aiComment,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function deleteAiComment(aiCommentId: number): Promise<ChatComment[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${aiCommentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}