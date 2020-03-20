const mongoose = require('mongoose');
const dotenv = require('dotenv-safe');
let configResults;

const connectToDatabase = async () => {
    try {
        configResults = dotenv.config();
        if (configResults.error) {
            throw new configResults.error;
        }
        console.log("Retrieved configuration result.");
    } catch (ex) {
        console.log(ex);
    }

    const {
        DB_USER,
        DB_PASS,
        DB_NAME
    } = process.env;

    try {
        if (!DB_USER || !DB_PASS || !DB_NAME) {
            throw new Error("Could not retrieve specific database credentials from the environment file. Please ensure that you've filled in these details in the .env.");
        }
    } catch (err) {
        console.log(err.stack);
    }

    const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}-ivisa.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connected to MongoDB database.'))
        .catch((err) => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectToDatabase;