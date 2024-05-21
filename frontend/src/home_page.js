import React, { useState, useEffect } from "react";
import Button from "./widgets";
import {
  ParkingPanel,
  EditParkingSpotReservation,
  EditParkingSpot,
} from "./parkingPanel";
import { DeskPanel } from "./deskPanel";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [selectedButton, setSelectedButton] = useState("parking");
  const [selectedFunction, setSelectedFunction] = useState("list");
  const [parkingSpots, setParkingSpots] = useState([]);
  const [parkingSpotsReservations, setParkingSpotsReservations] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingItemType, setEditingItemType] = useState(null);

  const API_URL = "http://localhost:8000/api/";
  const PARKING_URL = API_URL + "parking_spots/";
  const PARKING_RESERVATIONS_URL = API_URL + "parking_spots_reservations/";
  const USERS_URL = API_URL + "users/";

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleFunctionClick = (buttonName) => {
    setSelectedFunction(buttonName);
  };

  const handleEditClick = (spot, type) => {
    setEditingItem(spot);
    setEditingItemType(type);
  };

  const handleXMarkClick = () => {
    setEditingItem(null);
  };

  const handleSaveParkingSpotReservationClick = async (updatedSpot) => {
    try {
      const response = await fetch(
        `${PARKING_RESERVATIONS_URL}${updatedSpot.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSpot),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedSpots = parkingSpotsReservations.map((spot) =>
        spot.id === updatedSpot.id ? updatedSpot : spot
      );
      setParkingSpotsReservations(updatedSpots);
      setEditingItem(null);
      setEditingItemType(null);
    } catch (error) {
      console.error("Error updating parking spot:", error);
    }
  };

  const handleSaveParkingSpotClick = async (updatedSpot) => {
    try {
      const response = await fetch(`${PARKING_URL}${updatedSpot.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpot),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedSpots = parkingSpots.map((spot) =>
        spot.id === updatedSpot.id ? updatedSpot : spot
      );
      setParkingSpots(updatedSpots);
      setEditingItem(null);
      setEditingItemType(null);
    } catch (error) {
      console.error("Error updating parking spot:", error);
    }
  };

  const handleSaveNewParkingReservationClick = async (newReservation) => {
    try {
      const response = await fetch(PARKING_RESERVATIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setParkingSpotsReservations([...parkingSpotsReservations, data]);

      alert("Rezerwacja została pomyślnie zapisana!");
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Wystąpił błąd podczas zapisywania rezerwacji");
    }
  };

  const fetchUsersData = async () => {
    try {
      const response = await fetch(USERS_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  const getParkingSpotNameById = (id) => {
    const spot = parkingSpots.find((spot) => spot.id === id);
    return spot ? spot.name : "";
  };

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "";
  };

  useEffect(() => {
    const fetchParkingSpotsReservationsData = async () => {
      try {
        const response = await fetch(PARKING_RESERVATIONS_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setParkingSpotsReservations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedButton === "parking" && selectedFunction === "manage") {
      fetchParkingSpotsReservationsData();
      fetchUsersData();
    }
  }, [selectedButton, selectedFunction]);

  useEffect(() => {
    const fetchParkingSpotsData = async () => {
      try {
        const response = await fetch(PARKING_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setParkingSpots(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedButton === "parking" && selectedFunction === "list") {
      fetchParkingSpotsData();
      fetchUsersData();
    }
  }, [selectedButton, selectedFunction]);

  return (
    <div className="main-container">
      {editingItem && editingItemType === "parking_spot" && (
        <EditParkingSpot
          spot={editingItem}
          handleXMarkClick={handleXMarkClick}
          handleSaveClick={handleSaveParkingSpotClick}
        />
      )}

      {editingItem && editingItemType === "parking_spot_reservation" && (
        <EditParkingSpotReservation
          spot={editingItem}
          handleXMarkClick={handleXMarkClick}
          handleSaveClick={handleSaveParkingSpotReservationClick}
          getUserNameById={getUserNameById}
          getParkingSpotNameById={getParkingSpotNameById}
          users={users}
        />
      )}

      <ChooseItem
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
      />

      <DeskPanel
        selectedFunction={selectedFunction}
        selectedButton={selectedButton}
        handleFunctionClick={handleFunctionClick}
        Button={Button}
      />

      <ParkingPanel
        selectedFunction={selectedFunction}
        selectedButton={selectedButton}
        handleFunctionClick={handleFunctionClick}
        handleEditClick={handleEditClick}
        Button={Button}
        parkingSpots={parkingSpots}
        parkingSpotsReservations={parkingSpotsReservations}
        getUserNameById={getUserNameById}
        handleSaveNewParkingReservationClick={
          handleSaveNewParkingReservationClick
        }
        users={users}
        getParkingSpotNameById={getParkingSpotNameById}
      />
    </div>
  );
}

function ChooseItem({ selectedButton, handleButtonClick }) {
  return (
    <div className="main-choose">
      <Button
        className={`${selectedButton === "parking" ? "selected" : ""}`}
        onClick={() => handleButtonClick("parking")}
      >
        Parking
      </Button>
      <Button
        className={`${selectedButton === "desk" ? "selected" : ""}`}
        onClick={() => handleButtonClick("desk")}
      >
        Biurko
      </Button>
    </div>
  );
}

export default HomePage;
