let addBtn = document.querySelector(".add-btn");
let input = document.querySelector(".input-text");


function save(){
   if(input.value !== ""){
     task={
        text : input.value,
        done :false
    }
    let saved = JSON.parse(localStorage.getItem("taskList")) || [];
    saved.push(task);
    localStorage.setItem("taskList", JSON.stringify(saved));
    addText(task);
    input.value = "";
   }
}
function  addText(task){
    let display = document.querySelector(".text-section");
    let contanier = document.createElement("div");
    let samiContanier = document.createElement("div");
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.done;
    let span = document.createElement("span");
    span.innerText = task.text;
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    samiContanier.appendChild(checkBox);
    samiContanier.appendChild(span);
    samiContanier.classList.add("sami-contanier");
    contanier.appendChild(samiContanier);
    contanier.appendChild(deleteBtn);
    contanier.classList.add("contanier");
    display.appendChild(contanier);

    // copy paste
    checkBox.addEventListener("change",()=>{
         task.done = checkBox.checked;
        let saved =  JSON.parse(localStorage.getItem("taskList")) || [];
        let index = saved.findIndex(t => t.text === task.text); // simply we are getting here an index only
        if ( index !== -1){
            saved[index].done = task.done;
            localStorage.setItem("taskList", JSON.stringify(saved));
        }
    });
     deleteBtn.addEventListener("click", ()=>{
        contanier.remove();
        let saved = JSON.parse(localStorage.getItem("taskList")) || [];
        let update = saved.filter(t => t.text !== task.text);
        localStorage.setItem("taskList", JSON.stringify(update));
    });
}

function loadWindow(){
    let saved  = JSON.parse(localStorage.getItem("taskList")) || [];
    saved.forEach(task =>{
        addText(task);
    });
};

window.addEventListener("load", loadWindow);
addBtn.addEventListener("click", save);