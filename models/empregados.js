const { sequelize } = require ("../config/database");

module.exports = (sequelize, DataTypes)=>
{
    var Empregados = sequelize.define('empregados',

        {
            id:{
                type: DataTypes.BIGINT(20),
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING
            },
            salario_bruto:{
                type: DataTypes.DOUBLE
            },
            departamento: {
                type: DataTypes.INTEGER
            }

        },{
            timestamps:false
        }
   )

   return Empregados

}


