fetch('http://localhost:8000/medicines')
  .then(response => response.json())
  .then(medicineData => {
    createtable(medicineData.medicines);
})
.catch(err => console.error("An error has occured:", err));



function createtable(medicineData) {
  var medicineTable = document.getElementById("medicineTable");
  let rows = "";

  for (var i = 0; i < medicineData.length; i++) {
    rows += `
      <tr>
        <td>${medicineData[i].name}</td>
        <td>${medicineData[i].price}</td>
      </tr>
    `;
  }

  medicineTable.innerHTML += rows;
}
