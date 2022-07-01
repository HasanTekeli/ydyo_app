
class QuestionRepo {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS question (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            option4 TEXT,
            row_height TEXT,
            columns TEXT,
            examId INTEGER,
            CONSTRAINT question_fk_examId FOREIGN KEY (examId)
                REFERENCES exam(id) ON UPDATE CASCADE ON DELETE CASCADE)
        )
        `
        return this.dao.run(sql)
    }

    create(name, option1, option2, option3, option4, row_height, columns) {
        return this.dao.run(
          `INSERT INTO question (name, option1, option2, option3, option4, row_height, columns) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [name, option1, option2, option3, option4, row_height, columns])
    }

    update(question) {
        const { id, name, option1, option2, option3, option4, row_height, columns } = question
        return this.dao.run(
          `UPDATE exam SET 
            name = ?, 
            option1 = ?, 
            option2 = ?, 
            option3 = ?, 
            option4 = ?, 
            row_height = ?, 
            columns = ? 
            WHERE id = ?`,
          [name, option1, option2, option3, option4, row_height, columns, id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM question WHERE id = ?`, [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM question`)
    }

    getItems(id) {
        return this.dao.all(
            `SELECT * FROM question WHERE projectId = ?`,
            [id])
    }
}

module.exports = QuestionRepo;