import axios from "axios";
import { Post } from "../../store/post/post.types";

const api = "https://kalanchoeai-server.azurewebsites.net/api/post";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function getSinglePost(postId: number): Promise<Post> {
  const response = await axios({
    method: 'get',
    url: `${api}/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getAllPosts(): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUserPosts(postId: number): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getUsersPosts(): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: `${api}/user/posts`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getPosts(): Promise<Post[]> {
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

export async function addPost(postValue: string, mediaLink: string): Promise<Post[]> {
  const response = await axios({
    method: 'post',
    url: api, 
    data: {
      postValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editPost(postId: number, postValue: string, mediaLink: string): Promise<Post[]> {
  const response = await axios({
    method: 'put',
    url:`${api}/${postId}`, 
    data: {
      postId,
      postValue,
      mediaLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deletePost(postId: number): Promise<Post[]> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${postId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}