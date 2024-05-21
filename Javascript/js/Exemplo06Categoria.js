document.getElementById("categoriaForm")
    .addEventListener("submit", function (event) {
        // event.preventDefault(); faz com que o evento de submit do form seja cancelado
        event.preventDefault();
        const categoriaNome = document.getElementById("nome").value;
        criarCategoria(categoriaNome);
    });

function criarCategoria(nome) {
    // Comunicação com o back-end
    fetch("http://localhost:3000/categorias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome })
    })
        .then(response => response.json())
        .then(() => {
            alert("Categoria cadastrada com sucesso");
        })
        .catch(error => alert("Ocorre um erro ao cadastrar"));
}


function buscarCategorias() {
    fetch("http://localhost:3000/categorias", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(categorias => {
            for (let i = 0; i < categorias.length; i++) {
                let categoria = categorias[i];
                console.log(categoria.id + " => " + categoria.nome);
            }
        })
}

buscarCategorias();