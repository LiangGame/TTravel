
exports.sql= {
  getPasswordById:'select * from master where telephone=?',
  check: 'UPDATE user_travelnotes notes SET notes.check = ? WHERE notes.id = ?',
  getAll:'select * from travelnotes ORDER BY pubtime DESC'
}
