import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "firebaseApp";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({ user: null as User | null }); // 기본값

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
