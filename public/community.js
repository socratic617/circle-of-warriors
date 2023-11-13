var trash = document.getElementsByClassName("trash");
var favorite = document.getElementsByClassName("favorite")

Array.from(favorite).forEach(function(element) {
  console.log("adding favorite listener too : ", element);

    element.addEventListener('click', function(){
      console.log('FAVORITE UPDATE : ')
      console.log("this.id : " , this.id )
      console.log("before my fetch loggedInUserId :")
      console.log( document.querySelector('#loggedInUserId'))
      fetch('/community-page', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.id, //this(button) is what got triggered
          loggedInUserId: document.querySelector('#loggedInUserId').innerText
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});


console.log("trash elements : ", trash)

Array.from(trash).forEach(function(element) {
  console.log("adding delete listner too : ", element);

    element.addEventListener('click', function(){

      fetch('/community-page', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.id //this(button) is what got triggered
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});



