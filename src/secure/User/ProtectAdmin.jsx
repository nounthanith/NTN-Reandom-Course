import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function AdminProtect({ children }) {
  const userString = localStorage.getItem("user");

  let user = null;

  if (userString) {
    try {
      // Parse string to array
      const raw = JSON.parse(userString);

      const keys = [
        "id",
        "name",
        "password",
        "image",
        "phone",
        "email",
        "role",
        "createdAt",
      ];

      user = keys.reduce((obj, key, index) => {
        obj[key] = raw[index] ?? null;
        return obj;
      }, {});

    //   console.log("Parsed User JSON:", user);

      if (user.email !== "tong@gmail.com") {
        toast.error("NO PERMISSION");

        
        window.location.href = "/home";
        return null; 
      }
    } catch (error) {
      console.error("Invalid user data format:", error);
      toast.error("Invalid user data");
      return <Navigate to="/home" />;
    }
  } else {
    toast.error("Not logged in");
    return <Navigate to="/home" />;
  }

  return children;
}

export default AdminProtect;
