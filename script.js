

// Selectors for pop up
const popUp = document.querySelector('.pop-up');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click',() => popUp.style.display = 'none')

const newBookBtn = document.querySelector('.newbtn');
newBookBtn.addEventListener('click', () => popUp.style.display = 'block')