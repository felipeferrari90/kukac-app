const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const { getPalindromeBetweenNumbers } = require('./ex1/palindromo');
const { pegarExtrato } = require('./ex2/caixa');
const { Carro , Moto } = require('./ex3/index');
const storage = require('../repository/veiculosCadastrados.json')

const app = express()

const port = 3002

const basePath = path.join(path.resolve(__dirname, '..'),'views');

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    { extended : false}
))

app.use(express.static(path.resolve(__dirname,'..')+'/public'));

app.get("/ex3",(req, res) => {
    res.render(basePath+'/ex3',{cadastrado: false});
})

app.post("/ex3",(req, res) => {
    let veiculo = req.params.veiculo
    let marca = req.params.marca
    let ano = +req.params.ano
    let quantidadeDePortas = +req.params.portas
    switch (req.params.veiculo) {
        case 'carro':
            let carro = new Carro()
            break;
        case 'moto':
            
            break;
        default:
            break;
    }

    let extrato = JSON.parse(pegarExtrato(valorCompra, valorDinheiro))
    res.render(basePath+'/ex3',{cadastrado:true});
})

app.get("/ex2",(req, res) => {
    res.render(basePath+'/ex2',{extrato: null});
})

app.post("/ex2",(req, res) => {
    let valorCompra = +req.body.compra
    let valorDinheiro = +req.body.dinheiro
    let extrato = JSON.parse(pegarExtrato(valorCompra, valorDinheiro))
    res.render(basePath+'/ex2',{extrato:extrato});
})

app.get("/ex1",(req, res) => {
    res.render(basePath+'/ex1',{resultados: []});
})

app.post("/ex1",(req, res) => {
    let nMin = +req.body.min
    let nMax = +req.body.max
    let resultados = getPalindromeBetweenNumbers(nMin,nMax)
    res.render(basePath+'/ex1',{resultados:resultados});
})

app.get("/",(req, res) => {
    res.render(basePath+'/index');
})

app.listen(port,() => {
   "servidor rodando na porta" + port;
})