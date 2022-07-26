document.addEventListener('DOMContentLoaded', () => {

//Fetch request
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(ramenData => ramenData.forEach((ramen) => {
    renderMenu(ramen)
}))
.catch(e => console.error(e))


//Render ramen menu and display functions

    //Render ramen menu
    function renderMenu(ramen) {
        const menu = document.getElementById('ramen-menu'); //grab menu div
        const menuImage = document.createElement('img'); //create img
        menuImage.src = ramen.image; //insert image source
        menu.appendChild(menuImage); //append images

        //event listener on image to render ramen display
        menuImage.addEventListener('click', () => {
            renderRamenDisplay(ramen);
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
        const ramenRating = document.querySelector('#rating-display') //grab ratng element
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

        renderMenu(ramen)
    }
})