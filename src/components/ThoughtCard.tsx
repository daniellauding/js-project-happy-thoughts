import { Thought } from "../types/thought";

interface ThoughtCardProps {
	thought: Thought;
	onLike: (id: string) => void;
}

const ThoughtCard = ({ thought, onLike }: ThoughtCardProps) => {
  
  return (
  	<li className="thought-card flex flex-col gap-2 border border-black dark:border-gray-600 p-4 shadow-pop bg-white dark:bg-gray-800 transition-colors">
      <p className="text-base text-gray-900 dark:text-gray-100">{thought.message}</p>
			<div className="flex items-center gap-2 color-red-500">
				<button
					className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
					onClick={() => onLike(thought.id)}
				>
					❤️
				</button>
				<p
					className="text-sm text-gray-400 dark:text-gray-500 font-number"
				>
					× {thought.hearts}
				</p>
				<p
					className="ml-auto text-sm text-gray-400 dark:text-gray-500"
				>
				30 seconds ago
				</p>
			</div>
    </li>
  );
}

export default ThoughtCard;