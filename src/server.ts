import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import db from './db_config';

import Project from './models/project';

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

// section Projects

app.get('/get_projects', async (req: Request, res: Response) => {
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
    console.log('====================================');
    console.log(id, s_key);
    console.log('====================================');
    db.any(`DELETE FROM projects WHERE id = ${id} AND s_key = '${s_key}'`)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

//section end

//section tipps

/*type Tipps = {
    name: string;
    cls: string;
    prof_link: string;
    msg: string;
};

export default Tipps;*/
app.post('/set_new_tipp', async (req: Request, res: Response) => {
    const { name, cls, prof_link, msg } = req.body;

    db.any(`INSERT INTO tipps (name, cls, prof_link, msg) VALUES ('${name}', '${cls}', '${prof_link}', '${msg}')`)
        .then((data) => {
            res.json(data);
        }
        )
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
}
);

app.get('/get_tipps', async (req: Request, res: Response) => {
    db.any('SELECT * FROM tipps')
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

//end section



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});