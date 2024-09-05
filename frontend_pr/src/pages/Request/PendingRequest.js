import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PullRequest from "../components/PullRequest";
import Notification from "../../shared/Notification";

const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");

const PendingRequest = () => {
//   const [open, setOpen] = useState(false);

  

  const [posts, setPosts] = useState([]);
  const { userInfo, setRefresh, sock, open, setOpen } =
    useContext(UserContext);
  const [flag, setFlag] = useState(false);

  const getPost = () =>
    fetch("http://localhost:4000/pull-request", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((post) => {
        setPosts(post);
        setRefresh(true);
      });
    });

//   const handleClose = () => setPopupOpen(false);

  useEffect(() => {
    getPost();
    socket.on(`newRequest${userInfo.id}`, (message) => {
        console.log(message);
      setOpen(true);
    });

    socket.on(`sender${userInfo.id}`, (message) => {
        console.log(message);
      setOpen(true);
    });
  }, [open]);

  const notificationHandleClose = () => {
    setOpen(false);
  };

  return (
    <div className="pull-body">
      <Notification
        open={open}
        notificationHandleClose={notificationHandleClose}
      />

      {posts.length > 0 &&
        posts
          .filter((post) => post.status === "Pending")
          .map((post) => <PullRequest {...post} />)}
    </div>
  );
};

export default PendingRequest;
