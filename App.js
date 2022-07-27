var count=1;
var current=0;
fetch("http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_data?authorization=3995005&staff_id=&poffset=0&staff_short_code&staff_name=",
{method: "GET"})
.then(
  res => {
    res.json().then(
      data => {
        if (data.data.length > 0) {
          
          var temp = "";

          data.data.forEach((itemData) => {
            
            temp += `<tr>
            <td id="name${count}">${itemData.staff_name}</td>
            <td id="age${count}">${itemData.age}</td>
            <td id="email${count}">${itemData.email}</td>
            <td id="address${count}">${itemData.address}</td>
            <td id="dob${count}">${itemData.date_of_birth}</td>
            <td class="action_btn">
            <button id="${count}" onclick="editRow(this)">Edit</button>
            <button id="${count}" onclick="deleteRow(this)">Delete</button>
            <input type="hidden" id="status${count}" value="q" >
            </td></tr>`;
            count++
            
          });
          document.getElementById('data').innerHTML = temp;
        }
      }
    )
  }
)

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
   
    
    
  }

function addRow(table) {

  var table = document.getElementById("table");
  current=count;
  var row = table.insertRow(); 
  row.innerHTML = `<tr>
  <td id="name${current}"><input type="text" placeholder="name..." id="name_text${current}"></td>
  <td id="age${current}"><input type="text" placeholder="age..." id="age_text${current}"></td>
  <td id="email${current}"><input type="text" placeholder="email..." id="email_text${current}"></td>
  <td id="address${current}"><input type="text" placeholder="address..." id="address_text${current}"></td>
  <td id="dob${current}"><input type="text" placeholder="date of birth..." id="dob_text${current}"></td>
  <td class="action_btn">
  <button id="${current}" onclick="editRow(this)">Edit</button>
  <button id="${current}" onclick="deleteRow(this)">Delete</button>
  <input type="hidden" id="status${current}" value="'N'" >
  </td></tr>`;
  
    count++;
   
    }

  
function editRow(btn) {
       
       current=btn.id;
        
        var name = document.getElementById("name"+btn.id);
        var age = document.getElementById("age"+btn.id);
        var email = document.getElementById("email"+btn.id);
        var address = document.getElementById("address"+btn.id);
        var dob = document.getElementById("dob"+btn.id);
        var status=document.getElementById("status"+btn.id);
        status.value="U";
        var name_data = name.innerText;
        var age_data = age.innerText;
        var email_data = email.innerText;
        var address_data = address.innerText;
        var dob_data = dob.innerText;

       
        name.innerHTML =
         "<input type='text' id='name_text"+btn.id + "' value='" + name_data + "' placeholder='name...' >";
         age.innerHTML =
         "<input type='text' id='age_text"+btn.id + "' value='" + age_data + "' placeholder='age...'>";
        email.innerHTML =
         "<input type='text' id='email_text"+btn.id+ "' value='" + email_data + "' placeholder='email...'>";
        address.innerHTML =
         "<input type='text' id='address_text"+btn.id + "' value='" + address_data + "' placeholder='address...'>";
        dob.innerHTML =
         "<input type='text' id='dob_text"+btn.id + "' value='" + dob_data + "' placeholder='date of birth...'>";

       
       }
       

function saveData(){
        var name_val = document.getElementById("name_text"+current).value;
        var age_val = document.getElementById("age_text"+current).value;
        var email_val = document.getElementById("email_text"+current).value;
        var address_val = document.getElementById("address_text"+current).value;
        var dob_val = document.getElementById("dob_text"+current).value;
        var st_val = document.getElementById("status"+current).value;

        document.getElementById("name"+current).innerText = name_val;
        document.getElementById("age"+current).innerText = age_val;
        document.getElementById("email"+current).innerText = email_val;
        document.getElementById("address"+current).innerText = address_val;
        document.getElementById("dob"+current).innerText = dob_val;
        
       var record = 
       {
      authorization: "201792", 
      data: [{

    age: age_val,
    date_start_service:"01-07-2022" ,
    email: email_val,
    genger: "m",
    // staff_id: "2",
    staff_name: name_val,
    staff_short_code: "AZ",
    address: address_val,
    record_status: "n"
}]}
      data = record;
      fetch('http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_dml', 
      {method: "POST",
        headers:{'content-type':'application/json'},
        body: JSON.stringify(record)}).then(res => {return res.json()})
        
      }




