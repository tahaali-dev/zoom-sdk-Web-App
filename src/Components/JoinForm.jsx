import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinFrom.css";
import { useDispatch, useSelector } from "react-redux";
import { SetfromData } from "../Redux/LogregSlice";
import toast from "react-hot-toast";

const JoinForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //From States
  const [meetingId, setMettingId] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const HandleJoin = (e) => {
    e.preventDefault();
    if (!meetingId || !password || !role) {
      toast.error("All Feilds Required");
    } else {
      dispatch(SetfromData({ meetingId, password, role }));
      navigate("/meeting");
    }
  };

  return (
    <div className="form-cont">
      <form action="">
        <h2>Welcome Back 😃</h2>
        <input
          type="number"
          placeholder="Enter Meeting Id 🆔"
          value={meetingId}
          onChange={(e) => setMettingId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password 🔑"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="1">Host</option>
          <option value="0">User</option>
        </select>
        <button onClick={HandleJoin}>Connect Now</button>
      </form>
    </div>
  );
};

export default JoinForm;
