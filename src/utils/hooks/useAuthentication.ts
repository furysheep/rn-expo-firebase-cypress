import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export function useAuthentication() {
  const auth = getAuth();
  const [user, setUser] = React.useState<User | null | undefined>(null);

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
