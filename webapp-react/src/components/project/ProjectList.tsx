import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Project } from "../../model/Project";
import { useOutletContext } from "react-router-dom";
import { TProjectContext } from "../layout/ProjectPageLayout";
import { useState } from "react";
import ProjectEditDialog from "./ProjectEditModal";

const ProjectList = () => {
  const context: TProjectContext = useOutletContext();

  const columns: GridColDef<Project[][number]>[] = [
    // {
    //   field: "select",
    //   headerName: "",
    //   width: 50,
    //   renderCell: () => {
    //     return (
    //       <Radio
    //         checked={!!context.SelectedProjectId}
    //         onChange={() => {
    //           console.log("lol");
    //         }}
    //       />
    //     );
    //   },
    // },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Project name", flex: 0.75 },
    { field: "description", headerName: "Project description", flex: 2 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      renderCell: ({ row }: { row: Project }) => {
        console.log(row);
        return <Button>Edit</Button>;
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
      <ProjectEditDialog />
    </Box>
  );
};

export default ProjectList;
