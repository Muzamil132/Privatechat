import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { auth, db } from "./fire";
import { useRouter } from "next/router";
import { updateDoc, doc, addDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log(user);
  const LogUserout = async () => {
    await signOut(auth);

    await updateDoc(doc(db, "users", user.uid), {
      isOnline: false,
    });
    Cookies.remove("user");

    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
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
