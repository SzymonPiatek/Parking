import React, { useState, useEffect } from "react";
import Button from "./widgets";

function HomePage() {
  const [selectedButton, setSelectedButton] = useState("parking");
  const [selectedFunction, setSelectedFunction] = useState("list");
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8000/api/parking_spots/";

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleFunctionClick = (buttonName) => {
    setSelectedFunction(buttonName);
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
              <div className="items-list-item" key={spot.id}>
                <div className="items-list-item-text">
                  {`${spot.name} - ${spot.description || "Brak informacji"}`}
                </div>
                <div className="items-list-item-functions">
                  <div className="items-list-item-functions-function">
                    Edytuj
                  </div>
                </div>
              </div>
            ))}
          </div>
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
