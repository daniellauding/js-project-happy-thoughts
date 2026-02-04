export interface User {
  userId: string;
  username: string;
  accessToken: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}
