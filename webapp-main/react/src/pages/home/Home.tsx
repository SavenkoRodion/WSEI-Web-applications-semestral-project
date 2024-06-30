import { Box } from "@mui/material";
import axios from "axios";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import ProjectRepository from "../../repository/backend/ProjectRepository";

const Home = () => {
  const lol = new ProjectRepository();
  lol.getAll().then((e) => console.log(e));
  return <Box>Welcome to home page</Box>;
};

export default Home;
