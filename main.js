document.addEventListener('DOMContentLoaded', function () {

    function getDaysCalendar(mes, ano) {
        calendario.style.visibility = 'visible';
        document.querySelector('.boxSearch').style.zIndex = "-1";
        dataCalendario.innerHTML = `${meses[mes]} ${ano}`;
        let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1; //pega o dia da semana que caiu o dia 1º
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

        //FOR para alterar os valores da tabela dos calendários para o dia certo do mês
        for (var i = -firstDayOfWeek, index = 0; i < (42 - firstDayOfWeek); i++, index++) {
            let dt = new Date(ano, mes, i);
            let tday = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index]; //Pega a cada TR das TDs 
            dayTable.classList.remove('mesAnterior');
            dayTable.classList.remove('proximoMes');
            dayTable.classList.remove('diaAtual');
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

    function confirmarOpc(opcoes){
        document.querySelector('.boxSearch').style.zIndex = "2";
        opcoes.addEventListener("click", (evento)=>{
            mes = evento.target.dataset.mes;

            return escolherAno(mes);
        })
    }

    function escolherAno(mes){
        let escAno = document.createElement('div');
        let container = document.querySelector('.boxSearch');

        escAno.classList.add('confirmacao');
        escAno.innerHTML = `<input class = "anoEscolhido" type="number" placeholder = "2022" maxLenght={4} value=${ano}><input id="send" type="submit" value="Enviar">`

        container.appendChild(escAno);
        btn = document.querySelector('input#send')
        btn.onclick = ()=>{
            ano = document.querySelector('.anoEscolhido')
            console.log(ano)
            getDaysCalendar(mes, ano.value)
        }
    }

    // function confirmarOpc(mes){
    //     let escAno = document.createElement('div');
    //     let container = document.querySelector('.boxSearch');

    //     escAno.classList.add('escolherAno');
    //     escAno.innerHTML = `<input type="number" placeholder = "2022" maxLenght={4} value=${ano}><input type="submit" value="Enviar">`
    //     //escAno.innerHTML = `<input type="submit" value="Enviar">`
    //     ano = document.querySelector('.escolherAno')
    //     container.appendChild(escAno);

    //     return botaoOk(mes, ano);
    // }

    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();
    let calendario = document.querySelector('.calendario');
    let dataCalendario = document.querySelector('.mes');
    const tableDays = document.querySelector('.dias');

    const preview = document.getElementById('preview');
    const next = document.getElementById('next');

    // meses.forEach((mesNome,i) =>{
    //     dataCalendario.addEventListener("click", ()=>{
    //         //AQUI VAI SER CRIADA A NOVA DIV
    //         let boxSearch = document.createElement('div');
    //         let container = document.querySelector('.boxSearch');
            
    //         boxSearch.classList.add('search');

    //         calendario.style.visibility = 'hidden';
    //         boxSearch.innerHTML = `<span data-mes = ${i} > ${mesNome}  </span>`;
    //         //ano = boxSearch.innerHTML = `<input type="number" placeholder = "2022" maxLenght={4} value=${ano}><\input>`
    //         //document.body.innerHTML += container.innerHTML;
    //         container.appendChild(boxSearch);

    //         let opcoes = document.getElementsByTagName('span')[i];
            
    //         escoherMes(opcoes)
    //     })
    // })

    dataCalendario.onclick = ()=>{
       
        for (var i = 0; i<12; i++){
            let boxSearch = document.createElement('div');
            let container = document.querySelector('.boxSearch');

            boxSearch.classList.add('search');

            calendario.style.visibility = 'hidden';
            boxSearch.innerHTML = `<span data-mes = ${i} > ${meses[i]}  </span>`;
            //ano = boxSearch.innerHTML = `<input type="number" placeholder = "2022" maxLenght={4} value=${ano}><\input>`
            container.appendChild(boxSearch);

             let opcoes = document.getElementsByTagName('span')[i];
             confirmarOpc(opcoes)  
        }
        // let escAno = document.createElement('div');
        // let container = document.querySelector('.boxSearch');

        // escAno.classList.add('confirmacao');
        // escAno.innerHTML = `<input class = "anoEscolhido" type="number" placeholder = "2022" maxLenght={4} value=${ano}><input id="send" type="submit" value="Enviar">`

        // container.appendChild(escAno);
    }

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

