import * as dbHelper from "../db-utils/db-helper.js";
import statusCodes from "http-status-codes";


export function getAllTownhalls(req, res) {
    const partName = req.query.name;
    const townhalls = dbHelper.getAllTownhalls(partName);
    res
        .status(statusCodes.OK)
        .json(townhalls);
}


export function getThById(req, res) {
    const id = parseInt(req.params.id);
    const townhall = dbHelper.getTownhallById(id)
    if (townhall) {
        res
            .status(statusCodes.OK)
            .json(townhall);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Townhall not found');
    }
}

export function getTownhallByName(req, res) {
    const name = req.params.name;
    const townhall = townhalls.find(th => th.name === name);
    if (townhall) {
        res
            .status(statusCodes.OK)
            .json(townhall);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Townhall not found');
    }
}






