import React from "react";

const Divider = ({text}) => {
  return (
    <span className="flex items-center">
      <span className="h-px flex-1 bg-gray-400"></span>
      <span className="shrink-0 px-6">{text}</span>
      <span className="h-px flex-1 bg-gray-400"></span>
    </span>
  );
};

export default Divider;
