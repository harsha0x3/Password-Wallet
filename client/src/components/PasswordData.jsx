import { useEffect } from "react";
import { useState } from "react";
import usePassword from "../../hooks/usePasswords";

function PasswordData({
  account,
  length,
  includeUpperCase,
  includeLowerCase = true,
  includeNums,
  includeSpecialChars,
  save = false,
  password,
}) {
  const [passwords, setPasswords] = useState([]);
  const { allPasswords } = usePassword();

  useEffect(() => {
    setPasswords(allPasswords);
  }, []);

  // const getPasswords = async () => {
  //   const items = await fetch("http://localhost:3000/api/v1/passwords", {
  //     method: "GET",
  //   });
  //   const result = await items.json();
  //   setAllPasswords(result.passwords);
  //   console.log(allPasswords);
  // };

  // const postPasswords = async () => {
  //   await fetch("http://localhost:3000/api/v1/passwords", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       account,
  //       length,
  //       includeUpperCase,
  //       includeLowerCase,
  //       includeNums,
  //       includeSpecialChars,
  //       save,
  //       password,
  //     }),
  //   });
  //   getPasswords();
  // };
  const getChar_class = (char) => {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nums = "0123456789";
    let chars = "!@#$%^&*()_+=";
    if (upper.includes(char)) return "text-yellow-500";
    if (nums.includes(char)) return "text-blue-500";
    if (chars.includes(char)) return "text-red-500";
    return "text-white";
  };

  return (
    <div>
      {/* <section className="single-password">
        <div>{allPasswords[allPasswords.length - 1].password}</div>
        <div>{allPasswords[allPasswords.length - 1].password}</div>
      </section> */}

      {allPasswords &&
        allPasswords.map((item) => (
          <div key={item._id} className="grid grid-cols-2 gap-0.5">
            <div key={`account-${item._id}`} className="text-gray-50">
              {item.Account}
            </div>
            <div
              key={`password-${item._id}`}
              className="outline-none w-full py-1 px-3"
            >
              {item.password.split("").map((char, index) => (
                <span key={index} className={getChar_class(char)}>
                  {char}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default PasswordData;
