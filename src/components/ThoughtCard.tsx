import { ThoughtCardProps } from "../types/Thought";
import { timeAgo } from "../utils/timeAgo";

const ThoughtCard = ({ thought, onLike, isNew, isLiked }: ThoughtCardProps) => {
  
  return (
  	<li className={`thought-card flex flex-col gap-2 border border-black dark:border-white p-4 shadow-pop bg-white dark:bg-black transition-colors ${isNew ? 'new-thought-animation' : ''}`}>
      <p className="text-base text-gray-900 dark:text-white break-all">{thought.message}</p>
			<div className="flex items-center gap-2 color-red-500">
				<button
					className={`flex items-center justify-center w-10 h-10 p-2 rounded-full transition duration-150 ease-in-out focus:outline-none focus-ring focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
						isLiked 
							? 'bg-red-300 dark:bg-red-300 hover:bg-red-300 dark:hover:bg-red-500 text-gray-900 dark:text-black cursor-default' 
							: 'bg-gray-200 dark:bg-white hover:bg-gray-300 dark:hover:bg-gray-200'
					}`}
					onClick={() => onLike(thought._id)}
					aria-label={`Like this thought. Currently has ${thought.hearts ?? 0} likes`}
					aria-describedby={`heart-count-${thought._id}`}
					disabled={isLiked}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							onLike(thought._id);
						}
					}}
				>
					<span aria-hidden="true">❤️</span>
					<span className="sr-only">Like</span>
				</button>

				<p
					className="text-sm text-gray-400 dark:text-gray-300 font-number"
				>
					× {thought.hearts ?? 0}
				</p>
				<p
					className="ml-auto text-sm text-gray-400 dark:text-gray-300"
				>
					{timeAgo(thought.createdAt)}
				</p>
			</div>
    </li>
  );
}

export default ThoughtCard;