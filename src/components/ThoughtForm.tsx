import { useState, FormEvent } from "react";

const FORM_LABEL = "What's making you happy right now?";
const FORM_MESSAGE_PLACEHOLDER = "Type your happy thought here...";
const FORM_BUTTON_TEXT = "❤️ Send happy thought ❤️";

interface ThoughtFormProps {
  // label: string;
  // placeholder: string;
  // buttonText: string;
  onSubmitThought: (text: string) => void;
}

const ThoughtForm = ({ onSubmitThought }: ThoughtFormProps) => {

  const [message, setMessage] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);

    setMessage("");
  }
  
  return (
  <div
    className="thought-form-container p-4 border border-black bg-gray-100 shadow-pop"
  >
    <form
      onSubmit={handleSubmit}
      className="thought-form flex flex-col gap-2 align-start"
    >
      <label
        htmlFor="message"
        className="text-sm"
      >
        {FORM_LABEL}
      </label>
      <textarea
        id="message"
        placeholder={FORM_MESSAGE_PLACEHOLDER}
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value)
        }}
        required
        className="w-full p-2 text-sm border border-gray-400 bg-white focus:border-gray-900 outline-none resize-none"
      />
      <button
        type="submit"
        onClick={() => {}}
        className="py-2 px-5 rounded-full w-fit text-sm bg-red-300 hover:bg-red-400 transition duration-150 ease-in-out"
      >
        {FORM_BUTTON_TEXT}
      </button>
    </form>
  </div>
  );
}

export default ThoughtForm;