import { Box, Button, OutlinedInput } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import UserRepository from "../../repository/localstorage/UserRepository";

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userRepository = new UserRepository();
  console.log(userRepository.getToken());
  console.log(userRepository.getRefreshToken());
  return (
    <Box>
      <OutlinedInput value={login} onChange={(e) => setLogin(e.target.value)} />
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={async () => {
          const response = await axios({
            method: "post",
            url: "http://localhost:3000/token",
            data: { login: login, password: password },
          });
          if (response.status === 200) {
            userRepository.saveTokens(
              response.data.token,
              response.data.refreshToken
            );
          }

          // await axios({
          //   method: "post",
          //   url: "http://localhost:3000/refreshToken",
          //   data: { refreshToken: lol.data.refreshToken },
          // });

          // await axios({
          //   method: "get",
          //   url: "http://localhost:3000/protected/1/1",
          //   headers: { Authorization: `bearer ${lol.data.token}` },
          // });
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default Login;
