
class ExamRepo {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS exam (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            examtype TEXT,
            ydl TEXT,
            session TEXT,
            is_archived BOOL,
            right_logo TEXT,
            semesterId INTEGER,
            CONSTRAINT exam_fk_semesterId FOREIGN KEY (semesterId)
                REFERENCES semester(id) ON UPDATE CASCADE ON DELETE CASCADE)
        )
        `
        return this.dao.run(sql)
    }

    create(name, examtype, ydl, session, is_archived, right_logo) {
        return this.dao.run(
          `INSERT INTO exam (name, examtype, ydl, session, is_archived, right_logo) VALUES (?, ?, ?, ?, ?, ?)`,
          [name, examtype, ydl, session, is_archived, right_logo])
    }

    update(exam) {
        const { id, name, examtype, ydl, session, is_archived, right_logo } = exam
        return this.dao.run(
          `UPDATE exam SET 
            name = ?, 
            examtype = ?, 
            ydl = ?, 
            session = ?, 
            is_archived = ?, 
            right_logo = ?
            WHERE id = ?`,
          [name, examtype, ydl, session, is_archived, right_logo, id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM exam WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM exam WHERE id = ?`, [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM exam`)
    }

    getItems(id) {
        return this.dao.all(
            `SELECT * FROM exam WHERE projectId = ?`,
            [id])
    }
    
}

module.exports = ExamRepo;