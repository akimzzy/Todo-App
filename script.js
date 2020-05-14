/////////////////////////////// THEME SWITCHER ///////////////////////////////////////////////////////////////////


const ThemeSwitcher = (() => {

    // Checkbox container and checkbox from the DOM
    const checkboxContainer = document.querySelector(".theme");
    const checkbox = checkboxContainer.querySelector("input");
    
    // Function to Switch color when checkbox is checked and unchecked
    const darkMode = (property, LMC, DMC) => {
        checkbox.checked ? 
        document.documentElement.style.setProperty(property, DMC) : 
        document.documentElement.style.setProperty(property, LMC);
    };
    
    // Color variable name, light Mode Color and Dark Mode Color
    const color = [
        {name: "--purple", light: "#52154E", dark: "#ffffff"},
        {name: "--blue", light: "#111344", dark: "#ffffff"}, 
        {name: "--white", light: "#ffffff", dark: "#000000"},
        {name: "--grey", light: "#eeeeee", dark: "#1E1E1E"}
    ];
    
    // Add eventListener to the checkbox 
    checkbox.addEventListener("change", () => {
        color.forEach(cur => darkMode(cur.name, cur.light, cur.dark))
    }); 
})();




/////////////////////////////// HAMBURGER SLIDER /////////////////////////////////////////////////////////////////

const HamburgerSlider = (() => {

    // Hamburger, list section and task section from the DOM
    const hamburger = document.querySelector(".hamburger");
    const list = document.querySelector(".list");
    const task = document.querySelector(".task");
    
    // add eventListner to toggle "hide" class on list section when hamburger is clicked
    hamburger.addEventListener("click", () => {
        list.classList.toggle("hide");
    })
    
    // add eventListner to remove "hide" class from list section when task section is clicked
    task.addEventListener("click", () => {
        if(list.className.includes("hide")) {
            list.classList.remove("hide")
        }
    })

    // add eventListner to remove "hide" class from list section when a task is selected
    list.querySelector(".list__container").addEventListener("click", (e) => {
        if(e.target.tagName !== "BUTTON") {
            list.classList.remove("hide")
        }

    })
})()




/////////////////////////////// TODO APP /////////////////////////////////////////////////////////////////


// Class object for creating new list

class List{
    constructor(name){
        this.name = name;   
        this.ID = this.id();
        this.date = `${this.newDate().day}/${this.newDate().month + 1}/${this.newDate().year}`;
    }

    // Random id for each list item created
    id() {
        return Math.floor(Math.random() * 200000)
    };

    // Current date for each list item created
    newDate() {
        let date = new Date();
        return {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth()
        };
    }
}


// Class object for creating new task

class task {
    constructor(name) {
        this.name = name;
        this.ID = this.id();
        this.date = `${this.newDate().day}/${this.newDate().month + 1}/${this.newDate().year}`;
        this.time = `${this.newDate().hour}:${this.newDate().minutes}`
    }

    // Random id for each task item created
    id() {
        return Math.floor(Math.random() * 200000) + 200000;
    };

    // Current date and time for each task item created
    newDate() {
        let date = new Date();
        return {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth(),
            hour: date.getHours(),
            minutes: date.getMinutes()
        };
    }

}



// selected variable which will b change in proportion to the list item selected
let selectedItem;


