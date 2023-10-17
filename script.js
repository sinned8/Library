

// Selectors for pop up and closing pop up when x is pressed
const popUp = document.querySelector('.pop-up');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click',() => popUp.style.display = 'none')

const newBookBtn = document.querySelector('.newbtn');
newBookBtn.addEventListener('click', () => popUp.style.display = 'block')


// Constructor for books
class Book{
    constructor(
        title = 'Unkown',
        author = 'Unkown',
        pages = 0,
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

// Constructor for Library
class Library{
    constructor() {
        this.books = []
    }
    addBook(newBook){
        this.books.push(newBook)
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }
    getTitle(title) {
        return this.books.find(book => book.title === title)
    }

    isInLibrary(title) {
        return this.books.some(book => book.title === title)
    }
}
const library = new Library()

// Additional UI declarations
const LibContainer = document.getElementById('lib-container')
const addBookForm = document.getElementById('add-form')

// Handling and creating book from form input data
const bookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('is-read').checked

    return new Book(title, author, pages, isRead)

}
// Function when form is submitted to create new book from input, check if it exists
// and close form
const addNewBook = (e) => {
    e.preventDefault()
    const newBook = bookFromInput()
    if(library.isInLibrary(newBook.title)) {
        alert('Book already exists')
    } else {
        library.addBook(newBook)
        exitForm()
        updateLibContainer()
    }
}
const exitForm = () => {
    addBookForm.reset()
    popUp.style.display = 'none'
}
const resetLibContainer =() => {
    LibContainer.innerHTML = ''
}
const updateLibContainer = () => {
    resetLibContainer()
    for( let book of library.books){
        createBookCard(book)
    }
}


// Creating book card 
const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const changeReadStatus = document.createElement('button')
    const removeBookBttn = document.createElement('button')

    bookCard.classList.add('book-card')
    changeReadStatus.classList.add('change-read-status')
    changeReadStatus.onclick = toggleRead
    removeBookBttn.classList.add('remove-book')
    removeBookBttn.onclick = removeBook

    title.textContent = `Title: ${book.title}`
    author.textContent = `Author: ${book.author}`
    pages.textContent = `Pages: ${book.pages}`
    removeBookBttn.textContent = 'Remove'

    if(book.isRead){
        changeReadStatus.textContent = 'Read'
        changeReadStatus.style.backgroundColor = '#68f364'
    }else{
        changeReadStatus.textContent = 'Not read'
        changeReadStatus.style.backgroundColor = '#d16767'
    }


    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(changeReadStatus)
    bookCard.appendChild(removeBookBttn)
    LibContainer.appendChild(bookCard)
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        '')
    library.removeBook(title)
    updateLibContainer()
    console.log('remove');
}
const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        '')
    const book = library.getTitle(title)
    book.isRead = !book.isRead
    console.log('read');
    updateLibContainer()
}















addBookForm.onsubmit = addNewBook