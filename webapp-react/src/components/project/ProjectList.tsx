import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Project } from "../../model/Project";
import { useOutletContext } from "react-router-dom";
import { TProjectContext } from "../layout/ProjectPageLayout";
import { useState } from "react";
import ProjectEditDialog from "./ProjectEditDialog";

const ProjectList = () => {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleEdit = (projectToEdit: Project) => {
    setProjectToEdit(projectToEdit);
  };

  const handleEditDialogClose = () => {
    setProjectToEdit(null);
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
      renderCell: () => {
        return <Button>Delete</Button>;
      },
    },
  ];

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>(
    context.selectedProjectId ? [context.selectedProjectId] : []
  );

  return (
    <Box>
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
        />
      )}
    </Box>
  );
};

export default ProjectList;
