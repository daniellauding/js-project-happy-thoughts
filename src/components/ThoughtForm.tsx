import React, { useState } from 'react';
import { ThoughtFormProps } from "../types/Thought";

const FORM_LABEL = "What's making you happy right now?";
const FORM_MESSAGE_PLACEHOLDER = "Type your happy thought here...";
const FORM_BUTTON_TEXT = "❤️ Send happy thought ❤️";

const ThoughtForm = ({ onSubmitThought }: ThoughtFormProps) => {

  const [text, setText] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(text.trim()) {
      onSubmitThought(text); // Skicka texten till parent component (Thoughts)
      setText(""); // Rensa textfältet
    }
  }
  
  return (
  <div
    className="thought-form-container p-4 border border-black dark:border-gray-600 bg-gray-100 dark:bg-gray-800 shadow-pop transition-colors"
  >
    <form
      onSubmit={handleSubmit}
      className="thought-form flex flex-col gap-2 align-start"
    >
      <label
        htmlFor="message"
        className="text-sm text-gray-900 dark:text-gray-100"
      >
        {FORM_LABEL}
      </label>
      <textarea
        id="message"
        placeholder={FORM_MESSAGE_PLACEHOLDER}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.target.value)
        }}
        required
        className="w-full p-2 text-sm border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-900 dark:focus:border-gray-400 outline-none resize-none transition-colors"
      />
      <button
        type="submit"
        onClick={() => {}}
        disabled={!text.trim()}
        className="py-2 px-5 rounded-full w-fit text-sm bg-red-300 dark:bg-red-600 hover:bg-red-400 dark:hover:bg-red-500 text-gray-900 dark:text-white transition duration-150 ease-in-out"
      >
        {FORM_BUTTON_TEXT}
      </button>
    </form>
  </div>
  );
}

export default ThoughtForm;