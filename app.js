var express = require('express'),
	io = require('socket.io'),
	routes = require('./routes');
	
var app = module.exports = express.createServer();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.session({secret: 'secret', key: 'express.sid'}));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var games = [],
	Game = (function(){
		var gameID = 0;
		return {
			newGame: function(){
				return{
					id: ++gameID
				}
			}
		}
	})();

var sio = io.listen(app);

sio.sockets.on('connection', function(socket){
	socket.on('list-games', function(data){
		socket.emit('list-games',games);
	});
	socket.on('new-game', function(data){
		games.push(Game.newGame());
	});
});