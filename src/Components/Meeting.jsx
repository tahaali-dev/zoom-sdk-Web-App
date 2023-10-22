import React, { useEffect, useState } from "react";
import { KJUR } from "jsrsasign";
import Seating from "./Seating";
import { useSelector } from "react-redux";
import Loader from "./Loader/Loader";
//Imports-------------------------

const Meeting = () => {
  //Success State------
  const [Success, setSuccess] = useState(false);

  //Getting Form Data From Redux Store-----
  const keys = useSelector((state) => state.app.formData);
  console.log(keys.meetingId, keys.password, keys.role);

  //Use Effect Top Execute Join And init,Sdk Script---------
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://source.zoom.us/zoom-meeting-2.17.0.min.js";

    script.onload = () => {
      const ZoomMtg = window.ZoomMtg;
      // console.log(ZoomMtg);
      ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      ZoomMtg.i18n.load("en-US");
      ZoomMtg.i18n.reload("en-US");

      //Vars
      var sdkKey = "YorbbX21RoS_IoZOv4WKQw";
      var meetingNumber = keys.meetingId;
      var passWord = keys.password;
      var role = 0;
      var userName = keys.userName;
      var userEmail = keys.email;
      var leaveUrl = "http://localhost:5173";

      //Functions--------
      let getSignature = async () => {
        const iat = Math.round(new Date().getTime() / 1000) - 30;
        const exp = iat + 60 * 60 * 2;

        const oHeader = { alg: "HS256", typ: "JWT" };

        const oPayload = {
          sdkKey: "YorbbX21RoS_IoZOv4WKQw",
          mn: meetingNumber,
          role: role,
          iat: iat,
          exp: exp,
          appKey: "YorbbX21RoS_IoZOv4WKQw",
          tokenExp: iat + 60 * 60 * 2,
        };

        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const signature = KJUR.jws.JWS.sign(
          "HS256",
          sHeader,
          sPayload,
          "HGokGOwF6kuPLw34YxqNEBdd7xc3KmBB"
        );
        // console.log(signature);
        startMeeting(signature);
      };

      function startMeeting(signature) {
        // document.getElementById('zmmtg-root').style.display = 'block';

        ZoomMtg.init({
          leaveUrl: leaveUrl,
          success: (success) => {
            console.log(success);

            ZoomMtg.join({
              signature: signature,
              sdkKey: sdkKey,
              meetingNumber: meetingNumber,
              passWord: passWord,
              userName: userName,
              userEmail: userEmail,
              success: (success) => {
                console.log("success in join", success);
                // console.log(
                //   ZoomMtg.getAttendeeslist(),
                //   "logging ZoomMtg To Find Methods"
                // );
                if (success) {
                  setSuccess(true);
                }

                // ZoomMtg.getAttendeeslist({
                //   success: (res) => {
                //     localStorage.setItem(
                //       "attendeesList",
                //       JSON.stringify(res.result.attendeesList)
                //     );
                //   },
                // });
              },
              error: (error) => {
                console.log("error in join", error);
              },
            });
          },
          error: (error) => {
            console.log("error in init", error);
          },
        });
      }
      getSignature();
    };

    document.body.appendChild(script);
  }, []);

  //-----------Jsx Return --------
  return (
    <>
      {/* <Seating /> */}
      {Success ? (
        <>
          <Seating />
        </>
      ) : (
        <div className="LoaderCont">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Meeting;

3;
