const campoTipoPJ = document.getElementById("tipoPessoaJuridica");
const campoTipoPF = document.getElementById("tipoPessoaFisica");
const botaoSalvar = document.getElementById("botao-salvar");
const campoNome = document.getElementById("nome");
const campoDataNascimento = document.getElementById("dataNascimento");
const campoApelido = document.getElementById("apelido");
const campoRazaoSocial = document.getElementById("razaoSocial");

// clientes será utilizado para armazenar a nossa lista de clientes
const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let idProximoCliente = 0;
let idAtual = -1;

// Local Storage: é um local que permite armazenar dados sem tempo de expiração
// Create: cadastrar um item por chave nome
// localStorage.setItem("nome", "Francisco Lucas Sens");
// Read: obter um item por chave
// const nomeProfessor = localStorage.getItem("nome");
// Update: atualizar um item por chave
// localStorage.setItem("nome", "Francisco Lucas Janesch Lange Sens");
// Delete: remover um item por chave
// localStorage.removeItem("nome");

const campoCpf = document.getElementById("cpf");
const mascaraCpf = { mask: "000.000.000-00" };
const mascaraCampoCpf = IMask(campoCpf, mascaraCpf);

const campoCnpj = document.getElementById("cnpj");
const mascaraCnpj = { mask: "00.000.000/0000-00" };
const mascaraCampoCnpj = IMask(campoCnpj, mascaraCnpj);

function apresentarCamposPj() {
    apresentarCampos("campos-pj");
    removerCampos("campos-pf");
}

function apresentarCamposPf() {
    apresentarCampos("campos-pf");
    removerCampos("campos-pj");
}

// função nomeFuncao(parametros){
function apresentarCampos(elementoParaRemoverClasse) {
    // Obter todas as divs que contém a classe
    const divs = document.getElementsByClassName(elementoParaRemoverClasse);
    let indice = 0;
    // Percorrer cada uma das divs com a classe
    while (indice < divs.length) {
        // Pegar a div que está sendo iterada da lista de divs
        let div = divs[indice];
        // Remover a class inactive da div, para que seja apresentada
        div.classList.remove("inactive");
        // incrementar a variável indice para ir para a próxima div
        indice = indice + 1;
    }
}

function removerCampos(tipoPessoa) {
    // Obter todas as divs que contém a classe
    const divs = document.getElementsByClassName(tipoPessoa);
    let indice = 0;
    // Percorrer cada uma das divs com a classe
    while (indice < divs.length) {
        // Pegar a div que está sendo iterada da lista de divs
        let div = divs[indice];
        // Adicionar a class inactive da div, para que seja apresentada
        div.classList.add("inactive");
        // incrementar a variável indice para ir para a próxima div
        indice = indice + 1;
    }
}

function salvarCliente() {
    //debugger;
    const nome = campoNome.value;
    const cpf = campoCpf.value;
    const dataNascimento = campoDataNascimento.value;
    const apelido = campoApelido.value;
    const razaoSocial = campoRazaoSocial.value;
    const cnpj = campoCnpj.value;
    // document.querySelector("input") irá retornar o primeiro input que encontrar
    // document.querySelector("input[name='tipoPessoa']") irá retornar o primeiro input que contenha o name 'tipoPessoa', neste cenário é o campo de Pessoa Física
    // document.querySelector("input[name='tipoPessoa':checked]") irá retornar o primeiro input que contenha o name 'tipoPessoa' que está selecionado, neste cenário é o campo que o usuário escolheu.
    const tipoPessoa = document.querySelector("input[name='tipoPessoa']:checked").value;

    if (idAtual == -1){
        const cliente = cadastrarCliente(nome, cpf, dataNascimento, apelido, cnpj, razaoSocial, tipoPessoa);
        // Adicionando o cliente na lista de clientes
        clientes.push(cliente);
    }else {
        const cliente = editarCliente(nome, cpf, dataNascimento, apelido, cnpj, razaoSocial, tipoPessoa, idAtual);
        
    }


    // JSON.stringnify gera um texto a partir de um objeto ou uma lista de objetos
    const clientesString = JSON.stringify(clientes);
    // Armazenar a lista de clientes no localStorage,
    localStorage.setItem("clientes", clientesString);
}

function editarCliente(nome, cpf, dataNascimento, apelido, cnpj, razaoSocial, tipoPessoa, idAtual){
    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i];
        if (cliente.id == idAtual){
            cliente.nome = nome;
            cliente.cpf = cpf;
            cliente.dataNascimento = dataNascimento;
            cliente.apelido = apelido;
            cliente.cnpj = cnpj;
            cliente.razaoSocial = razaoSocial;
            cliente.tipoPessoa = tipoPessoa;
            limparCampos();
            carregarClientesNaTabela();
            idAtual = -1;
            return cliente;
        }
    }
}

function cadastrarCliente(nome, cpf, dataNascimento, apelido, cnpj, razaoSocial, tipoPessoa) {
    // Incrementar o id do cliente, pq como estamos criando um novo cliente, deve ser um novo código
    idProximoCliente += 1;

    criarLinha(idProximoCliente, nome, cpf, dataNascimento, apelido, cnpj, razaoSocial, tipoPessoa);
    limparCampos();
    // Construindo um objeto com os dados do cliente
    const cliente = {
        id: idProximoCliente,
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        apelido: apelido,
        cnpj: cnpj,
        razaoSocial: razaoSocial,
        tipoPessoa: tipoPessoa
    };
    return cliente;
}

