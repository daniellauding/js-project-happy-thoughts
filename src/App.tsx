import Thoughts from "./components/Thoughts";

export const App = () => {
  return (
    <div className=" p-8 lg:p-8 min-h-screen bg-white dark:bg-black transition-colors">
      <div className="max-w-md mx-auto md:max-w-none md:grid grid-flow-row">
        <h1 className="text-gray-900 dark:text-white mb-4 lg:text-center">Happy Thoughts</h1>
        <Thoughts />
      </div>
    </div>
  )
}
