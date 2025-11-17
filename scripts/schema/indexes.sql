USE library;
CREATE INDEX idx_bookmark_user_id ON bookmark(user_id);
CREATE INDEX idx_bookmark_book_id ON bookmark(book_id);

CREATE INDEX idx_book_publisher_id ON book(publisher_id);

CREATE INDEX idx_book_author_author_id ON book_author(author_id);
CREATE INDEX idx_book_author_book_id ON book_author(book_id);

CREATE INDEX idx_book_genre_genre_id ON book_genre(genre_id);
CREATE INDEX idx_book_genre_book_id ON book_genre(book_id);

CREATE INDEX idx_book_language_language_id ON book_language(language_id);
CREATE INDEX idx_book_language_book_id ON book_language(book_id);
