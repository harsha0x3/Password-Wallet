import { useState } from "react";
import PasswordItem from "./PasswordItem";

function PasswordForm({ postPassword, updateLogic }) {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [caseAllowed, setCaseAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);
  const [account, setAccount] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState(null); // ← here

  const postWrapper = async () => {
    const result = await postPassword({
      account,
      length,
      includeUpperCase: caseAllowed,
      includeLowerCase: true,
      includeNums: numAllowed,
      includeSpecialChars: charAllowed,
      save: save,
      password,
    });
    setGeneratedPassword(result);
    console.log("fre");

    console.log(result);
  };

  /**************************************************************/
  return (
    <section className=" flex flex-col gap-2">
      <div className=" w-full max-w-md shadow-lg shadow-gray-500 border border-white bg-[#41413c]/35 mb-3 rounded-lg p-8">
        <div className="flex flex-col shadow rounded-lg  mb-4 gap-1.5">
          <label htmlFor="userPassword" className="text-white">
            {" "}
            Password
          </label>

          <input
            id="userPassword"
            type="text"
            value={password}
            placeholder="Enter Custom Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="rounded-md border-white bg-gray-100/25"
          />
          <label htmlFor="accountName" className="text-white ">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            value={account}
            placeholder="Enter Account"
            onChange={(e) => {
              setAccount(e.target.value);
            }}
            className="rounded-md border-white bg-gray-100/25"
          />
        </div>
        <div className="flex flex-col text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={33}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="number">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setCaseAllowed((prev) => !prev);
              }}
              name=""
              id="mixedcase"
            />
            <label htmlFor="mixedcase">Mixed Case</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              name=""
              id="character"
            />
            <label htmlFor="character">Characters</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setSave((prev) => !prev);
              }}
              name=""
              id="save"
            />
            <label htmlFor="save">Save</label>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="bg-[#41413c]/35 rounded-lg px-5 py-2 border border-white hover:shadow-md shadow-gray-700"
            onClick={postWrapper}
          >
            Click
          </button>
        </div>
      </div>
      <div key={generatedPassword._id + Date.now()} className="">
        {generatedPassword && (
          <div className="">
            <PasswordItem
              password={generatedPassword}
              updateLogic={updateLogic}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default PasswordForm;
