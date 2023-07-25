/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/

/****** VARIABLES ******/

let focusedElBeforeModal;
const loginModal = document.getElementById('login-modal')
const modalUsername = document.getElementById('modal-username')
const modalPw = document.getElementById('modal-password')
const modalRememberCheckbox = document.getElementById('save-check');
const closeModalBtn = document.getElementById('modal-close-btn')


/****** FUNCTIONS ******/

function showHeaderNav() {
    document.getElementById('header-nav').classList.toggle('header-nav-hidden');
    document.getElementById('nav-btn').classList.toggle('nav-btn-transform');
};

function trapFocus(e) {
    //select all focusable elements within the modal
    //make the elements specific to the modal, they do not have to be in DOM order as this is similar to an array
    const focusableEls = loginModal.querySelectorAll('button[aria-label="close modal"], input[type="text"], input[type="password"], button[type="submit"], button[type="button"], a');

    //this retrieves the first focusable element within the modal
    const firstFocusableEl = focusableEls[0];
    //this retrieves the last focusable element within the modal
    const lastFocusableEl = focusableEls[focusableEls.length -  1]

    //looking for "tab" key on "keydown" event
    //shift key is not pressed along with the tab key => user is trying to nav forward
    //check is the currently focused element is the last focusable element in the modal
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === lastFocusableEl) {
        //prevent defualt tab behavior of moving focus out of the modal
        e.preventDefault();
        //manually set focus to the first element
        firstFocusableEl.focus();
    
    //similar to above logic, but now we are looking to see if the user is pressing shift => nav backward    
    } else if (e.key === 'Tab' && e.shiftKey && document.activeElement === firstFocusableEl) {
        e.preventDefault();
        //manually set focus to last element
        lastFocusableEl.focus();
    }    
};


function showModal() {
    
    //save current focus on the document
    focusedElBeforeModal = document.activeElement;

    //showModal method for dialog element
    loginModal.showModal();

    closeModalBtn.addEventListener('keydown', trapFocus)
    document.addEventListener('keydown', trapFocus)
}


function hideModal() {

    //close method for dialog element 
    loginModal.close();

    closeModalBtn.removeEventListener('keydown', trapFocus)
    document.removeEventListener('keydown', trapFocus)

    // Set focus back to element that had it before the modal was opened
    focusedElBeforeModal.focus();
};

//syntax to click outside of modal to close, but not the modal itself
loginModal.addEventListener("click", e => {
    //getBoundingClientRect() returns info about the size of an element and its position relative to the viewport
    const dialogDimensions = loginModal.getBoundingClientRect()
    //if the d
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      loginModal.close()
    }
  })

function clearModal() {
    modalUsername.value = '';
    modalPw.value = '';
};    


/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {

    if (e.target.id === 'nav-btn') {
        showHeaderNav();
    
    } else if (e.target.dataset.modal) {
        showModal();
    
    } else if (e.target.id === 'modal-close-btn' || /*(e.target == loginModal) ||*/ (e.target.id === 'modal-login-btn') || (e.target.id === 'modal-signup-btn')) {
        hideModal();
    }    
    // formmethod = "dialog" on Cancel form button in HTML automatically clears the form

});

//on close, prevent form from submitting and clear the modal
loginModal.addEventListener('close', e => {
    e.preventDefault()
    clearModal()
})