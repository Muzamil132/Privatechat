import React, { useContext, useState, useEffect } from "react";
import {
  SearchIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/bubble.module.css";

import { db, auth } from "../fire";
import { AuthContext } from "../context";
import Avatar from "react-avatar";

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

const Layout = ({ children, data }) => {
  const { user, LogUserout } = useContext(AuthContext);
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center ">
      <div className="min-h-screen  h-full sticky top-0 bottom-0 lg:w-1/2 w-full border border-gray-700 ">
        <div className="flex justify-between items-center ">
          <h4 className="px-3 text-2xl py-3 font-semibold text-gray-600 ">
            Chats
          </h4>
          <button
            onClick={() => LogUserout()}
            className="font-semibold bg-sdark px-3 py-2 text-sm shadow-lg rounded-md  cursor-pointer text-textdark opacity-60 mr-3"
          >
            Sign out
          </button>
        </div>

        <div className="px-2 pb-3">
          <div className="flex border border-gray-700 bg-sdark py-2 px-2 rounded-full ">
            <SearchIcon className="w-6 h-6 mr-2  text-textdark opacity-60 text-bold " />
            <input
              placeholder="Search..."
              className="bg-sdark text-textdark opacity-60 px-3 outline-none"
            />
          </div>
        </div>

        {data.map((userdata, i) => (
          <Link href={`/Chat/${userdata.uid}`}>
            <div
              className="py-3 relative flex items-center space-x-2  hover:bg-sdark px-3 mt-1 mx-3 rounded-md"
              key={i}
            >
              <Avatar round={true} size={40} />
              <p className=" transition duration-200 text-textdark opacity-50">
                {userdata.name}
              </p>
              {userdata.isOnline && (
                <div className="h-2 w-2 bg-green-600 absolute right-5 top-7 rounded-full   "></div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Layout;

export const getServerSideProps = async () => {
  const userRef = await getDocs(collection(db, "users"));
  let bucket = [];
  userRef.forEach((doc) => {
    bucket.push(doc.data());
  });

  return {
    props: {
      data: bucket,
    },
  };
};
