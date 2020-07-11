//importar as dependencias do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto que ira fzr operações  no obejeto de banco de dados
const db = new sqlite3.Database("./Src/database/database.db")

module.exports = db //exportamdo o objeto db

//utilizar o objeto de banco de dados para nossas operações
db.serialize(() =>{
  // Operações de tabela:
  //Create:
  /*db.run(` 
      CREATE TABLE IF NOT EXISTS places ( 
        id INTEGER PRIMARY KEY AUTOINCREMEnT,
        name TEXT,
        image TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
  `) //fim do rum que cria a tabela

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
    "Coletoria",
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    "Guilherme Gemballa, Jardim America",
    "Numero 260",
    "Santa Catarina",
    "Rio do Sul",
    "Papeis e Papelão"
  ]*/

  /*function afterInsertData(err){ //função calback
    if(err){
      return console.log(err)
    }
  
    console.log("Cadastro com sucesso")
    console.log(this)
  }  *////fim da função que mostra e inserção na tabela

  //db.run(query, values, afterInsertData) // rum que chama as variveis chave e valor e a função de inserção na tabela
  
  

  //Delete
  /*db.run(`DELETE FROM places WHERE id = ?`,[17], function(err){
    if(err){
      return console.log(err)
    }
    console.log("Registro deletado com sucesso")
  }) *///fim da rum que deleta os dados da tabela

  
  //Consultar os dados na tabela
  /*db.all(`SELECT * FROM places`,function(err, rows){
    if(err){
      return console.log(err)
    }
    console.log("Aqui estão seus Registros")
    console.log(rows)
  }) */// fim da função all que consulta os dados da tabela

  //Update
})//fim do metodo serialise

   