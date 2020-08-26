//importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//iniciar projeto de banco de dados que ira fazer operações

const db = new sqlite3.Database("./src/database/database.db")
module.exports=db

//utilizar o objeto para nossa aplicação

db.serialize(()=>{

    //criar tabela 
    //db.run(`
      //  CREATE TABLE IF NOT EXISTS places(
        //    id  INTEGER PRIMARY KEY AUTOINCREMENT,
          //  image TEX,
            //name TEXT,
           // address TEXT,
            //address2 TEXT,
            //state TEXT,
            //city TEXT,
            //itens TEXT
        //);
   // `)
    //inserir dados na tabela

    //const query = `INSERT INTO  places (image,name,address,address2,state,city,itens) VALUES(?,?,?,?,?,?,?);`
    
    //const values = [
    //"https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    //"Colectora",
    //"Guilerme Gemballa,jardim America",
    //"260",
    //"Santa Catarina",
    //"Rio do Sul",
    //"Residuos eletronicos, lampadas"]

    //function afterIsertData(err){
            //if(err){
             //   return console.log(err)
           // }
         //   console.log("Cadastrado com sucesso")
       //     console.log(this)
    //}


   // db.run(query,values,afterIsertData)


    //consultar dados da tabela 
    //db.all(`SELECT * FROM places`, function(err,rows){
       // if(err){
        //    return console.log(err)
       // }
      // console.log("aqui estao seus registros")
     // console.log(rows)
    //})

    //deletar um dado da tabela
    //db.run('DELETE FROM places  WHERE id=?',[2], function(err){
      //  if(err){
        //    return console.log(err)
        //}
        //console.log("deletado com sucesso")

    //})
})