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
      },
      {
        accessorKey: "categoryDescription",
        header: "Description",
        size: 140,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 140,
      },
    ],
    []
  );

  const [currentRow, setCurrentRow] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const currentRowData = currentRow.original;

  const handleCreateNewRow = async (values) => {
    values.categoryId = uuidv4();
    values.createdAt = Date.now();
    try {
      const { data } = await axios.post(
        `${apiDomain()}/api/categories`,
        values
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    tableData.push(values);
    setTableData([...tableData]);
  };

  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  const handleSaveRowEdits = async (values) => {
    if (!Object.keys(validationErrors).length) {
      tableData[currentRow.index] = values;
      // send/receive api updates here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.put(
          `${apiDomain()}/api/categories/${values.categoryId}`,
          values
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
                  setCurrentRow({index: row.index, original: row.original});
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
          setCurrentRow((prevData) => {
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
          currentRow.original?.categoryName
            ? handleSaveRowEdits
            : handleCreateNewRow
        }
        currentRowData={currentRowData}
        setCurrentRow={setCurrentRow}
      />
    </Box>
  );
};

export default Categories;
