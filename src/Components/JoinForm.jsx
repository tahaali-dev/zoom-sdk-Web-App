import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinFrom.css";
import { useDispatch, useSelector } from "react-redux";
import { SetfromData } from "../Redux/LogregSlice";
import toast from "react-hot-toast";
//Imports------------------------------------------------

const JoinForm = () => {
  //Utils--------
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Form States------------------------
  const [userName, setuserName] = useState();
  const [email, setemail] = useState();
  const [meetingId, setMettingId] = useState();
  const [password, setPassword] = useState();

  //Handle Join Func
  const HandleJoin = (e) => {
    e.preventDefault();
    if (!meetingId || !password || !email || !userName) {
      toast.error("All Feilds Required");
    } else {
      dispatch(SetfromData({ meetingId, password, userName, email }));
      navigate("/meeting");
    }
  };

  //-----Jsx Return--------------
  return (
    <div className="form-cont">
      <form action="">
        <h2>Welcome Back 😃</h2>
        <input
          type="text"
          placeholder="Enter Your Good Name 📛"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Your Email 📧"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
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

        <button onClick={HandleJoin}>Connect Now</button>
      </form>
    </div>
  );
};

export default JoinForm;
