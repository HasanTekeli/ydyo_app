class SemesterRepo {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS semester (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            yearId INTEGER,
            UNIQUE (name),
            CONSTRAINT semester_fk_yearId FOREIGN KEY(yearId)
                REFERENCES year(id) ON UPDATE CASCADE ON DELETE CASCADE)`
        return this.dao.run(sql)
    }

    create(name) {
        return this.dao.run(
          `INSERT INTO semester (name) VALUES (?)`,
          [name])
    }

    update(semester) {
        const { id, name } = semester
        return this.dao.run(
          `UPDATE semester SET name = ? WHERE id = ?`,
          [name, id]
        )
    }
    
    delete(id) {
        return this.dao.run(
            `DELETE FROM semester WHERE id = ?`,
            [id]
        )
    }
    

    getById(id) {
        return this.dao.get(
            `SELECT * FROM semester WHERE id = ?`, [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM semester`)
    }

    getItems(id) {
        return this.dao.all(
            `SELECT * FROM semester WHERE id = ?`,
            [id])
    }
}

module.exports = SemesterRepo;