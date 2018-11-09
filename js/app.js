/* ---------- API ---------- */
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '3552',
	'X-Auth-Token': '645eb683092bd86e0b7e038e8240d291'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function(column) {
		var createdColumn = new Column(column.id, column.name);
		board.addColumn(createdColumn);
		setupCards(createdColumn, column.cards);
	});
}

function setupCards(createdColumn, cards) {
	cards.forEach(function(card) {
		var cardObject = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		createdColumn.createCard(cardObject);	
	});
}
