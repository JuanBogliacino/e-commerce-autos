module.exports = function(sequelize, datatypes) {
    let alias = "Marca";

    let cols = {
        id: {
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: datatypes.STRING
        }
    }

    let config = {
        tableName: "marcas",
        timestamps: false
    }

    let Marca = sequelize.define(alias, cols, config);

    Marca.associate = function(models) {
        Marca.hasMany(models.Auto, {
           as: "autos",
           foreignKey: "marca_id"
        });
    }

    return Marca;
}