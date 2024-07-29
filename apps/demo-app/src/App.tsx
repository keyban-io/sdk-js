import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignerSelection from "./pages/SignerSelection";
import SignerActionsEddsa from "./pages/SignerActionsEddsa";
import SignerActionsEcdsa from "./pages/SignerActionsEcdsa";
import "./App.css";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignerSelection />} />
      <Route path="/actions/eddsa" element={<SignerActionsEddsa />} />
      <Route path="/actions/ecdsa" element={<SignerActionsEcdsa />} />
    </Routes>
  </Router>
);

export default App;
