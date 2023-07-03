/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/

/****** VARIABLES ******/





/****** FUNCTIONS ******/

function displayHeaderNav() {
    document.getElementById('header-nav').classList.toggle('header-nav-hidden')
    document.getElementById('nav-btn').classList.toggle('nav-btn-transform')
};

/****** EVENT LISTENERS ******/

document.addEventListener('click', (e) => {
    if (e.target.id === 'nav-btn') {
        displayHeaderNav()
    }
});