import * as dbHelper from "../db-utils/db-helper.js";
import statusCodes from "http-status-codes";

export function getAllAuthors(req, res) {
    const partName = req.query.name;
    const authors = dbHelper.getAllAuthors(partName);
    res
        .status(statusCodes.OK)
        .json(authors);
}

export function getAuthorById(req, res) {
    const id = parseInt(req.params.id);
    const author = dbHelper.getAuthorById(id);
    if (author) {
        res
            .status(statusCodes.OK)
            .json(author);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Author not found');
    }
}

export async function updateAuthor(req, res) {
    const id = parseInt(req.params.id);
    const updatedAuthor = req.body;
    const author = dbHelper.getAuthorById(id);
    if (author) {
        res
            .status(statusCodes.OK)
            .json(updatedAuthor);        await dbHelper.updateAuthor(id, updatedAuthor);

    } else {
        res.status(statusCodes.NOT_FOUND).send('Author not found');
    }
}

export async function deleteAuthor(req, res) {
    const id = parseInt(req.params.id);
    const author = dbHelper.getAuthorById(id);
    if (author) {
        await dbHelper.deleteAuthor(id);
        res
            .status(statusCodes.OK)
            .send('Author deleted');
    } else {
        res.status(statusCodes.NOT_FOUND).send('Author not found');
    }
}

export function addAuthor(req, res) {
    const author = req.body;
    try {
        const newAuthor = dbHelper.insertAuthor(author);
        res
            .status(statusCodes.CREATED)
            .json(newAuthor);
    } catch (err) {
        res
            .status(statusCodes.BAD_REQUEST)
            .send(err.message);
    }

}