import Head from "next/head";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { app } from "../fire";
import Input from "../components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { db, auth } from "../fire";
import Cookies from "js-cookie";
import {
  getFirestore,
  collection,
  query,
  setDoc,
  where,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { AuthContext } from "../context";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Home() {
  const { user } = React.useContext(AuthContext);
  const router = useRouter();
  const [formdata, setFormdata] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/Chatscreen");
    }
  }, [user]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    if (Object.values(formdata).includes("")) {
      toast.error("Please fill all the fields");
    } else if (formdata.password !== formdata.confirmpassword) {
      toast.error("Password and confirm password does not match");
    } else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          formdata.email,
          formdata.password
        );
        Cookies.set("user", JSON.stringify(result));

        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name: formdata.username,
          email: formdata.email,

          isOnline: true,
        });

        setFormdata({
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        router.push("/Chatscreen");
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
          SIGN UP
        </h1>

        <Input
          placeholder="Username"
          name="username"
          handleChange={handleChange}
        />
        <Input placeholder="Email" name="email" handleChange={handleChange} />
        <Input
          placeholder="Password"
          name="password"
          handleChange={handleChange}
        />
        <Input
          placeholder="Confirm password"
          name="confirmpassword"
          handleChange={handleChange}
        />

        <div class="md:flex md:items-center">
          <button
            onClick={handleSubmit}
            class="gradient block  transition duration-500 transform hover:translate-y-1 hover:scale-103   shadow w-full hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded"
            type="button"
          >
            Sign Up
          </button>
        </div>
        <div>
          <p className="text-md  mt-4 text-gray-500">
            Already have account?
            <span
              onClick={() => router.push("/login")}
              className="font-bold text-text cursor-pointer "
            >
              Sign in{" "}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
