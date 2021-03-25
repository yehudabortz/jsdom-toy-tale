let addToy = false;
const toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  iterateThroughToys()
  gatherToyFormData()
});



function fetchAllToys() {
  return (fetch("http://localhost:3000/toys"))
    .then(response => response.json())
};

function iterateThroughToys() {
  fetchAllToys().then(toys => {
    toys.forEach(toy => {
      displayToy(toy)
    })
  })
}

function displayToy(toy) {

  let card = document.createElement('div')
  let h2 = document.createElement('h2')
  let p = document.createElement('p')
  let image = document.createElement('img')
  let button = document.createElement('button')

  card.className = "card"
  button.className = "like-btn"
  button.addEventListener("click", increaseLikes)
  button.setAttribute('id', toy.id)

  image.style.width ="100px"
  image.src = toy.image
  h2.innerText = toy.name
  p.innerText = toy.name
  button.innerText = toy.likes += button.innerText = " Likes"

  card.appendChild(h2)
  card.appendChild(image)
  card.appendChild(p)
  card.appendChild(button)

  toyCollection.appendChild(card)
}


function submitNewToy(toy) {
  configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
      })

  }
  fetch("http://localhost:3000/toys", configObject)
  .catch(function(error) {
    alert("Bad things! Ragnarők!");
    console.log(error.message);
  }); 
}


function increaseLikes(e) {
  e.preventDefault()

  let itemId = parseInt(e.target.id)

  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(e.target.innerText) + 1
    })
  };
  
  console.log(configObject);
  fetch(`http://localhost:3000/toys/${itemId}`, configObject)
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {
      console.log(object);
    })
    .then((likeObject => {
      e.target.innerText = `${parseInt(e.target.innerText) + 1} likes`;
  }))
};

function gatherToyFormData() {
  let toyName = document.querySelectorAll('.add-toy-form input')

  toyName[toyName.length -1 ].addEventListener("click", addNewToy)
}



function addNewToy(e) {
  e.preventDefault()
  console.log("hi")
  let formData = {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({
      name: e.target.parentElement.children[1].value,
      image: e.target.parentElement.children[3].value,
      likes: 0
    })
  }
  fetch("http://localhost:3000/toys", formData)
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {
      displayToy(object)
      console.log(object)
      e.target.parentElement.reset()
    })


}

