
const API = "http://localhost:5000/students";

async function addStudent() {
    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    loadStudents();
}

async function loadStudents() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(s => {
        const li = document.createElement("li");
        li.innerHTML = `${s.name} (${s.course}) 
        <button onclick="deleteStudent('${s._id}')">Delete</button>`;
        list.appendChild(li);
    });
}

async function deleteStudent(id) {
    await fetch(API + "/" + id, { method: "DELETE" });
    loadStudents();
}

loadStudents();
