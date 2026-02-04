import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Thoughts from "./components/Thoughts";

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="p-8 lg:p-8 min-h-screen bg-white dark:bg-black transition-colors">
          <div className="max-w-md mx-auto md:max-w-none md:grid grid-flow-row">
            <Header />
            <Thoughts />
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};
