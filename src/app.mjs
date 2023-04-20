import 'dotenv/config';
import express from 'express';
import oidc from 'express-openid-connect';
import path from 'path';
import url from 'url';

const PATH = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public');
const app = express();

const configAuth = {
    auth0Logout: true,
    authRequired: false,
    baseURL: process.env.AUTH0_BASE_URL || `http://localhost:${process.env.PORT}`,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_CLIENT_SECRET,
};

app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.static(PATH));
app.use(express.urlencoded({ extended: true }));
app.use(oidc.auth(configAuth));

app.listen(process.env.PORT);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated());
});

app.get('/profile', oidc.requiresAuth(), (req, res) => {
    res.send(req.oidc.user);
});

app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(PATH, '/404.html'));
});
