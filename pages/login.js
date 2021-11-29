import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { app } from "../fire";
import Input from "../components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, auth } from "../fire";
import { AuthContext } from "../context";
import {
  getFirestore,
  collection,
  query,
  setDoc,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
// import {user} =useContext()
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
export default function Login() {
  const { user } = React.useContext(AuthContext);
  const router = useRouter();
  const [formdata, setFormdata] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  React.useEffect(() => {
    console.log(user);
    if (user) {
      router.push("/Chatscreen");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formdata).includes("")) {
      toast.error("Please fill all the fields");
    } else {
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          formdata.email,
          formdata.password
        );
        if (result) {
          Cookies.set("user", JSON.stringify(result));
          await updateDoc(doc(db, "users", result.user.uid), {
            isOnline: true,
          });
          router.push("/Chatscreen");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <ToastContainer />
      <form onSubmit={handleSubmit} class="w-full max-w-lg px-4 lg:px-0  ">
        <h1 className="lg:text-6xl text-textdark mb-10 font-bold opacity-50  text-3xl text-center ">
          SIGN IN
        </h1>

        <Input placeholder="Email" name="email" handleChange={handleChange} />
        <Input
          placeholder="Password"
          name="password"
          handleChange={handleChange}
        />

        <div class="md:flex md:items-center">
          <button
            onClick={handleSubmit}
            class="gradient bloc  transition duration-500 transform hover:translate-y-1 hover:scale-103   shadow w-full hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
        </div>
        <div>
          <p className="text-md  mt-4 text-gray-500">
            Dont have accountt?
            <span
              onClick={() => router.push("/")}
              className="font-bold text-text cursor-pointer "
            >
              Create account{" "}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