// ALL  List section function
const list = (() => {

    // Input section of the List section from the DOM
    const listInput = document.querySelector(".list__input");
    const ListContainer = document.querySelector(".list__container");
    
    // Function to get input Data from webPage
    getInput = (e) => {
        let newList, date, name, id, input;

        // Gets inputed value/content from the webpage
        input = listInput.querySelector("input").value;

        //  checks if inputed value/content isn't empty
        if (input.trim() !== "") {

            // creates new list class and save it in a variable
            newList = new List(input);

            // Creates new date from the newlist above via the list class decleared earlier
            date = newList.date;

            // Saved new name from the newlist above via the list class decleared earlier
            name = newList.name;

            // Saved new id from the newlist above via the list class decleared earlier
            id = newList.ID;

            // Display the newly created list item in the webpage 
            display(name, id, date);
        }
    }

    // Saves the newly created list item to LocalStorage
    const save = (value, id, date) => {
        let TodoList, tasks;

        // if "TodoList" is not in LocalStorage, create new TodoList array
        if (localStorage.getItem("TodoList") === null) {
            TodoList = [];
        } 
        // If it "TodoList" is in LocalStorage, extract it to TodoList 
        else {
            TodoList = JSON.parse(localStorage.getItem("TodoList"));
        }

        // Save id in tasks // th id will be used to make refrence to the parent(ie List item)
        tasks = [id];
        
        // Save append the newly created {value, id, date and task} to TodoList
        TodoList.push({value, id, date, tasks});

        // Save TodoList to localStorage (Replaces the current "Todolist" in localStorage if it exist)
        localStorage.setItem("TodoList", JSON.stringify(TodoList));
    }

    // Display contents saved to localStorage on the webpage (Function)
    const getSaved = () => {
        let TodoList;

        // if "TodoList" is not in LocalStorage, create new TodoList array
        if (localStorage.getItem("TodoList") === null) {
            TodoList = [];
        } 

        // If it "TodoList" is in LocalStorage, extract it to TodoList
        else {
            TodoList = JSON.parse(localStorage.getItem("TodoList"));
        }

        // Create DOM display for each list object saved in local storage 
        TodoList.forEach(cur => {
            // Create new "div" element
            const newItem = document.createElement("div");

            // Add class to the element created
            newItem.classList.add("list__item");

            // Add id to the element created
            newItem.setAttribute("id", `${cur.id}`)
        
            // Append the element created with nodes thats manipulated with each object values
            newItem.innerHTML = ` <div class="list__name">${cur.value}</div><div class="list__date">${cur.date}</div><button>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
            </button> `
    
            // Append ListContainer with newItem(element created) 
            ListContainer.appendChild(newItem);
        })
    }
    
    // Function to display newly created list immediately
    const display = (newName, newId, newDate) => {

        // Create new "div" element
        const newItem = document.createElement("div");

        // Add class to the element created
        newItem.classList.add("list__item");

        // Add id to the element created
        newItem.setAttribute("id", `${newId}`)
    
         // Append the element created with nodes thats manipulated with each object values
        newItem.innerHTML = `<div class="list__name">${newName}</div><div class="list__date">${newDate}</div><button>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </button>`

        // save it to localStorage
        save(newName, newId, newDate);

        // Append ListContainer with newItem(element created) 
        ListContainer.appendChild(newItem);

        // Clear Input Field
        listInput.querySelector("input").value = "";

        // Set focus to input box
        listInput.querySelector("input").focus();
    }


    // Functiom to delete saved list
    const deleteSaved = (todo) => {
        let TodoList;

        // if "TodoList" is not in LocalStorage, create new TodoList array
        if (localStorage.getItem("TodoList") === null) {
            TodoList = [];
        }
        
        // If it "TodoList" is in LocalStorage, extract it to TodoList
        else {
            TodoList = JSON.parse(localStorage.getItem("TodoList"));
        }

        // Create an empty array
        let allIds = []; 

        // Loop through TodoList to extract all ids to allIds above
        TodoList.forEach(cur => {
            allIds.push(cur.id);
        })

        // convert current todo item to Number and save it to todoIndex
        const todoIndex = Number(todo.id);

        // Delete the current from TodoList
        TodoList.splice(allIds.indexOf(todoIndex), 1);

        // Save TodoList to localStorage (Replaces the current "Todolist" in localStorage if it exist)
        localStorage.setItem("TodoList", JSON.stringify(TodoList));
        
    }

    // Function to add "selected" class to list items on click
    const addSelected = (element) => {

        // Select all list Items from DOM
        const DOMItems = [...document.querySelectorAll("." + element.classList[0])];
        
        // save the id of the selected item to a variable
        const id = element.id;

        // add "selected" class to the selected item 
        document.getElementById(id).classList.add("selectedList");

        // save all items to n except the the selected item 
        const n = DOMItems.filter(cur => {
            if (cur.id !== id) {
                return cur;
            }
        })

        // Remove "selected" class from all the n
        n.forEach(cur => {
            cur.classList.remove("selectedList");
        })
    }
    
    // function to delete list Item
    const deleteListItem = (e) => {

        const clearElement = () => {
            const allTaskItems = [...document.querySelectorAll(".task__item")];
            allTaskItems.forEach(cur => {
                cur.remove()
            })
        }

        // save target to item
        const item = e.target;

        // if the target is BUTTON and the svg class is "trash" 
        if(item.tagName === "BUTTON" && item.children[0].classList[0] === "trash"){
            
            // Select the parent element
            const list = item.parentElement;
    
            // Delete list from local storage
            deleteSaved(list)
    
            // delete list from the page
            list.remove()     
            clearElement()
        }

        
        

        // if item has id
        if(item.id) {

            // save item ID to selectedItem variable decleared earlier
            selectedItem = Number(item.id)
            
            // add Selected class to item
            addSelected (item);
            
            // Display selcted item title on task Title
            document.querySelector(".task__title").innerHTML = item.querySelector(".list__name").textContent;
           
        }
        
    }
    
    // eventlisteners to call functions
    listInput.querySelector("button").addEventListener("click", getInput);
    listInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            getInput()
        }
       
    })
    ListContainer.addEventListener("click", deleteListItem);
    document.addEventListener("DOMContentLoaded", getSaved)
})();


