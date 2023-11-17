const addBookBtn = document.getElementById('addBookBtn');

let id = document.getElementById('id');
let title = document.getElementById('title');
let author = document.getElementById('author');

const search = document.getElementById('search');
const librarySection = document.getElementById('library');
const books = librarySection.getElementsByTagName('summary');

const deleteBookInput = document.getElementById('deleteBookInput');
const deleteBookBtn = document.getElementById('deleteBookBtn');

const showAllBooks = document.getElementById('showAllBooks');
const showAvailableBooks = document.getElementById('showAvailableBooks');
const showBorrowedBooks = document.getElementById('showBorrowedBooks');

const identityNumber = document.getElementById('identityNumber');
const userName = document.getElementById('userName');
const userBooks = document.getElementById('userBooks');
const addUserBtn = document.getElementById('addUserBtn'); 

const usersList = document.getElementById('users');

const idBorrow = document.getElementById('idBorrow');
const nameBorrow = document.getElementById('nameBorrow');
const bookBorrow = document.getElementById('bookBorrow');
const borrowBookBtn = document.getElementById('borrowBookBtn');

const idReturn = document.getElementById('idReturn');
const nameReturn = document.getElementById('nameReturn');
const bookReturn = document.getElementById('bookReturn');
const returnBookBtn = document.getElementById('returnBookBtn');

const idDelete = document.getElementById('idDelete');
const nameDelete = document.getElementById('nameDelete');
const deleteUserBtn = document.getElementById('deleteUserBtn');

// ADD BOOK TO LIBRARY

const library = [];

const addBook = (id, title, author, disponibility) => {
    if (!library[id]) {
        library[id] = {
            id,
            title,
            author,
            disponibility
        };
    }
}

addBook(0, 'Papilon', 'Henri Charriere', true);
addBook(1, 'Deep Work', 'Cal Newport', true);
addBook(2, 'Arsène Lupin, Gentleman Burglar', 'Maurice Leblanc', true);
addBook(3, 'Arsène Lupin vs. Herlock Sholmes', 'Maurice Leblanc', true);
addBook(4, 'The Hollow Needle', 'Maurice Leblanc', true);
addBook(5, '813 The Arsène Lupin', 'Maurice Leblanc', true);
addBook(6, 'The Crystal Stopper', 'Maurice Leblanc', true);
addBook(7, 'The Confessions of Arsène Lupin', 'Maurice Leblanc', true);
addBook(8, 'The Teeth of the Tiger', 'Maurice Leblanc', true);
addBook(9, 'The Woman of Mystery', 'Maurice Leblanc', true);
addBook(10, 'The Golden Triangle: The Return of Arsène Lupin', 'Maurice Leblanc', true);
addBook(11, 'Arsène Lupin: The Island of the Thirty Coffins', 'Maurice Leblanc', true);
addBook(12, 'The Eight Strokes of the Clock', 'Maurice Leblanc', true);
addBook(13, 'The Secret Tomb', 'Maurice Leblanc', true);
addBook(14, 'The Alchemist', 'Paulo Caelho', true);
addBook(15, 'Atomic Habits', 'James Clear', true);
addBook(16, 'Thinking Fast and Slow', 'Daniel Kahneman', true);
addBook(17, 'The Four Agreements', 'Dom Miguel Ruiz', true);
addBook(18, 'The 7 Habits of Highly Effective People', 'Stephen R. Covey', true);
addBook(19, 'Best Self', 'Mike Bayer', true);

addBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const idValue = id.value;
    const titleValue = title.value;
    const authorValue = author.value;
    addBook(idValue, titleValue, authorValue, true);
    id.value = '';
    title.value = '';
    author.value = '';
    displayBooks();
})

// SEARCH BOOK FROM LIBRARY

search.addEventListener('input', () => {
    const filterText = search.value.toLowerCase();

    for (const book of books) {
        const bookName = book.getAttribute('data-name').toLowerCase();
        if (!bookName.includes(filterText)) {
            book.classList.add('filtered');
        } else {
            book.classList.remove('filtered');
        }
    }
})

// DISPLAY BOOKS FROM LIBRARY

const displayBooks = () => {
    librarySection.innerHTML = '';

    for (let i = 0; i < library.length; i++) {
        librarySection.innerHTML += `
            <details>
                <summary data-name="${library[i].title} ${library[i].author}">${library[i].title}</summary>
                <ul>
                    <li>Id: ${library[i].id}</li>
                    <li>Author: ${library[i].author}</li>
                    <li>Disponibility: ${library[i].disponibility}</li>
                </ul>
            </details>
        `
    }
}

