const express = require("express")

const server = express() 

// configurar pasta publica
server.use(express.static("public"))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,

})

//configurar caminhos da minha aplicação
//Pagina inicial
// req: Requisição
// res: Resposta
// send: Função para retornar uma resposta
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu marketiplace da coleta de residuos"})
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
})

//LIgar o servidor
server.listen(3000)