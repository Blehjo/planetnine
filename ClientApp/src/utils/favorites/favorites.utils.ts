import axios from "axios";

const api = "https://localhost:7098/api";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export async function handleContent(url: string, favoriteId: number): Promise<any[]> {
    const response = await axios({
        method: 'get',
        url: `${api}/${url}/${favoriteId}`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export function getFavorite(favoriteId: number, contentType: string): any {
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
            return 'post';
    }
    return handleContent(url, favoriteId);
}