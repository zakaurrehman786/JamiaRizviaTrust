// document.addEventListener('DOMContentLoaded', function() {
//     // Sample books data - In production, this would come from a backend API
//     const books = [
//         {
//             id: 1,
//             title: "Quran Tafseer",
//             author: "Imam Ibn Kathir",
//             description: "A comprehensive explanation of the Holy Quran, widely respected in the Islamic world.",
//             category: "quran",
//             language: "English",
//             image: "/public/book1.jpg",
//             price: "Free",
//             downloadUrl: "/books/download/quran-tafseer.pdf",
//             readUrl: "/books/quran-tafseer.pdf"
//         },
//         {
//             id: 2,
//             title: "Hadith Collection",
//             author: "Imam Bukhari",
//             description: "A selection of authentic Hadiths, essential for understanding Islamic teachings.",
//             category: "hadith",
//             language: "English",
//             image: "/public/book2.jpeg",
//             price: "Free",
//             downloadUrl: "/books/download/hadith-collection.pdf",
//             readUrl: "/books/hadith-collection.pdf"
//         },
//         {
//             id: 3,
//             title: "Islamic History",
//             author: "Dr. Tariq Ramadan",
//             description: "Explore the rich history of Islam from its beginnings to the modern era.",
//             category: "history",
//             language: "English",
//             image: "/public/book4.jpg",
//             price: "Free",
//             downloadUrl: "/books/download/islamic-history.pdf",
//             readUrl: "/books/islamic-history.pdf"
//         },
//         {
//             id: 4,
//             title: "Islamic Fiqh",
//             author: "Mufti Taqi Usmani",
//             description: "A modern guide to Islamic jurisprudence and its application in daily life.",
//             category: "fiqh",
//             language: "English",
//             image: "/public/bok3.jpeg",
//             price: "Free",
//             downloadUrl: "/books/download/islamic-fiqh.pdf",
//             readUrl: "/books/islamic-fiqh.pdf"
//         }
//         // Add more books as needed
//     ];

//     const booksContainer = document.querySelector('.books-grid-container');
//     const searchInput = document.getElementById('bookSearch');
//     const categoryButtons = document.querySelectorAll('.category-btn');
//     const sortSelect = document.getElementById('sortBooks');
//     const resultCount = document.querySelector('.results-count');
//     const totalCount = document.querySelector('.total-count');
//     let currentCategory = 'all';
//     let currentSearchTerm = '';
//     let currentSort = 'newest';

//     // Initialize the books display
//     displayBooks();

//     // Event Listeners
//     searchInput.addEventListener('input', handleSearch);
//     categoryButtons.forEach(button => {
//         button.addEventListener('click', () => handleCategoryChange(button));
//     });
//     sortSelect.addEventListener('change', handleSort);

//     function displayBooks() {
//         let filteredBooks = filterBooks();
//         sortBooks(filteredBooks);
        
//         // Update counts
//         resultCount.textContent = filteredBooks.length;
//         totalCount.textContent = books.length;

//         // Clear and populate the container
//         booksContainer.innerHTML = '';
        
//         if (filteredBooks.length === 0) {
//             booksContainer.innerHTML = `
//                 <div class="no-results">
//                     <i class="fas fa-search"></i>
//                     <p>No books found matching your criteria</p>
//                 </div>
//             `;
//             return;
//         }

//         filteredBooks.forEach(book => {
//             const bookCard = createBookCard(book);
//             booksContainer.appendChild(bookCard);
//         });
//     }

//     function createBookCard(book) {
//         const div = document.createElement('div');
//         div.className = 'book-card';
//         div.innerHTML = `
//             <img src="${book.image}" alt="${book.title}" class="book-image-rect" />
//             <div class="book-info">
//                 <h3 class="book-title">${book.title}</h3>
//                 <p class="book-author">by ${book.author}</p>
//                 <p class="book-desc">${book.description}</p>
//                 <span class="book-price">${book.price}</span>
//             </div>
//             <div class="book-actions">
//                 <a href="${book.readUrl}" class="btn hero-btn">Read Online</a>
//                 <a href="${book.downloadUrl}" class="btn download-btn">Download</a>
//             </div>
//         `;
//         return div;
//     }

//     function filterBooks() {
//         return books.filter(book => {
//             const matchesCategory = currentCategory === 'all' || book.category === currentCategory;
//             const matchesSearch = book.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
//                                 book.author.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
//                                 book.category.toLowerCase().includes(currentSearchTerm.toLowerCase());
//             return matchesCategory && matchesSearch;
//         });
//     }

//     function sortBooks(booksArray) {
//         switch (currentSort) {
//             case 'az':
//                 booksArray.sort((a, b) => a.title.localeCompare(b.title));
//                 break;
//             case 'za':
//                 booksArray.sort((a, b) => b.title.localeCompare(a.title));
//                 break;
//             case 'popular':
//                 // In a real application, this would sort by popularity metrics
//                 break;
//             case 'newest':
//             default:
//                 // In a real application, this would sort by date added
//                 break;
//         }
//     }

//     function handleSearch(e) {
//         currentSearchTerm = e.target.value;
//         displayBooks();
//     }

//     function handleCategoryChange(button) {
//         // Update active state
//         categoryButtons.forEach(btn => btn.classList.remove('active'));
//         button.classList.add('active');
        
//         // Update current category
//         currentCategory = button.dataset.category;
//         displayBooks();
//     }

//     function handleSort(e) {
//         currentSort = e.target.value;
//         displayBooks();
//     }
// });
