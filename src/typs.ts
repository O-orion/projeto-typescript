let valor: number = 3000; // boas praticas é declara o tipo da variavel.
valor = Number('ll');

let nome: string = ''
let isPago: boolean = false;

let qualquer: any = ''

const lista: string[] = []

lista.push('4')
/* lista.push(4)
lista.push(true) */

// Tipos personalizados (Types  Alias)
type transacao = {
    tipo: tipoTransacao;
    data: Date;
    valor: number;
} // explicitando o que uma transação deve conter.

// Enum

enum tipoTransacao {
    DEPOSITO = 'Depósito',
    TRANSFERENCIA = 'Transferência',
    PAGAMENTO_BOLETO = 'Pagamento de Boleto'
}

// Criando um objeto do tipo transacao
const newTransacao: transacao = { 
    'tipo': tipoTransacao.DEPOSITO,
    'data': new Date(),
    'valor': 500
}

// Enums são um conjunto de valores fixos definidos no codigo.
