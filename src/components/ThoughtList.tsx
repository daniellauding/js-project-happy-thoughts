import React from "react";
import { ThoughtListProps } from "../types/Thought";
import ThoughtCard from "./ThoughtCard";

const ThoughtList: React.FC<ThoughtListProps> = ({
  thoughts,
  onLike,
  onDelete,
  onEdit,
  newThoughtId,
  likedThoughts,
  currentUserId,
}) => {
  // Empty state
  if (thoughts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No thoughts in this category yet.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Be the first to share a happy thought!
        </p>
      </div>
    );
  }

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
            onDelete={onDelete}
            onEdit={onEdit}
            isNew={thought._id === newThoughtId}
            isLiked={likedThoughts.has(thought._id)}
            canModify={currentUserId === thought.user}
          />
        ))}
      </ul>
    </>
  );
};

export default ThoughtList;
