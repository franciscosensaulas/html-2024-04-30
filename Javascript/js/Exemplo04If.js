const botaoNumeroPositivo = document.getElementById("numeroPositivo");
const botaoNumeroMaior8000 = document.getElementById("numeroMaior8000");
const textareaResultado = document.getElementById("resultado");
const inputNumero1 = document.getElementById("numero1");
const imagem = document.getElementsByTagName("img")[0];

function verificarNumeroPositivo() {
    const numero1 = parseInt(inputNumero1.value);
    // se número1 for maior que 0 então apresentará o número é positivo
    if (numero1 > 0) {
        textareaResultado.value = textareaResultado.value + numero1 + " Número positivo\n";
        // senão se número for menor que 0 apresentará o número é negativo
    } else if (numero1 < 0) {
        textareaResultado.value = textareaResultado.value + numero1 + " Número negativo\n";
        // senão apresentará o número é neutro
    } else {
        textareaResultado.value = textareaResultado.value + numero1 + " Número neutro\n";
    }
}

function verificarNumeroMaior8000() {
    const numero1 = parseInt(inputNumero1.value);
    if (numero1 === 8001) {
        // ocultar o botão de numero maior que 8000
        botaoNumeroMaior8000.style.display = "none";
        // alterar a referencia da imagem da tag img para o gif do vegeta
        imagem.setAttribute("src", "https://i.giphy.com/MvedbKot538WY.webp");
    }
}
function resetButtonNumeroMaior8000() {
    const numero1 = parseInt(inputNumero1.value);
    if (numero1 !== 8001) {
        // apresentar o botão de numero maior que 8000
        botaoNumeroMaior8000.style.display = "inline-block";
        // alterar a referencia da imagem da tag img para nenhuma imagem
        imagem.setAttribute("src", "");
    }
}
// Quando o usuário soltar a tecla apertada irá fazer a verificação se o código é 8001 e ocultar o gif
inputNumero1.onkeyup = resetButtonNumeroMaior8000;
botaoNumeroPositivo.onclick = verificarNumeroPositivo;
botaoNumeroMaior8000.onclick = verificarNumeroMaior8000;

// Verificar se número é par, verificar se o resto da divisão é igual a zero
// if (numero % 2 === 0){
//      Número é par
//}
// Operadores relacionais
// ===      Igual
// <        Menor
// >        Maior
// >=       Maior ou igual
// <=       Menor ou igual
// !==      Diferente