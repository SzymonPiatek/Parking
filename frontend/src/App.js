import logo from "./logo.svg";
import "./App.css";
import HomePage from "./home_page";

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="logo">Example</div>
      <div className="sidebar-side">
        <div className="sidebar-side-level">
          <Button>Wyświetl biurka</Button>
          <Button>Zarządzaj rezerwacjami biurek</Button>
        </div>
        <div className="line"></div>
        <div className="sidebar-side-level">
          <Button>Wyświetl miejsca parkingowe</Button>
          <Button>Zarządzaj rezerwacjami parkingu</Button>
        </div>
        <div className="line"></div>
        <div className="sidebar-side-level">
          <Button>Profil</Button>
          <Button className="logout">Wyloguj się</Button>
        </div>
      </div>
    </div>
  );
}

function Button({ children, className }) {
  return <button className={`button ${className}`}>{children}</button>;
}

export default App;
