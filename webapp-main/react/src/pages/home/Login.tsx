import { Box, Button, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
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
    <Box sx={{padding: "10px"}}>
      <TextField type={"outlined"} value={login} onChange={(e) => setLogin(e.target.value)} label="Login" />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={"password"}
        label="Password"
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
