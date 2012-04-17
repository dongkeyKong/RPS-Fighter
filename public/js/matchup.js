var socket = io.connect(),
	listGames = document.getElementById('list-games'),
	newGame = document.getElementById('new-game');

socket.on('list-games', function(data){
	console.log('list-games received');
	console.dir(data);
});

socket.on('new-game', function(data){
	console.log('new-game event received');
	console.dir(data);
});

listGames.addEventListener('click', function(e){
	socket.emit('list-games');
});

newGame.addEventListener('click', function(e){
	socket.emit('new-game');
});