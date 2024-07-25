import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignerSelection from "./SignerSelection";
import SignerActionsEddsa from "./SignerActionsEddsa";
import SignerActionsEcdsa from "./SignerActionsEcdsa";

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
