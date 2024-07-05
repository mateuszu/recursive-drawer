import React, { createContext, useContext, useState } from "react";

const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  const [level, setLevel] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <LevelContext.Provider
      value={{ level, setLevel, isDrawerOpen, setIsDrawerOpen }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => useContext(LevelContext);