function criarLinha(idCliente, nome, cpf, dataNascimento, apelido, cnpj, razaoSocial, tipoPessoa) {
    // Criar um elemento de tr no javascript
    const novaLinha = document.createElement("tr");

    // Criar um elemento de coluna para o código
    const novaCelulaCodigo = document.createElement("td");
    // Definir o conteúdo dessa coluna do código
    novaCelulaCodigo.innerHTML = idCliente;

    // Criar um elemento de coluna para o nome
    const novaCelulaNome = document.createElement("td");
    // Definir o conteúdo dessa coluna do nome com o nome que o usuário digitou
    novaCelulaNome.innerHTML = nome;

    const novaCelulaCpfCNpj = document.createElement("td");
    if (tipoPessoa === "pf") {
        novaCelulaCpfCNpj.innerHTML = cpf;
    } else {
        novaCelulaCpfCNpj.innerHTML = cnpj;
    }

    const novaCelulaBotoes = document.createElement("td");
    const novoBotaoEditar = document.createElement("button");
    const novoBotaoApagar = document.createElement("button");
    const novoIconeEditar = document.createElement("i");
    const novoIconeApagar = document.createElement("i");

    novoIconeEditar.classList.add("fa-solid", "fa-pencil");
    novoIconeApagar.classList.add("fa-solid", "fa-trash");

    novoBotaoEditar.classList.add("botao-editar");
    novoBotaoApagar.classList.add("botao-apagar");

    novoBotaoEditar.appendChild(novoIconeEditar);
    novoBotaoEditar.innerHTML += " Editar";
    novoBotaoEditar.addEventListener("click", editar);
    novoBotaoEditar.setAttribute("data-id", idCliente);

    novoBotaoApagar.appendChild(novoIconeApagar);
    novoBotaoApagar.innerHTML += " Apagar";
    novoBotaoApagar.addEventListener("click", apagar);
    novoBotaoApagar.setAttribute("data-id", idCliente);

    novaCelulaBotoes.appendChild(novoBotaoEditar);
    novaCelulaBotoes.appendChild(novoBotaoApagar);

    // Adicionar as colunas na linha
    novaLinha.appendChild(novaCelulaCodigo);
    novaLinha.appendChild(novaCelulaNome);
    novaLinha.appendChild(novaCelulaCpfCNpj);
    novaLinha.appendChild(novaCelulaBotoes);

    // Obter a tabela para adicionarmos a nova linha criada
    const tabela = document.getElementsByClassName("table")[0];
    // Adicionar a linha na tabela
    // tabela.appendChild(novaLinha);
    const tbodyDaTabela = tabela.getElementsByTagName("tbody")[0]
    tbodyDaTabela.appendChild(novaLinha);
}

function editar(event) {
    let target = event.target;
    // Obter o data attributo id do botão que foi realizado o click  
    let id = parseInt(target.getAttribute("data-id"));
    // Percorrer cada um dos elementos para editar
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (cliente.id == id) {
            // Definir para variável global qual será o registro que será editado
            idAtual = cliente.id;
            campoNome.value = cliente.nome;
            campoCpf.value = cliente.cpf;
            campoDataNascimento.value = cliente.dataNascimento;
            campoApelido.value = cliente.apelido;
            campoCnpj.value = cliente.cnpj;
            campoRazaoSocial.value = cliente.razaoSocial;
            let evento = new Event("change");

            if (cliente.tipoPessoa == "pf") {
                campoTipoPF.checked = true;
                campoTipoPF.dispatchEvent(evento);
            }
            else {
                campoTipoPJ.checked = true;
                campoTipoPJ.dispatchEvent(evento);
            }
            return;
        }
    }
}

function apagar(event) {
    let target = event.target;
    // Obter o data attributo id do botão que foi realizado o click  
    let id = parseInt(target.getAttribute("data-id"));
    // Percorrer cada um dos elementos para remover o que possuir o id
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (cliente.id == id) {
            // Remover o elemento que contenha o indice da lista de cliente 
            clientes.splice(i, 1); // splice(indiceParaRemover, qtdParaRemover);
            let clientesString = JSON.stringify(clientes);
            // Atualizar a lista de clientes no localStorage
            localStorage.setItem("clientes", clientesString);
            // Atualizar os dados na tabela
            carregarClientesNaTabela();
            return;
        }
    }
}


function limparCampos() {
    campoNome.value = "";
    campoCpf.value = "";
    campoDataNascimento.value = "";
    campoApelido.value = "";
    campoRazaoSocial.value = "";
    campoCnpj.value = "";
    // Definir foco no campo do nome, ou seja, colocar o cursor no nome
    campoNome.focus();
}

function carregarClientesNaTabela() {
    // Remover todas as linhas da tabela
    var tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        criarLinha(
            cliente.id,
            cliente.nome,
            cliente.cpf,
            cliente.dataNascimento,
            cliente.apelido,
            cliente.cnpj,
            cliente.razaoSocial,
            cliente.tipoPessoa);
        // Descobrir o id com maior valor
        if (cliente.id > idProximoCliente)
            idProximoCliente = cliente.id;
    }
}

function alterarTipoPessoa(event) {
    if (campoTipoPF.checked === true)
        apresentarCamposPf();
    else if (campoTipoPJ.checked === true)
        apresentarCamposPj();
}

carregarClientesNaTabela();

campoTipoPJ.onchange = alterarTipoPessoa;
campoTipoPF.onchange = alterarTipoPessoa;
botaoSalvar.onclick = salvarCliente;