fetch('http://localhost:8000/medicines')
  .then(response => response.json())
  .then(medicineData => {
    createtable(medicineData.medicines);
})
.catch(err => console.error("An error has occured:", err));

function createtable(medicineData) {
  var medicineTable = document.getElementById("medicineTable");
  let rows = "";
  var incomplete = [];

  for (var i = 0; i < medicineData.length; i++) {
    if (medicineData[i].name != "" && medicineData[i].price != null)
    {
      rows += `
        <tr>
          <td>${medicineData[i].name}</td>
          <td>${medicineData[i].price}</td>
        </tr>
      `;
    }
    
  }

  medicineTable.innerHTML += rows;
}

document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const userData = new FormData(e.target);
  const userMedicine = {
    name: userData.get("medicine-name"),
    price: parseFloat(userData.get("medicine-price"))
  };

  addRow(userMedicine);
});

function addRow(userInput) {
  const medicineTable = document.getElementById("medicineTable");
  const row = `
    <tr>
      <td>${userInput.name}</td>
      <td>${userInput.price}</td>
    </tr>
  `;

  medicineTable.innerHTML += row;
}


