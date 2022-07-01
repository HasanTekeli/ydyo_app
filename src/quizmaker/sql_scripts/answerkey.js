
class AnswerKeyRepo {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS answerkey (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer_a TEXT,
            answer_b TEXT,
            examId INTEGER,
            CONSTRAINT answerkey_fk_examId FOREIGN KEY (examId)
                REFERENCES exam(id) ON UPDATE CASCADE ON DELETE CASCADE)
        )
        `
        return this.dao.run(sql)
    }

    create(answer_a, answer_b) {
        return this.dao.run(
          `INSERT INTO answerkey (answer_a, answer_b) VALUES (?, ?)`,
          [answer_a, answer_b])
    }

    update(answerkey) {
        const { id, answer_a, answer_b } = answerkey
        return this.dao.run(
          `UPDATE year SET 
            answer_a = ?, 
            answer_b = ?
            WHERE id = ?`,
          [answer_a, answer_b, id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM answerkey WHERE id = ?`, [id]
        )
    }

    getAll() {
        return that.dao.all(`SELECT * FROM answerkey`)
    }
}

module.exports = AnswerKeyRepo;