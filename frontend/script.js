// Displaying data from server into table
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
    // Checking if data contains blank entries and if the price entered is a number
    if (medicineData[i].name != "" && medicineData[i].price != null && isNaN(medicineData[i].price) == false)
    {
      rows += `
        <tr>
          <td>${medicineData[i].name}</td>
          <td>${parseFloat(medicineData[i].price).toFixed(2)}</td>
        </tr>
      `;
    }

    // Any data not meeting previous conditions is pushed to incomplete
    else
    {
      incomplete.push([medicineData[i].name,medicineData[i].price]);
    }
    
  }

  medicineTable.innerHTML += rows;
}

document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();
  // Hiding error messages in case they were visible from previous submission
  blank = document.getElementById("blankError");
  numberFormat = document.getElementById("numberError");
  blank.style.visibility = "hidden";
  numberFormat.style.visibility = "hidden";

  const userData = new FormData(e.target);

  const userMedicine = {
    name: userData.get("medicine-name"),
    price: parseFloat(userData.get("medicine-price"))
  };
  // Checking for null entries
  if (userMedicine.name == null || userMedicine.price == null)
  {
    blank.style.visibility = "visible";
  }

  // Checking if price is a number
  else if (isNaN(userMedicine.price) == true )
  {
    numberFormat.style.visibility = "visible";
  }

  else
  {
    addRow(userMedicine);
  }

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


