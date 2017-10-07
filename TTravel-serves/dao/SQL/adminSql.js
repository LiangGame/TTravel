
exports.sql= {
  check: 'UPDATE user_travelnotes notes SET notes.check = ? WHERE notes.id = ?',
  getAll:'select * from travelnotes'
}
