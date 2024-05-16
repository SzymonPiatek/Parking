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

      <div
        className={`main-panel ${selectedButton === "desk" ? "active" : ""}`}
      >
        <div className="main-panel-buttons">
          <Button
            className={`button ${
              selectedFunction === "list" ? "selected" : ""
            }`}
            onClick={() => handleFunctionClick("list")}
          >
            Lista biurek
          </Button>
          <Button
            className={`button ${
              selectedFunction === "manage" ? "selected" : ""
            }`}
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
      </div>

      <div
        className={`main-panel ${selectedButton === "parking" ? "active" : ""}`}
      >
        <div className="main-panel-buttons">
          <Button
            className={`button ${
              selectedFunction === "list" ? "selected" : ""
            }`}
            onClick={() => handleFunctionClick("list")}
          >
            Lista miejsc parkingowych
          </Button>
          <Button
            className={`button ${
              selectedFunction === "manage" ? "selected" : ""
            }`}
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

        <div
          className={`main-panel-function ${
            selectedFunction === "list" ? "active" : ""
          }`}
        >
          <div className="items-list">
            {parkingSpots.map((spot) => (
              <div className="items-list-item" id={spot.id}>
                {spot.name} -{" "}
                {spot.description ? spot.description : "Brak informacji"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
