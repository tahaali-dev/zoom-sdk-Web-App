import React, { useEffect, useState } from "react";
import "./Seating.css";
import { MdOutlineEventSeat } from "react-icons/md";

const Seating = () => {
  const [Menu, Setmenu] = useState("hideMenu");
  const [AllParticipantes, SetAllParticipantes] = useState();

  // Parse the JSON back to its original format
  //   const AttendeesList = JSON.parse(localStorage.getItem("attendeesList"));

  useEffect(() => {
    window.ZoomMtg.getAttendeeslist({
      success: (res) => {
        SetAllParticipantes(res.result.attendeesList);
        // var partsforsort = res.result.attendeesList;
      },
    });
  }, [Menu]);

  //   Sorting Func
  function sortParticipantsArray(participants, type) {
    if (type === "ascending") {
      let asendingparts = participants.slice().sort((a, b) => {
        const userNameA = a.userName.toLowerCase();
        const userNameB = b.userName.toLowerCase();
        return userNameA.localeCompare(userNameB);
      });
      //   console.log(asendingparts);
      SetAllParticipantes(asendingparts);
    } else if (type === "descending") {
      let desendingparts = participants.slice().sort((a, b) => {
        const userNameA = a.userName.toLowerCase();
        const userNameB = b.userName.toLowerCase();
        return userNameB.localeCompare(userNameA);
      });

      SetAllParticipantes(desendingparts);
      //   console.log(desendingparts);
    } else if (type === "all") {
      let allparts = participants.slice();
      //   console.log(allparts);
    } else {
      throw new Error("Invalid sorting type");
    }
  }

  //Search Data
  const [searchInput, setSearchInput] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    // Define the filter function
    function filterArrayByUsername(array, search) {
      return array.filter((item) => {
        if (typeof item.userName === "string") {
          return item.userName.toLowerCase().includes(search.toLowerCase());
        } else {
          return false;
        }
      });
    }

    // Call the filter function and update the filteredArray state
    if (AllParticipantes) {
      const filteredData = filterArrayByUsername(AllParticipantes, searchInput);
      setFilteredArray(filteredData);
    }
  }, [searchInput]);

  return (
    <>
      <div className="Seating-btn">
        <h1
          onClick={() => {
            if (Menu === "hideMenu") {
              Setmenu("showMenu");
            } else {
              Setmenu("hideMenu");
            }
          }}
        >
          <MdOutlineEventSeat className="icon" />
          Seat Chart
        </h1>
      </div>

      {/* Sorting And Showing Menu */}
      <div className={Menu}>
        <input
          type="text"
          placeholder="Search By Name"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <div className="sorting-btns-cont">
          <button
            className="btns-style"
            onClick={() => sortParticipantsArray(AllParticipantes, "all")}
          >
            All
          </button>
          <button
            className="btns-style"
            onClick={() => sortParticipantsArray(AllParticipantes, "ascending")}
          >
            A to Z
          </button>
          <button
            className="btns-style"
            onClick={() =>
              sortParticipantsArray(AllParticipantes, "descending")
            }
          >
            Z to A
          </button>
        </div>

        <div className="showing-users-cont">
          {/* //Maping through parts */}
          {searchInput != "" ? (
            <>
              {filteredArray?.map((item, i) => {
                return (
                  <div className="card" key={i}>
                    <h1>{item.userName.slice(0, 1)}</h1>
                    <p>{item.userName.slice(0, 10)}</p>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {AllParticipantes?.map((item, i) => {
                return (
                  <div className="card" key={i}>
                    <h1>{item.userName.slice(0, 1)}</h1>
                    <p>{item.userName.slice(0, 10)}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Seating;
