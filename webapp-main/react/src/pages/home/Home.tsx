import { Box } from "@mui/material";
import axios from "axios";

const Home = () => {
  axios({
    method: "get",
    url: "http://localhost:3000/project/all",
    responseType: "json",
  }).then((e) => console.log(e));
  axios({
    method: "post",
    url: "http://localhost:3000/project/",
    data: { test: "lol" },
  });
  return <Box>Welcome to home page</Box>;
};

export default Home;
