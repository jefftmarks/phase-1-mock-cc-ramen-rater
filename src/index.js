document.addEventListener('DOMContentLoaded', () => {

//Fetch request
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(ramenData => ramenData.forEach((ramen) => {
    renderMenu(ramen);
    renderRamenDisplay(ramenData[0])
    // handleDelete()
}))
.catch(e => console.error(e))


//Render ramen menu and display functions

    let activeRamen = 1;

    //Render ramen menu
    function renderMenu(ramen) {
        const menu = document.getElementById('ramen-menu'); //grab menu div
        const menuImage = document.createElement('img'); //create img
        menuImage.src = ramen.image; //insert image source
        menuImage.id = `menu-${ramen.id}`;
        menuImage.class = 'menu-image';
        menu.appendChild(menuImage); //append images

        //event listener on image to render ramen display
        menuImage.addEventListener('click', () => {
            activeRamen = ramen.id;

            fetch(`http://localhost:3000/ramens/${activeRamen}`)
            .then(res => res.json())
            .then(ramen => renderRamenDisplay(ramen))
            .catch(e => console.error(e))
        })
   
    }
    
    //Render main ramen display
    function renderRamenDisplay(ramen) {
        const ramenImage = document.querySelector('.detail-image'); //grab image element
        ramenImage.src = ramen.image; //insert image source

        const ramenName = document.querySelector('.name'); //grab ramen name container
        ramenName.textContent = ramen.name; //insert ramen name

        const restaurantName = document.querySelector('.restaurant'); //grab restaurant element
        restaurantName.textContent = ramen.restaurant; //insert restaurant name

        const ramenRating = document.querySelector('#rating-display'); //grab ratng element
        ramenRating.textContent = ramen.rating //insert rating
        
        const ramenComment = document.querySelector('#comment-display'); //grab comment element
        ramenComment.textContent = ramen.comment //insert comment
    }

//Create new ramen function

    //Grab form and add event listener
    const form = document.querySelector('#new-ramen');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitRamen(event);
        form.reset();
    })

    //Submit new ramen function
    function submitRamen(event) {
        // create new ramen object
        const ramen = {
            name: event.target.name.value,
            restaurant: event.target.restaurant.value,
            image: event.target.image.value,
            rating: event.target.rating.value,
            comment: event.target.comment.value
        };

        // POST request
        fetch('http://localhost:3000/ramens/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(ramen)
        })
        .then(res => res.json())
        .then(newRamen => renderMenu(newRamen))
    }

//Update ramen rating and comment function – *** Below are all for the extra deliverables

    //grab form and add event listener
    const editForm = document.querySelector('#edit-ramen');
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        editRamen(event);
        editForm.reset();
    })

    //Edit ramen function
    function editRamen(event) {

        const ramenChanges = {
            rating: event.target.rating.value,
            comment: event.target.new_comment.value
        };

        fetch(`http://localhost:3000/ramens/${activeRamen}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(ramenChanges)
        })
        .then(res => res.json())
        .then(ramen => renderRamenDisplay(ramen))
        .catch(e => console.error(e))

        // const ramenRating = document.querySelector('#rating-display'); //grab ratng element
        // ramenRating.textContent = event.target.rating.value;
        // const ramenComment = document.querySelector('#comment-display'); //grab comment element
        // ramenComment.textContent = event.target.new_comment.value; //insert comment
    }

// Delete Ramen function

    // // create delete button
    const deleteBtn = document.createElement('button'); //create delete button
    deleteBtn.textContent = 'Delete Ramen';
    deleteBtn.style.margin = '0 auto'; //position in center
    deleteBtn.style.marginTop = '4px'; //adjust margin top to match style
    editForm.appendChild(deleteBtn); //append to edit form

    //add event listener
    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/ramens/${activeRamen}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            document.getElementById(`menu-${activeRamen}`).remove();
            const menuImage = document.querySelector('.menu-image');
            console.loge(menuImage.id);
        })

    })

})