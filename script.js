(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    //Função que calcula o tempo do veículo no pátio
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor(mil % 6000 / 1000);
        return `${min}m e ${sec}s`;
    }
    //Função que realiza o CRUD dos veículos
    function patio() {
        //Função para verificar os veículos cadastrados no pátio (Read)
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        //Função para salvar os veículos no pátio (localStorage)
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        //Função que adiciona os veículos no pátio (Create)
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        //Função para remover o veículo do pátio (Delete)
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            //getTime() - coloca o tempo em milisegundos
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        //Função que renderiza a tela com os carros cadastrados
        function render() {
            //Forçar "!" com que acesse a propriedade InnerHTML
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length)
                patio.forEach((veiculo) => adicionar(veiculo));
        }
        return { ler, adicionar, remover, salvar, render };
    }
    //Renderiza a página no Reload
    patio().render();
    // Guardando os dados inseridos na variável nome e placa
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
