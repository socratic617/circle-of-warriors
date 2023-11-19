//using these two variables for readability and consistency for input and label elements for the Health Biometric fields 
let labelClass = "mb-2 text-sm font-medium text-gray-900 dark:text-white"
let inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

let row_id = 0;

document.querySelector('#add-entry').addEventListener('click', addRow)
function addRow(){
    row_id++;
    let newRow = document.createElement('div')

    let deleteBtn = createDeleteButton();
    let timeEntry = createTimeInputs(row_id)
    let selectEntry = createSelectInputs("entry-type", "Entry Type", )// WHERE I LEFT OFF INSERT LAST PARAMS INTO THIS , add array then index into it 


}

function createDeleteButton(){
     let path = document.createElement('path')
    path.stroke ="currentColor"
    path['stroke-linecap'] = "round"
    path['stroke-linejoin']= "round"
    path['stroke-width'] ="2"
    path.d = "M1 1h16"
    
    let svg = document.createElement('svg')
    svg.className = "w-3 h-3"
    svg['aria-hidden'] = "true"
    svg.xmlns = "http://www.w3.org/2000/svg"
    svg.fill = 'none'
    svg.viewBox = "0 0 18 2"
    svg.appendChild(path)


    let removeBtn = document.createElement('button')
    removeBtn.className = "mr-4 inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    removeBtn.type = 'button'
    removeBtn.appendChild(svg)

    let removeBtnDiv = document.createElement('div')
    removeBtnDiv.className = "mt-8 ml-6 pl-10 items-center justify-center"
    removeBtnDiv.appendChild(removeBtn)

    return removeBtnDiv;
}


function createTimeInputs(index){//helper functions are functions to help assist me with code  
    let timeEntryLabel = document.createElement('label')
    timeEntryLabel.className = labelClass
    timeEntryLabel.innerText = "Time"
    timeEntryLabel.for = "time-" + index 

    let timeEntryInput = document.createElement('input')
    timeEntryInput.className = inputClass
    timeEntryInput.type = 'time'
    timeEntryInput.id = "time-" + index 
    timeEntryInput.name = "time-" + index 

    let timeEntryParentDiv = document.createElement('div')
    timeEntryParentDiv.className = "mb-6"
    timeEntryParentDiv.appendChild(timeEntryLabel)
    timeEntryParentDiv.appendChild(timeEntryInput)

    document.createElement('div').appendChild(timeEntryParentDiv)

    return timeEntryParentDiv;
}


function createSelectInputs(name, labelText, options, index){

    let select = document.createElement('select')
    select.className = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    select.id = name + "-" + index 
    select.name = name + "-" + index
    select.required = true

    //create a for loop to select an option
    for(let i = 0; i < options.length; i++){
        let option = document.createElement('option') 
        option.innerText = options[i]    
        
        if (i === 0 ){ 
     
            option.value = ''
            option.selected = true
            
        }
        else{
            
            option.value = options[i]
        }

        select.appendChild(option)
    }
    let selectLabel = document.createElement('label')
    selectLabel.for = name + "-"+ index
    selectLabel.className = labelClass
    selectLabel.innerText = labelText
    let selectParentDiv = document.createElement('div')
    selectParentDiv.appendChild(selectLabel)

    return selectParentDiv;
}




// credit: https://stackoverflow.com/questions/66780265/need-a-form-field-to-be-shown-depending-on-the-results-of-another-field

//in this function I am listening for an event 'change' instead of 'click'. Where there is a change only when the user selects what value to display for the type of entries
document.querySelector("#entry-type-0").addEventListener("change", function(e) {
    let selectedEntry = document.querySelector('#entry-type-0').value;// this stores the value of what user select for entry type

    let index = 0;

    console.log("selected entry : " , selectedEntry)

    let row = document.querySelector('#row-' + index);

    // credit: https://stackoverflow.com/questions/34193751/js-remove-last-child
    row.removeChild(row.lastChild);
  
    switch (selectedEntry) {
        case "Food" :
            row.appendChild(createFoodInputs(index))
            console.log("Food Selected in switch case");
            //   document.querySelector("#food-input").style.display = "block"
            break;
        case "Sleep":
            console.log("Sleep Selected in switch case");
            //   document.querySelector("#sleep-input").style.display = "block"
            // row.appendChild(createFoodInputs(index))
  
            break;
        // default:
        //     alert("none");
        //     break;
    }
});

