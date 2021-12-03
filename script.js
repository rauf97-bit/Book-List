// SPREAD OPERATOR

// const first = [1, 2, 3, 4]
// const second = [4, 5, 6]

// let combined = first.concat(second)
// let combined2 = [...first, ...second]

// console.log(combined)
// console.log(combined2)

// const first1 = { name : 'Jonh Doe'}
// const second1 = { job : 'Coder'}

// const combined3 = {...first1, ...second1, location : 'Abuja'}
// console.log(combined3)

// console.log(teacher.desc)

// BOOK FUNCTIONS CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI FUNCTION
function UI() {}

// UI CONSTRUCTOR
UI.prototype.addBook = function (book) {
  let list = document.getElementById("book-list");

  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
   <td class="cancel"> <a href="#">X</a></td>
    `;
  list.appendChild(row);
};

UI.prototype.clearField = function () {
  (document.getElementById("title").value = ""),
    (document.getElementById("author").value = ""),
    (document.getElementById("isbn").value = "");
};

UI.prototype.showAlert = function (message, clazz) {
  const container = document.querySelector(".container");
  const myForm = document.getElementById("form-group");
  const div = document.createElement("div");
  div.className = `${clazz}`;
  const textz = document.createTextNode(message);
  div.appendChild(textz);
  container.insertBefore(div, myForm);

  setTimeout(() => {
    document.querySelector(`.${clazz}`).remove();
  }, 3000);
};
UI.prototype.deleteBook = function (target) {
    if (target.parentElement.className === 'cancel') {
  target.parentElement.parentElement.remove();
    }
};

// STORE FUNCTION

function Store() {}

Store.prototype.getBook = function () {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};
Store.prototype.addToBook = function (book) {
  const books = Store.prototype.getBook();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
};

Store.prototype.displayBook = function () {
  const books = Store.prototype.getBook();
  books.forEach(book => {
      const ui = new UI()
      ui.addBook(book)
  });

};
Store.prototype.deleteBook = function (isbn) {
    const books = Store.prototype.getBook();
    books.forEach((book, index)=>{
        if (book.isbn === isbn) {
            // console.log(books)
            books.splice(index, 1)
        }
        localStorage.setItem("books", JSON.stringify(books));
    })
    
  
};

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', Store.prototype.displayBook)

// Submit event
document.getElementById("form-group").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  const book = new Book(title, author, isbn);
  // console.log(book);
  const ui = new UI();
  if (title === "" || author === "" || isbn === "") {
    // // Show failure alert
    ui.showAlert("Please fill on all the fields", "error");
  } else {
    // Add book
    ui.addBook(book);
    
    //   Instantiate Store
    const myStore = new Store();
    myStore.addToBook(book);

    // Clear form field
    ui.clearField();

    // Show Success alert
    ui.showAlert("Book has been Added", "success");
  }
});

// Delete Event

document.getElementById("book-list").addEventListener("click", (e) => {
    //   Instantiate UI
    const ui = new UI();
    ui.deleteBook(e.target);

    //   Instantiate Store
    const myStore = new Store();
    myStore.deleteBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert("Delete Successful", "success");
    e.preventDefault();
});
