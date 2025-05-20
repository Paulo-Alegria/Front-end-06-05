const students = []

// Crear contenedor para mensajes de error
const errorDiv = document.createElement('div');
errorDiv.id = 'error-message';
errorDiv.style.display = 'none';
const form = document.getElementById('studentform');
form.parentNode.insertBefore(errorDiv, form);

function showError(message) {
    errorDiv.innerHTML = `<span class="icon">&#9888;</span> <span>${message}</span>`;
    errorDiv.style.display = 'flex';
}
function hideError() {
    errorDiv.style.display = 'none';
}

document.getElementById("studentform").addEventListener("submit",function(e){
 e.preventDefault();
 const name = document.getElementById("name").value.trim();
 const lastname = document.getElementById("lastname").value.trim();
 const grade = parseFloat(document.getElementById("grade").value);
 const date = document.getElementById("date").value;
 if(!name){
    showError("Por favor, complete el campo 'Nombre'.");
    return;
 }
 if(!lastname){
    showError("Por favor, complete el campo 'Apellidos'.");
    return;
 }
 if(isNaN(grade) || grade<1 || grade>7){
    showError("Por favor, ingrese una nota válida entre 1 y 7.");
    return;
 }
 if(!date){
    showError("Por favor, seleccione una fecha.");
    return;
 }
 hideError();
 const student = {name,lastname,grade,date} 
 students.push(student);
 addStudentsToTable(student);
 calculateAverage();
  this.reset()

});
const tablebody= document.querySelector("#studenttable tbody");
function addStudentsToTable(student){
    const row= document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastname}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    <td>
        <button class="delete-btn">Eliminar</button>
        <button class="edit-btn">Editar</button>
    </td>
    `;
    row.querySelector(".delete-btn").addEventListener("click",function(){
      borrarestudiante(student,row);
   });
   row.querySelector(".edit-btn").addEventListener("click",function(){
    editStudent(student,row);
   });
 tablebody.appendChild(row);
}

function borrarestudiante(student,row){
    const index= students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        calculateAverage();
        row.remove();
    }
}

function editStudent(student, row) {
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("grade").value = student.grade;
    document.getElementById("date").value = student.date;

    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        row.remove();
        calculateAverage();
    }
}

const promedioDiv= document.getElementById("average");

function calculateAverage(){
   total=students.reduce((acumulador,student)=> acumulador+student.grade,0);
   const average= total/students.length;
   promedioDiv.textContent=`Promedio del curso: ${average.toFixed(2)}`;
}