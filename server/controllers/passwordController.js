const Password = require("../models/paswords");

const generatePassword = (
  length,
  includeUpperCase,
  includeLowerCase = true,
  includeNums,
  includeSpecialChars
) => {
  const lowers = "abcdefghijklmopqrstuvwxyz";
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "1234567890";
  const specialChars = "~`!@#$%^&*()_-+=][{};:'\"/?.>,<|\\";
  let password = "";
  let passwordString = "";
  if (includeLowerCase) {
    passwordString += lowers;
  }

  if (includeUpperCase) {
    passwordString += uppers;
  }
  if (includeNums) {
    passwordString += nums;
  }
  if (includeSpecialChars) {
    passwordString += specialChars;
  }
  const len = passwordString.length;

  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * len);
    password += passwordString.charAt(index);
  }
  return password;
};

const getAllPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({});
    res.status(200).json({ passwords: passwords, nbHits: passwords.length });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createPassword = async (req, res) => {
  const {
    account,
    length,
    includeUpperCase,
    includeLowerCase = true,
    includeNums,
    includeSpecialChars,
    save,
    password,
  } = req.body;
  try {
    let generatedPassword;
    let passwordToSet;
    if (!password) {
      passwordToSet = generatePassword(
        length,
        includeUpperCase,
        includeLowerCase,
        includeNums,
        includeSpecialChars
      );
    } else {
      passwordToSet = password;
    }

    if (save) {
      generatedPassword = await Password.create({
        account: account,
        password: passwordToSet,
      });
    } else {
      generatedPassword = { account: account, password: passwordToSet };
    }

    res.status(200).json({ generatedPassword });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

const update = async (req, res) => {
  try {
    const { id: passwordID } = req.params;
    const data = await Password.findOneAndUpdate(
      { _id: passwordID },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ update: data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const deleted = async (req, res) => {
  try {
    await Password.deleteMany();
    res.send("deleted");
  } catch (error) {}
};
module.exports = { getAllPasswords, createPassword, deleted, update };
