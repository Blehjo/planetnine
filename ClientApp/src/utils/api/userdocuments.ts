import axios from "axios";
import { User } from "../../store/user/user.types";

const api = "https://localhost:7098/api/users";

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
        url: `${api}/data`,
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
    emailAddress: string,
    password: string,
    about: string,
    imageLink: string,
    imageFile: File
): Promise<User> => {
    const formData = new FormData();
    formData.append('username', username)
    formData.append('firstName', firstName,)
    formData.append('lastName', lastName)
    formData.append('emailAddress', emailAddress)
    formData.append('password', password)
    formData.append('about', about)
    formData.append('imageLink', imageLink)
    formData.append('imageFile', imageFile)
    const response = await axios({
        method: 'post',
        url: `${api}/register`,
        data: formData,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}

export const signOutUser = async (): Promise<User> => {
    const response = await axios({
        method: 'post',
        url: `${api}/logout`,
        headers: headers,
        withCredentials: true
    });
    const result = await response.data;
    return result;
}