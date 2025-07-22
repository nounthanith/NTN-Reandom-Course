import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotFound from "./../assets/Imgs/NotFound.jpg";
import CreateCourse from "./CreatCourse";

function Course() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const courseApi =
    "https://script.google.com/macros/s/AKfycbx8dxizPR2dMf6LkjinaFMbnietj4QAe3kbG5UIZFT740nww-B0fTelQaiVvnIGBHyD/exec";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`${courseApi}?action=read`);
        const result = await response.json();
        if (result.status === "success") {
          setCourses(result.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="w-full pt-20 px-4 md:px-8 lg:px-12 min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-pink-500"></span> Featured Courses
          </h1>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition text-lg whitespace-nowrap"
          >
            + Create Course
          </button>

          {/* Add the modal component */}
          <CreateCourse
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        </div>

        {courses.length === 0 ? (
          <div className="w-full text-center py-20">
            <div className="text-gray-500 text-lg">No courses found.</div>
            <div>
              <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                  <img src={NotFound} alt="" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Wait....
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>Welcom to NTN-Free-Random-Course</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">🚫⛔❌</div>
                    <div className="badge badge-outline">Free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {courses.map((course) => (
              <div
                key={course[0]}
                className="bg-base-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-pink-300 h-full"
              >
                <div className="aspect-video bg-base-100 overflow-hidden">
                  <img
                    src={
                      course[5] ||
                      "https://via.placeholder.com/400x225?text=No+Image"
                    }
                    alt={course[1]}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x225?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-bold  mb-2 line-clamp-2">
                    {course[1]}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                      {course[2]}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
                      {course[6]}
                    </span>
                  </div>
                  <p className="text-sm mb-4 line-clamp-3 flex-1">
                    {course[3] && course[3] !== "None"
                      ? course[3]
                      : "No description provided."}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <a
                      href={course[4]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                      View Course →
                    </a>
                    <span className="text-xs text-gray-400">
                      {course[7]
                        ? new Date(course[7]).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
