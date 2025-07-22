import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CreateCourse({ isOpen, onClose }) {
  const courseApi =
    "https://script.google.com/macros/s/AKfycbx8dxizPR2dMf6LkjinaFMbnietj4QAe3kbG5UIZFT740nww-B0fTelQaiVvnIGBHyD/exec";
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    course_url: "",
    course_img: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function createCourse(e) {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Creating course...");

    const randomId = Math.floor(Math.random() * 1000000 + 1);

    const params = new URLSearchParams({
      action: "insert",
      ...form,
      id: randomId,
      created_at: new Date().toISOString(),
    });

    try {
      const response = await fetch(courseApi, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const result = await response.json();
      if (result.status === "success") {
        toast.success("Course created!", { id: toastId });
        setForm({
          name: "",
          category: "",
          description: "",
          course_url: "",
          course_img: "",
          language: "",
        });
        onClose(); // Close the modal after successful creation
      } else {
        toast.error("Failed to create course!", { id: toastId });
      }
    } catch (error) {
      toast.error("Error connecting to server.", { id: toastId });
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-base-300/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          <div className="p-6">
            <h2 className="text-2xl  font-bold text-center  mb-6">
              Create New Course
            </h2>
            <form onSubmit={createCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Course Name
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Category
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Language
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Course URL
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="course_url"
                  value={form.course_url}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Image URL (optional)
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="course_img"
                  value={form.course_img}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button
                className={`w-full bg-pink-500 text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-600"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCourse;