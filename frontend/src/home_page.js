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

  const handleXMarkClick = () => {
    setEditingSpot(null);
  };

  const handleSaveClick = async (updatedSpot) => {
    try {
      const response = await fetch(`${API_URL}${updatedSpot.id}/`, {
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
      setEditingSpot(null);
    } catch (error) {
      console.error("Error updating parking spot:", error);
    }
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
        console.error("Error fetching data:", error);
      }
    };

    if (selectedButton === "parking" && selectedFunction === "list") {
      fetchData();
    }
  }, [selectedButton, selectedFunction]);

  return (
    <div className="main-container">
      {editingSpot && (
        <EditParkingSpot
          spot={editingSpot}
          handleXMarkClick={handleXMarkClick}
          handleSaveClick={handleSaveClick}
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

function ParkingItem({ spot, onEditClick }) {
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
            <ParkingItem
              spot={spot}
              key={spot.id}
              onEditClick={() => handleEditClick(spot)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
