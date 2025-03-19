const { validateToken } = require("../controllers/authentication").default;

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      // console.log("check for auth cookie: ",userPayload)
      req.user = userPayload;
    } catch (error) {
      console.log(error);
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};