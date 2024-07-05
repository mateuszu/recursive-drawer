import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getTreeData } from "../utils/api.js";
import { RecursiveMenuItem } from "./RecursiveMenuItem.jsx";
import { useLevel } from "./LevelContext.jsx";

const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const { level, setLevel, isDrawerOpen, setIsDrawerOpen } = useLevel();
  const drawerWidth = 360;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await getTreeData();
        if (isMounted) setTreeData(data);
      } catch (error) {
        console.error("Failed to fetch tree data:", error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIsDrawerOpen(isOpen);
  }, [isOpen, setIsDrawerOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setLevel(0);
    }
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={{
          width: isDrawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <IconButton onClick={toggleDrawer} style={{ alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton>
        <List>
          {treeData.map((node, index) => (
            <RecursiveMenuItem
              key={index}
              node={node}
              setLevel={setLevel}
              currentLevel={level}
            />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
