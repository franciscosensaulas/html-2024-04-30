// document.querySelector é utilizado para encontrar o primeiro elemento que contenha o seletor
// document.querySelector("seletor");
// Exemplos de seletores
// document.querySelector("#idDoElemento"); Selecionar o elemento que contenha o id
// document.querySelector(".nomeClasseDoElemento"); Selecionar o elemento que contenha a classe
// document.querySelector("input"); Selecionar o elemento que contenha a tag

// Criando uma constante elementoH1 que será atribuído o primeiro elemento que contém a tag h1
const elementoH1 = document.querySelector("h1");

function apresentarNomeCompleto(){
    // selecionar elemento que contenha o id nome
    const elementoNome = document.querySelector("#nome"); 
    const elementoSobrenome = document.querySelector("#sobrenome");

    // Obter o valor digitado no campo que contém o id nome, ou seja, da constante elementoNome
    let nome = elementoNome.value;
    let sobrenome = elementoSobrenome.value;
    let nomeCompleto = nome + " " + sobrenome;
    alert("Nome completo: " + nomeCompleto);
}