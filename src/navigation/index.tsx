import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { UserContext } from "../contexts/userContext";

export default function RootNavigation() {
  const { user } = useAuthentication();

  if (user === null) return <></>;

  return (
    <UserContext.Provider value={{ uid: user?.uid }}>
      {user ? <UserStack /> : <AuthStack />}
    </UserContext.Provider>
  );
}
