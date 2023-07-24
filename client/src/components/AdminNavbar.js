import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Badge, Modal } from "antd";
import moment from "moment";
import axios from "axios";
import io from "socket.io-client";
import notificationSound from "../Audio/tone2.mp3";

const AdminNavbar = () => {
  const history = useNavigate();
  const [auth, setAuth] = useAuth();

  const [isMuted, setIsMuted] = useState(true);

  // State to track the number of new pending notifications
  const [newPendingNotificationCount, setNewPendingNotificationCount] =
    useState(0);
  const [pendingNotifications, setPendingNotifications] = useState([]);
  // Create audio elements for notification and delete sounds
  const notificationAudioRef = useRef(null);

  // Function to play the notification sound
  const playNotificationSound = useCallback(() => {
    if (notificationAudioRef.current && !isMuted) {
      // Pause and reset the audio before playing it again
      notificationAudioRef.current.pause();
      notificationAudioRef.current.currentTime = 0;
      notificationAudioRef.current.play();
    }
    //eslint-disable-next-line
  }, [isMuted]);

  ///////////////////////////////////////////////
  // Socket.io setup
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a new socket connection
    const socketServer = io(`${process.env.REACT_APP_API}`);
    setSocket(socketServer);
    return () => {
      // Disconnect the socket when the component unmounts
      socketServer.disconnect();
    };
  }, []);

  // Function to close the socket connection when the user leaves the site
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.disconnect();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket]);

  // Example: Emit an event to fetch all user details
  socket && socket.emit("getAllUserDetails");

  // Example: Receive the response with user details and notifications
  socket &&
    socket.on("userDetailsFetched", (userDetails) => {
      // console.log("User details and notifications:", userDetails);
      // Filter notifications with "Pending" status
      const pendingNotifications = userDetails.notifications.filter(
        (notification) => notification.status === "Pending"
      );
      setPendingNotifications(pendingNotifications);
      // console.log(setPendingNotifications);
    });

  // Example: Receive an error response if fetching user details fails
  socket &&
    socket.on("userDetailsFetchError", (error) => {
      console.error("Error fetching user details:", error);
    });
  ///////////////////////////////////////////////
  // Use useEffect to play the notification sound when the number of pending notifications increases
  useEffect(() => {
    const newPendingNotifications = pendingNotifications.filter(
      (notification) => !notification.isNotified
    );

    // Calculate the number of new pending notifications
    const newNotificationCount = newPendingNotifications.length;

    // If there are new pending notifications and the count has increased, play the notification sound
    if (
      newNotificationCount > 0 &&
      newNotificationCount !== newPendingNotificationCount
    ) {
      playNotificationSound();

      // Update the newPendingNotificationCount to the current count
      setNewPendingNotificationCount(newNotificationCount);

      // Mark the new pending notifications as notified to avoid playing the sound again for the same notifications
      const updatedPendingNotifications = pendingNotifications.map(
        (notification) => {
          if (!notification.isNotified) {
            return { ...notification, isNotified: true };
          }
          return notification;
        }
      );

      setPendingNotifications(updatedPendingNotifications);
    }
  }, [
    pendingNotifications,
    newPendingNotificationCount,
    playNotificationSound,
  ]);

  // Function to delete a notification
  const deleteNotification = (userId, notificationId) => {
    axios
      .delete(`${process.env.REACT_APP_API}/api/v1/user/delete-notifications`, {
        data: { userId, notificationId },
      })
      .then((response) => {
        toast.success("Notification deleted successfully");
        // Handle the response after successful deletion (if needed)
      })
      .catch((error) => {
        // Handle the error (if needed)
        console.error("Error deleting notification:", error);
      });
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    if (pendingNotifications.length > 0) {
      setOpen(true);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Function to toggle mute state
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <React.Fragment>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-info bg-opacity-50 rounded-4 px-1 py-2">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-semibold" to={"/dash/admin"}>
          App Name
          </NavLink>
          {/* Notification sound */}
          <audio
            ref={notificationAudioRef}
            src={notificationSound}
            muted={isMuted}
          />
          <div className="d-flex">
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link fs-5" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fs-5" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <button
                  className="btn me-3 px-2 py-0 rounded-3"
                  onClick={showModal}
                >
                  <Badge count={pendingNotifications.length} showZero>
                    <i className="bi bi-bell-fill fs-5 pe-1"></i>
                  </Badge>
                </button>
                <Modal
                  title="Notifications"
                  open={open}
                  onCancel={handleCancel}
                  okButtonProps={{
                    disabled: true,
                  }}
                >
                  <div>
                    <ul className="list-group list-group-numbered">
                      {pendingNotifications.map((notification) => (
                        <li
                          key={notification._id}
                          className="d-flex row mb-2 border justify-content-between bg-warning bg-opacity-10 rounded-3 py-1 align-items-center"
                        >
                          <div className="col-10">
                            <p className="p-0 m-0">
                              <span className="fw-bold">
                                {notification.senderName}{" "}
                              </span>
                              send a new order of "
                              <span className="text-lowercase text-decoration-underline">
                                {notification.category}
                              </span>
                              "
                            </p>
                            <p
                              style={{ fontSize: "10px" }}
                              className="p-0 m-0 text-muted"
                            >
                              ( Date :{" "}
                              {moment(notification?.timestamp).format(
                                "DD-MMM-YY"
                              )}
                              )
                            </p>
                          </div>
                          <div className="col p-0 m-0 me-1 text-end">
                            <span
                              className="btn text-primary fs-4 p-0 pe-1"
                              onClick={() =>
                                deleteNotification(
                                  notification.userId,
                                  notification._id
                                )
                              }
                            >
                              <i className="bi bi-check2-circle"></i>
                            </span>
                            <div
                              style={{ fontSize: "10px" }}
                              className="col text-muted text-end fw-lighter fst-italic"
                            >
                              {moment(notification?.timestamp).format("h:mm A")}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Modal>
                <div className="btn-group shadow">
                  <button
                    type="button"
                    className="btn bg-dark text-light px-1 rounded-3 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <span className="me-1 fs-5">{auth?.user?.name[0]}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/dash/admin-profile`}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        className="dropdown-item"
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="text-end mt-3 me-3">
        <button className="btn" onClick={handleToggleMute}>
          {isMuted ? (
            <i className="bi bi-volume-mute-fill fs-4"></i>
          ) : (
            <i className="bi bi-volume-up-fill fs-4"></i>
          )}
        </button>
        <button className="btn btn-dark" onClick={() => history(-1)}>
          Go back
        </button>
      </div>
      {/* Navbar */}
    </React.Fragment>
  );
};

export default AdminNavbar;
