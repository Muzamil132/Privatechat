import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { auth, db } from "./fire";

import { updateDoc, doc, addDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );
  const [loading, setLoading] = useState(true);

  const LogUserout = async () => {
    console.log("logout");
    signOut(auth);
    await updateDoc(doc(db, "users", user.uid), {
      isOnline: false,
    });
    Cookies.remove("user");
    setUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user != null) {
        setUser(user);
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, LogUserout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
