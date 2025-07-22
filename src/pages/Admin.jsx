import React, { useEffect, useState } from "react";
import CreateCourse from "../components/course/CreatCourse";

function Admin() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Holds the user to edit
  const [form, setForm] = useState({}); // Holds updated values
  const [showCreateModal, setShowCreateModal] = useState(false);

  const userApi =
    "https://script.google.com/macros/s/AKfycbyRQHXGnTILzy4YLfYj5tVFrnSWHeNQ4Wppv-CWsexDcvaK9ONrwh84kEBOy_tZ3R_zcw/exec";

  async function getUser() {
    try {
      const response = await fetch(userApi + "?action=read");
      const result = await response.json();

      if (result.status === "success") {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const keys = [
    "ID",
    "Name",
    "Password",
    "Image",
    "Phone",
    "Email",
    "Role",
    "Created At",
    "Action",
  ];

  // DELETE
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(
        `${userApi}?action=delete&id=${encodeURIComponent(id)}`
      );
      const result = await res.json();
      if (result.status === "success") {
        setUsers((prev) => prev.filter((user) => user[0] != id));
        alert("User deleted");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  // OPEN EDIT MODAL
  function openEditModal(user) {
    setEditingUser(user);
    setForm({
      id: user[0],
      name: user[1],
      password: user[2],
      avatar: user[3],
      phone: user[4],
      email: user[5],
      mejor: user[6],
      created_at: user[7],
    });
  }

  // HANDLE FORM CHANGE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // UPDATE FUNCTION
  async function handleUpdate() {
    const query = new URLSearchParams({
      action: "update",
      ...form,
    }).toString();

    try {
      const res = await fetch(`${userApi}?${query}`);
      const result = await res.json();
      if (result.status === "success") {
        alert("User updated");
        setEditingUser(null);
        getUser(); // Refresh
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr>
              {keys.map((key, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border border-gray-200 text-left"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-base-300/30">
                {user.map((value, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 border border-gray-200 text-sm"
                  >
                    {j === 3 ? (
                      <img
                        src={value}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      value
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border border-gray-200 text-sm space-x-2 w-40 flex">
                  <button
                    onClick={() => handleDelete(user[0])}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openEditModal(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Dialog */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md space-y-3">
            <h2 className="text-xl font-bold">Update User</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Course
            </button>
            {Object.entries(form).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded mt-1"
                />
              </div>
            ))}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3">
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Course
        </button>
        <CreateCourse
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </div>
  );
}

export default Admin;
