import React, { useEffect, useState } from "react";

import { Thought } from "../types/Thought";
import ThoughtForm from "./ThoughtForm";
import ThoughtList from "./ThoughtList";

const InitialThoughts: Thought[] = [
  {
    id: "1",
    text: "I'm happy because I just moved into a new apartment!",
    hearts: 0,
  },
  {
    id: "2",
    text: "Coffee is great",
  }
]

const Thoughts = () => {
  const [thoughts, setThoughts] = useState<Thought[]>(InitialThoughts);

  useEffect(() => {
    fetch('https://happy-thoughts-api-4ful.onrender.com/thoughts')
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => {
        console.log(json);
        setThoughts(json);
      })
  }, [])

  const handleSubmitThought = (newText: string) => {
    const newThought: Thought = {
      id: Date.now().toString(), // Enkel unik ID
      text: newText,
      hearts: 0
    };
    
    // Skapa en ny array baserat på den gamla, plus den nya tanken.
    setThoughts(prevThoughts => [newThought, ...prevThoughts]); 
  };

  const handleLike = (id: string) => {
    setThoughts(prevThoughts =>
      prevThoughts.map(thought => {
        if (thought.id === id) {
          // Använd spread operator för att skapa en ny objekt med detta id men med hearts + 1
          // Om hearts är undefined, börja från 0, annars lägg till 1
          return { ...thought, hearts: (thought.hearts ?? 0) + 1 };
        }
        return thought;
      })
    );
  }

  return (
    <div
			className="thoughts flex flex-col gap-8">
      {/* Skickar onSubmitThought ner till ThoughtForm */}
			<ThoughtForm onSubmitThought={handleSubmitThought} />
      {/* Skickar hela listan och onLike-handlern ner till ThoughtList */}
			<ThoughtList thoughts={thoughts} onLike={handleLike} />
    </div>
  )
}

export default Thoughts