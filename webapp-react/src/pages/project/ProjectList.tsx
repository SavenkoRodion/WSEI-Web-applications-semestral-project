import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Project } from "../../model/Project";
import { useOutletContext } from "react-router-dom";
import { TProjectContext } from "../layout/ProjectPageLayout";
import { useState } from "react";
import ProjectEditDialog from "../../components/project/ProjectEditDialog";
import ProjectRepository from "../../repository/ProjectRepository";
import IRepository from "../../repository/IRepository";
import ProjectDeleteDialog from "../../components/project/ProjectDeleteDialog";

const ProjectList = () => {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleEdit = (projectToEdit: Project) => {
    setProjectToEdit(projectToEdit);
  };

  const handleEditDialogClose = () => {
    setProjectToEdit(null);
  };

  const handleEditDialogSave = (projectToEdit: Project) => {
    const projectRepository: IRepository<Project> = new ProjectRepository();
    projectRepository.replace(projectToEdit);
    setProjectToEdit(null);
    window.location.reload();
  };

  const openDeleteDialog = (projectToDelete: Project) => {
    setProjectToDelete(projectToDelete);
  };

  const handleDeleteDialogClose = () => {
    setProjectToDelete(null);
  };

  const handleDeleteDialogDelete = (projectId: string) => {
    const projectRepository: IRepository<Project> = new ProjectRepository();
    projectRepository.delete(projectId);
    setProjectToDelete(null);
    window.location.reload();
  };

  const context: TProjectContext = useOutletContext();

  const columns: GridColDef<Project[][number]>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Project name", flex: 0.75 },
    { field: "description", headerName: "Project description", flex: 2 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      renderCell: ({ row }: { row: Project }) => {
        console.log(row);
        return <Button onClick={() => handleEdit(row)}>Edit</Button>;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      renderCell: ({ row }: { row: Project }) => {
        return (
          <Button
            onClick={() => {
              openDeleteDialog(row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>(
    context.selectedProjectId ? [context.selectedProjectId] : []
  );

  return (
    <Box>
      <Stack>
        <DataGrid
          rows={context.projects}
          columns={columns}
          disableColumnSelector
          hideFooterSelectedRowCount
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(selection) => {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter((s) => !selectionSet.has(s));
            setSelectionModel(result);
            context.setSelectedProjectId(result[0]?.toString() ?? null);
          }}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          autoHeight
        ></DataGrid>
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
      {projectToEdit && (
        <ProjectEditDialog
          project={projectToEdit}
          onClose={handleEditDialogClose}
          onSave={handleEditDialogSave}
        />
      )}
      {projectToDelete && (
        <ProjectDeleteDialog
          id={projectToDelete.id}
          name={projectToDelete.name}
          onClose={handleDeleteDialogClose}
          onDelete={handleDeleteDialogDelete}
        />
      )}
    </Box>
  );
};

export default ProjectList;
