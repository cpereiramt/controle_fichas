const express = require('express');
const cors = require('cors');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurando connexão com o banco de dados
function execSQLQuery(sqlQry, res, req){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : '',
        database : 'sis_ficha'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if (error) {
          res.json(error);
          
        } else {
          res.json(results);         
        connection.end();
        console.log('executou!');
    }});
  }

//definindo as rotas
const router = express.Router();


router.get('/', (req, res) => res.json({ message: 'Tela inicial sisficha!' }));
app.use('/', router);

/* rotas ficha */

 //inserir
/* router.post('/fichas', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO ficha(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});  */

 
router.patch('/alterar/fichas/:id', (req, res) =>{
    const NUMFICHA = parseInt(req.params.id);
    const MATRICULA = req.body.MATRICULA.substring(0,12);
    const NOMESERVIDOR = req.body.NOMESERVIDOR.substring(0,60);
    const NOMEMAE = req.body.NOMEMAE.substring(0,60);
    const DTNASC = req.body.DTNASC.substring(0,10);
    const CPF = req.body.CPF.substring(0,11);
    const CODLOCAL = req.body.CODLOCAL.substring(0,3);
    const ESTANTE = req.body.ESTANTE.substring(0,1);
    const PRATELEIRA = req.body.PRATELEIRA.substring(0,1);
    const SITFICHA = req.body.SITFICHA.substring(0,1);
    const CODUSUEMP = req.body.CODUSUEMP.substring(0,10);
    const RG = req.body.RG.substring(0,15);
    const ORGAOEXP = req.body.ORGAOEXP.substring(0,3);
    const UF = req.body.UF.substring(0,2);
    execSQLQuery(`UPDATE ficha SET MATRICULA='${MATRICULA}',
                  NOMESERVIDOR='${NOMESERVIDOR}',
                  NOMEMAE='${NOMEMAE},
                   DTNASC='${DTNASC}',
                   CPF='${CPF}',
                   CODLOCAL='${CODLOCAL}',
                   ESTANTE='${ESTANTE}',
                   PRATELEIRA='${PRATELEIRA}',
                   SITFICHA='${SITFICHA}',
                   CODUSUEMP='${CODUSUEMP}',
                   RG='${RG}',
                   ORGAOEXP='${ORGAOEXP}',
                   UF='${UF}', 
                   WHERE NUMFICHA=${NUMFICHA}`,                  
                   res);
}) 

/* //delete
router.delete('/fichas/:id', (req, res) =>{
    execSQLQuery('DELETE FROM ficha WHERE NUMFICHA=' + parseInt(req.params.id), res);
}) */


//pesquisa ficha por id ou se vazio retorna todas as fichas .
router.get('/fichas/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE NUMFICHA=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//filtra por id da prateleira .
router.get('/fichas/prateleira/:id', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE PRATELEIRA=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//filtra por id da prateleira e id da estante .
router.get('/fichas/prateleira/:id/estante/:id2', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE PRATELEIRA=' + parseInt(req.params.id) + ' AND ESTANTE=' + parseInt(req.params.id2) ;
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//Lista de Estantes e Prateleiras cadastradas no Bd .
router.get('/estantes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE CODLOCAL=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM estante' + filter, res);
})
//inicia o servidor
app.listen(port);
console.log('API funcionando!');

