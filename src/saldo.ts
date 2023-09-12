let saldo = 3000;

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoSaldo != null) {
    /* Formatando o saldo no estilo de moeda, moeda real brasileira
    elementoSaldo.textContent = saldo.toLocaleString('pt-br', {currency: 'BRL', style: 'currency'}); */
    elementoSaldo.textContent = formatarMoeda(saldo)
}


if (elementoDataAcesso != null) {
    const dataAcesso = new Date();
    elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)
    /*
    elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br",
    {
        weekday: 'long', //formato longo de exibição
        day: '2-digit', // no formato de dois digitos
        month: '2-digit', // no formato de dois digitos
        year: 'numeric', // número total do ano
    }) // Configurando a data 
    */
}
