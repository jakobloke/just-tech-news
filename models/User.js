const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our user model
class User extends Model {}

//define table columns and config
User.init(
    {
        // TABLE COLUMN DEFS GO HERE
        // define an id column
        id: {
            // use the special Sequelize DataTypes object to prove what type of data
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's NOT NULL option
            allowNull: false,
            // in struct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validation
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // password must be at least 4 characters
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIG OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our imported seqelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)  
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;