import { Express } from "express";
import jwt from "jsonwebtoken";

const getAuthEndpoints = (app: Express) => {
  //const tokenSecret = process.env.TOKEN_SECRET as string;
  const tokenSecret = "lolek" as string;
  let refreshToken: string;

  app.post("/token", function (req, res) {
    console.log("here");
    const expTime = req.body.exp || 10;
    const token = generateToken(+expTime);
    refreshToken = generateToken(60 * 60);
    res.status(200).send({ token, refreshToken });
  });

  app.post("/refreshToken", function (req, res) {
    const refreshTokenFromPost = req.body.refreshToken;
    if (refreshToken !== refreshTokenFromPost) {
      console.log(refreshToken);
      console.log(refreshTokenFromPost);
      console.log(refreshToken !== refreshTokenFromPost);
      res.status(400).send("Bad refresh token!");
      return;
    }
    const expTime = req.headers.exp || 10;
    const token = generateToken(+expTime);
    refreshToken = generateToken(60 * 60 * 10);
    res.status(200).send({ token, refreshToken });
  });

  app.get("/status", verifyToken, (req, res) => {
    res.status(200).send();
  });

  function generateToken(expirationInSeconds: number) {
    const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
    const token = jwt.sign({ exp, foo: "bar" }, tokenSecret, {
      algorithm: "HS256",
    });
    return token;
  }

  function verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    console.log(authHeader);
    if (!token) return res.sendStatus(403);

    jwt.verify(token, tokenSecret, (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.status(401).send(err.message);
      }
      req.user = user;
      next();
    });
  }
};

export default getAuthEndpoints;
