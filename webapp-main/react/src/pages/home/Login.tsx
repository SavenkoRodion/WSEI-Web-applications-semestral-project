import { Box, Button, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UserRepository from "../../repository/backend/UserRepository";

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const userRepository = new UserRepository();
  console.log(userRepository.getTokenFromStorage());
  console.log(userRepository.getRefreshTokenFromStorage());
  const lol = new UserRepository();
  return (
    <Box>
      <OutlinedInput value={login} onChange={(e) => setLogin(e.target.value)} />
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={async () => {
          const response = await lol.authorize(login, password);
          if (!response) setError("Failed to login");
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
      {!error ? (
        <Stack>
          <Typography>{error}</Typography>
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Login;
