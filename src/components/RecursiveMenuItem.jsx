import React, { useEffect, useState, useMemo, useCallback } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";
import { getNodeData } from "../utils/api.js";
import stall from "../utils/stall.js";

const dataCache = {};
const childrenCache = {};

export const RecursiveMenuItem = ({ node, level = 0, setLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState([]);

  const fetchData = useMemo(() => {
    return async () => {
      if (dataCache[node.id]) {
        setShouldShow(dataCache[node.id].shouldShow);
      } else {
        const data = await getNodeData(node.id);
        dataCache[node.id] = data;
        if (data.shouldShow && !node.name.startsWith("NO_LABEL")) {
          setShouldShow(true);
        }
      }
    };
  }, [node.id, node.name]);

  useEffect(() => {
    if (!dataCache[node.id]) {
      fetchData();
    } else {
      setShouldShow(dataCache[node.id].shouldShow);
    }
  }, [fetchData, node.id]);

  const hasChildren = useMemo(
    () => node.children && node.children.length > 0,
    [node.children]
  );

  const hasValidChildren = useMemo(
    () =>
      hasChildren &&
      node.children.some((child) => !child.name.startsWith("NO_LABEL")),
    [hasChildren, node.children]
  );

  const toggleExpand = useCallback(
    async (event) => {
      event.stopPropagation();
      if (hasValidChildren && !isExpanded) {
        if (!childrenCache[node.id]) {
          setIsLoading(true);
          await stall();
          childrenCache[node.id] = node.children.filter(
            (child) => !child.name.startsWith("NO_LABEL")
          );
          setIsLoading(false);
        }
        setChildren(childrenCache[node.id]);
        setIsExpanded(!isExpanded);
        if (hasChildren) {
          setLevel(isExpanded ? level - 1 : level + 1);
        }
      } else if (isExpanded) {
        setIsExpanded(false);
        if (hasChildren) {
          setLevel(level - 1);
        }
      }
    },
    [hasChildren, hasValidChildren, isExpanded, level, node.children, setLevel]
  );

  const getPath = useCallback((node) => {
    const encodedName = encodeURIComponent(node.name);
    switch (node.label) {
      case "cat1":
        return `/industries/${encodedName}/${encodedName}`;
      case "cat2":
        return `/categoryTwo/${node.id}/${encodedName}`;
      case "cat3":
        return `/categoryThree/${node.id}/${encodedName}`;
      case "cat4":
        return `/categoryFour/${node.id}/${encodedName}`;
      case "cat5":
        return `/categoryFive/${node.id}/${encodedName}`;
      default:
        return "/";
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <ul
      style={{
        listStyleType: "none",
        margin: 0,
        padding: 0,
        paddingLeft: `${level * 10}px`,
        paddingRight: "5px",
      }}
    >
      <li style={{ cursor: "pointer" }}>
        <div onClick={toggleExpand}>
          {node.children && node.children.length > 0 && hasValidChildren ? (
            isExpanded ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )
          ) : (
            <span style={{ width: "24px", display: "inline-block" }}></span>
          )}
          <Link
            to={getPath(node)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {node.name.toUpperCase()}
          </Link>
        </div>
        {isLoading && (
          <div style={{ paddingLeft: `${level * 10 + 20}px` }}>
            <span>...</span>
          </div>
        )}
        {!isLoading &&
          isExpanded &&
          children.map((childNode, index) => (
            <RecursiveMenuItem
              key={index}
              node={childNode}
              level={level + 1}
              setLevel={setLevel}
            />
          ))}
      </li>
    </ul>
  );
};
