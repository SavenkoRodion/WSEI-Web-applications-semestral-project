import { Box } from "@mui/material";

const Home = () => {
  fetch("http://localhost:3000/").then((e) =>
    e.json().then((e) => console.log(e))
  );
  return <Box>Welcome to home page</Box>;
};

export default Home;
