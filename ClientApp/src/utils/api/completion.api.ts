import axios from "axios";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = "https://localhost:7098/api/chatgpt";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function callCompletion(request: string): Promise<string> {
  return await axios({
    method: 'post',
    url: `${api}/completion`,
    data: request,
    headers: headers,
    withCredentials: true
  });
}

export async function callDalle(request: string): Promise<string> {
  return await axios({
    method: 'post',
    url: `${api}/dalle`,
    data: request,
    headers: headers,
    withCredentials: true
  });
}

export async function callCode(request: string): Promise<string> {
  return await axios({
    method: 'post',
    url: `${api}/code`,
    data: request,
    headers: headers,
    withCredentials: true
  });
}