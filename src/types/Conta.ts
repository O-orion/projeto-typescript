import { GrupoTransacao } from './GrupoTransacao.js';
import { TipoTransacao } from './TipoTransacao.js';
import { Transacao } from './Transacao.js';

let saldo: number = JSON.parse(localStorage.getItem('saldo')) || 0;
// recuperando os dados salvos no localstorage
const transacoes: Transacao[] = JSON.parse(localStorage.getItem('transacoes'), (key:string, valor:string) => {
    if(key === 'data') {
        return new Date(valor);
    }

    return valor;

}) || []

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!")
    }

    if (valor > saldo) {
        throw new Error("O valor a ser debitado deve ser maior do que seu saldo atual!")
    }

    saldo -= valor;
    localStorage.setItem('saldo', JSON.stringify(saldo))
}

function depositar(valor:number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero!")
    }

    saldo += valor;
    localStorage.setItem('saldo', JSON.stringify(saldo))

}

const Conta = {
    getSaldo() { return saldo},
    getDataAcesso(): Date {return new Date()},
    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes); // ele faz uma copia profunda de toda estrutura do objeto gerando uma nova referência para o objeto
    
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) =>  t2.data.getTime() - t1.data.getTime())
        let labelAtualGrupoTransacao = '';

        for(let transacao of transacoesOrdenadas) {
            let labelGroupTransacao: string = transacao.data.toLocaleString('pt-br', {month: 'long', year: 'numeric'})

            if(labelAtualGrupoTransacao != labelGroupTransacao) {
                labelAtualGrupoTransacao = labelGroupTransacao
                gruposTransacoes.push({
                    label: labelGroupTransacao,
                    transacoes: []
                })
            }
            gruposTransacoes.at(-1).transacoes.push(transacao)
        }

        return gruposTransacoes
    },
    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
            ;
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);

        } else {
            throw new Error("Tipo de Transação é inválido!");
            return;
        }

        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes())
        // Transformando em uma lista de string json para ser salva
        localStorage.setItem("transacoes", JSON.stringify(transacoes))
    }
}

export default Conta;