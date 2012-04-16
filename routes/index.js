exports.index = function(req, res){
	res.render('index',
		{
			title: 'Socket Matchup'
		}
	);
};