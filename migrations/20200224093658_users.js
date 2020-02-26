
exports.up = function(knex) {
  return (
    knex.schema.createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 100).unique().notNullable()
            tbl.string('password', 100).notNullable()
            tbl.string('email', 200).unique().notNullable()
            tbl.string('department', 200)

    })
        
  )
};

exports.down = function(knex) {
    return(knex.schema.dropTableIfExists('users'))
};
