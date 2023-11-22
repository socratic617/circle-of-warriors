//using these two variables for readability and consistency for input and label elements for the Health Biometric fields 
let labelClass = "mb-2 text-sm font-medium text-gray-900 dark:text-white" //adding styling for label of input
let inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"// adding styling for input 

let row_id = 0;// creating variable to store row id index
let entryTypeOptions = ['Select Entry','Sleep', 'Food'] // creating an arrayto be able to access easier options / or add options easier 

document.querySelector('#add-entry').addEventListener('click', addRow)// adding an event listener to "add btn" to be able to trigger a new row with function add row 

function addRow(){// function that gets triggered as a callback when clicking button "add new row" 
    row_id++;//a unique identifier for each row to be able to add / delete row to update properly in server/backend 

    let newRow = document.createElement('div')//adds a new div for the row
    newRow.id = 'row-' + row_id// adds a new index for row-id aka row- + index
    newRow.className = "grid grid-cols-6 gap-4" //added style for new row to be broken up as a grid w 6 columns to mirror  og row 

    //in this div you are including the following
    let deleteBtn = createDeleteButton(row_id); 
    let timeEntry = createTimeInputs(row_id)
    let selectEntry = createSelectInputs("entry-type", "Entry Type", entryTypeOptions, row_id) //(name, labelText, options, index)

    //Purpose: delete selected row when you click the delete btn on that row
    deleteBtn.addEventListener('click', deleteSelectedRow)



    selectEntry.addEventListener('change', function(e){
        console.log("e: ")
        console.log(e)
        console.log('e.target:  ')
        console.log(e.target)
        console.log(e.target.id.split("-")[2])
        console.log(e.target.value)
        let index = e.target.id.split("-")[2]
        let selectedOption = e.target.value
        //entry-type-1, entry-type-25, entry-type-100

        let row = document.querySelector('#row-' + index);

        console.log("row.lastChild :")
        console.log(row.lastChild)

         console.log('row.lastchild. id :')
        console.log(row.lastChild.lastChild.id)
        // credit: https://stackoverflow.com/questions/34193751/js-remove-last-child
        if(row.lastChild.lastChild.id !== "entry-type-" + index){
            console.log('hi im inside the condition:')
            row.removeChild(row.lastChild);//the purpose for this is to remove the "lastChild" from the previous input field (it is wrapped in a div for each entry type to be able to be removed )
      
       }

        // if( row.lastchild)
        switch (selectedOption) {
            case "Food" :
                row.appendChild(createFoodInputs(index))
                console.log("Food Selected in switch case");
                //   document.querySelector("#food-input").style.display = "block"
                break;
            case "Sleep":
                console.log("Sleep Selected in switch case");
                //   document.querySelector("#sleep-input").style.display = "block"
                row.appendChild(createSleepInputs(index))
    
                break;
            // default:
            //     alert("none");
            //     break;
        }

    })

    newRow.appendChild(deleteBtn)//appending delete btn functionality to this div 
    newRow.appendChild(timeEntry)//appending delete btn functionality to this div 
    newRow.appendChild(selectEntry)//appending delete btn functionality to this div 

    
    
    document.querySelector('#biometric-rows').appendChild(newRow)// i added this to my div that exists in my ejs for journal entries so that it would show up on my pg ****without this, it would not show up*****

     

    // console.log("All of my entry type input fields with the same prefix for their id")
    // console.log( document.querySelectorAll('[id^="entry-type-"]'));// allows us to


}

    // DELETING ROW
    function deleteSelectedRow(e){
        console.log("e.target: ")
        console.log(e.target)
        console.log("e.target.id: ")
        console.log(e.target.id.split('-') ) //delete-2 -> row-2
        //   document.getElementById('delete-2' + )
        console.log("e.target.id.remove(): ")
        //   console.log(e.target.id.remove("row_" + rowIndex ))
        let rowIndex = e.target.id.split('-')[1];
        let rowToDelete = document.getElementById('row-' + rowIndex);
        rowToDelete.remove();
    }





// credit: https://stackoverflow.com/questions/66780265/need-a-form-field-to-be-shown-depending-on-the-results-of-another-field

//in this function I am listening for an event 'change' instead of 'click'. Where there is a change only when the user selects what value to display for the type of entries
document.querySelector("#entry-type-0").addEventListener("change", function(e) {
    let selectedEntry = document.querySelector('#entry-type-0').value;// this stores the value of what user select for entry type

    let index = 0;

    console.log("selected entry : " , selectedEntry)

    let row = document.querySelector('#row-' + index);

    // credit: https://stackoverflow.com/questions/34193751/js-remove-last-child
    row.removeChild(row.lastChild);//the purpose for this is to remove the "lastChild" from the previous input field (it is wrapped in a div for each entry type to be able to be removed )
  
    switch (selectedEntry) {
        case "Food" :
            row.appendChild(createFoodInputs(index))
            console.log("Food Selected in switch case");
            //   document.querySelector("#food-input").style.display = "block"
            break;
        case "Sleep":
            console.log("Sleep Selected in switch case");
            //   document.querySelector("#sleep-input").style.display = "block"
            row.appendChild(createSleepInputs(index))
  
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
    return createInputTemplate("sleep-input", index, [sleep]);
}


function createFoodInputs(index){//helper functions are functions to help assist me with code  

//this is going to let me create an input text field, like types text, number, 
// function create the inputs faster with my helper input. 
    let food = createInputTextField("food","Food Entry", index);
    let protein = createInputNumberField("protein","Protein Intake (g)", 0, 250, index)

    return createInputTemplate("food-input", index, [food,protein]);
}

        
function createInputTemplate(id, index, arrElements){

    let parentDiv = document.createElement('div')
    parentDiv.className = 'grid grid-cols-3 gap-4'

    for( let input of arrElements){
        //input = food
        parentDiv.appendChild(input)
    }

    let grandParentDiv = document.createElement('div')
    grandParentDiv.className = "col-span-3"
    grandParentDiv.id = id + "-" + index
    grandParentDiv.appendChild(parentDiv)
    

    return grandParentDiv;
}


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

function createDeleteButton(index){
    //  let path = document.createElement('path')
    // path.stroke ="currentColor"
    // path['stroke-linecap'] = "round"
    // path['stroke-linejoin']= "round"
    // path['stroke-width'] ="2"
    // path.d = "M1 1h16"
    
    // let svg = document.createElement('svg')
    // svg.className = "w-3 h-3"
    // svg['aria-hidden'] = "true"
    // svg.xmlns = "http://www.w3.org/2000/svg"
    // svg.fill = 'none'
    // svg.viewBox = "0 0 18 2"
    // svg.appendChild(path)


    let removeBtn = document.createElement('button')
    removeBtn.className = "mr-4 inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    removeBtn.type = 'button'
    removeBtn.id = "delete-" + index
    // removeBtn.appendChild(svg)

    let removeBtnDiv = document.createElement('div')
    removeBtnDiv.className = "mt-8 ml-6 pl-10 items-center justify-center"
    removeBtnDiv.id = "delete-" + index
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
    console.log('options : inside create select inputs :  ', options)
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
    selectParentDiv.appendChild(select)

    return selectParentDiv;
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



