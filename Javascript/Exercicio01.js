function processar(){
    const elementoNome = document.querySelector("#nome");
    const elementoPeso = document.querySelector("#peso");
    const elementoAltura = document.querySelector("#altura");

    let nome = elementoNome.value;
    let peso = parseFloat(elementoPeso.value);
    let altura = parseFloat(elementoAltura.value);
    let imc = peso / (altura * altura);
    alert("Nome: " + nome + "\nIMC: " + imc);
}
// parseInt("2") => converte o texto "2" para número inteiro
// parseFloat("2.90") => converte o texto "2.90" para número real