export const createTableArticles: string =  `
    CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT UNIQUE NOT NULL,
    body TEXT
    );
    CREATE INDEX IF NOT EXISTS articles_index_title ON articles (title);
`;
export const createTableNewsCategories: string = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY NOT NULL,
    kind TEXT UNIQUE NOT NULL
    );
    CREATE INDEX IF NOT EXISTS categories_index_kind ON categories (kind);
`;