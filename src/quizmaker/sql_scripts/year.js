
class YearRepo {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS year (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            UNIQUE (name)
        )
        `
        return this.dao.run(sql)
    }

    create(name) {
        return this.dao.run(
          `INSERT INTO year (name) VALUES (?)`,
          [name])
    }

    update(year) {
        const { id, name } = year
        return this.dao.run(
          `UPDATE year SET name = ? WHERE id = ?`,
          [name, id]
        )
    }

    delete(id) {
        return that.dao.run(
            `DELETE FROM year WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM year WHERE id = ?`, [id]
        )
    }

    getAll() {
        return that.dao.all(`SELECT * FROM year`)
    }

    getItems(id) {
        return that.dao.all(
            `SELECT * FROM year WHERE projectId = ?`,
            [id])
    }
}

module.exports = YearRepo;