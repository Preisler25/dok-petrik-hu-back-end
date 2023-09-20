import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import db from './db_config';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static('public'));

//sending back public folder
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/get_projects', async (req: Request, res: Response) => {
    /*
    try {
        const users = await db.any('SELECT * FROM projects');
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }*/
    db.any('SELECT id FROM projects')
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.get('/get_projects/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    db.any(`SELECT * FROM projects WHERE id = ${id}`)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.post('/set_new_project', async (req: Request, res: Response) => {
    const { name, description, s_key } = req.body;

    db.any(`INSERT INTO projects (name, description, s_key) VALUES ('${name}', '${description}', '${s_key}')`)
        .then((data) => {
            res.json(data);
        }
        )
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.delete('/delet_project', async (req: Request, res: Response) => {
    const { id, s_key } = req.body;

    db.any(`DELETE FROM projects WHERE id = ${id} AND s_key = '${s_key}'`)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});