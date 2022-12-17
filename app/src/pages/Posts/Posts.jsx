import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Posts.module.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDisclosure } from "@chakra-ui/react";
import PostModal from "../../components/PostModal/PostModal";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Overlay from "../../components/Overlay/Overlay";

const renderLink = (params) => {
  return <Link to={`/posts/${params.row.id}`}>Link</Link>;
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "view",
    headerName: "View",
    type: "string",
    width: 100,
    renderCell: renderLink,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
  },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Posts = () => {
  // const {loading, error, value} = useFetch("../../data/data.json", {});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<Overlay />);

  const openModal = () => {
    setOverlay((prevValue) => !prevValue);
    onOpen();
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <button className="button is-primary mb-4 mt-4" onClick={openModal}>
          Create Post
        </button>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <PostModal isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
