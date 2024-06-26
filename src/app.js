import express, {json} from "express";
import cors from "cors";
import morgan from "morgan";

import statusCodes from "http-status-codes";

import thRouter from "./routers/th-router.js";
import stratRouter from "./routers/strategy-router.js";
import authorRouter from "./routers/author-router.js";

import {createDb} from "./db-utils/db-helper.js";
import testRouter from "./routers/test-router.js";


import * as middleware from "./utils/middleware.js";

const app = express();

app.use(express.json());

createDb();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// request logger middleware
app.use(morgan("tiny"));

// healthcheck endpoint
app.get("/", (req, res) => {
    res.status(200).send({ status: "ok" });
});

app.use('/api/townhalls', thRouter);
app.use('/api/strategies', stratRouter);
app.use('/api/authors', authorRouter);
app.use('/api/vercel', testRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;