import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/")
      .then((response) => {
        setPageTitle(response.data.page_title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div class="main-container">
      <div className="main-title">{pageTitle}</div>
    </div>
  );
}

export default HomePage;
