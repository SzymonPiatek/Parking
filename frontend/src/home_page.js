import React, { useState, useEffect } from "react";
import Button from "./widgets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSquareParking,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [selectedButton, setSelectedButton] = useState("parking");
  const [selectedFunction, setSelectedFunction] = useState("list");
  const [parkingSpots, setParkingSpots] = useState([]);
  const [parkingSpotsReservations, setParkingSpotsReservations] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingItemType, setEditingItemType] = useState(null);

  const API_URL = "http://localhost:8000/api/";
  const PARKING_URL = API_URL + "parking_spots/";
  const PARKING_RESERVATIONS_URL = API_URL + "parking_spots_reservations/";

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
      const updatedSpots = parkingSpots.map((spot) =>
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
        Button={Button}
        parkingSpots={parkingSpots}
        parkingSpotsReservations={parkingSpotsReservations}
        handleEditClick={handleEditClick}
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

function EditParkingSpot({ spot, handleXMarkClick, handleSaveClick }) {
  const [description, setDescription] = useState(spot.description);
  const isDescriptionUnchanged =
    description === spot.description || description === "";

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSpot = { ...spot, description };
    handleSaveClick(updatedSpot);
  };

  return (
    <div className="edit-panel active">
      <div className="edit-panel-container">
        <div className="edit-panel-title">
          <p>Edytuj miejsce parkingowe</p>
          <Button className="close" onClick={() => handleXMarkClick()}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </Button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-label">
            <p>Nazwa</p>
            <input disabled value={spot.name} />
          </div>
          <div className="form-label">
            <p>Opis</p>
            <textarea
              rows={5}
              maxLength={100}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <Button type="submit" disabled={isDescriptionUnchanged}>
            Zapisz
          </Button>
        </form>
      </div>
    </div>
  );
}

function EditParkingSpotReservation({
  spot,
  handleXMarkClick,
  handleSaveClick,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSpot = { ...spot };
    handleSaveClick(updatedSpot);
  };

  return (
    <div className="edit-panel active">
      <div className="edit-panel-container">
        <div className="edit-panel-title">
          <p>Edytuj rezerwację miejsca parkingowego</p>
          <Button className="close" onClick={() => handleXMarkClick()}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </Button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-label">
            <p>Miejsce parkingowe</p>
            <input disabled value={spot.item} />
          </div>
          <div className="form-label">
            <p>Użytkownik</p>
            <input value={spot.user} />
          </div>
          <div className="form-label">
            <p>Rezerwacja stała</p>
            <input value={spot.constant} />
          </div>
          <div className="form-label">
            <p>Data początkowa</p>
            <input value={spot.start_date} />
          </div>
          <div className="form-label">
            <p>Data końcowa</p>
            <input value={spot.end_date} />
          </div>
          <Button type="submit">Zapisz</Button>
        </form>
      </div>
    </div>
  );
}

function ParkingSpotReservation({ spot, onEditClick }) {
  return (
    <div className="item">
      <div className="item-text">
        <FontAwesomeIcon icon={faSquareParking} />
        {spot.item}
      </div>
      <div className="item-text">{`${
        spot.constant
          ? "Rezerwacja stała"
          : spot.start_date + " - " + spot.end_date
      }`}</div>
      <div className="item-text">{`${spot.user}`}</div>
      <div className="item-functions">
        <div className="item-functions-function" onClick={onEditClick}>
          <FontAwesomeIcon icon={faEdit} /> Edytuj
        </div>
      </div>
    </div>
  );
}

function ParkingSpot({ spot, onEditClick }) {
  return (
    <div className="item">
      <div className="item-text">
        <FontAwesomeIcon icon={faSquareParking} />
        {`${spot.name}`}
      </div>
      <div className="item-text">{`${spot.description || ""}`}</div>
      <div className="item-functions">
        <div className="item-functions-function" onClick={onEditClick}>
          <FontAwesomeIcon icon={faEdit} /> Edytuj
        </div>
      </div>
    </div>
  );
}

function DeskPanel({ selectedFunction, handleFunctionClick, selectedButton }) {
  return (
    <div className={`main-panel ${selectedButton === "desk" ? "active" : ""}`}>
      <div className="main-panel-buttons">
        <Button
          className={`${selectedFunction === "list" ? "selected" : ""}`}
          onClick={() => handleFunctionClick("list")}
        >
          Lista biurek
        </Button>
        <Button
          className={`${selectedFunction === "manage" ? "selected" : ""}`}
          onClick={() => handleFunctionClick("manage")}
        >
          Zarządzaj rezerwacjami
        </Button>
        <Button
          className={`${selectedFunction === "add" ? "selected" : ""}`}
          onClick={() => handleFunctionClick("add")}
        >
          Dodaj rezerwację
        </Button>
      </div>
    </div>
  );
}

function ParkingPanel({
  selectedFunction,
  handleFunctionClick,
  selectedButton,
  parkingSpotsReservations,
  parkingSpots,
  handleEditClick,
}) {
  return (
    <div
      className={`main-panel ${selectedButton === "parking" ? "active" : ""}`}
    >
      <div className="main-panel-buttons">
        <Button
          className={`${selectedFunction === "list" ? "selected" : ""}`}
          onClick={() => handleFunctionClick("list")}
        >
          Lista miejsc parkingowych
        </Button>
        <Button
          className={`${selectedFunction === "manage" ? "selected" : ""}`}
          onClick={() => handleFunctionClick("manage")}
        >
          Zarządzaj rezerwacjami
        </Button>
        <Button
          className={`${selectedFunction === "add" ? "selected" : ""}`}
          onClick={() => handleFunctionClick("add")}
        >
          Dodaj rezerwację
        </Button>
      </div>

      <div className="main-panel-function">
        <div
          className={`items-list ${
            selectedFunction === "list" ? "active" : ""
          }`}
        >
          {parkingSpots.map((spot) => (
            <ParkingSpot
              spot={spot}
              key={spot.id}
              onEditClick={() => handleEditClick(spot, "parking_spot")}
            />
          ))}
        </div>
        <div
          className={`items-list ${
            selectedFunction === "manage" ? "active" : ""
          }`}
        >
          {parkingSpotsReservations.map((spot) => (
            <ParkingSpotReservation
              spot={spot}
              key={spot.id}
              onEditClick={() =>
                handleEditClick(spot, "parking_spot_reservation")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
