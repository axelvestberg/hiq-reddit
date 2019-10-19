import React from "react";
import "./App.css";
import Posts from "./Posts";

const App = () => {
  return (
    <div className="app-bg">
      <div className="ui container">
        <Posts />
      </div>
    </div>
  );
}

export default App;