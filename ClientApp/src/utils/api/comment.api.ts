import axios from "axios";
import { Comment } from "../../store/comment/comment.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/comment"

export async function getSingleComment(postId: number): Promise<Comment> {
  const response = await axios({
    method: 'get',
    url: `${api}/post/${postId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllComments(): Promise<Comment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserComments(userId: number): Promise<Comment[]> {
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

export async function getUsersComments(): Promise<Comment[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/comments`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getComments(): Promise<Comment[]> {
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

export async function addComment(commentValue: string, mediaLink: string, postId: number): Promise<Comment[]> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      commentValue,
      mediaLink,
      postId
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editComment(commentId: number, commentValue: string, mediaLink: string): Promise<Comment[]> {
  const response = await axios({
    method: 'put',
    url: `${api}/${commentId}`, 
    data: {
      commentId,
      commentValue,
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

export async function deleteComment(commentId: number): Promise<Comment[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${commentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}