# Indexes and justification

This document lists recommended indexes for the `library` schema and short justification for each.

## Principles
- Primary keys and UNIQUE constraints create indexes automatically.
- Create indexes on columns used frequently in WHERE, JOIN, ORDER BY and GROUP BY clauses.
- Avoid excessive indexing on write-heavy tables without need.

## Recommended indexes
1. bookmark(user_id)
   - Reason: queries that count or list bookmarks per user (reports, user profile) will filter by user_id.
   - SQL: `CREATE INDEX idx_bookmark_user_id ON bookmark(user_id);`

2. bookmark(book_id)
   - Reason: counting bookmarks per book (popularity) and joins with book.
   - SQL: `CREATE INDEX idx_bookmark_book_id ON bookmark(book_id);`

3. book(publisher_id)
   - Reason: queries grouping or filtering books by publisher.
   - SQL: `CREATE INDEX idx_book_publisher_id ON book(publisher_id);`

4. book_file(book_id)
   - Reason: fast lookup of files belonging to a book.
   - SQL: `CREATE INDEX idx_book_file_book_id ON book_file(book_id);`

5. book_author(author_id) and book_author(book_id)
   - Reason: many-to-many joins between books and authors.
   - SQL: `CREATE INDEX idx_book_author_author_id ON book_author(author_id);`
            `CREATE INDEX idx_book_author_book_id ON book_author(book_id);`

6. book_genre(genre_id) and book_genre(book_id)
   - Reason: joins and filters by genre.

7. book_language(language_id) and book_language(book_id)
   - Reason: joins and filters by language.

8. review(book_id)
   - Reason: aggregation of reviews per book (AVG, COUNT) and joins.
   - SQL: `CREATE INDEX idx_review_book_id ON review(book_id);`

9. user(username)
   - Reason: authentication and lookups by username. There is a UNIQUE constraint but ensure index exists.

10. action(user_id) and action(action_type_id)
    - Reason: querying action history per user or by action type. Useful for audit queries.

## How to validate (brief)
1. Run `EXPLAIN` for your heavy SELECT queries (in `scripts/queries/complex-quiries.sql`) to see if table scans occur.
2. Add an index and compare `EXPLAIN` results and execution time for representative queries.

## Example
```sql
EXPLAIN SELECT b.id, b.title, dense_rank() over (order by COUNT(*) DESC) as place
FROM book b
    INNER JOIN bookmark bm ON bm.book_id = b.id
GROUP BY b.id;
```
Then create `idx_bookmark_book_id` and re-run `EXPLAIN` to verify fewer rows scanned and use of the index.

## Notes
- MySQL automatically creates indexes for PRIMARY KEY and UNIQUE constraints.
- For composite queries consider composite indexes if queries commonly filter on multiple columns together.
- Measure on realistic data volumes; small datasets may not benefit from some indexes until scale.
