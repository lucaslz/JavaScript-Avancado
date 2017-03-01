// Lista de elementos que sera mostrada na tela e que sera usada para somar o tatal
var list = [
  {"desc":"rice", "amount": "1", "value": "5.40"},
  {"desc":"beer", "amount": "12", "value": "1.99"},
  {"desc":"meat", "amount": "1", "value": "15.00"}
];

// Calcula todos os itens da lista e retorna o total
function getTotal(list) {
  var total = 0;

  for(var key in list) {
    total += (list[key].value * list[key].amount);
  }
  document.getElementById("totalValue").innerHTML = formataValue(total);
}

// Popular a table com os itens da lista
function setList(list) {
  var table = '<thead>\
              <tr><td>Description</td>\
              <td>Amount</td>\
              <td>Value</td>\
              <td>Action</td>\
              </tr></thead><tbody>';

  for(var key in list) {
    table += '<tr><td>'+
                formaDesc(list[key].desc)+
            '</td><td>'+
                formataAmount(list[key].amount)+
            '</td><td>'+
                formataValue(list[key].value)+
            '</td><td>\
            <button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button>\
             | \
            <button class="btn btn-default" onclick="deleteData('+key+');">Delete</button>\
            </td></tr>';
  }

  table += '</tbody>';

  document.getElementById('listTable').innerHTML = table;
  getTotal(list);
  saveListStorade(list)
}

function formaDesc(desc) {
  var str = desc.toLowerCase();
  // Pegando a letra inicial deixando maiuscula pegando o restante da
  // strind e concatendo
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

function formataValue(value) {
  var str = parseFloat(value).toFixed(2) + "";
  str = str.replace(".", ",");
  str = "$ " + str;
  return str;
}

function formataAmount(amount) {
  return parseInt(amount);
}

function addData() {
  if(!validation ()) {
    return;
  }
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  //acionando um elemento na primeira posiÃ§Ã£o do array
  list.unshift({"desc": desc, "amount": amount, "value": value});
  setList(list);
}

function setUpdate(id) {
  var obj = list[id];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("amount").value = obj.amount;
  document.getElementById("value").value = obj.value;
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate"\
  type="hidden" value="'+id+'">';
}

function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("value").value = "";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline-block";
  document.getElementById("inputIdUpdate").innerHTML = "";
  document.getElementById('errors').style.display = "block";
}

function updateData() {
  if(!validation ()) {
    return;
  }
  var id = document.getElementById("idUpdate").value;
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list[id] = {"desc":desc, "amount":amount, "value":value};
  resetForm();
  setList(list);
}

function deleteData(id) {
  if(confirm("Delete this item?")){
    if(id === list.length -1) {
      // Limpara ultimo registro da lista
      list.pop();
    } else if (id === 0) {
      // Limpar o primeiro elemento da lista
      list.shift();
    }else {
      // Limpando elementos que estão no meio da lista, tirando os primeiro e os
      // ultimo elementos, sendo assim o que ficar não aparecerá na tela mais
      var arrIni = list.slice(0, id); //Não pega o ID, pega do 0 até ID
      var arrEnd = list.slice(id + 1); //Pegando do ID até o final do array
      list = arrIni.concat(arrEnd);

    }
    setList(list);
  }
}

function validation () {
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;
  document.getElementById('errors').style.display = "none";
  var errors = "";

  if(desc === "") {
    errors += '<p>Fill out description</P>';
  }

  if(amount === "") {
    errors += '<p>Fill out quantity</P>';
  }else if (amount != parseInt(amount)) {
    errors += '<p>Fill out valid amount</P>';
  }

  if(value === "") {
    errors += '<p>Fill out value</P>';
  }else if (value != parseFloat(value)) {
    errors += '<p>Fill out valid value</P>';
  }

  if(errors != "") {
    document.getElementById('errors').style.display = "block";
    document.getElementById('errors').style.backgroundColor = "rgba(85, 85, 85, 0.3)";
    document.getElementById('errors').style.color = "white";
    document.getElementById('errors').style.padding = "10px";
    document.getElementById('errors').style.margin = "10px";
    document.getElementById('errors').style.borderRadius = "13px";
    document.getElementById('errors').innerHTML = "<h3>Error:</h3>" + errors;
    return 0;
  }else {
    return 1;
  }
}

function deleteList() {
  if (confirm("Delete this List?")) {
    list = [];
    setList(list);
  }
}

// Salvando os dados no local storade para não precisar ficar inserindo toda hora
function saveListStorade(list) {
  var jsonStr = JSON.stringify(list);
  localStorage.setItem("list", jsonStr);
}

// Inicializando o local storade
function initListStorage() {
  //Verificando se a lista ja existe la...
  var testList = localStorage.getItem("list");
  //Se a lista existir eu resgato ela
  if(testList) {
    list = JSON.parse(testList);
  }
  setList(list);
}

initListStorage();
