import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Project } from "../../model/Project";
import { useOutletContext } from "react-router-dom";
import { TProjectContext } from "../layout/ProjectPageLayout";
import { useState } from "react";

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
    //         checked={!!context.selectedProject}
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
  ];

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([
    context.selectedProjectId,
  ]);

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
          //TODO: Refactor
          if (selection.length > 1) {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter((s) => !selectionSet.has(s));
            setSelectionModel(result);
            context.setSelectedProjectId(result[0].toString());
          } else {
            setSelectionModel(selection);
          }
        }}
      ></DataGrid>
    </Box>
  );
};

export default ProjectList;
