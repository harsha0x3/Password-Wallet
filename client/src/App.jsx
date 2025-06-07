import { useState } from "react";
import usePassword from "../hooks/usePasswords";
import "./App.css";
import PasswordForm from "./components/PasswordForm";
import PasswordItem from "./components/PasswordItem";

function App() {
  /***********************************************************/

  const { allPasswords, postPassword, updatePassword } = usePassword();

  /**************************************************************/
  return (
    <div className="flex w-screen h-screen px-4 py-5 box-border">
      {/* Left half - Password form */}
      <div className="w-1/2 flex justify-center items-center">
        <PasswordForm
          postPassword={postPassword}
          updateLogic={updatePassword}
        />
      </div>

      {/* Right half - Scrollable password list */}
      <div className="w-1/3 flex justify-center items-center mt-5 border border-white p-4">
        <div className="h-full overflow-y-auto max-h-full w-full px-4">
          {allPasswords.map((item) => (
            <PasswordItem
              key={item._id}
              password={item}
              updateLogic={updatePassword}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
