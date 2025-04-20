"use client"
import { createContext } from "react";

export type User = {
    token?: string | null;
    username?: string| null;
    url?: string| null;
}
export const defaultUser: User = {
    token: "",
    username: "",
    url: "",
  };
export const DataUser = createContext<User>(defaultUser)