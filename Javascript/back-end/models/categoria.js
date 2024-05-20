module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Categoria', {
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
};
