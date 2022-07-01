function delete_item(that, repo, id) {
    return that.dao.run(
      `DELETE FROM ? WHERE id = ?`,
      [repo, id]
    )
}

function get_by_id(that, repo, id) {
    return that.dao.get(
        `SELECT * FROM ? WHERE id = ?`, [repo, id]
    )
}

function get_all(that, repo) {
    return that.dao.all(`SELECT * FROM ?`, [repo])
}
function get_items(that, repo, itemId) {
    return that.dao.all(
      `SELECT * FROM ? WHERE projectId = ?`,
      [repo, itemId])
}

module.exports = delete_item, get_by_id, get_all, get_items