"use client"
import { createContext } from "react";

export type User = {
  Email : string 
  Username?: string | null;
  Url?: string;
  Avatar: string;
}
export const defaultUser: User = {
  Email:"",
  Username: "",
  Url: "",
  Avatar:"",
};
export const UserData = createContext<User>(defaultUser);