import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Project } from "@savenkorodion/webapp-model/Project";
import { Button } from "@mui/material";
import { useState } from "react";
import ProjectRepository from "../../repository/localstorage/ProjectRepository";
import ProjectDeleteDialog from "./ProjectDeleteDialog";
import ProjectEditDialog from "./ProjectEditDialog";
import { TProjectContext } from "../layout/Layout";
import IRepository from "@savenkorodion/repository-interfaces/IRepository";

type ProjectTableProps = {
  context: TProjectContext;
};

const ProjectTable = ({ context }: ProjectTableProps) => {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleEditDialogClose = () => {
    setProjectToEdit(null);
  };

  const handleEditDialogSave = (projectToEdit: Project) => {
    const projectRepository: IRepository<Project> = new ProjectRepository();
    projectRepository.replace(projectToEdit);
    setProjectToEdit(null);
    window.location.reload();
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

  const openDeleteDialog = (projectToDelete: Project) => {
    setProjectToDelete(projectToDelete);
  };

  const handleEdit = (projectToEdit: Project) => {
    setProjectToEdit(projectToEdit);
  };

  const columns: GridColDef<Project[][number]>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Project name", flex: 0.75 },
    { field: "description", headerName: "Project description", flex: 2 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      renderCell: ({ row }: { row: Project }) => {
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
    <>
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
    </>
  );
};

export default ProjectTable;
