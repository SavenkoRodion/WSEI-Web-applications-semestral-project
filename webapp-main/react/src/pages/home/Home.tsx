import { Box } from "@mui/material";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import Project from "@savenkorodion/webapp-model/entities/Project";
import ProjectRepository from "../../repository/backend/ProjectRepository";
import { useEffect, useState } from "react";

const Home = () => {
  console.log("here");
  const projectRepository: IAsyncCrudRepository<CreateProjectRequest, Project> =
    new ProjectRepository();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // projectRepository.getAll().then((p) => {
    //   console.log("here2");
    //   console.log(p[0].id);

    // });
    projectRepository
      .get("668195ccee74a0e61999bc4e")
      .then((pp) => console.log(pp));
  }, []);
  return <Box>Welcome to home page</Box>;
};

export default Home;
