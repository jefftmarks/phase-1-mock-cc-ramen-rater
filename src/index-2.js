//Menu elements
const menu = document.getElementById('ramen-menu');

//Display elements
const displayImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name');
const restaurant = document.querySelector('.restaurant');
const rating = document.getElementById('rating-display');
const comment = document.getElementById('comment-display');

//GET function
function getResource(url) {
   return fetch(url)
    .then(res => res.json())
}

//DELETE function
function deleteResource(url) {
    return fetch(url, {
        method: 'DELETE'
    })
     .then(res => res.json())
 }

//POST function
function postResource(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
}

//PATCH function
function patchResource(url, data) {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
}

//Invoke GET on page load
getResource('http://localhost:3000/ramens')
.then(ramenData => {
    ramenData.forEach(ramen => renderMenu(ramen));
    displayRamen(ramenData[0]);
})
.catch(e => console.error(e));

//Function to render menu
let activeRamen = null;

function renderMenu(ramen) {
    const menuImage = document.createElement('img');

    menuImage.src = ramen.image;
    menuImage.id = `menu-${ramen.id}`;
    menuImage.className = 'menu-image';

    menu.append(menuImage);

    menuImage.addEventListener('click', () => {
        getResource(`http://localhost:3000/ramens/${ramen.id}`)
        .then(ramen => displayRamen(ramen));
        activeRamen = ramen.id;
    })
}

//Function to display ramen
function displayRamen(ramen) {
    displayImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}

//Form setup
const submitForm = document.getElementById('new-ramen');
submitForm.addEventListener('submit', (event) => {
    handleSubmit(event);
    submitForm.reset();
});

//Function to handle submit
function handleSubmit (event) {
    event.preventDefault();

    const ramen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target.comment.value
    };

    postResource('http://localhost:3000/ramens', ramen)
    .then(ramen => renderMenu(ramen))
    .catch(e => console.error(e));
}

//Function to update ramen
const editForm = document.getElementById('edit-ramen');
editForm.addEventListener('submit', (event) => {
    handleUpdate(event)
    editForm.reset();
});

//Function to handle update
function handleUpdate(event) {
    event.preventDefault();

    const ramenUpdate = {
        rating: event.target.rating.value,
        comment: event.target.new_comment.value
    }

    patchResource(`http://localhost:3000/ramens/${activeRamen}`, ramenUpdate)
    .then(ramen => displayRamen(ramen))
    .catch(e => console.error(e));
}

//Add delete button
const deleteBtn = document.createElement('button');
deleteBtn.innerText = 'Delete Ramen';
deleteBtn.style.margin = '0 auto';
deleteBtn.style.marginTop = '4px';
editForm.appendChild(deleteBtn);

//Add event listener to delete button
deleteBtn.addEventListener('click', () => handleDelete())

//Function to handle delete
function handleDelete() {
    deleteResource(`http://localhost:3000/ramens/${activeRamen}`)
    .then(() => {
        document.getElementById(`menu-${activeRamen}`).remove();
        replaceDisplay();
    })
}

//Function to replace display image after a delete
function replaceDisplay() {
    getResource('http://localhost:3000/ramens')
    .then(ramenData => displayRamen(ramenData[0]))
}

