import React, { useState } from "react";
import NoProfile from "./../assets/Imgs/NoProfile.jpg";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [editForm, setEditForm] = useState({
    name: currentUser[1],
    phone: currentUser[4],
    major: currentUser[6],
    avatar: currentUser[3],
  });
  const [loading, setLoading] = useState(false);

  const userApi =
    "https://script.google.com/macros/s/AKfycbyRQHXGnTILzy4YLfYj5tVFrnSWHeNQ4Wppv-CWsexDcvaK9ONrwh84kEBOy_tZ3R_zcw/exec";

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Saving changes...");

    const params = new URLSearchParams({
      action: "update",
      id: currentUser[0],
      name: editForm.name,
      password: currentUser[2],
      avatar: editForm.avatar,
      phone: editForm.phone,
      email: currentUser[5],
      mejor: editForm.major,
      created_at: currentUser[7],
    });

    try {
      const response = await fetch(`${userApi}?${params}`, {
        method: "POST",
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        const text = await response.text();
        toast.error("Server error: " + text, { id: toastId });
        setLoading(false);
        return;
      }

      if (result.status === "success") {
        // Update localStorage and state
        const updatedUser = [
          currentUser[0],
          editForm.name,
          currentUser[2],
          editForm.avatar,
          editForm.phone,
          currentUser[5],
          editForm.major,
          currentUser[7],
        ];
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        toast.success("Profile updated!", { id: toastId });
        document.getElementById("my_modal_5").close();
      } else {
        toast.error("Update failed! " + (result.data || ""), { id: toastId });
      }
    } catch (error) {
      toast.error("Error connecting to server: " + error.message, {
        id: toastId,
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" />
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
        <div className="flex justify-center">
          <img
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-pink-500 text-black"
            src={currentUser[3] || NoProfile}
            alt={currentUser[1]}
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
          {currentUser[1]}
        </h1>

        <div className="mt-6 text-gray-600 space-y-3 text-sm md:text-base">
          <p>
            <span className="font-medium text-gray-800">📧 Email:</span>{" "}
            {currentUser[5]}
          </p>
          <p>
            <span className="font-medium text-gray-800">📞 Phone:</span>{" "}
            {currentUser[4]}
          </p>
          <p>
            <span className="font-medium text-gray-800">🎓 Major:</span>{" "}
            {currentUser[6]}
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium text-pink-500">📅 Registered:</span>
            <span className="bg-gray-100 px-2 py-1 rounded-lg text-sm font-semibold text-gray-700">
              {new Date(currentUser[7]).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
          {/* Open modal with this button */}
          <div className="flex justify-end">
            <div></div>
            <button
              className="mt-6 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Edit
            </button>
          </div>

          <dialog id="my_modal_5" className="modal">
            <div className="modal-box bg-white text-gray-800 shadow-xl rounded-lg">
              <h3 className="font-bold text-lg mb-2">Edit Profile</h3>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  name="name"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  name="phone"
                  placeholder="Phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                />
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  name="major"
                  placeholder="Major"
                  value={editForm.major}
                  onChange={handleEditChange}
                />
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  name="avatar"
                  placeholder="Avatar URL"
                  value={editForm.avatar}
                  onChange={handleEditChange}
                />
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center"
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
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            {/* Background overlay */}
            <form method="dialog" className="modal-backdrop bg-opacity-30">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}

export default Profile;
