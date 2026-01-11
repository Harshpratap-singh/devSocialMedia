const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not invalid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not invalid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

module.exports = {
  validateSignUpData,
};
