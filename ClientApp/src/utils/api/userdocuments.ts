import axios from "axios";
import { User } from "../../store/user/user.types";

const api = "https://localhost:7098/api/user";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' 
}

export const userDocument = (user: User) => user;

export const login = async (username: string, password: string): Promise<User> => {
    const response = await axios({
        method: 'post',
        url: `${api}/authenticate`,
        data: {
            username,
            password
        },
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export const getUser = async (): Promise<User> => {
    const user = await axios({
        method: 'get',
        url: `${api}/users/data`,
        headers: headers,
        withCredentials: true
    });
    const result = await user.data;
    return result;
}

export const signUpUser = async (
    username: string, 
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    emailAddress: string,
    password: string,
    about: string,
    imageLink: string
): Promise<User> => {
    const response = await axios({
        method: 'post',
        url: `${api}/users/register`,
        data: {
            username,
            firstName,
            lastName,
            dateOfBirth,
            emailAddress,
            password,
            about,
            imageLink
        },
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export const signOutUser = async (): Promise<User> => {
    const response = await axios({
        method: 'post',
        url: `${api}/users/logout`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}