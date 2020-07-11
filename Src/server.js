

const express = require("express")
const server = express()
//pegar o banco de dados
const db = require("./database/db.js")
//configurar pasta public
server.use(express.static("Public"))

//habilitar o uso do req.bady na nossa aplication
server.use(express.urlencoded({ extended: true}))

//utilizando template engine (nunjucks) serve pra alterar o html
//que era estatico atravez das requisições vindas do servidor
//busca dos cards cadastrados tornando assim o html mais dinamico
const nunjucks = require("nunjucks")
nunjucks.configure("Src/views", {
  express: server,
  noCache:true
});

//confirando caminhos da mina aplicação
//pagina inicial
//req para receber a requisição e
//res para resonder
//sendFile função pra buscar o arquivo
//__dirname Variavel global que me fala qual o diretorio estou

server.get("/", (req, res) =>{ //enviado a pagina via get
  return res.render("index.html")

})

server.get("/create-point", (req, res) =>{ //enviado a pagina via get
  //req.query //sao os query String da nossa url
  
  return res.render("create-point.html")
 
})

server.post("/savepoint", (req,res) =>{
  console.log(req.body)

  //inserir dados no banco de dados
  //Insert:
  const query = `
  INSERT INTO places(
    name,
    image,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?)
  `
  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items

  ]

  function afterInsertData(err){ //função calback
    if(err){
       console.log(err)
       return res.send(" Erro no cadastro")
    }
  
    console.log("Cadastro com sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true})
  }  ///fim da função que mostra e inserção na tabela

  db.run(query, values, afterInsertData) // rum que chama as variveis chave e valor e a função de inserção na tabela
  
 
})

server.get("/search-result", (req, res) =>{ //enviado a pagina via get
  /*const search = req.query.search-result
  console.log(search)
  if(search == ""){
    //pesquisa vazia
    return res.render("search-result.html", {places: rows, total: 0})
  }*/
  
  //Consultar os dados na tabela
  db.all(`SELECT * FROM places`,function(err, rows){
    if(err){
      return console.log(err)
    }
    const total = rows.length
    console.log("Aqui estão seus Registros")
    console.log(rows)
    //console.log(req.query.search-result)
    
  return res.render("search-result.html", {places: rows, total: total})
  })
  

})

//ligado o servidor 
server.listen(3000) //ouvido a prota 300


