import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAlert } from "../../store/actions/user.actions";
const Alert = () => {
  const alert = useSelector((state) => state.user.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!alert) return;
    if (alert.status === "success") {
      toast.success(alert.message, {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    } else if (alert.status === "error") {
      toast.error(alert.message, {
        style: {
          backgroundColor: "#383838",
          color: "#ffffff",
        },
      });
    }

    dispatch(clearAlert());
  }, [alert, dispatch]);

  return (
    <div style={{ position:"fixed", zIndex:"999999" }}>
      <ToastContainer />
    </div>
  );
};

export default Alert;
