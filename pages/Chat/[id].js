import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/bubble.module.css";
import { AuthContext } from "../../context";
import Moment from "react-moment";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import { useRouter } from "next/router";
import { db } from "../../fire";
import Avatar from "react-avatar";
import {
  SearchIcon,
  PhoneIcon,
  VideoCameraIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import {
  getFirestore,
  collection,
  query,
  setDoc,
  orderBy,
  where,
  getDoc,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
const Index = ({ userA }) => {
  const router = useRouter();

  // const [userA, setUserA] = React.useState(null);
  const { user } = React.useContext(AuthContext);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const id = userA.uid;
  // console.log(id);
  const me = user?.uid;

  var roomId = me > id ? `${me + id}` : `${id + me}`;

  console.log(roomId);

  useEffect(() => {
    getAllmessages();
  }, [roomId]);

  const getAllmessages = async () => {
    const q = query(
      collection(db, "messages", roomId, "chats"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setMessages(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages", roomId, "chats"), {
      message,
      sender: me,
      reciever: id,
      createdAt: new Date(),
    });
    setMessage("");
  };

  return (
    <div className={`${styles.mainbox}`}>
      <div className={`${styles.main} border border-gray-700`}>
        <div className={styles.header}>
          <div className="flex py-2 px-3 border border-gray-700 w-full sticky top-0 shadow-xl bg-sdark mb-5 justify-between">
            <div className="flex space-x-3 items-center">
              <Avatar size={40} round={true} />
              <p className="text-textdark opaacity-70 text-sm">{userA?.name}</p>
            </div>
            <div className="flex space-x-3 items-center">
              <PhoneIcon className="w-7 h-7 mr-3  text-textdark opacity-60 text-bold cursor-pointer " />
              <VideoCameraIcon className="w-7 h-7 mr-3  text-textdark opacity-60 text-bold cursor-pointer " />
            </div>
          </div>
        </div>
        <div className={styles.smsbox}>
          {messages?.map((msg, i) => (
            <div
              className={`${
                msg.sender == me ? styles.msg_wrapper : styles.msg_wrapper1
              }`}
            >
              <div
                className={`${
                  msg.sender == me ? styles.bubble : styles.bubble1
                } ${msg.sender == me ? "bg-bubble" : "bg-sdark"}`}
              >
                <p className="text-sm  ">{msg.message} </p>
                <small className="text-xs text-textdark opacity-70 ">
                  <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <form onSubmit={handleSubmit}>
            <div className="flex  bg-sdark py-2 px-2 border border-gray-700 rounded-full ">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message..."
                className="bg-sdark  flex-1 text-textdark opacity-60 px-3 outline-none"
              />
              <ArrowCircleRightIcon
                onClick={handleSubmit}
                className="w-8 h-8 mr-2 cursor-pointer  text-textdark opacity-60 text-bold "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const q = query(collection(db, "users"), where("uid", "==", id));
  const snap = await getDocs(q);
  let userA = null;
  snap.forEach((doc) => {
    userA = doc.data();
  });

  return {
    props: {
      userA,
    },
  };
};
