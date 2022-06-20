import { createContext } from "react";

type UserContextType = {
  uid: string;
};

export const UserContext = createContext<UserContextType | null>(null);
