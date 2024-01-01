const baseUrl = 'https://todos.routemisr.com/';
const apiKey = '6591da342681618c591ba3e2';
const getEndPoint = 'api/v1/todos/';
const addBtn = document.getElementById('addBtn');
const inputItem = document.getElementById('inputItem');


//////////////////the  date/////////////
(function getDate(){
    let currentDate = new Date();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    let monthNumber = currentDate.getMonth();
    let monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    let monthName = monthNames[monthNumber];
    let blackBox=''
    blackBox+=`<h2>${day}</h2>
    <p>${monthName}<br/>${year}</p>`
    document.querySelector('.dateNow').innerHTML=blackBox;
})();

/////////////////////////////////////

addBtn.addEventListener('click', () => {
    addToDo();
    inputItem.value = '';
});
inputItem.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addToDo();
        inputItem.value = '';
    }
});
/////////////////GET FUNCTION//////////////////////////
async function getToDo() {
    let data = await fetch(`${baseUrl}${getEndPoint}${apiKey}`);
    let { todos } = await data.json();
    display(todos);
}
/////////////////ADD FUNCTION//////////////////////////

async function addToDo() {
    const todo = {
        title: inputItem.value,
        apiKey: apiKey
    };
    let res = await fetch(`${baseUrl}${getEndPoint}`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        }
    });
    getToDo();
}
/////////////////MARK FUNCTION//////////////////////////

async function markedToDo(id) {
    let res = await fetch(`${baseUrl}${getEndPoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            todoId: id
        })
    });
}
/////////////////DELETE FUNCTION//////////////////////////

async function deleteToDo(id) {
    let res = await fetch(`${baseUrl}${getEndPoint}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            todoId: id
        })
    });
    getToDo();
    
}

/////////////////DISPLAY FUNCTION//////////////////////////

function display(list) {
    let blackBox = '';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];


        blackBox += `
        <div class=" position-relative ">
         
        <div class="todoItem  mb-2 overflow-hidden position-relative w-100">
        <input completed="${element.completed}" data-todo_id="${element._id}" type="checkbox" class=" checkItem form-check-input ms-3">
        <label  class="ps-1 form-check-label" for="todoInput">${element.title}</label>
       <span class="markedLine ${element.completed === true ? '' : 'd-none'}"></span>
        </div>
        <button data-todo_id="${element._id}" class=" deleteBtn btn fa-solid fa-eraser bg-danger mb-1 py-2"></button>
        
        </div>
        `;
    }
    // console.log(list);
    document.getElementById('list-items').innerHTML = blackBox;
/////////////////DELETE BUTTON//////////////////////////
    
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const todo_id = button.getAttribute('data-todo_id');
            deleteToDo(todo_id);
            getToDo()
        });
    });
    
    
/////////////////CHECK BUTTON//////////////////////////
    
    const checkboxes = document.querySelectorAll('.checkItem');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const todo_id = checkbox.getAttribute('data-todo_id');
            
            markedToDo(todo_id)
            if (completeTask = true) {
                checkbox.parentElement.querySelector('.markedLine').classList.remove('d-none');
            } else {
                checkbox.parentElement.querySelector('.markedLine').classList.add('d-none');
                
            }
        });
    });
    
}

getToDo();