

// Selectors for pop up
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

//UI
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
// Function when form is submitted to create new book from input, check if exists
// and close form
const addNewBook = (e) => {
    e.preventDefault()
    const newBook = bookFromInput()
    if(library.isInLibrary(newBook.title)) {
        alert('Book already exists')
    } else {
        library.addBook(newBook)
        exitForm()
    }
}
const exitForm = () => {
    addBookForm.reset()
    popUp.style.display = 'none'
}
















addBookForm.onsubmit = addNewBook