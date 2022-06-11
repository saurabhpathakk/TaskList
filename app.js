//declare UI variables
const form=document.querySelector('#task-form');
const taskList=document.querySelector(".collection");
const clearbtn=document.querySelector(".clear-tasks");
const filter=document.querySelector("#filter");
const taskInput=document.querySelector("#taskinp");

//load eventlisteners
loadEventListeners();

function loadEventListeners()
{
    //DOM content loader
    document.addEventListener("DOMContentLoaded",gettasks);
    //Add tasks 
    form.addEventListener('submit',addtask);
    //Remove tasks
    taskList.addEventListener("click",removetask);
    //Clear tasks
    clearbtn.addEventListener("click",cleartasks);
    //filter tasks
    filter.addEventListener("keyup",filterTasks);
}

//Get Tasks from LS
function gettasks()
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task)
    { 
            //create li element
    let li=document.createElement("li");
    li.className='collection-item';
    li.appendChild(document.createTextNode(task));

    //create a link
    let link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);


    });
}

//Add Task
function addtask(e)
{
    if(taskInput.value==='')
    alert("Add a task"); 


    //create li element
    let li=document.createElement("li");
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    //create a link
    let link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    //Store task in LS
    storetaskinLS(taskInput.value);

    taskInput.value='';

    e.preventDefault();
}

//Store task in Local storage
function storetaskinLS(task)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removetask(e)
{
    if(e.target.parentElement.classList.contains("delete-item"))
    {
        if(confirm("Are you sure you want to delete item?"))
        {
            e.target.parentElement.parentElement.remove();
            removetaskfromlocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removetaskfromlocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index)
    {
        if(taskItem.textContent==task)
        {
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear tasks
function cleartasks(e)
{
    //Method-1
   // taskList.innerHTML='';

   //Method-2
   while(taskList.firstChild)
   {
       taskList.removeChild(taskList.firstChild);
   }
}

//Filter Tasks
function filterTasks(e)
{
    let text=e.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(
        function(task)
        {
            const item=task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1)
            {
            task.style.display='block';
            }
            else
            {
            task.style.display='none';
            }
        }
    );
}