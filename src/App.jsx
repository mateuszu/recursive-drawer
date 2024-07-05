import React, { useState } from "react";
import "./App.css";
import DrawerComponent from "./components/DrawerComponent";
import { LevelProvider, useLevel } from "./components/LevelContext";
import MainContent from "./components/MainContent";

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <LevelProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <DrawerComponent setIsDrawerOpen={setIsDrawerOpen} />
        <MainContent />
      </div>
    </LevelProvider>
  );
}
