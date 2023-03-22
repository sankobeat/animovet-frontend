import Header from "@/components/header";
import "@/styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import { userStore } from "../state/store";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

let socket;

export default function App({ Component, pageProps }) {
  const user = userStore((state) => state.user);
  useEffect(() => {
    if (user?.isAdmin) {
      socket = io(`${process.env.NEXT_PUBLIC_LOCAL_HOST_API}`);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (user?.isAdmin && socket) {
      socket.emit("addAdmin", user._id);
    }
    return () => {
      if (user?.isAdmin && socket) {
        socket.emit("removeAdmin", user._id);
      }
    };
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("userHasRegistered", (data) => {
        toast.success(
          `a user with the name ${data.name} has ${data.notificationType} in your website`
        );
      });
    }
    return () => {
      if (socket) {
        socket.off("userHasRegistered");
      }
    };
  }, [socket]);

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <Component {...pageProps} />
    </>
  );
}
