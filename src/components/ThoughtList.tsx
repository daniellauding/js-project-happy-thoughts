import { useState } from 'react'
import { Thought } from "../types/thought";
import ThoughtCard from "./ThoughtCard";


const MOCK_THOUGHTS: Thought[] = [
  {
    id: "1",
    message: "I'm happy vecause we just moved into a new apartment!",
    hearts: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    message: "Coffee is great",
    hearts: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    message: "Coffee is great",
    hearts: 2,
    createdAt: new Date().toISOString()
  },
];

const ThoughtList = () => {

  const [thoughts, setThoughts] = useState<Thought[]>(MOCK_THOUGHTS);

  // const handleLike = (id: string) => {
  //   setThoughts(prev =>
  //     prev.map(thought =>
  //       thought.id === id
  //         ? { ...thought, hearts: thought.hearts +1 }
  //         : thought
  //     )
  //   )
  // }
  
  return (
    <>
      <ul className="thought-list flex flex-col gap-8">
        {thoughts.map((thought) => (
          <ThoughtCard
            key={thought.id}
            thought={thought}
            onLike={() => {}}
          />
        ))}
      </ul>
    </>
  )
}

export default ThoughtList;