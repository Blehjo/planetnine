import axios from "axios";
import { Comment } from "../../store/comment/comment.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/comment"

export async function getSingleComment(postId: number): Promise<Comment> {
  return await axios({
    method: 'get',
    url: `${api}/post/${postId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function getComments(): Promise<Comment[]> {
  return await axios({
    method: 'get',
    url: `${api}/`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function addComment(comment: Comment): Promise<Comment[]> {
  return await axios({
    method: 'post',
    url: api,
    data: comment,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
}

export async function editcomment(comment: Comment): Promise<Comment> {
  return await axios({
    method: 'put',
    url: `${api}/${comment.commentId}`, 
    data: comment,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
}

export async function deletecomment(commentId: number): Promise<Comment[]> {
  return await axios({
    method: 'delete',
    url: `${api}/${commentId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
}