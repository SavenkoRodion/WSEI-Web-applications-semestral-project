import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProjectRepository from "../../repository/ProjectRepository";
import IRepository from "../../repository/IRepository";
import { Project } from "../../model/Project";

const ProjectList = () => {
  const projectRepository: IRepository<Project> = new ProjectRepository();
  const rows = projectRepository.getAll();

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Project name", flex: 0.75 },
    { field: "description", headerName: "Project description", flex: 2 },
  ];
  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnSelector
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[1, 2, 5]}
      ></DataGrid>
    </Box>
  );
};

export default ProjectList;
