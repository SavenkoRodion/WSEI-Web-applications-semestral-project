import {
  Box,
  Button,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
    <Box
      sx={{
        padding: "15px",
        width: "500px",
        margin: "0 auto",
        gap: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack>
        <TextField
          type={"outlined"}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          label="Login"
          size="small"
        />
      </Stack>
      <Stack>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          label="Password"
          size="small"
        />
      </Stack>
      <Stack>
        <Button
          onClick={async () => {
            const response = await userRepository.authorize(login, password);
            if (!response) setError("Failed to login");
            else navigate("/");
          }}
          variant="contained"
        >
          Send
        </Button>
      </Stack>
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
