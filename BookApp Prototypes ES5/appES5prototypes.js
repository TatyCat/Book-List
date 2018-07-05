function Book(title, author, isbn){
    this.title = title;
    this.author = author; 
    this.isbn = isbn;
}

function BookTable(){

}


// Add Book
BookTable.prototype.addToTable = function(newBook){
    const getTable = document.getElementById('book-list');
    const tableRow = document.createElement('tr'); 

    tableRow.innerHTML = `
    <td>${newBook.title}</td>
    <td>${newBook.author}</td>
    <td>${newBook.isbn}</td>
    <td>
        <a href="#" class="delete">X</a>
    </td>`;
    
    getTable.appendChild(tableRow);
}

BookTable.prototype.alertUser = function(errorMessage, alertClasses){
    const createDiv = document.createElement('div');
    
    const createAlertMessage = createDiv.appendChild(document.createTextNode(errorMessage));
    

    createDiv.setAttribute('class', alertClasses);
    createDiv.setAttribute('id', 'errorAlert');
    const articleSection = document.getElementById('addABookSection');

    articleSection.appendChild(createDiv);
 
    setTimeout(function(){
        document.getElementById('errorAlert').remove();
    }, 1000);
      
}

BookTable.prototype.deleteBook = function(target){
    if(target.className == 'delete'){
        target.parentElement.parentElement.remove();
    }
}

BookTable.prototype.clearFormData = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    
    const newBook = new Book(title, author, isbn);
    const bookTable = new BookTable();
    
    if(title === '' || author === ''|| isbn ===''){
        bookTable.alertUser('Please fill in all input fields.', 'w3-center w3-xlarge w3-padding w3-panel w3-red');
    }else{
        bookTable.addToTable(newBook);

        bookTable.alertUser('Book Added', 'w3-text-white w3-center w3-xlarge w3-padding w3-panel w3-light-green');
        bookTable.clearFormData();
    }

    e.preventDefault();
});

// Delete
document.getElementById('book-list').addEventListener('click', function(e){
    const bookTable = new BookTable();
    
    bookTable.deleteBook(e.target);

    bookTable.alertUser('Book Removed', 'w3-text-grey w3-center w3-xlarge w3-padding w3-panel w3-pale-red');

    e.preventDefault();
})