//importar a dependenica do sqlite3
const sqlite3 = require('sqlite3').verbose()

//criar o objeto que irá fazer operações no banco de dados 
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// //utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
// //   // Criar uma tabela com comandos sql
// //   db.run(`
// //     CREATE TABLE IF NOT EXISTS places (
// //         id INTEGER PRIMARY KEY AUTOINCREMENT,
// //         image TEXT,
// //         name TEXT,
// //         address TEXT,
// //         address2 TEXT,
// //         state TEXT,
// //         city TEXT,
// //         items TEXT
// //     );
// //   `)

// //    //Inserir dados na tabela
// //   const query = `
// //       INSERT INTO places (
// //           image,
// //           name,
// //           address,
// //           address2,
// //           state,
// //           city,
// //           items
// //       ) VALUES (?,?,?,?,?,?,?);

// //   `
// //   const values = [
// //     "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// //     "Paperside",
// //     "Guilherme Gembala, Jardim América",
// //     "Numero 260",
// //     "Santa Catarina",
// //     "Rio do Sul",
// //     "Residuos Eletronicos, Lampadas"
// //   ]

// //   function afterInsertData(err) {
// //     if(err) {
// //       return console.log(err);
// //     }

// //     console.log('Cadastrado com sucesso');
// //     console.log(this);
// //   }

// //   db.run(query, values, afterInsertData);

//      //Consultar dados na tabela
  // db.all(` SELECT name FROM places`, function(err, rows) {
  //   if(err) {
  //       return console.log(err);
  //     }

  //   console.log("Aqui estão seus registros: ");
  //   console.log(rows);
  // })

  //Deletar um dado na tabela
//  db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//    if(err) {
//      return console.log(err);
//    }

//   console.log('Registro deletado com sucesso')
//   })

 }) 
