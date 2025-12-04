export interface Thought {
	id: string;
	message: string;
	hearts: number;
	createdAt: string; // ISO timestamp
}

export interface NewThoughtPayload {
  message: string;
}

export interface ThoughtCardProps {
  thought: Thought;
  onLike: (id: string) => void;
}