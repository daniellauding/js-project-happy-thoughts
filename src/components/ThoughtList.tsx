import React from "react";
import { Thought, ThoughtListProps } from "../types/thought";
import ThoughtCard from "./ThoughtCard";

const ThoughtList: React.FC<ThoughtListProps> = ({ thoughts, onLike }) => {
  return (
    <>
      <ul className="thought-list flex flex-col gap-8">
        {thoughts.map((thought) => (
          <ThoughtCard
            key={thought.id}
            thought={thought}
            onLike={onLike}
          />
        ))}
      </ul>
    </>
  )
}

export default ThoughtList;