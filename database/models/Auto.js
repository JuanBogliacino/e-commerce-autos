module.exports = function(sequelize, datatypes) {
    let alias = "Auto";

    let cols = {
        id: {
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: datatypes.STRING
        },
        price: {
            type: datatypes.DOUBLE
        },
        discount: {
            type: datatypes.INTEGER
        },
        description: {
            type: datatypes.STRING
        },
        img: {
            type: datatypes.STRING
        },
        marca_id: {
            type: datatypes.INTEGER
        },
        user_id: {
            type: datatypes.INTEGER
        }
    }

    let config = {
        tableName: "autos",
        timestamps: false
    }

    let Auto = sequelize.define(alias, cols, config);

    Auto.associate = function(models) {
        Auto.belongsTo(models.Marca, {
           as: "marca",
           foreignKey: "marca_id"
        });

        Auto.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
         });
    }

    return Auto;
}