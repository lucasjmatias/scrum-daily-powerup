var listas;
var cartoesSprint;
var cartoesFazendo;
var cartoesPronto;
var boardSprint;

function setBoard(board) {
	boardSprint = board;
}

function setListas(lista) {	
	listas = lista;
}

function setCartoesSprint(cartoes) {	
	cartoesSprint = cartoes;
}

function setCartoesFazendo(cartoes) {	
	cartoesFazendo = cartoes;
}

function setCartoesPronto(cartoes) {	
	cartoesPronto = cartoes;
}

function popularBoards(combo) {	
	var urlGetBoards = "/trello/boards";
	$.getJSON(urlGetBoards, function(data){
		$('#' + combo).empty();
		$('#' + combo).append('<option value="0">Selecione</option>');
		$.each(data, function (index, value) {
                    $('#' + combo).append('<option value="' + value.id + '">' + value.name + '</option>');
                });
				
	});
}

function carregarDadosTrello(url, callback) {
	$.ajax({ 
		url: url, 
		dataType: 'json', 
		//data: data, 
		async: false, 
		success: callback
	});
}

function carregarCartoesPorLista(idList, callback) {
	var urlGetCards = "/trello/lists/" + idList + "/cards";
	carregarDadosTrello(urlGetCards, callback);
}

function carregarBoard(boardId) {
	var urlGetBoard = "/trello/boards/" + boardId;
	carregarDadosTrello(urlGetBoard, setBoard);
}

function carregarListas(boardID) {
	var urlGetLists = "/trello/boards/" + boardID + "/lists";
	carregarDadosTrello(urlGetLists, setListas);
}

function carregarCartoes() {
	// Carrega os cartoes da sprint
	var listaSprint = recuperaListaSprint();
	carregarCartoesPorLista(listaSprint.id, setCartoesSprint);
	
	// Carrega os cartoes fazendo
	var listaFazendo = recuperarListaFazendo();
	carregarCartoesPorLista(listaFazendo.id, setCartoesFazendo);
	
	// Carrega os cartoes pronto
	var listaPronto = recuperarListaPronto();
	carregarCartoesPorLista(listaPronto.id, setCartoesPronto);
}

function limparCampos() {
	listas = {};
}

function recuperarDadosKanban(boardID, boardName) {
	if (boardID != 0) {
		// Limpa as variáveis
		limparCampos();
		
		// Carrega os objetos do trello
		carregarBoard(boardID);
		carregarListas(boardID);
		carregarCartoes();
		var todosCartoes = R.pipe(R.union(cartoesFazendo), R.union(cartoesPronto))(cartoesSprint);
		var contarPontosTotaisCartoes = R.pipe(R.prop('total'), R.sum, R.defaultTo(0));
		var totalPontos = contarPontosTotaisCartoes(todosCartoes);
		var retorno = {
					"sistema": boardName,
					"sprint": board.numeroSprint,
					"pontos": totalPontos, //recuperarTotalPontosSprint(),
					"dias": board.dias,
					"realizados": recuperarTotalPontosFeitos(todosCartoes, totalPontos)//[38, 30.5, 27]
					}
					
		return retorno;
	} else {
		return null;
	}
}

function recuperarTotalPontosFeitos(todosCartoes, totalPontos) {
	var feitosNoDia = R.repeat(0, board.dias);
	R.forEach(function(cartao) {
			R.forEachObjIndexed(function(pontos, dia) {
				feitosNoDia[dia] += pontos;
			}, cartao.feitoPorDia);
		},
		todosCartoes
	);

	var feitosNoDiaNeg = R.map(R.negate, feitosNoDia); //Negativo pois é o que foi 'usado' do total

	var acumulador = function(a, b){ return [a + b, a + b] };
	var pegarArrAcumulado = R.prop(1);
	return pegarArrAcumulado(R.mapAccum(acumulador, totalPontos, feitosNoDiaNeg));
}

function recuperarListaFazendo() {
	var listaFazendo = listas.filter(function (i,n){return i.name.startsWith("Fazendo");});
	
	if (listaFazendo == 0) {
		alert("Defina uma lista com o nome 'Fazendo'");
	}
	
	if (listaFazendo.length > 1) {
		alert("Defina apenas uma lista com o nome 'Fazendo'");
	}

	return listaFazendo[0];
}

function recuperarListaPronto() {
	var listaFazendo = listas.filter(function (i,n){return i.name.startsWith("Pronto");});
	
	if (listaFazendo == 0) {
		alert("Defina uma lista com o nome 'Pronto'");
	}
	
	if (listaFazendo.length > 1) {
		alert("Defina apenas uma lista com o nome 'Pronto'");
	}

	return listaFazendo[0];
}


function recuperaListaSprint() {
	var listaSprint = listas.filter(function (i,n){return i.name.startsWith("Sprint Backlog");});

	if (listaSprint.length == 0) {
		alert("Defina uma lista com o nome 'Sprint Backlogs (n)[d]'. Onde 'n' é o número da sprint e 'd' é a quantidade de dias da sprint");
	}
	
	if (listaSprint.length > 1) {
		alert("Defina apenas uma lista com o nome 'Sprint Backlogs'.");
	}
	
	return listaSprint[0];
}