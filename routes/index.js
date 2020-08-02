
module.exports.register = (server, serviceLocator) => {
    server.get('/', (req, res) => serviceLocator.get('indexController').get(req, res));

    server.get('/home', (req, res) => serviceLocator.get('indexController').home(req, res));
}