showAllBooks.addEventListener('click', displayBooks)

showAvailableBooks.addEventListener('click', () => {
    librarySection.innerHTML = '';

    for (let i = 0; i < library.length; i++) {
        if (library[i].disponibility) {
            librarySection.innerHTML += `
            <details>
                <summary data-name="${library[i].title} ${library[i].author}">${library[i].title}</summary>
                <ul>
                    <li>Id: ${library[i].id}</li>
                    <li>Author: ${library[i].author}</li>
                    <li>Disponibility: ${library[i].disponibility}</li>
                </ul>
            </details>
        `
        }
    }
})

showBorrowedBooks.addEventListener('click', () => {
    librarySection.innerHTML = '';

    for (let i = 0; i < library.length; i++) {
        if (!library[i].disponibility) {
            librarySection.innerHTML += `
            <details>
                <summary data-name="${library[i].title} ${library[i].author}">${library[i].title}</summary>
                <ul>
                    <li>Id: ${library[i].id}</li>
                    <li>Author: ${library[i].author}</li>
                    <li>Disponibility: ${library[i].disponibility}</li>
                </ul>
            </details>
        `
        }
    }
})

// DELETE BOOKS FROM LIBRARY

deleteBookBtn.addEventListener('click', () => {
    let bookName = deleteBookInput.value.toLowerCase();
    for (let i = 0; i < library.length; i++) {
        if (bookName === library[i].title.toLowerCase()) {
            library.splice(i, 1);
            break;
        }
    }
    displayBooks();
})

// BORROW BOOK

const borrow = (books) => {
    for (let i = 0; i < library.length; i++) {
        if (books.includes(library[i].title)) {
            library[i].disponibility = false;
        }
    }
}

const borrowNewBook = (id, name, book) => {
    for (let i = 0; i < users.length; i++) {
        if(users[i].id == id && users[i].name == name) {
            users[i].books.push(book);
            borrow(book);
            displayUsers();
        }
    }  
}

borrowBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let id = idBorrow.value;
    let name = nameBorrow.value;
    let book = bookBorrow.value;
    borrowNewBook(id, name, book);
    idBorrow.value = '';
    nameBorrow.value = '';
    bookBorrow.value = '';
})

// RETURN BOOK

const makeBookAvailable = (book) => {
    for (let i = 0; i < library.length; i++) {
        if (book.includes(library[i].title.toLowerCase())) {
            library[i].disponibility = true;
        }
    }
}

const returnBook = (id, name, book) => {
    for (let i = 0; i< users.length; i++) {
        if (users[i].id == id && users[i].name == name) {
            users[i].books.splice(i, 1);
            displayUsers();
            makeBookAvailable(book);
        }
    }
}

returnBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let id = idReturn.value;
    let name = nameReturn.value;
    let book = bookReturn.value.toLowerCase();
    returnBook(id, name, book);
})

// ADD USERS

const users = [];

const addUser = (id, name, books) => {
    if(!users[id]) {
        users[id] = {
            id,
            name,
            books
        };
    }
    borrow(books);
}

addUser(0, 'Edward', ['Papilon', 'Deep Work']);
addUser(1, 'Andrew', ['The Alchemist']);
addUser(2, 'Cristina', ['The Teeth of the Tiger', 'The Eight Strokes of the Clock']);

displayBooks();

addUserBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let id = identityNumber.value;
    let name = userName.value;
    let books = userBooks.value.split(',');
    addUser(id, name, books);
    identityNumber.value = '';
    userName.value = '';
    userBooks.value = '';
    displayUsers();
})

// DISPLAY USERS

const displayUsers = () => {
    usersList.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        usersList.innerHTML += `
        <details>
            <summary data-name="${users[i].name}">${users[i].name}</summary>
            <ul>
                <li>Id: ${users[i].id}</li>
                <li>Books: ${users[i].books}</li>
                <li>Date: ${new Date()}</li>
            </ul>
        </details>
        `
    }
}

displayUsers();

// DELETE USER

deleteUserBtn.addEventListener('click', () => {
    let id = idDelete.value;
    let name = nameDelete.value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id && users[i].name == name) {
            users.splice(i, 1);
            break;
        }
    }
    displayUsers();
})