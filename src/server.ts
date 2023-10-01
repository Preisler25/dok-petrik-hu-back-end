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

//region cors
app.use(cors({ origin: '*' }))

app.use(express.static('public'));

//sending back public folder
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//region projects

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
    const body = req.body;

    console.log(body);

    if (body.time != null) {
        db.any(`INSERT INTO projects (name, description, s_key, created_at) VALUES ('${body.name}', '${body.description}', '${body.s_key}', '${body.time}')`)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).json({ error: 'An error occurred' });
            });
    }
    else {
        db.any(`INSERT INTO projects (name, description, s_key) VALUES ('${body.name}', '${body.description}', '${body.s_key}')`)
            .then((data) => {
                res.json(data);
            }
            )
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).json({ error: 'An error occurred' });
            });
    }
});

app.delete('/delet_project', async (req: Request, res: Response) => {
    const { id, s_key } = req.body;
    db.any(`DELETE FROM projects WHERE id = ${id} AND s_key = '${s_key}'`)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

//endregion

//region tipps

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

app.post('/set_new_tipp', async (req: Request, res: Response) => {
    console.log(req.body);
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

app.delete('/delet_tipp', async (req: Request, res: Response) => {
    const { id } = req.body;

    db.any(`DELETE FROM tipps WHERE id = ${id}`)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

//endregion

//gyules region
app.get('/get_gyules', async (req: Request, res: Response) => {
    db.any('SELECT * FROM gyulesek')
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.get('/next_gyules', async (req: Request, res: Response) => {
    db.any('SELECT * FROM gyulesek WHERE gy_date > NOW() ORDER BY gy_date ASC LIMIT 1')
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error: ', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.set('/set_new_gyules', async (req: Request, res: Response) => {
    const { name, l_txt, gy_date } = req.body;

    db.any(`INSERT INTO gyulesek (name, l_txt, gy_date) VALUES ('${name}', '${l_txt}', '${gy_date}')`)
        .then((data) => {
            res.json(data);
        }
        )
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.delete('/delet_gyules', async (req: Request, res: Response) => {
    const { id } = req.body;

    db.any(`DELETE FROM gyulesek WHERE id = ${id}`)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});
//end region


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});