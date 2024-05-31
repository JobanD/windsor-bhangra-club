"use client";

import React, { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const NewsDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxChars, setMaxChars] = useState(500);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const updateMaxChars = () => {
      if (window.innerWidth < 640) {
        setMaxChars(300);
      } else {
        setMaxChars(500);
      }
    };

    updateMaxChars();
    window.addEventListener("resize", updateMaxChars);

    return () => window.removeEventListener("resize", updateMaxChars);
  }, []);

  const descriptionText = documentToReactComponents(description);

  // Helper function to extract text content from rich text
  const extractTextContent = (node) => {
    if (typeof node === "string") {
      return node;
    } else if (Array.isArray(node)) {
      return node.map(extractTextContent).join("");
    } else if (
      node &&
      typeof node === "object" &&
      node.props &&
      node.props.children
    ) {
      return extractTextContent(node.props.children);
    }
    return "";
  };

  const textContent = extractTextContent(descriptionText);

  return (
    <div className="text-lg sm:text-xs lg:text-xl m-0 p-0 w-full text-left">
      <div className="text-left">
        {isExpanded ? descriptionText : `${textContent.slice(0, maxChars)}...`}
      </div>
      {textContent.length > maxChars && (
        <button
          onClick={toggleReadMore}
          className="text-primary hover:text-primary-dark font-bold mt-2"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default NewsDescription;
