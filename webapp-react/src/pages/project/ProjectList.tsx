import { Box, Button, Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { TProjectContext } from "../layout/ProjectPageLayout";
import ProjectTable from "../../components/project/ProjectTable";

const ProjectList = () => {
  const context: TProjectContext = useOutletContext();

  return (
    <Box>
      <Stack>
        <ProjectTable context={context} />
      </Stack>
      <Stack>
        <Button
          sx={{ width: "150px", margin: "20px 0 0 10px" }}
          variant="contained"
          size="small"
        >
          Create project
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectList;
