export interface Thought {
	_id: string;
	message: string;
	hearts?: number;
	createdAt: string; // ISO timestamp
}

export interface ThoughtListProps {
	thoughts: Thought[];
	onLike: (id: string) => void;
}

export interface ThoughtFormProps {
  onSubmitThought: (text: string) => void;
}

export interface ThoughtCardProps {
	thought: Thought;
	onLike: (id: string) => void; 
}