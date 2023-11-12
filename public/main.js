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






// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash-o");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUpCount = this.parentNode.parentNode.childNodes[5].innerText
//         console.log('thumbUpCount(before) : ' + thumbUpCount)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             name: name,
//             msg: msg,
//             thumbUp:parseInt(thumbUpCount),
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText;
//         const msg = this.parentNode.parentNode.childNodes[3].innerText;
//         const thumbDownCount = this.parentNode.parentNode.childNodes[5].innerText;
//         console.log('thumbDownCount(before) : ' + thumbDownCount);
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             name: name,
//             msg: msg,
//             thumbDown: parseInt(thumbDownCount)
//           }),
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
