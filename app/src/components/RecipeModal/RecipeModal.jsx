import React, { useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  InputLabel,
  FormControl,
  TextField,
  Select,
} from "@mui/material";
import { apiDomain } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

//example of creating a mui dialog modal for creating new rows
const RecipeModal = ({
  open,
  columns,
  onClose,
  handleSaveRowEdits,
  handleCreateNewRow,
  tableData,
  currentRowIndex,
}) => {
  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  const contentRef = useRef(null);
  const currentRowData = tableData?.[currentRowIndex];

  const handleSubmit = (event) => {
    event.preventDefault();
    const { recipeTitle, recipeAuthor, recipeCategory } =
      event.currentTarget.elements;
    const editor = contentRef.getEditor();
    const unprivlegedEditor = contentRef.makeUnprivilegedEditor(editor);
    const recipeContent = unprivlegedEditor.getHTML();
    const recipe = { recipeTitle, recipeAuthor, recipeCategory, recipeContent };
    if (currentRowIndex) {
      handleSaveRowEdits(recipe);
    } else {
      handleCreateNewRow(recipe);
    }
    onClose();
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">
          {currentRowIndex ? "Update Recipe" : "Create New Recipe"}
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
                column.accessorKey === "recipeId" ||
                column.accessorKey === "createdAt"
              )
                return;
              else if (column.accessorKey === "recipeCategory") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Recipe Category"
                        name={column.accessorKey}
                        value={currentRowData?.categoryName ?? ""}
                        required
                      >
                        {value?.map((category) => {
                          return (
                            <MenuItem
                              key={category.categoryName}
                              value={category.categoryName}
                            >
                              {category.categoryName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                );
              } else if (column.accessorKey === "recipeContent") {
                return (
                  <Box key={column.accessorKey}>
                    <FormControl>
                      <InputLabel>Content</InputLabel>
                      <ReactQuill
                        ref={contentRef}
                        theme="snow"
                        defaultValue={currentRowData?.[column.accessorKey]}
                        label="Recipe Content"
                      />
                    </FormControl>
                  </Box>
                );
              } else {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    defaultValue={currentRowData?.[column.accessorKey]}
                    required
                  />
                );
              }
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" type="submit" variant="contained">
            Create New Recipe
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RecipeModal;
