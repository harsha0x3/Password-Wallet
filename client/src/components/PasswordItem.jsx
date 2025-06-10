import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

function PasswordItem({ password, updateLogic }) {
  const [edit, setEdit] = useState(false);
  const [localPassword, setLocalPassword] = useState(password.password);
  const [account, setAccount] = useState(password.account);
  const [editAccount, setEditAccount] = useState(account);
  const [editLocalPassword, setEditLocalPassword] = useState(localPassword);
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const getChar_class = (char) => {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nums = "0123456789";
    let chars = "!@#$%^&*()_+={}[]<>,.?/:\"|\\;'~";
    if (upper.includes(char)) return "text-yellow-500";
    if (nums.includes(char)) return "text-blue-500";
    if (chars.includes(char)) return "text-red-500";
    return "text-white";
  };

  const handleAccountChange = (e) => {
    setEditAccount(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setEditLocalPassword(e.target.value);
  };

  const handleEdit = () => {
    if (edit) {
      setAccount(editAccount);
      setLocalPassword(editLocalPassword);
      updateLogic(password._id, {
        account: editAccount,
        password: editLocalPassword,
      });
    }
    setEdit((prev) => !prev);
    console.log(`edit ${edit}`);
  };

  const copyPasswordToClipboard = async () => {
    try {
      window.navigator.clipboard.writeText(localPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
      alert("Failed to copy" + error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-0.5 border border-white bg-[#41413c]/35 mb-3 rounded-lg p-4">
        <label htmlFor="account">Account</label>
        <div
          className="text-gray-50 border-white bg-gray-200/25 rounded-lg px-4 pb-2"
          id="account"
        >
          {account}
        </div>
        <label htmlFor="pass">Password</label>
        {show ? (
          <div
            id="pass"
            className=" w-full py-1 px-3  border-white bg-gray-200/25 rounded-lg p-4"
          >
            {localPassword.split("").map((char, index) => (
              <span key={index} className={getChar_class(char)}>
                {char}
              </span>
            ))}
          </div>
        ) : (
          <div
            id="pass"
            className=" w-full py-1 px-3  border-white bg-gray-200/25 rounded-lg p-4"
          >
            {Array.from({ length: localPassword.length }).map((_, index) => (
              <span className="text-black" key={index}>
                *
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-3 mt-2">
          <button onClick={() => setShow((prev) => !prev)}>
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </button>
          <button className="hover:cursor-pointer" onClick={handleEdit}>
            <FontAwesomeIcon icon={edit ? faFloppyDisk : faPenToSquare} />
          </button>
          <button onClick={copyPasswordToClipboard}>
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </button>
          {copied && <p>Copied..</p>}
        </div>
      </div>

      {edit && (
        <div className="flex flex-col gap-0.5 border border-white bg-[#41413c]/35 mb-3 rounded-lg p-4">
          <label htmlFor="account">Account</label>

          <input
            className="text-gray-50 border-white bg-gray-200/25 mb-3 rounded-lg p-2"
            value={editAccount}
            id="account"
            onChange={handleAccountChange}
          />

          <label htmlFor="password">Password</label>

          <input
            className="text-gray-50 border-white bg-gray-200/25 mb-3 rounded-lg p-2"
            value={editLocalPassword}
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
      )}
    </>
  );
}

export default PasswordItem;
