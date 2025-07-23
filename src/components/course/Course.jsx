import React, { useEffect, useState } from "react";
import NotFound from "./../../assets/Imgs/NotFound.jpg";
import CreateCourse from "./CreatCourse"; // unused, but kept in case you're using later
import LoadingCard from "../CardLoading/LoadingCard";

function Course() {
  const [isLoading, setIsLoading] = useState(true);
  const courseApi =
    "https://script.google.com/macros/s/AKfycbx8dxizPR2dMf6LkjinaFMbnietj4QAe3kbG5UIZFT740nww-B0fTelQaiVvnIGBHyD/exec";
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    language: "",
    searchQuery: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const categories = [...new Set(courses.map((course) => course[2]))];
  const languages = [...new Set(courses.map((course) => course[6]))];

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
    let result = [...courses];

    if (filters.category) {
      result = result.filter((course) => course[2] === filters.category);
    }

    if (filters.language) {
      result = result.filter((course) => course[6] === filters.language);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course[1].toLowerCase().includes(query) ||
          (course[3] && course[3].toLowerCase().includes(query))
      );
    }

    setFilteredCourses(result);
    setCurrentPage(1); // reset to page 1 on filters change
  }, [filters, courses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      language: "",
      searchQuery: "",
    });
  };

  return (
    <div className="w-full pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Courses
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Browse and manage all available courses
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="rounded-2xl p-4 bg-base-100 border border-base-300 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search Field */}
            <div className="md:col-span-2">
              <label className="label font-medium text-sm text-base-content">
                Search Courses
              </label>
              <input
                type="text"
                name="searchQuery"
                placeholder="Search by title or description..."
                className="input input-bordered input-sm w-full shadow-sm"
                value={filters.searchQuery}
                onChange={handleFilterChange}
              />
            </div>

            {/* Category & Language Filters */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="w-full">
                <label className="label font-medium text-sm text-base-content">
                  Filter by Category
                </label>
                <select
                  name="category"
                  className="select select-bordered select-sm w-full"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div className="w-full">
                <label className="label font-medium text-sm text-base-content">
                  Filter by Language
                </label>
                <select
                  name="language"
                  className="select select-bordered select-sm w-full"
                  value={filters.language}
                  onChange={handleFilterChange}
                >
                  <option value="">All Languages</option>
                  {languages.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.category || filters.language || filters.searchQuery) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-base-content">
                Active filters:
              </span>

              {filters.category && (
                <div className="badge badge-primary gap-2">
                  Category: {filters.category}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, category: "" }))
                    }
                    className="ml-1 text-white"
                  >
                    ×
                  </button>
                </div>
              )}

              {filters.language && (
                <div className="badge badge-secondary gap-2">
                  Language: {filters.language}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, language: "" }))
                    }
                    className="ml-1 text-white"
                  >
                    ×
                  </button>
                </div>
              )}

              {filters.searchQuery && (
                <div className="badge badge-accent gap-2">
                  Search: {filters.searchQuery}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, searchQuery: "" }))
                    }
                    className="ml-1 text-white"
                  >
                    ×
                  </button>
                </div>
              )}

              <button
                onClick={clearFilters}
                className="btn btn-xs btn-outline btn-error ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          //     <div className="flex justify-center items-center py-20">
          //     <span className="loading loading-spinner loading-lg text-primary"></span>
          //  </div>
          <LoadingCard />
        )}

        {/* Empty */}
        {!isLoading && filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="max-w-md text-center">
              <div className="card bg-base-200 shadow-xl">
                <figure>
                  <img
                    src={NotFound}
                    alt="No courses found"
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title justify-center">
                    No Courses Found
                  </h2>
                  <p>No courses match your current filters</p>
                  <div className="card-actions justify-center mt-4">
                    <button onClick={clearFilters} className="btn btn-primary">
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && currentCourses.length > 0 && (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {currentCourses.length} of {filteredCourses.length}{" "}
              filtered courses
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
              {currentCourses.map((course) => (
                <div
                  key={course[0]}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
                >
                  <figure className="relative aspect-video overflow-hidden">
                    <img
                      src={
                        course[5] ||
                        "https://via.placeholder.com/400x225?text=No+Image"
                      }
                      alt={course[1]}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x225?text=No+Image";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className="badge badge-sm badge-accent">
                        {course[6]}
                      </span>
                    </div>
                  </figure>

                  <div className="card-body flex-1">
                    <h2 className="card-title text-lg line-clamp-2">
                      {course[1]}
                    </h2>
                    <div className="mt-1 mb-3">
                      <span className="badge badge-outline badge-primary">
                        {course[2]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-1">
                      {course[3] && course[3] !== "None"
                        ? course[3]
                        : "No description provided."}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <a
                        href={course[4]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View Course
                      </a>
                      <span className="text-xs text-gray-500">
                        {course[7]
                          ? new Date(course[7]).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="join">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`join-item btn btn-sm ${
                        currentPage === index + 1
                          ? "btn-primary"
                          : "btn-outline"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Course;
