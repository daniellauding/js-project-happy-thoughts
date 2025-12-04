import { Thought } from "../types/thought";
import ThoughtForm from "./ThoughtForm";
import ThoughtList from "./ThoughtList";

const Thoughts = () => {
  return (
    <div
			className="thoughts flex flex-col gap-8">
			<ThoughtForm onSubmitThought={() => {}}/>
			<ThoughtList />
    </div>
  )
}

export default Thoughts