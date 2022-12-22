import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";

//example of creating a mui dialog modal for creating new rows
const CategoryModal = ({
  open,
  columns,
  onClose,
  handleSaveRowEdits,
  handleCreateNewRow,
  tableData,
  currentRowIndex,
}) => {
  const currentRowData = tableData?.[currentRowIndex];
  const handleSubmit = (event) => {
    //put your validation logic here
    event.preventDefault();
    const { categoryName, categoryDescription } = event.currentTarget.elements;

    const category = {
      categoryName: categoryName.value,
      categoryDescription: categoryDescription.value,
    };

    console.log(category);

    if (currentRowIndex) {
      handleSaveRowEdits(category);
    } else {
      handleCreateNewRow(category);
    }
    onClose();
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">
          {currentRowData?.categoryName
            ? "Update Category"
            : "Create New Category"}
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (
                column.accessorKey === "categoryId" ||
                column.accessorKey === "createdAt"
              )
                return;
              return (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  defaultValue={currentRowData?.[column.accessorKey]}
                  required
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" type="submit" variant="contained">
            {currentRowData?.categoryId ? "Update Recipe" : "Create New Recipe"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CategoryModal;
