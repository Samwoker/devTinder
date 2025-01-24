const adminAuth = (req, res, next) => {
  console.log("Checking admin authorization");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized user");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
    console.log("Checking user authorization");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
      res.status(401).send("unauthorized user");
    } else {
      next();
    }
  };
module.exports = {
  adminAuth,
  userAuth,
};
