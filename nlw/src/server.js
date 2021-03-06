const express = require("express")

const server = express() 

//Pegar o banco de dados
const db = require("./database/db.js")


//Configurar pasta publica
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended :true}))

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
    //req.query: pega as query strings da nossa url e manda para o bd
    console.log(req.query)
    //req.query
    return res.render("create-point.html")
})

server.post("/savepoint",(req, res) =>{
    //req.body: O corpo do nosso formulario
    //console.log(req.body)
    //criar uma tabela com comandos SQL

    //inserir dados na tabela
    const query = `
        INSERT INTO places(
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values,  afterInsertData)
    
})

server.get("/search-results", (req, res) => {
    
    const search = req.query.search

    if(search == ""){
        //Pesquisa vazia
        return res.render("search-results.html",{total: 0})
    }
    
    
    
    
    //pegar os dados do banco de dados
    //SELECT * FROM places WHERE city LIKE '%${search}%' para pesquisar no banco de dados 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros:")
        console.log(rows)

        //para contar quantos itens possuino array
        const total = rows.length

        //mostrar a pagina html com  os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    }) 
})

//LIgar o servidor
server.listen(3000)