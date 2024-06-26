import * as dbHelper from "../db-utils/db-helper.js";
import statusCodes from "http-status-codes";

export function getAllStrategies(req, res) {
    const partName = req.query.name;
    const strategies = dbHelper.getAllStrategies(partName)
    res
        .status(statusCodes.OK)
        .json(strategies);
}

export function getStrategyByID(req, res) {
    const id = parseInt(req.params.id);
    const strategy = dbHelper.getStrategyById(id);
    if (strategy) {
        res
            .status(statusCodes.OK)
            .json(strategy);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Strategy not found');
}
}

export function getStrategyByThId(req, res) {
    const id = parseInt(req.params.id);
    const strategies = dbHelper.getStrategiesByTownhallId(id);
    if (strategies.length > 0) {
        res
            .status(statusCodes.OK)
            .json(strategies);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Strategy not found');
    }
}

export function getStrategyByAuthorName(req, res) {
    const name = req.query.name;
    const strategies = dbHelper.getStrategiesByAuthorName(name);
    if (strategies.length > 0) {
        res
            .status(statusCodes.OK)
            .json(strategies);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Strategy not found');
    }
}

export async function updateStrategy(req, res) {
    const id = parseInt(req.params.id);
    const updatedStrategy = req.body;
    const strategy = dbHelper.getStrategyById(id);
    if (strategy) {
        dbHelper.updateStrategy(id, updatedStrategy);
        res
            .status(statusCodes.OK)
            .json(updatedStrategy);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Strategy not found');
    }
}

export function addStrategy(req, res) {
    const strategy = req.body;
    try {
        const newStrategy = dbHelper.insertStrategy(strategy);
        res
            .status(statusCodes.CREATED)
            .json(newStrategy);
    } catch (err) {
        res
            .status(statusCodes.BAD_REQUEST)
            .send(err.message);
    }
}


export async function deleteStrategy(req, res) {
    const id = parseInt(req.params.id);
    const strategy = dbHelper.getStrategyById(id);
    if (strategy) {
        dbHelper.deleteStrategy(id);
        res
            .status(statusCodes.OK)
            .json(strategy);
    } else {
        res.status(statusCodes.NOT_FOUND).send('Strategy not found');
    }
}

