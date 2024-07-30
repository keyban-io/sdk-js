import type React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletDashboard from "./components/WalletDashboard";
import "./App.css";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<WalletDashboard />} />
    </Routes>
  </Router>
);

export default App;
