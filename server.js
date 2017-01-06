var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var winers = [];

var currentId = winers.length;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/winers', function(req, res) {
    res.send({ winers: winers });
});

function getData() {
	var data = ["SONY0001",
		"SONY0002",
		"SONY0012",
		"SONY0004",
		"SONY0005",
		"SONY0006",
		"SONY0007",
		"SONY0008",
		"SONY0009",
		"SONY0010",
		"SONY0011",
		"SONY0013",
		"SONY0014",
		"SONY0015",
		"SONY0016",
		"SONY0017",
		"SONY0018",
		"SONY0019",
		"PTI0001",
		"PTI0005",
		"PTI0019",
		"PTI0024",
		"PTI0038",
		"PTI0040",
		"PTI0042",
		"FC24",
		"FC33",
		"FC22",
		"AKR0007",
		"FC2",
		"FC26",
		"AKR0001",
		"AKR0002",
		"AKR0004",
		"AKR0005",
		"AKR0006",
		"MI01",
		"BDSTK01",
		"VHS08061",
		"VHS08078",
		"VHS08457",
		"VHS08500",
		"VHS08507",
		"VHS08545",
		"VHS08559",
		"VHS08584",
		"VHS08593",
		"VHS08595",
		"VHS08599",
		"VHS08621",
		"VHS08619",
		"VHS08628",
		"PRU0031"
	];
	return data;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function vietlott() {

	var data = getData();
	var index = getRandomInt(0, data.length - 1);
	return data[index];

}
var check =[];
app.post('/winers', function(req, res) {

	while (true){
		var result = vietlott();
		if(check.indexOf(result)<0){
			currentId++;
			check.push(result);
			winers.push({
				id: currentId,
				name: result
			});

			res.send('Successfully');
			break;
		}
	}

});

app.put('/winers/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

	winers.forEach(function(winner, index) {
        if (!found && winner.id === Number(id)) {
			winner.name = newName;
        }
    });

    res.send('Succesfully');
});

app.delete('/winers/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

	winers.forEach(function(winner, index) {
        if (!found && winner.id === Number(id)) {
			winers.splice(index, 1);
        }
    });

    res.send('Successfully');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
