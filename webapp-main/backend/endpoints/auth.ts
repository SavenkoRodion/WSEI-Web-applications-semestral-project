import { Express } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../repostories/UserRepository";
import { MongoClient } from "mongodb";
import User from "@savenkorodion/webapp-model/entities/User";

class AuthEndpoints {
  mapAuthEndpoints = (app: Express, client: MongoClient) => {
    const tokenSecret = "lolek" as string;
    let refreshToken: string;
    let user: User | null;

    app.post("/token", async function (req, res) {
      const repository = new UserRepository(client);
      user = await repository.getByCredentials(
        req.body.login,
        req.body.password
      )!;
      if (user) {
        const expTime = req.body.exp || 60;
        const token = generateTokenAuth(+expTime, user);
        refreshToken = generateToken(60 * 60);
        res.status(200).send({ token, refreshToken });
      } else {
        user = null;
        res.status(400).send();
      }
    });

    app.post("/refreshToken", async function (req, res) {
      const refreshTokenFromPost = req.body.refreshToken;
      if (refreshToken !== refreshTokenFromPost) {
        res.status(400).send("Bad refresh token!");
        return;
      }
      const expTime = 60;
      const token = generateTokenAuth(+expTime, user!);
      refreshToken = generateToken(60 * 60);
      res.status(200).send({ token, refreshToken });
    });

    app.get("/status", this.verifyToken, (req, res) => {
      res.status(200).send();
    });

    function generateTokenAuth(expirationInSeconds: number, user: User) {
      const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
      const token = jwt.sign({ exp, user }, tokenSecret, {
        algorithm: "HS256",
      });
      return token;
    }

    function generateToken(expirationInSeconds: number) {
      const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
      const token = jwt.sign({ exp, foo: "bar" }, tokenSecret, {
        algorithm: "HS256",
      });
      return token;
    }
  };

  verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, "lolek", (err: any, user: any) => {
      if (err) {
        return res.status(401).send(err.message);
      }
      req.user = user;
      next();
    });
  }
}

export default AuthEndpoints;
