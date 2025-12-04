import Thoughts from "./components/Thoughts";

export const App = () => {
  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <h1 className="text-gray-900 dark:text-white mb-4">Happy Thoughts</h1>
      <Thoughts />
    </div>
  )
}
