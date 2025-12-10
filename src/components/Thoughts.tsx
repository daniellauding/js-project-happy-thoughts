import React, { useEffect, useState } from "react";

import { Thought } from "../types/Thought";
import ThoughtForm from "./ThoughtForm";
import ThoughtList from "./ThoughtList";

const Thoughts = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");

  const API_URL = `https://happy-thoughts-api-4ful.onrender.com/thoughts`;

  useEffect(() => {

    const start = Date.now();
      setLoading(true);

      const minDuration = 1200; // <— only define ONCE here

      const finishLoading = () => {
        const elapsed = Date.now() - start;
        const remaining = minDuration - elapsed;

        if (remaining > 0) {
          setTimeout(() => setLoading(false), remaining);
        } else {
          setLoading(false);
        }
      };


    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setThoughts(json);
        finishLoading();
      })
      .catch((err) => {
        console.error(err);
        finishLoading();
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots(prev => (prev === "..." ? "." : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmitThought = (newText: string) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: newText })
    })
      .then(async res => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.errors?.message?.message || "Something went wrong");
        }

        return data;
      })
      .then(createdThought => {
        setError(null);
        setThoughts(prev => [createdThought, ...prev]);
      })
      .catch(err => {
        console.error("POST error:", err);
        const friendly = err.message.includes("minimum allowed length")
          ? "Message must be at least 5 characters long."
          : err.message.includes("maximum allowed length")
          ? "Message cannot be longer than 140 characters."
          : err.message;

        setError(friendly);
      });
  };

  const handleLike = (id: string) => {
    setThoughts(prev =>
      prev.map(thought =>
        thought._id === id
          ? { ...thought, hearts: (thought.hearts ?? 0) + 1 }
          : thought
      )
    );
    fetch(`${API_URL}/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(updatedThought => {
          setThoughts(prev =>
            prev.map(thought =>
              thought._id === id ? updatedThought : thought
            )
          );
        })
        .catch(err => console.error("LIKE error:", err));
  }

  return (
    <div
			className="thoughts flex flex-col gap-8">
			<ThoughtForm onSubmitThought={handleSubmitThought} />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {loading && (
        <p className="text-gray-500 mx-auto text-center">
          Loading thoughts{dots}
        </p>
      )}
			{!loading && <ThoughtList thoughts={thoughts} onLike={handleLike} />}
    </div>
  )
}

export default Thoughts