import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import BarChartComponentA from "./components/BarChartComponentA";
import BarChartComponentB from "./components/BarChartComponentB";

const App = () => (
  <Router>
    <div>
      <nav style={navStyle}>
        <Link to="/task1a">Task 1 (a) - Bar Chart</Link>
        <Link to="/task1b">Task 1 (b) - Sales Comparison</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/task1a" replace />} />
        <Route path="/task1a" element={<BarChartComponentA />} />
        <Route path="/task1b" element={<BarChartComponentB />} />
      </Routes>
    </div>
  </Router>
);

const navStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  margin: "20px 0",
};

export default App;