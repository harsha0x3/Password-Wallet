import { useEffect } from "react";
import { useState } from "react";

function usePassword() {
  const [allPasswords, setAllPasswords] = useState([]);

  const fetchPasswords = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/passwords", {
        method: "GET",
      });
      const result = await response.json();
      setAllPasswords(result.passwords);
      console.log(allPasswords);
      //   console.log("just");
      //   console.log(allPasswords);
      //   console.log("not");
      //   console.log(result.passwords);
    } catch (error) {
      console.log({ msg: error });
    }
  };

  const postPassword = async (passwordData) => {
    const response = await fetch("http://localhost:3000/api/v1/passwords", {
      method: "POST",
      body: JSON.stringify(passwordData),
      headers: { "content-type": "application/json" },
    });
    const result = await response.json();
    console.log(`Save = ${passwordData.save}`);
    if (passwordData.save) {
      await fetchPasswords();
      console.log("res");
      console.log(result);
      return result.generatedPassword;
    } else {
      return result.generatedPassword;
    }
  };

  useEffect(() => {
    fetchPasswords();
    // console.log(allPasswords);
  }, []);

  const updatePassword = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:3000/api/v1/passwords/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { allPasswords, postPassword, updatePassword };
}

export default usePassword;
