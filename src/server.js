const express = require('express');
const server = express();

//configurar pasta pública
server.use(express.static('public'));

//habilitar o uso do request.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//pegar o banco de dados
const db = require('./database/db');

//Utilizando template engine
const nunjuks = require('nunjucks');
nunjuks.configure('src/views', {
  express: server,
  noCache:true
});

//configurar caminhos da aplicação
//pagina inicial
server.get('/', (request, response) => {
  return response.render('index.html', {title: 'Um título'});
});

server.get('/create-point', (request, response) => {
  console.log(request.body)

  return response.render('create-point.html');
});

server.post('/savepoint', (request, response) => {

  console.log(request.body)
  
  //inserir dados no banco de dados 
    const query = `
      INSERT INTO places (
          image,
          name,
          address,
          address2,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?);

  `
  const values = [
    request.body.image,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items
  ]

  function afterInsertData(err) {
    if(err) {
      console.log(err);
      return response.render('create-error.html', { saved: false })

    }

    console.log('Cadastrado com sucesso');
    console.log(this);

    return response.render('create-point.html', { saved: true });

  }
  db.run(query, values, afterInsertData);

})


server.get('/search', (request, response) => {

  //pesquisa vazia
  const search = request.query.search

  if (search =="") {

    return response.render("search-results.html", {total: 0})
  }

  //pegar os dados do banco  
  db.all(` SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      return console.log(err);
    }    

    const total = rows.length

    //mostrar a página html com os dados do banco de dados 
    return response.render('search-results.html', {places: rows, total: total});

  });

})

//ligar o servidor
server.listen(3000);