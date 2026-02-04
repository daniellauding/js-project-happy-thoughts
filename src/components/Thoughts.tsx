import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Thought, ThoughtsApiResponse } from "../types/Thought";
import ThoughtForm from "./ThoughtForm";
import ThoughtList from "./ThoughtList";
import AuthModal from "./AuthModal";
import CategoryFilter from "./CategoryFilter";
import EditModal from "./EditModal";

const Thoughts = () => {
  const { user } = useAuth();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");
  const [newThoughtId, setNewThoughtId] = useState<string | null>(null);
  const [likedThoughts, setLikedThoughts] = useState<Set<string>>(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingThought, setEditingThought] = useState<Thought | null>(null);

  const API_URL = `https://js-project-api-4eaw.onrender.com/thoughts`;

  useEffect(() => {
    const start = Date.now();
    setLoading(true);

    const minDuration = 1200;

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
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json: ThoughtsApiResponse) => {
        if (json.results) {
          setThoughts(json.results);
        } else if (Array.isArray(json)) {
          setThoughts(json as unknown as Thought[]);
        }
        finishLoading();
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // Error logged silently
          setError("Could not load thoughts. Please try again.");
        }
        finishLoading();
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "." : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmitThought = (newText: string, category: string) => {
    // Check if user is logged in
    if (!user) {
      setError("You must be logged in to post a thought");
      setShowAuthModal(true);
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.accessToken,
      },
      body: JSON.stringify({ message: newText, category }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || data.message || "Something went wrong"
          );
        }

        return data;
      })
      .then((createdThought) => {
        setError(null);
        setNewThoughtId(createdThought._id);
        setThoughts((prev) => [createdThought, ...prev]);

        setTimeout(() => {
          setNewThoughtId(null);
        }, 600);
      })
      .catch((err) => {
        // Error handled in UI
        const friendly = err.message.includes("minimum allowed length")
          ? "Message must be at least 5 characters long."
          : err.message.includes("maximum allowed length")
          ? "Message cannot be longer than 140 characters."
          : err.message.includes("Access denied")
          ? "You must be logged in to post a thought."
          : err.message;

        setError(friendly);
      });
  };

  const handleLike = (id: string) => {
    if (likedThoughts.has(id)) {
      return;
    }

    setLikedThoughts((prev) => new Set(prev).add(id));

    setThoughts((prev) =>
      prev.map((thought) =>
        thought._id === id
          ? { ...thought, hearts: (thought.hearts ?? 0) + 1 }
          : thought
      )
    );
    fetch(`${API_URL}/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedThought) => {
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === id ? updatedThought : thought
          )
        );
      })
      .catch((err) => {
        // Revert optimistic update

        setLikedThoughts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      });
  };

  const handleDelete = (id: string) => {
    // Check if user is logged in
    if (!user) {
      setError("You must be logged in to delete a thought");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this thought?")) {
      return;
    }

    setThoughts((prev) => prev.filter((thought) => thought._id !== id));

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: user.accessToken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not delete thought");
        }
      })
      .catch((err) => {
        // Error handled in UI
        setError("Could not delete thought. You can only delete your own thoughts.");
        fetch(API_URL)
          .then((res) => res.json())
          .then((json: ThoughtsApiResponse) => setThoughts(json.results));
      });
  };

  const handleEdit = (thought: Thought) => {
    setEditingThought(thought);
  };

  const handleSaveEdit = (id: string, message: string, category: string) => {
    if (!user) {
      setError("You must be logged in to edit a thought");
      return;
    }

    // Optimistic update
    setThoughts((prev) =>
      prev.map((thought) =>
        thought._id === id ? { ...thought, message, category } : thought
      )
    );

    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.accessToken,
      },
      body: JSON.stringify({ message, category }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || data.message || "Could not update thought");
        }
        return data;
      })
      .then((updatedThought) => {
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === id ? updatedThought : thought
          )
        );
        setError(null);
      })
      .catch((err) => {
        // Error handled in UI
        setError(err.message || "Could not update thought. You can only edit your own thoughts.");
        // Revert on error - refetch
        fetch(API_URL)
          .then((res) => res.json())
          .then((json: ThoughtsApiResponse) => setThoughts(json.results));
      });
  };

  // Filter thoughts by category (client-side for simplicity)
  const filteredThoughts = selectedCategory
    ? thoughts.filter((t) => t.category?.toLowerCase() === selectedCategory.toLowerCase())
    : thoughts;

  return (
    <div className="flex flex-col gap-8">
      <ThoughtForm
        onSubmitThought={handleSubmitThought}
        isLoggedIn={!!user}
        onLoginRequired={() => setShowAuthModal(true)}
      />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}
      {loading && (
        <p className="text-gray-500 mx-auto text-center">
          Loading thoughts{dots}
        </p>
      )}
      {!loading && (
        <ThoughtList
          thoughts={filteredThoughts}
          onLike={handleLike}
          onDelete={handleDelete}
          onEdit={handleEdit}
          newThoughtId={newThoughtId}
          likedThoughts={likedThoughts}
          currentUserId={user?.userId}
        />
      )}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <EditModal
        isOpen={!!editingThought}
        onClose={() => setEditingThought(null)}
        thought={editingThought}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Thoughts;
