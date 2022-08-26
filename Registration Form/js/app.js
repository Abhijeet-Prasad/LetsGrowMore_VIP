const studentName = document.querySelector("#name"),
      studentEmail = document.querySelector("#email"),
      website = document.querySelector("#websiteLink"),
      imageLink = document.querySelector("#profilePic");
      skills = document.querySelectorAll("input[type='checkbox']"),
      tableBody = document.querySelector("tbody"),
      form = document.querySelector('.needs-validation'),
      clearButton = document.querySelector("#clear"),
      navLinks = document.querySelectorAll(".nav-link"),
      containers = document.querySelectorAll(".container");

let studentEnrolled = false;


(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {

            if(!imageLink.value){
                imageLink.classList.add('remove-validation-style');
            }
            else{
                imageLink.classList.remove('remove-validation-style');
            }

            if(!website.value){
                website.classList.add('remove-validation-style');
            }
            else{
                website.classList.remove('remove-validation-style');
            }

            form.classList.add('was-validated')

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            else{
                newStudent();
            }
        }, false)
      })
})()


Array.from(navLinks).forEach(nav =>{
    nav.addEventListener('click', ()=>{
        Array.from(navLinks).forEach(navItem =>{
            navItem.classList.toggle('active');
        })
        Array.from(containers).forEach(containerItem =>{
            containerItem.classList.toggle('active-container');
        })
    })
})

clearButton.addEventListener('click',()=>{
    form.classList.remove('was-validated');
})


function clearForm(){
    form.reset();
    form.classList.remove('was-validated');
}


let femaleUser = "https://cdn.vectorstock.com/i/thumb-large/46/77/person-gray-photo-placeholder-girl-material-design-vector-23804677.webp",
    maleUser = "https://cdn.vectorstock.com/i/thumb-large/54/17/person-gray-photo-placeholder-man-vector-24005417.webp",
    unknownUser = "https://cdn.vectorstock.com/i/thumb-large/19/83/unknown-person-female-vector-31261983.webp";

function newStudent(){
    let skillList = "";
    let img = "";
    let gender = document.querySelector("input[type='radio']:checked").value;

    Array.from(skills).forEach(element => {
        if(element.checked){
            if(skillList){
                skillList += ', ' + element.value;
            }
            else{
                skillList = element.value;
            }
        }
    })

    if(!imageLink.value){
        if(gender == 'Male')
            img = maleUser;
        else if(gender == 'Female')
            img = femaleUser;
        else
            img = unknownUser;
    }
    else{
        img = imageLink.value;
    }

    const newRow = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');

    col1.innerHTML = `<p>${studentName.value}</p>
                             <p>${gender}</p>
                             <p>${studentEmail.value}</p>
                             <p>${website.value}</p>
                             <p>${skillList}</p>`;
    col2.innerHTML = `<img src="${img}" alt="Profile Image" width="100px" heigth="100px">`;

    newRow.appendChild(col1);
    newRow.appendChild(col2);
    tableBody.appendChild(newRow);

    studentEnrolled = true;
    clearForm();

    if(studentEnrolled){
        document.querySelector("#student-details .alert").style.display = "none";
        document.querySelector("table").style.display = "table";
    }

}