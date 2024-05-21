import React, { useState } from "react";
import Button from "./widgets";
import { formatDate } from "./functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export function EditParkingSpot({ spot, handleXMarkClick, handleSaveClick }) {
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

export function EditParkingSpotReservation({
  spot,
  handleXMarkClick,
  handleSaveClick,
  getUserNameById,
  getParkingSpotNameById,
  users,
}) {
  const [selectedUser, setSelectedUser] = useState(spot.user);
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
    setSelectedUser(event.target.value);
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
      user: selectedUser,
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
            <input disabled value={getParkingSpotNameById(spot.item)} />
          </div>
          <div className="form-label">
            <p>Użytkownik</p>
            <select value={selectedUser} onChange={handleUserChange}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
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
  getParkingSpotNameById,
}) {
  return (
    <div
      className={`items-list ${selectedFunction === "manage" ? "active" : ""}`}
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Miejsce</th>
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
              <td>{getParkingSpotNameById(spot.item)}</td>
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

function ParkingPanelAdd({
  selectedFunction,
  handleSaveNewParkingReservationClick,
  users,
  parkingSpots,
}) {
  const [spot, setSpot] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isConstant, setIsConstant] = useState(false);
  const [isTemporary, setIsTemporary] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleConstantChange = (event) => {
    setIsConstant(event.target.checked);
    setIsTemporary(!event.target.checked);
  };

  const handleTemporaryChange = (event) => {
    setIsTemporary(event.target.checked);
    setIsConstant(!event.target.checked);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSpotChange = (event) => {
    setSpot(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReservation = {
      item: spot,
      user: selectedUser,
      constant: isConstant,
      start_date: startDate,
      end_date: endDate,
    };
    handleSaveNewParkingReservationClick(newReservation);
  };

  return (
    <div className={`items-list ${selectedFunction === "add" ? "active" : ""}`}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-label">
          <p>Miejsce parkingowe</p>
          <select value={spot} onChange={handleSpotChange}>
            {parkingSpots.map((spot) => (
              <option key={spot.id} value={spot.id}>
                {spot.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-label">
          <p>Użytkownik</p>
          <select value={selectedUser} onChange={handleUserChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
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
          <input type="datetime-local" onChange={handleStartDateChange} />
        </div>
        <div className="form-label">
          <p>Data końcowa</p>
          <input type="datetime-local" onChange={handleEndDateChange} />
        </div>
        <Button type="submit">Zapisz</Button>
      </form>
    </div>
  );
}

export function ParkingPanel({
  selectedFunction,
  handleFunctionClick,
  selectedButton,
  parkingSpotsReservations,
  parkingSpots,
  handleEditClick,
  getUserNameById,
  handleSaveNewParkingReservationClick,
  users,
  getParkingSpotNameById,
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
          getParkingSpotNameById={getParkingSpotNameById}
        />
        <ParkingPanelAdd
          selectedFunction={selectedFunction}
          handleSaveNewParkingReservationClick={
            handleSaveNewParkingReservationClick
          }
          users={users}
          parkingSpots={parkingSpots}
          getUserNameById={getUserNameById}
        />
      </div>
    </div>
  );
}
