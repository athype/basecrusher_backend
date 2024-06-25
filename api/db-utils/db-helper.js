import Database from "better-sqlite3";

import * as dbQuerries from "../db-utils/db-querries.js";

let db;


export function createDb() {
    try {
        db = new Database('database/database.sqlite');
    } catch (error) {
        console.error('Error while initializing db', error);
        throw error;
    }
}

// createDb()

db.prepare(dbQuerries.createThTable).run();
db.prepare(dbQuerries.createAuthorTable).run();
db.prepare(dbQuerries.createStrategiesTable).run();

export function insertTownhall(name) {
    const stmt = db.prepare(dbQuerries.insertThQuerry);
    return stmt.run(name);
}

export function insertAuthor(author) {
    const { name } = author;
    const stmt = db.prepare(dbQuerries.insertAuthorQuerry);
    return stmt.run(name);
}

export function insertStrategy(strategy) {
    const stmt = db.prepare(dbQuerries.insertStrategyQuerry);
    return stmt.run(strategy.name, strategy.short_description, strategy.type, strategy.composition, strategy.youtube_link, strategy.description, strategy.th_id, strategy.author_id);
}

export function getAllTownhalls(partName) {
    let query = 'SELECT * FROM townhalls';
    if (partName) {
        query += ` WHERE name LIKE '%${partName}%'`;
    }
    return db.prepare(query).all();
}
export function getAllAuthors(partName) {
    let query = 'SELECT * FROM authors';
    if (partName) {
        query += ` WHERE name LIKE '%${partName}%'`;
    }
    return db.prepare(query).all();
}

export function getAllStrategies(partName) {
    let query = 'SELECT * FROM strategies';
    if (partName) {
        query += ` WHERE name LIKE '%${partName}%'`;
    }
    return db.prepare(query).all();
}

export function getStrategiesByTownhallId(id) {
    const stmt = `SELECT strategies.*, authors.name AS author_name FROM strategies JOIN authors ON strategies.author_id = authors.id WHERE th_id = ?`
    return db.prepare(stmt).all(id);
}

export function getStrategiesByAuthorId(id) {
    return db.prepare('SELECT * FROM strategies WHERE author_id = ?').all(id);
}

export function getStrategiesByAuthorName(name) {
    const stmt = `SELECT strategies.*, authors.name AS author_name FROM strategies JOIN authors ON strategies.author_id = authors.id WHERE authors.name = ?`
    return db.prepare(stmt).all(name);
}

export function getTownhallById(id) {
    return db.prepare('SELECT * FROM townhalls WHERE id = ?').get(id);
}

export function getStrategyById(id) {
    return db.prepare('SELECT * FROM strategies WHERE id = ?').get(id);
}

export function deleteStrategy(id) {
    return db.prepare(dbQuerries.deleteStrategyQuerry).run(id);
}

export function deleteAuthor(id) {
    return db.prepare(dbQuerries.deleteAuthorQuerry).run(id);
}

export async function updateAuthor(id, updatedAuthor) {
    const { name } = updatedAuthor;
    return db.prepare(dbQuerries.updateAuthorQuerry).run(name, id);
}

export async function updateStrategy(id, updatedStrategy) {
    const { name, short_description, type, composition, youtube_link, description, th_id, author_id } = updatedStrategy;
    return db.prepare(dbQuerries.updateStrategyQuerry).run(name, short_description, type, composition, youtube_link, description, th_id, author_id, id);

}

export function getAuthor(searchType, searchValue) {
    let query;
    if (searchType === 'id') {
        query = 'SELECT * FROM authors WHERE id = ?';
    } else if (searchType === 'name') {
        query = 'SELECT * FROM authors WHERE name = ?';
    } else {
        throw new Error('Invalid search type. Must be "id" or "name".');
    }
    return db.prepare(query).get(searchValue);
}

export function getAuthorById(id) {
    return db.prepare('SELECT * FROM authors WHERE id = ?').get(id);
}

export function getAuthorByName(name) {
    return db.prepare('SELECT * FROM authors WHERE name = ?').get(name);
}




if (db.prepare('SELECT * FROM townhalls').all().length === 0) {
    insertTownhall('Th10')
    insertTownhall('Th11')
    insertTownhall('Th12')
    insertTownhall('Th13')
    insertTownhall('Th14')
    insertTownhall('Th15')
    insertTownhall('Th16')
    insertTownhall('Reaching')
}

if (db.prepare('SELECT * FROM authors').all().length === 0) {
    insertAuthor('Windburn')
    insertAuthor('Socko')
    insertAuthor('Unknown')
    insertAuthor('The Catalyst')
}

if (db.prepare('SELECT * FROM strategies').all().length === 0) {
    insertStrategy({name: 'PeWi Healman', short_description: 'Pekka walk', type: 'Ground', composition: 'Pekkas, Healers, Witches, SBarbs, Apprentice, Balloons, SWBs, HHs', youtube_link: 'https://www.youtube.com/embed?v=ZeWQOwMWLZU', description: 'This is a super strategy for TH10', th_id: 4, author_id: 1})
    insertStrategy({name: 'SAB smash', short_description: 'Super archer barb', type: 'Ground', composition: 'Titans, Super archers, SBarbs, HH, SBW', youtube_link: 'https://www.youtube.com/embed?v=ZeWQOwMWLZU', description: 'This is a super strategy for TH14', th_id: 5, author_id: 3})
    insertStrategy({name: 'Yeti Smash', short_description: 'Yetis', type: 'Ground', composition: 'Yetis, Swiz', youtube_link: 'https://www.youtube.com/embed?v=ZeWQOwMWLZU', description: 'This is a super strategy for TH13', th_id: 4, author_id: 3})
    insertStrategy({name: 'SWitch fireball', short_description: 'Super witches', type: 'Ground', composition: 'Super witches, support troops', youtube_link: 'https://www.youtube.com/embed?v=ZeWQOwMWLZU', description: 'This is a super strategy for TH13', th_id: 4, author_id: 2})
    insertStrategy({name: 'Super Bowler recall', short_description: 'Super bowlers', type: 'Ground', composition: 'Super bowlers, support troops', youtube_link: 'https://www.youtube.com/embed?v=ZeWQOwMWLZU', description: 'This is a super strategy for TH16', th_id: 7, author_id: 4})
}




