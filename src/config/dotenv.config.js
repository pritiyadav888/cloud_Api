const {config} = require("dotenv");

module.exports.loadEnv = () => {
    const result = config();
        if (result && result.error) {
            console.log(`Error trying to load the config file: ${result.error}`);
            return;
        }
        console.log(`Config file loaded successfully.`);
}