import { TipoTransacao } from './TipoTransacao.js';
let saldo = JSON.parse(localStorage.getItem('saldo')) || 0;
// recuperando os dados salvos no localstorage
const transacoes = JSON.parse(localStorage.getItem('transacoes'), (key, valor) => {
    if (key === 'data') {
        return new Date(valor);
    }
    return valor;
}) || [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("O valor a ser debitado deve ser maior do que seu saldo atual!");
    }
    saldo -= valor;
    localStorage.setItem('saldo', JSON.stringify(saldo));
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
    localStorage.setItem('saldo', JSON.stringify(saldo));
}
const Conta = {
    getSaldo() { return saldo; },
    getDataAcesso() { return new Date(); },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes); // ele faz uma copia profunda de toda estrutura do objeto gerando uma nova referência para o objeto
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGroupTransacao = transacao.data.toLocaleString('pt-br', { month: 'long', year: 'numeric' });
            if (labelAtualGrupoTransacao != labelGroupTransacao) {
                labelAtualGrupoTransacao = labelGroupTransacao;
                gruposTransacoes.push({
                    label: labelGroupTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
            return;
        }
        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        // Transformando em uma lista de string json para ser salva
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
