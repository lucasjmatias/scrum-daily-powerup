var listas
var cartoesSprint
var cartoesFazendo
var cartoesPronto

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
	var urlGetBoards = "trello/boards";
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
	var urlGetCards = "trello/lists/" + idList + "/cards";
	carregarDadosTrello(urlGetCards, callback);
}

function carregarListas(boardID) {
	var urlGetLists = "trello/boards/" + boardID + "/lists";
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
		carregarListas(boardID);
		carregarCartoes();
		var retorno = {
					"sistema": boardName,
					"sprint": recuperarNumeroSprint(),
					"pontos": recuperarTotalPontosSprint(),
					"dias": recuperarDiasSprint(),
					"realizados":recuperarTotalPontosFeitos()//[38, 30.5, 27]
					}
					
		return retorno;
	} else {
		return null;
	}
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

function recuperarNumeroSprint(){
	var listaSprint = recuperaListaSprint(listaSprint);

	var numeroSprint = listaSprint.name.match(new RegExp("\\((\\d*?)\\)","g"));
	
	if (numeroSprint == null) {
		alert("Defina um número de sprint entre ().");
	}
	
	if (numeroSprint.length > 1) {
		alert("Defina apenas um número de sprint entre ().");
	}

	return numeroSprint[0].replace("(", "").replace(")", "");
}

function recuperarDiasSprint(){
	var listaSprint = recuperaListaSprint(listaSprint);

	var diasSprint = listaSprint.name.match(new RegExp("\\[(\\d*?)\\]","g"));
	
	if (diasSprint == null) {
		alert("Defina a quantidade de dias da sprint entre [].");
	}
	
	if (diasSprint.length > 1) {
		alert("Defina apenas uma quantidade de dias da sprint entre [].");
	}

	return diasSprint[0].replace("[", "").replace("]", "");
}

function recuperarTotalPontosFeitos(){
	var pontosFeitos = [recuperarTotalPontosSprint()];

	// Executa para cada cartão na lista Fazendo
	for(i = 0;i < cartoesFazendo.length;i++) {
		// Extrai os pontos do nome do cartão no formato [d:p]
		var pontos = cartoesFazendo[i].name.match(new RegExp("\\[(.*?)\\]","g"));

		if (pontos != null) {
			// Executa para cada cartão que foi filtrado
			for(k = 0; k < pontos.length;k++) {
				// Recupera a anotação [d:p] onde d é o dia e p é o ponto
				pontosCartao = pontos[k].replace("[","").replace("]","").split(',')
				for(p = 0; p < pontosCartao.length; p++) {
					//console.log(pontosCartao[p].split(':')[1]);
					if (pontosFeitos[pontosCartao[p].split(':')[0]] == null) {
						pontosFeitos[pontosCartao[p].split(':')[0]] = 0;
					}
					pontosFeitos[pontosCartao[p].split(':')[0]] += +pontosCartao[p].split(':')[1];
				}
				
			}
		}
	}
	
	// Executa para cada cartão na lista Pronto
	for(i = 0;i < cartoesPronto.length;i++) {
		// Extrai os pontos do nome do cartão no formato [d:p]
		var pontos = cartoesPronto[i].name.match(new RegExp("\\[(.*?)\\]","g"));

		if (pontos != null) {
			// Executa para cada cartão que foi filtrado
			for(k = 0; k < pontos.length;k++) {
				// Recupera a anotação [d:p] onde d é o dia e p é o ponto
				pontosCartao = pontos[k].replace("[","").replace("]","").split(',')
				for(p = 0; p < pontosCartao.length; p++) {
					//console.log(pontosCartao[p].split(':')[1]);
					if (pontosFeitos[pontosCartao[p].split(':')[0]] == null) {
						pontosFeitos[pontosCartao[p].split(':')[0]] = 0;
					}
					pontosFeitos[pontosCartao[p].split(':')[0]] += +pontosCartao[p].split(':')[1];
				}
				
			}
		}
	}

	/*for(i = 0;i < cartoesPronto.length;i++) {
		var pontos = cartoesPronto[i].name.match(new RegExp("\\((\\d*?)\\)","g"));
		if (pontos != null){
			total += +pontos[0].replace("(", "").replace(")", "");
		}
	}*/
	console.log(pontosFeitos);
	for(t = 0; t < pontosFeitos.length-1; t++) {
		if (pontosFeitos[t+1] == null) {			
			pontosFeitos[t+1] = pontosFeitos[t];
		} else {
			pontosFeitos[t+1] = (pontosFeitos[t] - pontosFeitos[t+1]);
		}
	}

	return pontosFeitos;
}

function recuperarTotalPontosSprint(){
	var total = 0;

	for(i = 0;i < cartoesSprint.length;i++) {
		var pontos = cartoesSprint[i].name.match(new RegExp("\\((\\d*?)\\)","g"));
		if (pontos != null){
			total += +pontos[0].replace("(", "").replace(")", "");
		}
	}

	for(i = 0;i < cartoesFazendo.length;i++) {
		var pontos = cartoesFazendo[i].name.match(new RegExp("\\((\\d*?)\\)","g"));
		if (pontos != null){
			total += +pontos[0].replace("(", "").replace(")", "");
		}
	}

	for(i = 0;i < cartoesPronto.length;i++) {
		var pontos = cartoesPronto[i].name.match(new RegExp("\\((\\d*?)\\)","g"));
		if (pontos != null){
			total += +pontos[0].replace("(", "").replace(")", "");
		}
	}

	return total;
}