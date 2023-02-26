module.exports = function(sequelize, datatypes) {
    let alias = "User";

    let cols = {
        id: {
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: datatypes.STRING
        },
        mail: {
            type: datatypes.STRING
        },
        password: {
            type: datatypes.STRING
        }
    }

    let config = {
        tableName: "user",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Auto, {
           as: "autos",
           foreignKey: "user_id"
        });
    }

    return User;
}