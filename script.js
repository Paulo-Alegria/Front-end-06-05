const students = []
document.getElementById("studentform").addEventListener("submit",function(e){
 e.preventDefault();
 const name = document.getElementById("name").value.trim();
 const lastname = document.getElementById("lastname").value.trim();
 const grade = parseFloat(document.getElementById("grade").value);
 const date = document.getElementById("date").value;
 if(grade<1 || grade>7 ||!name || !lastname || isNaN(grade) || !date){
    alert("Error al ingresar los datos")
    return
 }
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
    `;
 tablebody.appendChild(row);
}

const promedioDiv= document.getElementById("average");

function calculateAverage(){
   total=students.reduce((acumulador,student)=> acumulador+student.grade,0);
   const average= total/students.length;
   promedioDiv.textContent=`Promedio del curso: ${average.toFixed(2)}`;
}