// ALL  Task section function
const Task = (() => {

    // Get DOM elements
    const taskInput = document.querySelector(".task__input");
    const taskList = document.querySelector(".task__list");
    const filter = document.getElementById("filter");
    const ListContainer = document.querySelector(".list__container");

    // function to get input from webpage
    const getInput = () => {
        let newTask, date, name, time, newID, input;

        // save inputed value to input variable
        input = taskInput.querySelector("input").value;
    
        // if input is not empty and selectedItem variable is not empty 
        if (input.trim() !== "" && selectedItem) {

            // create new task item from task class
            newTask = new task(input);

            // save all needed var from the created task to respective variable
            date = newTask.date;
            name = newTask.name;
            newID = newTask.ID;
            time = newTask.time;
            
            // display inputed tasks on the webpage
            display(name, newID, date, time);

            // clear input field
            taskInput.querySelector("input").value = "";

            // set input field to fucus
            taskInput.querySelector("input").focus()
        }
    }

    // save  task to respective list item in local storage
    const save = (value, id, date, time, pID) => {
        let TodoList, tasks;

        // Get TodoList from localStorage
        if (localStorage.getItem("TodoList") !== null) {
            TodoList = JSON.parse(localStorage.getItem("TodoList"));
        }

        // save new task to Todolist
        const check = TodoList.filter(obj => {    
            if (obj.id === pID) {
                return obj.tasks.push({value, id, date, time})
            } 
        });

        // Save TodoList to localStorage 
        localStorage.setItem("TodoList", JSON.stringify(TodoList));
    }

    // Display task on the webpage immedialtely
    const display = (NAME, ID, DATE, TIME) => {

        // Get task list container from the DOM
        const container = document.querySelector(".task__list");

        // create new "div" element
        const element = document.createElement("div");

        // Set id to the created element
        element.setAttribute("id", `${ID}`);

        // Add class to the selected element
        element.classList.add("task__item");

         // Append the element created with nodes that's manipulated 
        element.innerHTML = `<span class="task__item--name">${NAME}</span>
            <span class="task__item--date">${DATE} | ${TIME}</span>
            <span class="task__item--checkboxContainer">
            <input type="checkbox">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="task__checked" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
            </span>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="task__trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>`   
    
        // Append container element with the created element 
        container.appendChild(element);

        // save it to local Storage
        save(NAME, ID, DATE, TIME, selectedItem);
    }

    // Function to delete task from local storage
    const deleteSaved = (taskEl) => {
        let TodoList;

        // Get saved "TodoList" from localStorage
        if (localStorage.getItem("TodoList") === null) {
            TodoList = [];
        } else {
            TodoList = JSON.parse(localStorage.getItem("TodoList"));
        }

        // save "TodoList" from local storage to allP
        let allP = JSON.parse(localStorage.getItem("TodoList"));
        
        // Create an empty arry for all item ids
        let allPIds = [];
        
        // save all item ids to allPIds
        allP.forEach(cur => {
            allPIds.push(cur.tasks[0]);
            cur.tasks.shift();
          
        })


        // Get index of all selectedItem from all allPIds 
        const indexOfItem = allPIds.indexOf(selectedItem);
       
        // Map through all the tasks of selected item and return id of all tasks 
        let allTaskId = TodoList[indexOfItem].tasks.map(cur => {
            return cur.id
        })

        // Get index of selected task from allTaskId
        const indexOfTask = allTaskId.indexOf(Number(taskEl.id));

        // Delete task from respective TodoList objects
        TodoList[indexOfItem].tasks.splice(indexOfTask, 1);

        // Save TodoList to localStorage (Replaces the current "Todolist" in localStorage if it exist)
        localStorage.setItem("TodoList", JSON.stringify(TodoList));
        
    }

    //  Function to delete task
    const deleteTaskItem = (e) => {
        const element = e.target;

        //  If selected element class include "task__trash"
        if (element.classList[0] === "task__trash") {

            // save the parent element to item
            const item = element.parentElement;

            // add animation class to element
            item.classList.add("shrink");

            // Remove item from webpage when transitiion ends
            addEventListener("transitionend", () => item.remove());
            
            // delete it from local storage
            deleteSaved(item)
            
        } 
        // if selected item type is "checkbox"
        else if (element.type === "checkbox") {
            
            // selected parent element 
            const item = element.parentElement.parentElement;
            
            // toggle "lighten" class on check and uncheck
            item.classList.toggle("lighten");
        }
    }

    // Filter task Function
    const filterTask = (e) => {
        // Save all task items to items variable
        let items = [...document.querySelectorAll(".task__item")];
        console.log(e.target.children)

        // Display all when value is all
        if (e.target.value === "All") {
            items.forEach(cur => {
                cur.style.display = "grid";
            })
        }
        
        // Display checked items when value is Completed
        else if (e.target.value === "Completed") {
            items.forEach(cur => {
                if(cur.classList.contains("lighten")) {
                    cur.style.display = "grid";
                } else {
                    cur.style.display = "none"
                }
            })
        }
        
        // Display unchecked when value is pending
        else if (e.target.value === "Pending") {
            items.forEach(cur => {
                if(cur.classList.contains("lighten")) {
                    cur.style.display = "none";
                } else {
                    cur.style.display = "grid"
                }
            })
        }

    }

    // display saved data on webpage from localStorage
    const getSaved = () => {

        // Clear all remove all task items
        clearElement()

        // Get all list items from localStorage
        let TodoList;
        if (localStorage.getItem("TodoList") !== null) {
            TodoList = JSON.parse(localStorage.getItem("TodoList"));
        }

        // Get selected item from local storage
        const check = TodoList.filter(cur => {
            if (cur.id === selectedItem) {
                return cur;
            }
        });

        // Remove Parent ID of selected item from it tasks (pID)
        const filtered = check[0].tasks.filter(cur => {
            if (typeof(cur) !== "number") {
                return cur;
            }
        })
        
        // loop through each task and display it on the webpage
        filtered.forEach(cur => {
            const container = document.querySelector(".task__list");

            const element = document.createElement("div");
            element.setAttribute("id", `${cur.id}`);

            element.classList.add("task__item");

            element.innerHTML = `<span class="task__item--name">${cur.value}</span>
                <span class="task__item--date">${cur.date} | ${cur.time}</span>
                <span class="task__item--checkboxContainer">
                <input type="checkbox">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="task__checked" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                </span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="task__trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>`   
        
            container.appendChild(element);
        })
        
    }

    // Function to clear elements from tasks container
    const clearElement = () => {
        const allTaskItems = [...document.querySelectorAll(".task__item")];
        allTaskItems.forEach(cur => {
            cur.remove()
        })
    }
    

    // Function to display task of items
    const renderTasks = (e) => {    
        const item = e.target;

        if(item.id) {            
            getSaved()   
        }
        
    }
    

    ListContainer.addEventListener("click", renderTasks);
    taskInput.querySelector("button").addEventListener("click", getInput);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            getInput()
        }
       
    })
    taskList.addEventListener("click", deleteTaskItem);    
    filter.addEventListener("click", filterTask)
    
})();

