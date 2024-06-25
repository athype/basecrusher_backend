import express, {json} from "express";

import cors from "cors";

import statusCodes from "http-status-codes";

import thRouter from "./routers/th-router.js";
import stratRouter from "./routers/strategy-router.js";
import authorRouter from "./routers/author-router.js";

import {createDb} from "./db-utils/db-helper.js";
import testRouter from "./routers/test-router.js";


const app = express();
const port = 8000;

app.use(express.json());

createDb();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/townhalls', thRouter);
app.use('/api/strategies', stratRouter);
app.use('/api/authors', authorRouter);
app.use('/api/vercel', testRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong!'
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;