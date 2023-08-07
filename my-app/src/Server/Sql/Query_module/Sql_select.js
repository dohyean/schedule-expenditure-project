// select 문
module.exports = {
  sql_select: function (db, schema, column, where, where_data) {
    return new Promise((resolve, reject) => {
      var receive_type = 4;
      var return_data = "";
      var sqlQuery = `SELECT ${column} FROM ${schema} ${where}`;
      db.all(sqlQuery, where_data, (err, result) => {
        if (err) {
          receive_type = 0;
          return_data = "err";
        } else {
          if (result[0] === undefined) {
            receive_type = 1;
            return_data = "";
          } else {
            receive_type = 2;
            return_data = result[0];
          }
        }
        while (true) {
          if (receive_type !== 4) {
            resolve(return_data);
            break;
          }
        }
      });
    });
  },
};