function createSleepInputs(index){//helper functions are functions to help assist me with code  

//this is going to let me create an input text field, like types text, number, 
// function create the inputs faster with my helper input. 
    let sleep = createInputNumberField("sleep","Hours Slept (hrs)", 0, 24, index)//index is row number

    let sleepParentDiv = document.createElement('div')
    sleepParentDiv.className = 'grid grid-cols-3 gap-4'
    sleepParentDiv.appendChild(sleep)

    let sleepGrandParentDiv = document.createElement('div')
    sleepGrandParentDiv.className = "col-span-3"
    sleepGrandParentDiv.id = "sleep-input"
    sleepGrandParentDiv.appendChild(sleepParentDiv)

    return sleepGrandParentDiv;
}


function createFoodInputs(index){//helper functions are functions to help assist me with code  

//this is going to let me create an input text field, like types text, number, 
// function create the inputs faster with my helper input. 
    let food = createInputTextField("food","Food Entry", index);
    let protein = createInputNumberField("protein","Protein Intake (g)", 0, 250, index)

    let foodParentDiv = document.createElement('div')
    foodParentDiv.className = 'grid grid-cols-3 gap-4'
    foodParentDiv.appendChild(food)
    foodParentDiv.appendChild(protein)

    let foodGrandParentDiv = document.createElement('div')
    foodGrandParentDiv.className = "col-span-3"
    foodGrandParentDiv.id = "food-input"
    foodGrandParentDiv.appendChild(foodParentDiv)

    return foodGrandParentDiv;
}

// console.log("Food input:")
// console.log(typeof createFoodInputs())





  /* This function is being used to create a Input Text Field template for label, input, and parent div elements for entry types. Pros: readiability and clarity, writing out less lines of code
   * @param string name: target element attributes:   for, id, and name (corresponding to each entry type)
   * @param string  labelText: targets the innerText of these elements
   * @param integer index: targets which entry type row to edit/remove
   * @return  Object parentDiv: is an html element we nest a label and input element into (grouped all together)
   * */
function createInputTextField(name,labelText, index){


    let parentDiv = document.createElement('div')
    let entryLabel = document.createElement('label')
    entryLabel.className = labelClass
    entryLabel.innerText = labelText
    entryLabel.for = name + "-" + index
    

    let entryInput = document.createElement('input')
    parentDiv.appendChild(entryInput)
    entryInput.className = inputClass
    entryInput.name= name + "-" + index
    entryInput.id = name  + "-" + index
    entryInput.type ="text"

    
    parentDiv.className = "col-span-2"
    parentDiv.appendChild(entryLabel)
    parentDiv.appendChild(entryInput)

    return parentDiv;
}

  /* This function is being used to create a Input Number Field template for label, input, min attribute, max attribute and parent div elements for entry types. Pros: readiability and clarity, writing out less lines of code
   * @param string name: target element attributes:   for, id, and name (corresponding to each entry type)
   * @param string  labelText: targets the innerText of these elements
   * @param integer min: sets the value for min attribute
   * @param integer max: sets the value for max attribute
   * @param integer index: targets which entry type row to edit/remove
   * @return  Object parentDiv: is an html element we nest a label and input element into (grouped all together)
   * */
function createInputNumberField(name,labelText, min, max, index){

    let entryLabel = document.createElement('label')
    entryLabel.className = labelClass
    entryLabel.for = name + "-" + index
    entryLabel.innerText = labelText

    let entryInput = document.createElement('input')
    entryInput.className = inputClass
    entryInput.type = 'number'
    entryInput.id = name + "-" + index
    entryInput.name = name + "-" + index
    entryInput.min = min 
    entryInput.max = max

    let parentDiv = document.createElement('div')
    parentDiv.appendChild(entryLabel)
    parentDiv.appendChild(entryInput)

    return parentDiv;

}





/* function createSleepInputs(){//helper functions are functions to help assist me with code  
    let sleepEntryLabel = document.createElement('label')
     sleepEntryLabel.className = labelClass
}

function dateFoodInputs(){//helper functions are functions to help assist me with code  
    let foodEntryLabel = document.createElement('label')
    foodEntryLabel.className = labelClass
    let entryLabel = document.createElement('input')
    entryLabel.className = inputClass
} */



