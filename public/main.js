

// credit: https://stackoverflow.com/questions/66780265/need-a-form-field-to-be-shown-depending-on-the-results-of-another-field


document.querySelector("#entry-type").addEventListener("change", function(e) {
  let selectedEntry = document.querySelector('#entry-type').value;// this stores the value of what user select for entry type

  console.log("selected entry : " , selectedEntry)
  document.querySelector("#food-input").style.display = "none"
  document.querySelector("#sleep-input").style.display = "none"
  switch (selectedEntry) {
      case "Food" :
          console.log("Food Selected in switch case");
          document.querySelector("#food-input").style.display = "block"
          break;
      case "Sleep":
          console.log("Sleep Selected in switch case");
          document.querySelector("#sleep-input").style.display = "block"
          break;
      // default:
      //     alert("none");
      //     break;
  }
});
