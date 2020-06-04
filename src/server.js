const express = require('express');
const server = express();

//configurar pasta pública
server.use(express.static('public'))

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
  return response.render('create-point.html');
});

server.get('/search', (request, response) => {
  return response.render('search-results.html');
});

//ligar o servidor
server.listen(3000);