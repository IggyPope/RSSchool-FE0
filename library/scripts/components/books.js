import booksStorage from '../../assets/data/books.json' assert { type: 'json' };

export default function loadBooksContent() {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];

  const booksContainer = document.querySelector('.favorites__container');

  const books = booksStorage.books;

  seasons.forEach((season) => {
    const seasonContent = document.createElement('div');
    seasonContent.classList.add('favorites__content');
    seasonContent.id = `content-${season}`;

    books
      .filter((book) => book.season === season)
      .forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookTextContainer = document.createElement('div');
        bookTextContainer.classList.add('book-card__text-content');

        const bookCardHeading = document.createElement('h4');
        bookCardHeading.classList.add('book-card__heading');
        bookCardHeading.textContent = 'Staff picks';

        const bookTitleWrapper = document.createElement('div');
        bookTitleWrapper.classList.add('book-card__title-wrapper');

        const bookTitle = document.createElement('h5');
        bookTitle.classList.add('book-card__title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('h5');
        bookAuthor.classList.add('book-card__title');
        bookAuthor.textContent = `By ${book.author}`;

        const bookDescription = document.createElement('p');
        bookDescription.classList.add('book-card__description');
        bookDescription.textContent = book.description;

        const bookButton = document.createElement('button');
        bookButton.classList.add('btn');
        bookButton.classList.add('book-card__btn-buy');
        bookButton.dataset.id = book.id;
        bookButton.textContent = 'Buy';

        const bookImage = document.createElement('img');
        bookImage.classList.add('book-card__cover');
        bookImage.src = `./assets/images/pictures/books/book_${book.id}.png`;

        bookTitleWrapper.append(bookTitle, bookAuthor);

        bookTextContainer.append(
          bookCardHeading,
          bookTitleWrapper,
          bookDescription
        );

        bookCard.append(bookTextContainer, bookButton, bookImage);

        seasonContent.append(bookCard);
      });

    booksContainer.append(seasonContent);
  });
}
