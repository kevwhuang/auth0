import 'dotenv/config';
import express from 'express';
import oidc from 'express-openid-connect';
import path from 'path';
import url from 'url';

const PATH = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public');
const PORT = process.env.PORT;
const app = express();

const configAuth = {
    auth0Logout: true,
    authRequired: false,
    baseURL: 'http://localhost:8888',
    clientID: 'QTACLfhEzzDoVHV0kGp1zCq5HoLYGj5t',
    issuerBaseURL: 'https://dev-2z360f0qw766a1fp.us.auth0.com',
    secret: process.env.SECRET_KEY,
};

app.listen(PORT);

app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.static(PATH));
app.use(express.urlencoded({ extended: true }));
app.use(oidc.auth(configAuth));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated());
});

app.get('/profile', oidc.requiresAuth(), (req, res) => {
    res.send(req.oidc.user);
});

app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(PATH, '/404.html'));
});
