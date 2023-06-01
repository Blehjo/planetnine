import axios from "axios";
import { Post } from "../../store/post/post.types";
import { Chat } from "../../store/chat/chat.types";
import { Planet } from "../../store/planet/planet.types";
import { Moon } from "../../store/moon/moon.types";
import { Comment } from "../../store/comment/comment.types";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

const api = "https://planetnineservers.azurewebsites.net/api";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

type Content = Post | Chat | Planet | Moon | Comment | ChatComment;

export async function handleContent(url: string, favoriteId: number): Promise<Content> {
    const response = await axios({
        method: 'get',
        url: `${api}/${url}/${favoriteId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export async function getFavorite(favoriteId: number, contentType: string): Promise<Content> {
    let url;
    switch(contentType) {
        case 'post': 
            url = 'post';
            break;
        case 'comment': 
            url = 'comment';
            break;
        case 'chat': 
            url = 'chat';
            break;
        case 'chatcomment': 
            url = 'chatcomment';
            break;
        case 'messagecomment': 
            url = 'messagecomment';
            break;
        case 'moon': 
            url = 'moon';
            break;
        case 'planet': 
            url = 'planet';
            break;
        default: 
            url = 'post';
    }
    return handleContent(url, favoriteId);
}