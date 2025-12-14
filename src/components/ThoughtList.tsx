import React from "react";
import { ThoughtListProps } from "../types/Thought";
import ThoughtCard from "./ThoughtCard";

const ThoughtList: React.FC<ThoughtListProps> = ({ thoughts, onLike, newThoughtId, likedThoughts }) => {
  return (
    <>
      <h2 className="sr-only">Recent happy thoughts</h2>
      <ul
        className="thought-list flex flex-col gap-8 lg:grid lg:grid-cols-3" 
        aria-live="polite"
        aria-label="List of happy thoughts"
      >
        {thoughts.map((thought) => (
          <ThoughtCard
            key={thought._id}
            thought={thought}
            onLike={onLike}
            isNew={thought._id === newThoughtId}
            isLiked={likedThoughts.has(thought._id)}
          />
        ))}
      </ul>
    </>
  )
}

export default ThoughtList;