import { useState } from "react";
import usePassword from "../hooks/usePasswords";
import "./App.css";
import PasswordForm from "./components/PasswordForm";
import PasswordItem from "./components/PasswordItem";

function App() {
  const { allPasswords, postPassword, updatePassword } = usePassword();
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-6 mb-4">
        Password Manager
      </h1>

      {/* Mobile Tabs */}
      <div className="md:hidden flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "form" ? "bg-white text-black" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("form")}
        >
          Form
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "list" ? "bg-white text-black" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Saved Passwords
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-6xl px-4 gap-4">
        {/* Left - Form */}
        <div className="flex-grow flex justify-center items-start">
          <PasswordForm
            postPassword={postPassword}
            updateLogic={updatePassword}
          />
        </div>

        {/* Right - Fixed width list */}
        <div className="w-[400px] border border-white rounded p-4 overflow-y-auto max-h-[80vh]">
          {allPasswords.map((item) => (
            <PasswordItem
              key={item._id}
              password={item}
              updateLogic={updatePassword}
            />
          ))}
        </div>
      </div>

      {/* Mobile Tabs Content */}
      <div className="md:hidden w-full px-4">
        {activeTab === "form" && (
          <div className="flex justify-center">
            <PasswordForm
              postPassword={postPassword}
              updateLogic={updatePassword}
            />
          </div>
        )}

        {activeTab === "list" && (
          <div className="mt-4 border border-white rounded p-4 overflow-y-auto max-h-[70vh]">
            {allPasswords.map((item) => (
              <PasswordItem
                key={item._id}
                password={item}
                updateLogic={updatePassword}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
