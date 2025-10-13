"use client";
import { useState } from "react";

export default function Tag() {
  const [selectedTags, setSelectedTags] = useState(new Set());

  const toggleTag = (tag) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag); // remove if exists
    } else {
      newTags.add(tag); // add if not exists
    }
    setSelectedTags(newTags); // update state
  };

  return (
    <div className="w-full flex gap-2 h-29">
      {["React", "Node", "Next.js"].map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          style={{
            backgroundColor: selectedTags.has(tag) ? "lightgreen" : "lightgray",
          }}
        >
          {tag}
        </button>
      ))}
      <div className="">
        {[...(selectedTags as unknown as string)].join(" ")}
      </div>
    </div>
  );
}
