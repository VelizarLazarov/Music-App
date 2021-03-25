const config = {
    PORT: 5000,
    DB_URI: 'mongodb://localhost/musicDB',
    SALT_ROUNDS: 10,
    SECRET: 'bottle',
    COOKIE_NAME: 'token'
}

module.exports = config