function criarGrafico(dados) {
	if (dados != null) {
	  $('#burndown').highcharts({
		title: {
		  text: 'Burndown ' + dados.sistema,
		  x: -20 //center
		},
		colors: ['blue', 'red'],
		plotOptions: {
		  line: {
			lineWidth: 3
		  },
		  tooltip: {
			hideDelay: 200
		  }
		},
		subtitle: {
		  text: 'Sprint ' + dados.sprint,
		  x: -20
		},
		xAxis: {
		  categories: gerarDias(dados.dias)
		},
		yAxis: {
		  title: {
			text: 'Pontos'
		  },
		  plotLines: [{
			value: 0,
			width: 1
		  }]
		},
		tooltip: {
		  valueSuffix: ' pts',
		  crosshairs: true,
		  shared: true
		},
		legend: {
		  layout: 'vertical',
		  align: 'right',
		  verticalAlign: 'middle',
		  borderWidth: 0
		},
		series: [{
		  name: 'Ideal',
		  color: 'rgba(255,0,0,0.25)',
		  lineWidth: 2,
		  data: gerarPontos(dados.pontos, dados.dias)
		}, {
		  name: 'Atual',
		  color: 'rgba(0,120,200,0.75)',
		  marker: {
			radius: 6
		  },
		  data: dados.realizados
		}]
	  });
	} else {
		$('#burndown').empty();
	}
}

function gerarDias(quantidade) {
	var dias = new Object();

	for(i=0;i<=quantidade;i++) {
		dias[i] = "Dia " + i;
	}

	return dias;
}

function gerarPontos(total, dias) {
	var pontos = [];
	var diferenca = total/dias;

	pontos.push(total);
	for(i=1;i<dias;i++) {
		total = total - diferenca;
		pontos.push(Math.round(total));
	}
	pontos.push(0);

	return pontos;
}