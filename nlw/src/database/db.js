//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco de dados 
const db = new sqlite3.Database("./src/database/database.db") 

//Para exportar o banco de dados 
module.exports = db

//utilizar o objeto do banco de dados, para nossa operação
db.serialize(()=>{
    //criar uma tabela com comandos SQL
    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values,  afterInsertData)*/


    //consultar os dados da tabela
    //rows para ver os registros 
    //SELECT * FROM places e para  selecionar todos os campos da tabela 
    /*db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros:")
        console.log(rows)
    })*/

    //deletar um dado da tabela
    /*db.run(`DELETE FROM places WHERE id = ?`, [8], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })*/
})