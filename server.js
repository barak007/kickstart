var express = require('express');
var cardsDb = createMemDB();
var app = express();

app.use(function CORS(req,res,next){	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/', function (req, res) {
	res.send('Yes its running!');
});

app.get('/search/:query', function (req, res) {
	res.json(cardsDb.find(req.params.query));
});

console.log('GET: http://localhost:3000/search/:query');

app.listen(3000);


function createMemDB(){
	var allSets = JSON.parse(require('fs').readFileSync('./AllSets.json','utf8'));
	var cards = [];
	
	Object.keys(allSets).forEach(function(setName){
		if(allSets[setName].cards){
			cards.push.apply(cards, allSets[setName].cards);
		}
	})

	console.log('Indexed: ' + cards.length + ' Items');
	
	return {
		find: function(query){
			try{
				var fuzzy = new RegExp(query.split('').join('.*?'),'im');
			} catch(err){
				return [];
			}
			
			return cards.filter(function(card){
				return card.name ? !!card.name.match(fuzzy) : false;
			}).map(function(card){
				card.imgUrl = 'http://mtgimage.com/multiverseid/' + card.multiverseid + '.jpg';
				return card;
			});
		}	
	};
	
}

