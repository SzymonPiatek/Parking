import React, { useState } from "react";
import Button from "./widgets";
import { formatDate } from "./functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export function DeskPanel({
  selectedFunction,
  handleFunctionClick,
  selectedButton,
}) {
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
