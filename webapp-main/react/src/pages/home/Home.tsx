import { Box } from "@mui/material";
import ProjectRepository from "../../repository/backend/ProjectRepository";

const Home = () => {
  const lol = new ProjectRepository();
  lol.getAll().then((e) => console.log(e));
  lol.create({ name: "test", description: "test" }).then((e) => console.log(e));
  return <Box>Welcome to home page</Box>;
};

export default Home;
