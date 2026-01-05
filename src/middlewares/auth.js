const adminAuth = (req, res, next) => {
  let token = "abcd";
  let isAdminAuthourized = token === "abd";

  if (!isAdminAuthourized) {
    console.log("unauthorized");
    res.status(401).send("unauthorized request");
  } else {
    console.log("authorized");
    next();
  }
};

const userAuth = (req, res, next) => {
  let token = "abcd";
  let isAdminAuthourized = token === "abd";

  if (!isAdminAuthourized) {
    console.log("unauthorized user");
    res.status(401).send("unauthorized user request");
  } else {
    console.log("authorized user");
    next();
  }
};

module.exports = { adminAuth, userAuth };
