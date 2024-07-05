import data from "../assets/data.json";

export const getTreeData = () => data;

export const getNodeData = () => ({ shouldShow: Math.random() > 0.1 });
