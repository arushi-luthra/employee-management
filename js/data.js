// // Default Admin
// if (!localStorage.getItem("admin")) {
//   localStorage.setItem("admin", JSON.stringify({
//     username: "admin",
//     password: "admin123"
//   }));
// }

// if (!localStorage.getItem("employees")) {
//   localStorage.setItem("employees", JSON.stringify([]));
// }
// default admin
if (!localStorage.getItem("admin")) {
  localStorage.setItem(
    "admin",
    JSON.stringify({ username: "admin", password: "admin123" })
  );
}

// employees list
if (!localStorage.getItem("employees")) {
  localStorage.setItem("employees", JSON.stringify([]));
}
