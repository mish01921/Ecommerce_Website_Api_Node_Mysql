import Sequelize from 'sequelize';
const db = new Sequelize("ecommerce", "root", "123465978Mb",
    {
        host: "localhost",
        dialect: "mysql"
    })

export default db;