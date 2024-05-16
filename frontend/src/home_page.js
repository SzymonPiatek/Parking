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
  const [loading, setLoading] = useState(true);
  const [editingSpot, setEditingSpot] = useState(null);

  const API_URL = "http://localhost:8000/api/parking_spots/";

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleFunctionClick = (buttonName) => {
    setSelectedFunction(buttonName);
  };

  const handleEditClick = (spot) => {
    setEditingSpot(spot);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setParkingSpots(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(error);
      }
    };

    if (selectedButton === "parking" && selectedFunction === "list") {
      fetchData();
    }
  });

  return (
    <div className="main-container">
      {/* #################### */}

      {editingSpot && (
        <div className="edit-panel active">
          <EditParkingSpot spot={editingSpot} />
        </div>
      )}

      <div className="main-choose">
        <Button
          className={`button ${selectedButton === "parking" ? "selected" : ""}`}
          onClick={() => handleButtonClick("parking")}
        >
          Parking
        </Button>
        <Button
          className={`button ${selectedButton === "desk" ? "selected" : ""}`}
          onClick={() => handleButtonClick("desk")}
        >
          Biurko
        </Button>
      </div>

      {/* #################### */}

      <div
        className={`main-panel ${selectedButton === "desk" ? "active" : ""}`}
      >
        <DeskPanel
          selectedFunction={selectedFunction}
          handleFunctionClick={handleFunctionClick}
          Button={Button}
        />
      </div>

      {/* #################### */}

      <div
        className={`main-panel ${selectedButton === "parking" ? "active" : ""}`}
      >
        <ParkingPanel
          selectedFunction={selectedFunction}
          handleFunctionClick={handleFunctionClick}
          Button={Button}
        />
        <div
          className={`main-panel-function ${
            selectedButton === "parking" ? "active" : ""
          }`}
        >
          <div
            className={`items-list ${
              selectedFunction === "list" ? "active" : ""
            }`}
          >
            {parkingSpots.map((spot) => (
              <ParkingItem
                spot={spot}
                key={spot.id}
                onEditClick={() => handleEditClick(spot)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditParkingSpot({ spot }) {
  const [description, setDescription] = useState(spot.description);
  const isDescriptionUnchanged =
    description === spot.description || description === "";

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="edit-panel-container">
      <div className="edit-panel-title">
        <p>Edytuj miejsce parkingowe</p>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      <form className="form">
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
        <Button className="button" disabled={isDescriptionUnchanged}>
          Zapisz
        </Button>
      </form>
    </div>
  );
}

function ParkingItem({ spot, onEditClick }) {
  return (
    <div className="item">
      <div className="item-text">
        <FontAwesomeIcon icon={faSquareParking} />
        {`${spot.name}`}
      </div>
      <div className="item-text">
        {`${spot.description || "Brak informacji"}`}
      </div>
      <div className="item-functions">
        <div className="item-functions-function" onClick={onEditClick}>
          <FontAwesomeIcon icon={faEdit} /> Edytuj
        </div>
      </div>
    </div>
  );
}

function DeskPanel({ selectedFunction, handleFunctionClick }) {
  return (
    <div className="main-panel-buttons">
      <Button
        className={`button ${selectedFunction === "list" ? "selected" : ""}`}
        onClick={() => handleFunctionClick("list")}
      >
        Lista biurek
      </Button>
      <Button
        className={`button ${selectedFunction === "manage" ? "selected" : ""}`}
        onClick={() => handleFunctionClick("manage")}
      >
        Zarządzaj rezerwacjami
      </Button>
      <Button
        className={`button ${selectedFunction === "add" ? "selected" : ""}`}
        onClick={() => handleFunctionClick("add")}
      >
        Dodaj rezerwację
      </Button>
    </div>
  );
}

function ParkingPanel({ selectedFunction, handleFunctionClick }) {
  return (
    <div className="main-panel-buttons">
      <Button
        className={`button ${selectedFunction === "list" ? "selected" : ""}`}
        onClick={() => handleFunctionClick("list")}
      >
        Lista miejsc parkingowych
      </Button>
      <Button
        className={`button ${selectedFunction === "manage" ? "selected" : ""}`}
        onClick={() => handleFunctionClick("manage")}
      >
        Zarządzaj rezerwacjami
      </Button>
      <Button
        className={`button ${selectedFunction === "add" ? "selected" : ""}`}
        onClick={() => handleFunctionClick("add")}
      >
        Dodaj rezerwację
      </Button>
    </div>
  );
}

export default HomePage;
