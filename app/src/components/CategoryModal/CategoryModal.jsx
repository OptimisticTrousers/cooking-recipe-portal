import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDisclosure } from "@chakra-ui/react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { posts as data } from "../../data/data";
import {
  apiDomain,
  validateAge,
  validateEmail,
  validateRequired,
} from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//example of creating a mui dialog modal for creating new rows
const CategoryModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  currentRowData,
  setCurrentRow,
}) => {
  const handleSubmit = (event) => {
    //put your validation logic here

    onSubmit(currentRowData);
    onClose();
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">
          {currentRowData?.categoryId
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
                  required
                  value={currentRowData?.[column.accessorKey]}
                  onChange={(e) => {
                    setCurrentRow((prevUpdateData) => {
                      return {
                        ...prevUpdateData,
                        original: {
                          ...prevUpdateData.original,
                          [e.target.name]: e.target.value,
                        },
                      };
                    });
                  }}
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" type="submit" variant="contained">
            {currentRowData?.categoryId
              ? "Update Recipe"
              : "Create New Recipe"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CategoryModal;
