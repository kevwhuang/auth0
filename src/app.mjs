import 'dotenv/config';
import express from 'express';
import path from 'path';
import url from 'url';

const PATH = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public');
const PORT = process.env.PORT || 10000;
const app = express();

app.listen(PORT);
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.static(PATH));
app.use(express.urlencoded({ extended: true }));
