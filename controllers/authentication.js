import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const secret = process.env.SECERT_JWT_TOKEN;

function createTokenForUser(user) {
  //   console.log("token: ", user);
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = sign(payload, secret, {
    expiresIn: "6h",
  });
  return token;
}

function validateToken(token) {
  const payload = verify(token, secret);
  return payload;
}

module.exports ={createTokenForUser, validateToken} ;