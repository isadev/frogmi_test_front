import React from "react";
import "./App.css";
import Earthquakes from "./components/earthquake-list/Earthquakes";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <Earthquakes />
    </Container>
  );
}

export default App;
