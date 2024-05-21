import axios from "axios";
import { Inter } from "next/font/google";
import { Interface } from "readline";

interface User {
    id: string;
    email: string | null;
    name: string | null;
    lastName: string | null;
    roles : string[];
    
}

export const getUserById = async (id: string) => {
  try {
    const url = process.env.BACKEND_URL;
    const response = await axios.get(`${url}/user/${id}`);

    const user:User = response.status === 200 ? response.data : null;

    return user;

  } catch {
    return null;
  }
};