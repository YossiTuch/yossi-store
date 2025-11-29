import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username) => {
    setEditableUserId(id);
    setEditableUserName(username);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mx-auto w-4/5 p-2 sm:p-4">
      <h1 className="my-7 text-center text-3xl font-semibold">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message || "An error occurred"}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="-mx-2 w-full overflow-x-auto sm:mx-auto md:w-4/5">
            <table className="mx-auto w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left sm:px-4">ID</th>
                  <th className="px-2 py-2 text-left sm:px-4">NAME</th>
                  <th className="px-2 py-2 text-left sm:px-4">EMAIL</th>
                  <th className="px-2 py-2 text-left sm:px-4">ADMIN</th>
                  <th className="px-2 py-2 sm:px-4"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-2 py-2 sm:px-4">{user._id}</td>
                    <td className="px-2 py-2 sm:px-4">
                      {editableUserId === user._id ? (
                        <div className="flex flex-col items-stretch sm:flex-row sm:items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="min-h-[44px] w-full rounded-lg border p-2 sm:min-h-0"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="mt-2 ml-0 min-h-[44px] rounded-lg bg-blue-500 px-4 py-2 text-white sm:mt-0 sm:ml-2 sm:min-h-0"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username)
                            }
                            className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline dark:text-blue-400">
                        {user.email}
                      </a>
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td className="px-2 py-2 sm:px-4">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 sm:min-h-0 sm:min-w-0"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
