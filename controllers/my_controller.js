const { sequelize, Sequelize } = require('../config/database');
const { Op } = require('sequelize');
const empregadoModel = require("../models/empregados")(sequelize,Sequelize)

exports.inicio = async (req,res)=> {
    var administrativo = await empregadoModel.count({
        where:{
            departamento:1
        }
    })
    var designer = await empregadoModel.count({
        where:{
            departamento:2
        }
    })
    var contabil = await empregadoModel.count({
        where:{
            departamento:3
        }
    })
    var fabrica = await empregadoModel.count({
        where:{
            departamento:4
        }
    })
    empregadoModel.findAll(
    ).then(results=> {
        for(result of results){
            if(Number(result.salario_bruto) <= 1903.98){
                aliquota = 0;
            }
            else if(result.salario_bruto > 1903.98 && result.salario_bruto <= 2826.65){
                aliquota = 0.075;
            }
            else if(result.salario_bruto > 2826.65 && result.salario_bruto <= 3751.06){
                aliquota = 0.15;
            }
            else if(result.salario_bruto > 3751.06 && result.salario_bruto <= 4664.68){
                aliquota = 0.225;
            }
            else{
                aliquota = 0.275;
            }
            let irpf = result.salario_bruto * aliquota;
            let inss = result.salario_bruto * 0.11;
            result.salario_liquido = result.salario_bruto - irpf - inss;
            if(Number(result.departamento) == 1){
                result.departamento = "Administrativo";
            }
            if(Number(result.departamento) == 2){
                result.departamento = "Designer";
            }
            if(Number(result.departamento) == 3){
                result.departamento = "Contábil";
            }
            if(Number(result.departamento) == 4){
                result.departamento = "Fábrica";
            }
        }
        res.render('inicio',{ layout:false, administrativo, designer, contabil, fabrica, results_form:results })
    }).catch(err => {
        res.status(500).send({message: "Error" + err.message})
    })


}

exports.pesquisa = async (req,res) =>
{
    operacoes = [];
    operacoes.push({
        nome:{
            [Op.substring]:req.body.pesquisa
        }
    });
    if(Number(req.body.departamento)!=0){
        operacoes.push({
            departamento:Number(req.body.departamento)
        })
    }
    var administrativo = await empregadoModel.count({
        where:{
            departamento:1
        }
    })
    var designer = await empregadoModel.count({
        where:{
            departamento:2
        }
    })
    var contabil = await empregadoModel.count({
        where:{
            departamento:3
        }
    })
    var fabrica = await empregadoModel.count({
        where:{
            departamento:4
        }
    })
    empregadoModel.findAll({
        where:{
            [Op.and]:operacoes
        },
        order:[
            ['salario_bruto',req.body.ordem]
        ]
    }).then(results =>{
        for(result of results){
            if(Number(result.salario_bruto) <= 1903.98){
                aliquota = 0;
            }
            else if(result.salario_bruto > 1903.98 && result.salario_bruto <= 2826.65){
                aliquota = 0.075;
            }
            else if(result.salario_bruto > 2826.65 && result.salario_bruto <= 3751.06){
                aliquota = 0.15;
            }
            else if(result.salario_bruto > 3751.06 && result.salario_bruto <= 4664.68){
                aliquota = 0.225;
            }
            else{
                aliquota = 0.275;
            }
            let irpf = result.salario_bruto * aliquota;
            let inss = result.salario_bruto * 0.11;
            result.salario_liquido = result.salario_bruto - irpf - inss;
            if(Number(result.departamento) == 1){
                result.departamento = "Administrativo";
            }
            if(Number(result.departamento) == 2){
                result.departamento = "Designer";
            }
            if(Number(result.departamento) == 3){
                result.departamento = "Contábil";
            }
            if(Number(result.departamento) == 4){
                result.departamento = "Fábrica";
            }
        }
        res.render('inicio',{ layout:false, administrativo, designer, contabil, fabrica, results_form:results })
    })
}

exports.cadastro = (req,res) =>
{
    const empregadoData = {
        nome:req.body.nome,
        salario_bruto:req.body.salario_bruto,
        departamento:req.body.departamento
    };
    empregadoModel.create(empregadoData).then(data=> {
        console.log("Empregado cadastrado!");
        res.redirect('/');
    }).catch(err => {
        console.log("Error" + err);
    })

}

exports.cadastrar = (req,res) =>{
    res.render("cadastro",{layout:false})
}

exports.delete = (req,res) => {
    const id_param = req.params.id;
    empregadoModel.destroy({
        where: {id:id_param}


    }).then((result)=>{
        if(!result){
            req.status(400).json(
                {message:"Ocorreu um erro!"}
            );
        }
        res.redirect("/");
    }).catch((err)=> {
        res.status(500).json({message:"Não foi possível deletar"});
        console.log(err);
    }
)
   
}

exports.editar = (req,res) =>{

    const id_param = req.params.id;
    empregadoModel.findByPk(id_param).then(result => {
        res.render("editar",
            {
             layout:false, 
             id:id_param,
             results_data:result 
            }
        )
    }

).catch(err => {
    res.status(500).json({message:"Ocorreu um erro"});
    console.log(err);
})
   
}

exports.update = (req,res) => {
    empregadoModel.update(
    {
        nome:req.body.nome,
        departamento: req.body.departamento,
        salario_bruto: req.body.salario_bruto
    },{
        where: {id: req.body.id_for_updating}
    }
   ).then(anything=>{
       if(!anything){
        req.status(400).send({message:"Ocorreu um erro."})
       }
       res.redirect('/');
   }).catch(err=>{
    res.status(500).send({
        message: "Não foi possível acessar o banco de dados"
    })
   })

}