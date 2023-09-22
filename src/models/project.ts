import db from '../db_config';

type TProject = {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    finished_at: Date;
    s_key: string;

    save(): Promise<void | TProject>;
    delete(): Promise<void | TProject>;
    update(): Promise<void | TProject>;
    get(): Promise<void | TProject>;
};

class Project implements TProject {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    finished_at: Date;
    s_key: string;

    constructor(id: number, name: string, description: string, created_at: Date, finished_at: Date, s_key: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.finished_at = finished_at;
        this.s_key = s_key;
    }

    async save(): Promise<void | Project> {
        db.any(`INSERT INTO projects (name, description, s_key) VALUES ('${this.name}', '${this.description}', '${this.s_key}')`)
    }

    async delete(): Promise<void | Project> {
        db.any(`DELETE FROM projects WHERE id = ${this.id} AND s_key = '${this.s_key}'`)
    }

    async update(): Promise<void | Project> {
        db.any(`UPDATE projects SET name = '${this.name}', description = '${this.description}', s_key = '${this.s_key}', finished_at = '${this.finished_at}' WHERE id = ${this.id}`)
    }

    async get(): Promise<void | Project> {
        db.any(`SELECT * FROM projects WHERE id = ${this.id}`)
    }
}

export default Project;
