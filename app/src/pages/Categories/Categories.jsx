import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import { useDisclosure } from "@chakra-ui/react";
import "bulma/css/bulma.min.css";
import {
  validateAge,
  validateEmail,
  validateRequired,
} from "../../utils/utils";
import { categories as data } from "../../data/data";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { apiDomain } from "../../utils/utils";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const Categories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );
  const handleCreateNewRow = async (values) => {
    values.original.categoryId = uuidv4();
    values.original.createdAt = Date.now();
    try {
      const { data } = await axios.post(
        `${apiDomain()}/api/categories`,
        values.original
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    tableData.push(values);
    setTableData([...tableData]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "categoryId",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "categoryName",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "categoryDescription",
        header: "Description",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  const [updateData, setUpdateData] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  useEffect(() => {
    console.log(value);
    setTableData(value);
  }, [value]);

  const handleSaveRowEdits = async () => {
    if (!Object.keys(validationErrors).length) {
      tableData[updateData.index] = updateData.original;
      // send/receive api updates here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.put(
          `${apiDomain()}/api/categories/${updateData.original.categoryId}`,
          updateData.original
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setTableData([...tableData]);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("categoryName")}`
        )
      ) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.delete(
          `${apiDomain()}/api/categories/${row.original.categoryId}`
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );
  return (
    <Box mt={16}>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  setCreateModalOpen(true);
                  setUpdateData(row);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <button
            className="button is-primary mb-4 mt-4"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Category
          </button>
        )}
      />
      <CategoryModal
        columns={columns}
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setUpdateData((prevData) => {
            return {
              ...prevData,
              original: columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = "";
                return acc;
              }, {}),
            };
          });
        }}
        onSubmit={
          updateData.original?.categoryId
            ? handleSaveRowEdits
            : handleCreateNewRow
        }
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
    </Box>
  );
};

export default Categories;
