import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import { Add } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID" },
  {
    field: "img",
    headerName: "Avatar",
    width: 75,
    renderCell: (params: GridRenderCellParams) => {
      return <img src={params.row.img || "/src/assets/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "username",
    type: "string",
    headerName: "Username",
    width: 100,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 175,
    type: "string",
    valueFormatter: (params: GridValueFormatterParams) =>
      new Date(params.value).toLocaleString(),
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const { isPending, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:8000/api/users").then((res) => res.json()),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New User</span>
        </button>
      </div>
      {isPending ? (
        "Loading..."
      ) : (
        <DataTable columns={columns} rows={data} slug="users" />
      )}
      {open && <AddModal slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
