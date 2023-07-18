/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/

/****** VARIABLES ******/

let focusedElBeforeModal;
let loginArray = [];
let signupArray = [];
const modalOverlay = document.getElementById('modal-overlay')
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

    loginModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');

    closeModalBtn.addEventListener('keydown', trapFocus)
    document.addEventListener('keydown', trapFocus)
    closeModalBtn.focus();               
}


function hideModal() {

    if (modalRememberCheckbox.checked === true) {
        modalUsername.value = '';
        modalPw.value = '';
    
    } else if (modalRememberCheckbox.checked === false) {
        clearModal();
    }

    loginModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');

    closeModalBtn.removeEventListener('keydown', trapFocus)
    document.removeEventListener('keydown', trapFocus)

    // Set focus back to element that had it before the modal was opened
    focusedElBeforeModal.focus();
};

function clearModal() {
    modalUsername.value = '';
    modalPw.value = '';
    loginArray = [];
    signupArray = [];
};    


/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {

    if (e.target.id === 'nav-btn') {
        showHeaderNav();
    
    } else if (e.target.dataset.modal) {
        showModal();
    
    } else if (e.target.id === 'modal-close-btn' || (e.target == modalOverlay)) {
        hideModal();
        clearModal();
    
    } else if (e.target.id === 'modal-login-btn') {
        e.preventDefault();
        loginArray.push(modalUsername.value, modalPw.value);
        hideModal();        
   
    } else if (e.target.id === 'modal-signup-btn') {
        e.preventDefault()
        signupArray.push(modalUsername.value, modalPw.value);
        hideModal();

    } else if (e.target.id === 'modal-cancel-btn') {
        clearModal();
    }    
});


