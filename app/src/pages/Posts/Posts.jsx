import React, { useEffect, useMemo, useState } from "react";
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
} from "@chakra-ui/react";
import MaterialReactTable from "material-react-table";

//nested data is ok, see accessorKeys in ColumnDef below


const data = [
  { id: 1, title: "Jon", author: "Description of thing" , content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00"},
  { id: 2, title: "Cersei", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 3, title: "Jaime", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 4, title: "Arya", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 5, title: "Daenerys", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 6, title: "Melisandre", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 7, title: "Ferrara", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 8, title: "Rossini", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
  { id: 9, title: "Harvey", author: "Description of thing", content: "<p>Here is a post!</p>", createdAt: "2022-11-26T22:37:47.305+00:00" },
];


const Posts = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //access nested data with dot notation

        header: "Title",
      },

      {
        accessorKey: "author",

        header: "Author",
      },

      {
        accessorKey: "content", //normal accessorKey

        header: "Content",
      },

      {
        accessorKey: "createdAt",

        header: "Created At",
      },
      {
        accessorKey: "id",
        header: "View",
        Cell: ({ cell }) => (
          <Link to={`/posts/${cell.getValue()}`}>
            <button className="button is-info">View</button>
          </Link>
        ),
      },
      {
        accessorKey: "id",
        header: "Update",
        Cell: ({ cell }) => (
            <button className="button is-warning">Update</button>
        ),
      },
      {
        accessorKey: "id",
        header: "Delete",
        Cell: ({ cell }) => (
            <button className="button is-danger">Delete</button>
        ),
      },
    ],

    []
  ); // const {loading, error, value} = useFetch("../../data/data.json", {});
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <button className="button is-primary mb-4 mt-4" onClick={onOpen}>
          Create Post
        </button>
        <MaterialReactTable columns={columns} data={data} />
        <PostModal isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
