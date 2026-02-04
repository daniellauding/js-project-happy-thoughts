export interface Thought {
  _id: string;
  message: string;
  hearts?: number;
  category?: string;
  createdAt: string;
  user?: string; // User ID who created the thought
  username?: string; // Username who created the thought
}

export interface ThoughtsApiResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  results: Thought[];
}

export interface ThoughtListProps {
  thoughts: Thought[];
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (thought: Thought) => void;
  newThoughtId?: string | null;
  likedThoughts: Set<string>;
  currentUserId?: string | null;
}

export interface ThoughtFormProps {
  onSubmitThought: (text: string, category: string) => void;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

export const CATEGORIES = [
  "general",
  "learning",
  "food",
  "home",
  "weather",
  "coding",
  "mindfulness",
  "tech",
  "music",
  "projects",
] as const;

export interface ThoughtCardProps {
  thought: Thought;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (thought: Thought) => void;
  isNew?: boolean;
  isLiked?: boolean;
  canModify?: boolean; // Can edit AND delete (user owns this thought)
}
