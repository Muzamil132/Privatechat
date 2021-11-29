import React, { useContext, useState } from "react";
import {
  SearchIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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

const Layout = ({ children, selectChat }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  console.log(user);
  const [data, setData] = useState([]);
  React.useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    let bucket = [];
    snap.forEach((doc) => {
      bucket.push(doc.data());
    });
    setData(bucket);
    console.log(data);
  };

  return (
    <div className="flex ">
      <div className="min-h-screen  h-full sticky top-0 bottom-0 lg:w-1/4 w-full border-r border-gray-600 ">
        <h4 className="px-3 text-2xl py-3 font-semibold text-gray-600 ">
          Chats
        </h4>
        <div className="px-2 pb-3">
          <div className="flex  bg-sdark py-2 px-2 rounded-full ">
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
              onClick={() => selectChat(userdata)}
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
      <div className="w-1/2 lg:block border-r hidden flex   border-gray-600 ">
        <div className="flex py-2 px-3 sticky top-0 shadow-xl bg-sdark mb-5 justify-between">
          <div className="flex space-x-3 items-center">
            <Avatar size={40} round={true} />
            <p className="text-textdark opaacity-70 text-sm">Hussain</p>
          </div>
          <div className="flex space-x-3 items-center">
            <PhoneIcon className="w-7 h-7 mr-3  text-textdark opacity-60 text-bold cursor-pointer " />
            <VideoCameraIcon className="w-7 h-7 mr-3  text-textdark opacity-60 text-bold cursor-pointer " />
          </div>
        </div>
        <div className="flex-1 scroll-y">{children}</div>

        <div className="flex absolute  bottom-0  bg-sdark py-2 px-2 rounded-full ">
          <SearchIcon className="w-6 h-6 mr-2  text-textdark opacity-60 text-bold " />
          <input
            placeholder="Search..."
            className="bg-sdark text-textdark opacity-60 px-3 outline-none"
          />
        </div>
      </div>
      <div className=" h-full sticky top-0   w-1/4 hidden lg:block ">
        {[...Array(200)].map((_, i) => (
          <p>good</p>
        ))}
      </div>
    </div>
  );
};

export default Layout;
