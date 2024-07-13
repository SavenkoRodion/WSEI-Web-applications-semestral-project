import { Box, Button, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UserRepository from "../../repository/backend/UserRepository";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const userRepository = new UserRepository();
  const navigate = useNavigate();

  return (
    <Box>
      <OutlinedInput value={login} onChange={(e) => setLogin(e.target.value)} />
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={"password"}
      />
      <Button
        onClick={async () => {
          const response = await userRepository.authorize(login, password);
          if (!response) setError("Failed to login");
          else navigate("/");
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
