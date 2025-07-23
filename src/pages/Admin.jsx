import React, { useEffect, useState } from "react";
import CreateCourse from "../components/course/CreatCourse";

function Admin() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination States
  const [userPage, setUserPage] = useState(1);
  const usersPerPage = 5;

  const [coursePage, setCoursePage] = useState(1);
  const coursesPerPage = 5;

  const userApi =
    "https://script.google.com/macros/s/AKfycbyRQHXGnTILzy4YLfYj5tVFrnSWHeNQ4Wppv-CWsexDcvaK9ONrwh84kEBOy_tZ3R_zcw/exec";

  const courseApi =
    "https://script.google.com/macros/s/AKfycbx8dxizPR2dMf6LkjinaFMbnietj4QAe3kbG5UIZFT740nww-B0fTelQaiVvnIGBHyD/exec";

  // Pagination Logic
  const indexOfLastUser = userPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastCourse = coursePage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalCoursePages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleUserPageChange = (page) => setUserPage(page);
  const handleCoursePageChange = (page) => setCoursePage(page);

  // GET Users
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

  // GET Courses
  useEffect(() => {
    const getCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${courseApi}?action=read`);
        const result = await response.json();
        if (result.status === "success") {
          setCourses(result.data);
          setFilteredCourses(result.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, []);

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
    "Mejor",
    "Created At",
    "Action",
  ];

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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

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
        getUser();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  return (
    <div className="p-6 mt-20 space-y-10">
      {/* USER TABLE */}
      <div>
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-base-300">
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
              {currentUsers.map((user, i) => (
                <tr key={i} className="hover:bg-base-100/30">
                  {user.map((value, j) => (
                    <td
                      key={j}
                      className="px-4 py-2 border border-gray-200 text-sm max-w-[140px] truncate whitespace-nowrap overflow-hidden"
                    >
                      {j === 3 ? (
                        <img
                          src={value}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : j === 7 ? (
                        new Date(value).toLocaleDateString("en-GB") // dd/mm/yyyy
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 border border-gray-200 text-sm w-40">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(user[0])}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* User Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalUserPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handleUserPageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  userPage === i + 1 ? "bg-blue-500 text-white" : "bg-base-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* COURSE TABLE */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">Courses</h1>
        {/* Create Course Modal Button */}
        <div className="mt-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-sm btn-primary gap-2"
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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg bg-base-300">
                <thead>
                  <tr>
                    {[
                      "ID",
                      "Title",
                      "Category",
                      "Description",
                      "Course Url",
                      "Image",
                      "Language",
                      "Action",
                    ].map((key, index) => (
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
                  {currentCourses.map((course, i) => (
                    <tr key={i} className="hover:bg-base-100/50">
                      {course.slice(0, 7).map((value, j) => (
                        <td
                          key={j}
                          className="px-4 py-2 border border-gray-200 text-sm max-w-[100px] truncate whitespace-nowrap overflow-hidden"
                        >
                          {j === 5 ? (
                            <img
                              src={value}
                              alt="Course"
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-2 border border-gray-200 text-sm w-40">
                        <div className="flex gap-2">
                          <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                            Delete
                          </button>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Course Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalCoursePages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleCoursePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    coursePage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-base-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Update Dialog */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md space-y-3">
            <h2 className="text-xl font-bold">Update User</h2>
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
    </div>
  );
}

export default Admin;
