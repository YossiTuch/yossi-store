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
    <div className="mx-auto w-full p-2 sm:w-4/5 sm:p-4">
      <h1 className="my-3 text-center text-xl font-semibold sm:my-7 sm:text-3xl">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message || "An error occurred"}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="-mx-2 w-full overflow-x-auto sm:mx-auto md:w-4/5">
            <table className="mx-auto w-full min-w-[500px] text-xs sm:min-w-[640px] sm:text-sm">
              <thead>
                <tr>
                  <th className="px-1.5 py-1.5 text-left text-[10px] sm:px-4 sm:py-2 sm:text-sm">ID</th>
                  <th className="px-1.5 py-1.5 text-left text-[10px] sm:px-4 sm:py-2 sm:text-sm">NAME</th>
                  <th className="px-1.5 py-1.5 text-left text-[10px] sm:px-4 sm:py-2 sm:text-sm">EMAIL</th>
                  <th className="px-1.5 py-1.5 text-left text-[10px] sm:px-4 sm:py-2 sm:text-sm">ADMIN</th>
                  <th className="px-1.5 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-1.5 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs">{user._id.slice(0, 8)}...</td>
                    <td className="px-1.5 py-1.5 sm:px-4 sm:py-2">
                      {editableUserId === user._id ? (
                        <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-0">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="min-h-[36px] w-full rounded-md border p-1.5 text-xs sm:min-h-0 sm:rounded-lg sm:p-2 sm:text-sm"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="min-h-[36px] rounded-md bg-blue-500 px-2 py-1 text-white sm:ml-2 sm:min-h-0 sm:rounded-lg sm:px-4 sm:py-2"
                          >
                            <FaCheck className="text-xs sm:text-sm" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] sm:text-sm">{user.username}</span>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username)
                            }
                            className="min-h-[28px] min-w-[28px] sm:min-h-0 sm:min-w-0"
                          >
                            <FaEdit className="ml-0.5 text-xs sm:ml-4 sm:text-sm" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-1.5 py-1.5 sm:px-4 sm:py-2">
                      <a href={`mailto:${user.email}`} className="text-[10px] text-blue-600 hover:underline dark:text-blue-400 sm:text-sm">
                        {user.email.length > 20 ? `${user.email.slice(0, 20)}...` : user.email}
                      </a>
                    </td>
                    <td className="px-1.5 py-1.5 sm:px-4 sm:py-2">
                      {user.isAdmin ? (
                        <FaCheck className="text-xs sm:text-sm" style={{ color: "green" }} />
                      ) : (
                        <FaTimes className="text-xs sm:text-sm" style={{ color: "red" }} />
                      )}
                    </td>
                    <td className="px-1.5 py-1.5 sm:px-4 sm:py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="flex min-h-[28px] min-w-[28px] items-center justify-center rounded bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700 sm:min-h-0 sm:min-w-0 sm:px-4 sm:py-2"
                          >
                            <FaTrash className="text-xs sm:text-sm" />
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
