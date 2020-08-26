const ex = require("express") //colocando o modulo na variavel
const server = ex()

//pegar o banco de dados
const db = require("./database/db.js")


//configurar pasta publica
server.use(ex.static("public"))

server.use(ex.urlencoded({extended: true}))


//utilizando a template nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{ //configurando as pastas dos htmls
    express: server,
    noCache: true
}) 

//ligar
server.listen(3000)

//configurar caminhos
// req = requisiçao
// res= resposta
server.get("/", (req,res)=>{
    return res.render("index.html",{title:"Um titulo"})
})


server.get("/create-point", (req,res)=>{

    req.query
    return res.render("create-point.html")

})
server.post("/save-point",(req,res)=>{
    //inserir dados do formulario no banco de dados

    const query = `INSERT INTO  places (image,name,address,address2,state,city,itens) VALUES(?,?,?,?,?,?,?);`
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
        ]
    

    function afterIsertData(err){
            if(err){
                console.log(err)
                return res.send("Erro de cadastro")
            }
            console.log("Cadastrado com sucesso")
            console.log(this)
            return res.render("create-point.html",{saved: true})
    }


    db.run(query,values,afterIsertData)


      
})


server.get("/search-results", (req,res)=>{
    //condiçoes da busca da unidade
    const search  = req.query.search
    if (search==""){
        return res.render("search-results.html",{ total:0})
    }

    //pegar os dados do banco de dados usando o objeto exportado do db.js
      db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if(err){
            return console.log(err)
        }
        console.log("aqui estao seus registros")
        console.log(rows)
        const total = rows.length

        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html",{places:rows, total:total},)
    })

    
})