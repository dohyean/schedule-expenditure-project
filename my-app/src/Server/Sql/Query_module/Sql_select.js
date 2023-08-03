// select 문
module.exports = {
  sql_select: function (db, schema, column, where, where_data) {
    return new Promise((resolve, reject) => {
      var receive_type = 4;
      var sqlQuery = `SELECT ${column} FROM ${schema} ${where}`;
      db.all(sqlQuery, where_data, (err, result) => {
        if (err) {
          console.log(err);
          receive_type = 0;
        } else {
          if (result[0] === undefined) {
            receive_type = 1;
          } else {
            receive_type = 2;
          }
        }
        while (true) {
          if (receive_type !== 4) {
            resolve(receive_type);
            break;
          }
        }
      });
    });
  },
};
