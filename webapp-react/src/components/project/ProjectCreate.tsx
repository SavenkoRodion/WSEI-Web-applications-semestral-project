import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import ProjectRepository from "../../repository/ProjectRepository";
import { Project } from "../../model/Project";
import IRepository from "../../repository/IRepository";

const ProjectCreate = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const projectRepository: IRepository<Project> = new ProjectRepository();

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Project description"
          value={projectDescription}
          onChange={(e) => {
            setProjectDescription(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            const isSuccess = projectRepository.create(
              new Project(projectName, projectDescription)
            );
            if (isSuccess) alert("project created successfuly");
            else alert("failed to create a project");
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectCreate;
