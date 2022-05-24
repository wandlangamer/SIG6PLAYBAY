function getLocalStorage() {
	var values = [],
		keys = Object.keys(localStorage),
		i = keys.length;

	while (i--) {
		values.push(localStorage.getItem([keys[i]]));
	}

	return values;
}

function emptyList() {
	let produtos = document.getElementById("produtos");
	produtos.innerHTML = "Nenhum item no carrinho!";
}

function addItems() {
	let items = getLocalStorage();
	let produtos = document.getElementById("produtos");
	if (items.length == 0) {
		emptyList();
	}
	for (let i = 0; i < items.length; i++) {
		let produto = document.createElement("div");
		produto.innerHTML = `
    <div class="row item">
    <img th:src="@{../images/videogames/videogame_1.png}" />

    <div class="col info">
      <h2>${items[i].split(",")[0]}</h2>
      <h4>R$ ${items[i].split(",")[2]}</h4>
    </div>
  </div>
  
    `;
		console.log(items[i].split(",")[1])
		produtos.appendChild(produto);
	}
}

function addInfos() {
	let items = getLocalStorage();
	let infos = document.getElementById("infos");
	for (let i = 0; i < items.length; i++) {
		let info = document.createElement("div");
		info.innerHTML = `
    <div class="row">
      <h5 class="pedido_item text-left">${items[i].split(",")[0]}</h5>
      <div class="col">
        <h5 class="pedido_preco text-right">R$ ${items[i].split(",")[2]}</h5>
      </div>
    </div>`;
		infos.appendChild(info);
	}
}

function calculateFrete() {
	let frete = document.getElementById("frete");
	let total = document.getElementById("total");
	let valor = total.innerHTML.split("R$ ")[1];
	if (valor > 50) {
		frete.innerHTML = `R$ 0,00`;
	} else {
		frete.innerHTML = `R$ 10,00`;
	}
}

function getTotalPrice() {
	let items = getLocalStorage();
	let total = 0;
	for (let i = 0; i < items.length; i++) {
		total += parseFloat(items[i].split(",")[2]);
	}
	let frete = document.getElementById("frete").innerHTML;
	return (total + parseFloat(frete.split("R$ ")[1])).toFixed(2);
}

function updateTotalPrice() {
	let total = document.getElementById("total");
	total.innerHTML = `R$ ${getTotalPrice()}`;
}

function finishOrder() {
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "Pedido concluido com sucesso!",
		showConfirmButton: false,
		timer: 1500,
	});
	localStorage.clear();
}

addItems();
addInfos();
calculateFrete();

updateTotalPrice();
