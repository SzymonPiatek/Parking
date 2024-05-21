import React, { useState, useEffect } from "react";
import Button from "./widgets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : "Nie rozpoznano";
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
      />
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
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

function EditParkingSpot({ spot, handleXMarkClick, handleSaveClick }) {
  const [description, setDescription] = useState(spot.description);

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
          <Button type="submit">Zapisz</Button>
        </form>
      </div>
    </div>
  );
}

function EditParkingSpotReservation({
  spot,
  handleXMarkClick,
  handleSaveClick,
  getUserNameById,
}) {
  const [user, setUser] = useState(spot.user);
  const [isConstant, setIsConstant] = useState(spot.constant);
  const [isTemporary, setIsTemporary] = useState(!spot.constant);
  const [startDate, setStartDate] = useState(spot.start_date);
  const [endDate, setEndDate] = useState(spot.end_date);

  const handleConstantChange = (event) => {
    setIsConstant(event.target.checked);
    setIsTemporary(!event.target.checked);
  };

  const handleTemporaryChange = (event) => {
    setIsTemporary(event.target.checked);
    setIsConstant(!event.target.checked);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSpot = {
      ...spot,
      user: user,
      constant: isConstant,
      start_date: startDate,
      end_date: endDate,
    };
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
            <input value={user} onChange={handleUserChange} />
          </div>
          <div className="form-label">
            <p>Typ rezerwacji</p>
            <div className="form-label-line">
              <label>
                <input
                  type="checkbox"
                  checked={isConstant}
                  onChange={handleConstantChange}
                />
                <span>Stała</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isTemporary}
                  onChange={handleTemporaryChange}
                />
                <span>Tymczasowa</span>
              </label>
            </div>
          </div>
          <div className="form-label">
            <p>Data początkowa</p>
            <input
              type="datetime-local"
              value={formatDate(startDate)}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="form-label">
            <p>Data końcowa</p>
            <input
              type="datetime-local"
              value={formatDate(endDate)}
              onChange={handleEndDateChange}
            />
          </div>
          <Button type="submit">Zapisz</Button>
        </form>
      </div>
    </div>
  );
}

function ParkingPanelButtons({ selectedFunction, handleFunctionClick }) {
  return (
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
  );
}

function ParkingPanelList({ selectedFunction, parkingSpots, handleEditClick }) {
  return (
    <div
      className={`items-list ${selectedFunction === "list" ? "active" : ""}`}
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {parkingSpots.map((spot) => (
            <tr
              key={spot.id}
              onClick={() => handleEditClick(spot, "parking_spot")}
            >
              <td>{spot.id}</td>
              <td>{spot.name}</td>
              <td>{spot.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ParkingPanelManage({
  selectedFunction,
  parkingSpotsReservations,
  handleEditClick,
  getUserNameById,
}) {
  return (
    <div
      className={`items-list ${selectedFunction === "manage" ? "active" : ""}`}
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rodzaj</th>
            <th>Użytkownik</th>
            <th>Początek</th>
            <th>Koniec</th>
          </tr>
        </thead>
        <tbody>
          {parkingSpotsReservations.map((spot) => (
            <tr
              key={spot.id}
              onClick={() => handleEditClick(spot, "parking_spot_reservation")}
            >
              <td>{spot.id}</td>
              <td>{spot.constant ? "Stała" : "Tymczasowa"}</td>
              <td>{getUserNameById(spot.user)}</td>
              <td>{formatDate(spot.start_date)}</td>
              <td>{formatDate(spot.end_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  getUserNameById,
}) {
  return (
    <div
      className={`main-panel ${selectedButton === "parking" ? "active" : ""}`}
    >
      <ParkingPanelButtons
        selectedFunction={selectedFunction}
        handleFunctionClick={handleFunctionClick}
      />
      <div className="main-panel-function">
        <ParkingPanelList
          parkingSpots={parkingSpots}
          selectedFunction={selectedFunction}
          handleEditClick={handleEditClick}
        />
        <ParkingPanelManage
          selectedFunction={selectedFunction}
          parkingSpotsReservations={parkingSpotsReservations}
          handleEditClick={handleEditClick}
          getUserNameById={getUserNameById}
        />
      </div>
    </div>
  );
}

export default HomePage;
