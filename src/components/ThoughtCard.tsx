import { ThoughtCardProps } from "../types/Thought";
import { timeAgo } from "../utils/timeAgo";

const ThoughtCard = ({
  thought,
  onLike,
  onDelete,
  onEdit,
  isNew,
  isLiked,
  canModify,
}: ThoughtCardProps) => {
  return (
    <li
      className={`thought-card relative flex flex-col gap-2 border border-black dark:border-white p-4 shadow-pop bg-white dark:bg-black transition-colors ${
        isNew ? "new-thought-animation" : ""
      }`}
    >
      {/* Edit and Delete buttons - only for user's own thoughts */}
      {canModify && (
        <div className="absolute top-2 right-2 flex gap-1">
          {/* Edit button */}
          <button
            onClick={() => onEdit(thought)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Edit this thought"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          {/* Delete button */}
          <button
            onClick={() => onDelete(thought._id)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete this thought"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <p className="text-base text-gray-900 dark:text-white break-all pr-16">
        {thought.message}
      </p>
      {/* Category badge and username */}
      <div className="flex items-center gap-2 flex-wrap">
        {thought.category && (
          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
            {thought.category}
          </span>
        )}
        {thought.username && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            — {thought.username}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 color-red-500">
        <button
          className={`flex items-center justify-center w-10 h-10 p-2 rounded-full transition duration-150 ease-in-out focus:outline-none focus-ring focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLiked
              ? "bg-red-300 dark:bg-red-300 hover:bg-red-300 dark:hover:bg-red-500 text-gray-900 dark:text-black cursor-default"
              : "bg-gray-200 dark:bg-white hover:bg-gray-300 dark:hover:bg-gray-200"
          }`}
          onClick={() => onLike(thought._id)}
          aria-label={`Like this thought. Currently has ${
            thought.hearts ?? 0
          } likes`}
          aria-describedby={`heart-count-${thought._id}`}
          disabled={isLiked}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onLike(thought._id);
            }
          }}
        >
          <span aria-hidden="true">❤️</span>
          <span className="sr-only">Like</span>
        </button>

        <p className="text-sm text-gray-400 dark:text-gray-300 font-number">
          × {thought.hearts ?? 0}
        </p>
        <p className="ml-auto text-sm text-gray-400 dark:text-gray-300">
          {timeAgo(thought.createdAt)}
        </p>
      </div>
    </li>
  );
};

export default ThoughtCard;
