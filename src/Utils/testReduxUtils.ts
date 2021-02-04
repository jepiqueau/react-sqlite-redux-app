export const createTableArticles: string =  `
    CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT UNIQUE NOT NULL,
    body TEXT
    );
    CREATE INDEX IF NOT EXISTS articles_index_title ON articles (title);
    PRAGMA user_version = 1;
`;
