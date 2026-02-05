import pkg from 'jsonwebtoken';
import 'dotenv/config';

const { sign, verify } = pkg;

const secret = process.env.SECERT_JWT_TOKEN;

export function createTokenForUser(user) {
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

export function validateToken(token) {
  const payload = verify(token, secret);
  return payload;
}

// module.exports ={createTokenForUser, validateToken} ;