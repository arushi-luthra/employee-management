// ================= AUTH CHECK =================
let role = localStorage.getItem("loggedIn");
if (!role) location.href = "login.html";

document.getElementById("welcome").innerText = "Welcome " + role;

// hide admin section for users
if (role !== "admin") {
  document.getElementById("adminSection").style.display = "none";
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("editIndex");
  location.href = "login.html";
}

// ================= ADD / UPDATE EMPLOYEE =================
function addEmployee() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let editIndex = localStorage.getItem("editIndex");

  let emp = {
    name: name.value,
    email: email.value,
    mobile: mobile.value,
    salary: salary.value,
    department: department.value,
    rating: rating.value
  };

  if (editIndex !== null) {
    employees[editIndex] = emp;
    localStorage.removeItem("editIndex");
  } else {
    employees.push(emp);
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  clearForm();
  display(employees);
}

// ================= DISPLAY TABLE =================
function display(data) {
  tableBody.innerHTML = "";
  data.forEach((e, i) => {
    tableBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.department}</td>
        <td><button onclick="viewMore(${i})">View More</button></td>
        ${
          role === "admin"
            ? `<td><button onclick="editEmployee(${i})">Edit</button></td>`
            : `<td>-</td>`
        }
      </tr>
    `;
  });
}

// ================= VIEW MORE MODAL =================
function viewMore(index) {
  let emp = JSON.parse(localStorage.getItem("employees"))[index];

  mName.innerText = emp.name;
  mEmail.innerText = emp.email;
  mMobile.innerText = emp.mobile;
  mSalary.innerText = emp.salary;
  mDept.innerText = emp.department;
  mRating.innerText = emp.rating;

  document.getElementById("viewModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("viewModal").style.display = "none";
}

// ================= EDIT EMPLOYEE (ADMIN) =================
function editEmployee(index) {
  let emp = JSON.parse(localStorage.getItem("employees"))[index];

  name.value = emp.name;
  email.value = emp.email;
  mobile.value = emp.mobile;
  salary.value = emp.salary;
  department.value = emp.department;
  rating.value = emp.rating;

  localStorage.setItem("editIndex", index);
}

// ================= FILTERS =================
function applyFilters() {
  let search = searchText.value.toLowerCase();
  let dept = filterDept.value;
  let salaryRange = salaryRangeSelect.value;

  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  let filtered = employees.filter(e => {
    let matchSearch =
      e.name.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search);

    let matchDept = dept === "" || e.department === dept;

    let matchSalary = true;
    if (salaryRange !== "") {
      let salary = Number(e.salary);
      let [min, max] = salaryRange.split("-").map(Number);
      matchSalary = max ? salary >= min && salary <= max : salary >= min;
    }

    return matchSearch && matchDept && matchSalary;
  });

  display(filtered);
}

// ================= CLEAR FORM =================
function clearForm() {
  name.value = "";
  email.value = "";
  mobile.value = "";
  salary.value = "";
  department.value = "";
  rating.value = "";
}

// ================= INITIAL LOAD =================
display(JSON.parse(localStorage.getItem("employees")) || []);

window.onclick = function (e) {
  let modal = document.getElementById("viewModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
