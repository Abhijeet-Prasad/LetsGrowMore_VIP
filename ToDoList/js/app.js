const taskInput= document.querySelector('#task_text'),
      Tasks=document.querySelector('.taskList ul');

var taskNo = (Tasks.childNodes.length-1)/2 + 1;

function addTask(){
    if(taskInput.value){
        var taskID = "task"+taskNo;

        let newTask = document.createElement('li');
        newTask.classList.add('task-container','d-flex');

        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.classList.add('checkbox');
        newCheckbox.onclick = function (){
            changeStatus(this.parentNode)
        };

        let newTaskInput = document.createElement('input');
        newTaskInput.type = 'text';
        newTaskInput.classList.add('task');
        newTaskInput.id = taskID;
        newTaskInput.value = taskInput.value;

        let threeDots = document.createElement('i');
        threeDots.classList.add('bi', 'bi-three-dots', 'option');
        threeDots.onclick = function (){
            showTaskOptions(this.nextElementSibling)
        }

        let optionsDiv = document.createElement('div');
        optionsDiv.classList.add('task-options');

        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-button');
        editBtn.innerHTML = `<i class="bi bi-pen"></i>Edit`;
        editBtn.onclick = function (){
            enableEdit(this.parentNode.parentNode)
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-button');
        deleteBtn.innerHTML = `<i class="bi bi-x-lg"></i>Delete`;
        deleteBtn.onclick = function (){
            deleteTask(this)
        };

        optionsDiv.append(editBtn,deleteBtn);

        newTask.append(newCheckbox, newTaskInput, threeDots, optionsDiv);

        Tasks.appendChild(newTask);
        taskNo += 1;
        taskInput.parentNode.reset();
    }
}


function deleteTask(el){
    Tasks.removeChild(el.parentNode.parentNode);
}


function changeStatus(el){
    if(el.classList.contains('edit-mode')){
        el.classList.remove('edit-mode');
        el.children[1].setAttribute('readonly', true);
    }
    el.classList.toggle('task-complete')
}

function enableEdit(el){
    let taskContainer = document.querySelectorAll('.task-container');

    el.children[3].classList.remove('show');

    taskContainer.forEach(x => {
        if(x.classList.contains('edit-mode') && x != el){
            x.classList.remove('edit-mode')
        }
    })

    if(el.classList.contains('edit-mode')){
        disableEdit(el)
    }
    else{
        if(el.children[0].checked){
            changeStatus(el);
            el.children[0].checked = false;
        }

        el.classList.add('edit-mode');
        el.children[1].removeAttribute('readonly');
        el.children[1].focus();
        let val = el.children[1].value;
        el.children[1].value = '';
        el.children[1].value = val;
    }
}

function disableEdit(el){
    el.classList.remove('edit-mode');
    el.children[1].setAttribute('readonly', true);
    if(el.children[0].checked){
        changeStatus(el);
        el.children[0].checked = false;
    }
}

function showTaskOptions(el){
    let taskOptions = document.querySelectorAll(".task-options");

    taskOptions.forEach(item =>{
        if(item.classList.contains('show') && item != el){
            item.classList.remove('show');
        }
    })
    el.classList.toggle('show');
}


document.addEventListener('keydown', (el)=>{
    if(el.keyCode == 13){
        if(el.target == taskInput){
            addTask();
        }

        else if(el.target.classList.contains('task')){
            disableEdit(el.target.parentNode)
        }
    }
})