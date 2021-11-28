import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/bubble.module.css";
import { AuthContext } from "../../context";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import Avatar from "react-avatar";
import {
  SearchIcon,
  PhoneIcon,
  VideoCameraIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
const Index = () => {
  const [width, height] = useWindowSize();
  console.log(width, height);
  const [selected, setSelected] = React.useState(null);
  console.log(selected);
  const selectChat = (user) => {
    console.log(user);
    setSelected(user);
  };

  const { user } = React.useContext(AuthContext);
  console.log(user);

  return (
    <div className={`${styles.mainbox}`}>
      <div className={`${styles.main} border border-gray-700`}>
        <div className={styles.header}>
          <div className="flex py-2 px-3 border border-gray-700 w-full sticky top-0 shadow-xl bg-sdark mb-5 justify-between">
            <div className="flex space-x-3 items-center">
              <Avatar size={40} round={true} />
              <p className="text-textdark opaacity-70 text-sm">Hussain</p>
            </div>
            <div className="flex space-x-3 items-center">
              <PhoneIcon className="w-7 h-7 mr-3  text-textdark opacity-60 text-bold cursor-pointer " />
              <VideoCameraIcon className="w-7 h-7 mr-3  text-textdark opacity-60 text-bold cursor-pointer " />
            </div>
          </div>
        </div>
        <div className={styles.smsbox}>
          {[...Array(200)].map((_, i) => (
            <div className={`${styles.msg_wrapper`}>
              <div className={`${styles.bubble} bg-bubble`}>
                <p className="text-sm  ">I am GREAT </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className="flex  bg-sdark py-2 px-2 border border-gray-700 rounded-full ">
            <input
              placeholder="Message..."
              className="bg-sdark  flex-1 text-textdark opacity-60 px-3 outline-none"
            />
            <ArrowCircleRightIcon className="w-8 h-8 mr-2  text-textdark opacity-60 text-bold " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
