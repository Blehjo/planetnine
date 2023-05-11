import axios from "axios";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = "https://planetnineservers.azurewebsites.net/api/chatgpt";

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
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