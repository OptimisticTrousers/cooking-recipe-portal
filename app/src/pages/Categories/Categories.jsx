import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import { useDisclosure } from "@chakra-ui/react";
import "bulma/css/bulma.min.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { apiDomain } from "../../utils/utils";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const Categories = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState();
  const { loading, error, value } = useFetch(`${apiDomain()}/api/categories`);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  const columns = useMemo(
    () => [
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

  const handleCreateNewRow = async (values) => {
    values.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
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

  const handleSaveRowEdits = async (values) => {
    if (!Object.keys(validationErrors).length) {
      tableData[currentRowIndex] = values;
      // send/receive api updates here, then refetch or update local table data for re-render
      try {
        const { data } = await axios.put(
          `${apiDomain()}/api/categories/${values.categoryName}`,
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
          `${apiDomain()}/api/categories/${row.original.categoryName}`
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
                  setCurrentRowIndex(row.index);
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
            onClick={() => {
              setCreateModalOpen(true);
              setCurrentRowIndex();
            }}
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
        }}
        handleSaveRowEdits={handleSaveRowEdits}
        handleCreateNewRow={handleCreateNewRow}
        tableData={tableData}
        currentRowIndex={currentRowIndex}
      />
    </Box>
  );
};

export default Categories;
