export interface Thought {
	id: string;
	text: string;
	hearts?: number;
	// createdAt: string; // ISO timestamp
}

// Typdefinition för props som ThoughtList tar emot
export interface ThoughtListProps {
	thoughts: Thought[]; // Array av Thought-objekt
	onLike: (id: string) => void; // En funktion som tar emot id och inte returnerar något (void)
}

// Typdefinition för props som ThoughtForm tar emot
export interface ThoughtFormProps {
  onSubmitThought: (text: string) => void;
}

// Typdefinition för props som ThoughtCard tar emot
export interface ThoughtCardProps {
	thought: Thought;
	onLike: (id: string) => void; 
}