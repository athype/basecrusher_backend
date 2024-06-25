export const createThTable = `CREATE TABLE IF NOT EXISTS townhalls (
                                                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                name TEXT NOT NULL
                       )`;

export const createAuthorTable = `CREATE TABLE IF NOT EXISTS authors (
                                                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                  name TEXT NOT NULL
                           )`;

export const createStrategiesTable = `CREATE TABLE IF NOT EXISTS strategies (
                                                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                         name TEXT NOT NULL,
                                                                         short_description TEXT NOT NULL,
                                                                         type TEXT NOT NULL,
                                                                         composition TEXT NOT NULL,
                                                                         youtube_link TEXT,
                                                                         description TEXT NOT NULL,
                                                                         th_id INTEGER,
                                                                         author_id INTEGER,
                                                                         FOREIGN KEY(th_id) REFERENCES townhalls(id),
                                                                         FOREIGN KEY(author_id) REFERENCES authors(id)
    )`;

export const insertThQuerry = `INSERT INTO townhalls (name) VALUES (?)`;
export const insertAuthorQuerry = `INSERT INTO authors (name) VALUES (?)`;
export const insertStrategyQuerry = `INSERT INTO strategies (name, short_description, type, composition, youtube_link, description, th_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

export const updateAuthorQuerry = `UPDATE authors SET name = ? WHERE id = ?`;
export const deleteAuthorQuerry = `DELETE FROM authors WHERE id = ?`;

export const updateStrategyQuerry = `UPDATE strategies SET name = ?, short_description = ?, type = ?, composition = ?, youtube_link = ?, description = ?, th_id = ?, author_id = ? WHERE id = ?`;
export const deleteStrategyQuerry = `DELETE FROM strategies WHERE id = ?`;
