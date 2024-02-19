const myLibrary = [];

class Book {
    constructor(title, author, pages, rating, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.rating = rating;
        this.haveRead = haveRead;
    }
}

function addBook(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const bookDisplay = document.querySelector('.bookDisplay');
    while (bookDisplay.firstChild) {
        bookDisplay.firstChild.remove()
    }

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        const newBook = document.createElement('div');
        newBook.classList.add('book');

        newBook.dataset.index = i;

        const title = document.createElement('h3');
        title.textContent = book.title;
        title.style.textAlign = 'center';
        title.style.gridColumn = '1 / -1';

        const authorHeader = document.createElement('span');
        authorHeader.textContent = 'Author: ';
        authorHeader.classList.add('bookHeader');
        const author = document.createElement('span');
        author.textContent = book.author;

        const pagesHeader = document.createElement('span');
        pagesHeader.textContent = 'Pages: ';
        pagesHeader.classList.add('bookHeader');
        const pages = document.createElement('span');
        pages.textContent = book.pages;

        const ratingHeader = document.createElement('span');
        ratingHeader.textContent = 'Rating: ';
        ratingHeader.classList.add('bookHeader');
        const rating = document.createElement('span');
        rating.textContent = `${book.rating} / 10`;

        const readHeader = document.createElement('span');
        readHeader.textContent = 'Read? ';
        readHeader.classList.add('bookHeader');
        const read = document.createElement('img');
        read.style.width = '30px';
        if (book.haveRead) {
            read.src = 'images/check-bold.svg';
        } else {
            read.src = 'images/close-thick.svg';
        }

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read';
        toggleReadBtn.classList.add('toggleReadBtn');
        toggleReadBtn.classList.add('btn');

        toggleReadBtn.addEventListener('click', () => {
            book.haveRead = !book.haveRead;
            displayBooks();
        })

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.classList.add('btn');

        deleteBtn.addEventListener('click', () => {
            myLibrary.splice(newBook.dataset.index, 1);
            newBook.remove();
            displayBooks();
            console.log(myLibrary);
        })

        newBook.appendChild(title);

        newBook.appendChild(authorHeader);
        newBook.appendChild(author);

        newBook.appendChild(pagesHeader);
        newBook.appendChild(pages);

        newBook.appendChild(ratingHeader);
        newBook.appendChild(rating);

        newBook.appendChild(readHeader);
        newBook.appendChild(read);

        newBook.appendChild(toggleReadBtn);
        newBook.appendChild(deleteBtn);

        bookDisplay.appendChild(newBook);
    }
}


const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector('.addBook');

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
})


const newBookForm = document.querySelector('.newBookForm');
const rangeValue = document.querySelector('#rangeValue');
const submitBtn = document.querySelector('.submitBtn');
const cancelBtn = document.querySelector('.cancelBtn');

newBookForm.addEventListener('submit', (event) => {
    const title = newBookForm.querySelector('#title').value;
    const author = newBookForm.querySelector('#author').value;
    const pages = newBookForm.querySelector('#pages').value;
    const rating = newBookForm.querySelector('#rating').value;
    const haveRead = newBookForm.querySelector('#haveRead').checked;

    const book = new Book(title, author, pages, rating, haveRead);
    addBook(book);
    newBookForm.reset();
    rangeValue.innerText = '5';
});

cancelBtn.addEventListener('click', (event) => {
    newBookForm.reset();
    rangeValue.innerText = '5';
    dialog.close();
});

