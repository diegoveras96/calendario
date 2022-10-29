document.addEventListener('DOMContentLoaded', function () {

    function getDaysCalendar(mes, ano) {
        document.querySelector('.mes').innerHTML = `${meses[mes]} ${ano}`;
        let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1; //pega o dia da semana que caiu o dia 1º
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

        //FOR para alterar os valores da tabela dos calendários para o dia certo do mês
        for (var i = -firstDayOfWeek, index = 0; i < (42 - firstDayOfWeek); i++, index++) {
            let dt = new Date(ano, mes, i);
            let tday = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index]; //Pega a cada TR das TDs 
            dayTable.classList.remove('mesAnterior');
            dayTable.classList.remove('proximoMes');
            dayTable.classList.remove('diaAtual')
            dayTable.innerHTML = dt.getDate(); //Altera o valor de acordo com o dia

            if (i < 1) {
                dayTable.classList.add('mesAnterior');
            } else if (i > getLastDayThisMonth) {
                dayTable.classList.add('proximoMes');
            } else if (dt.getFullYear() == tday.getFullYear() && dt.getMonth() == tday.getMonth() && dt.getDate() == tday.getDate()) {
                dayTable.classList.add('diaAtual');
            }
        }
        for(i=0, index =0; i < 6; i++, index++){
            dt = new Date(ano, mes, i)
            dayTable = tableDays.getElementsByTagName('td')[index]
        }
    }

    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();
    const tableDays = document.querySelector('.dias');

    const preview = document.getElementById('preview');
    const next = document.getElementById('next');

     meses.forEach((mesNome,i) =>{
        document.querySelector('.mes').addEventListener("click", ()=>{
            //AQUI VAI SER CRIADA A NOVA DIV
            let boxSearch = document.createElement('div');
            let container = document.querySelector('.boxSearch');
            
            boxSearch.classList.add('search');

            container.style.visibility = 'visible';
            document.querySelector('.calendario').style.visibility = 'hidden';
            boxSearch.innerHTML = `<span data-mes = ${i} > ${mesNome}  </span>`;

            container.appendChild(boxSearch);     
        })
     })

    next.onclick = function () {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        getDaysCalendar(mes, ano)
    }
    preview.onclick = function () {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        getDaysCalendar(mes, ano)
    }

    getDaysCalendar(mes, ano);
})

