import "./App.css";
import HomePage from "./home_page";
import Navbar from "./navbar";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
