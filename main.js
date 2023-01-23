document.addEventListener('DOMContentLoaded', function () {

    function getDaysCalendar(mes, ano) {
        let bSearch = document.querySelector('.boxSearch');
        calendario.style.visibility = 'visible';
        bSearch.style.zIndex = "-1";
        dataCalendario.innerHTML = `${meses[mes]} ${ano}`;
        let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1; //pega o dia da semana que caiu o dia 1º
        let getLastDayThisMonth = diasMeses[mes];
        if (mes==1 && ano % 4 == 0 && ano % 100 != 0 || ano % 400 == 0){ //Verificação de Ano Bissexto
                getLastDayThisMonth = 29;
        }

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
            dt = new Date(ano, mes, i);
            dayTable = tableDays.getElementsByTagName('td')[index];
        }
    }

    //Abre painel de escolha do mês
    function confirmarOpc(opcoes){
        let container = document.querySelector('.boxSearch');
        container.style.zIndex = "2";

        opcoes.addEventListener("click", (evento)=>{
            let marcado = document.querySelector('.clicado')
            if(marcado != null){
                marcado.classList.remove('clicado')
            }
            mes = evento.target.dataset.mes;
            opcoes.classList.add('clicado');

            return escolherAno(mes);
        })
    }

    //O usuário escolhe o ano
    function escolherAno(mes){

        let escAno = document.createElement('div');
        let container = document.querySelector('.boxSearch');
        
        escAno.classList.add('confirmacao');
        escAno.innerHTML = `<div id='opc'>
                                <h1 class = "anoEscolhido" data-ano=${anoAt-2}>${anoAt-2}</h1>
                                <h1 class = "anoEscolhido" data-ano=${anoAt-1}>${anoAt-1}</h1>
                                <h1 class = "anoEscolhido" data-ano=${anoAt}>${anoAt}</h1>
                            </div>`;

        container.appendChild(escAno);
        btn = document.querySelectorAll("[data-ano]");
        btn.forEach( (elemento) =>{
            elemento.addEventListener("click", (evento)=>{
                ano = evento.target.dataset.ano;
                if (mes > mesAt && ano >= anoAt){
                    mes = mesAt;
                }
                let escMes = document.querySelectorAll('.search');
                for(i = 0; i<12; i++){
                    escMes[i].remove();
                }
                escAno.remove();
        
              //  container.parentNode.removeChild(container);
                getDaysCalendar(mes, ano)
            })
        })
                 
    }
    

    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let mes = new Date().getMonth();
    let mesAt= mes;
    let ano = new Date().getFullYear();
    let anoAt = ano;
    let calendario = document.querySelector('.calendario');
    let dataCalendario = document.querySelector('.mes');
    const tableDays = document.querySelector('.dias');
    const escDia = document.querySelectorAll('td')
  
    
    escDia.forEach( (elemento)=>{
        elemento.onclick = ()=>{
            let dia = elemento.textContent;
            let data, dataMes = parseInt(parseInt(mes)+1), dataAno = ano;

            if(elemento.className == "proximoMes"){
                if (dataMes >= 12){

                    dataMes = 1;
                    dataAno ++;
                    mes = 0;
                    if (ano >= anoAt){
                        ano = anoAt;
                        dataAno = ano;
                    } else{
                        ano++;
                    }
                } else{
                    dataMes++;
                    mes++
                    if (mes > mesAt && ano >= anoAt){
                        mes = mesAt;
                        ano = anoAt;
                    }
                }
                console.log(mes, ano, dataMes, dataAno)
            } else if (elemento.className == "mesAnterior"){
                if (dataMes <= 1){
                    dataMes = 12;
                    dataAno --;
                    mes = 11;
                    ano--
                    if(ano < anoAt-2){ //Verificação e definição da data limite do calendário
                        mes = 0;
                        ano = anoAt-2;
                    }
                } else{
                    dataMes --;
                    mes--;
                }
            }
            
            data = String(dataAno) + ' ' + String(dataMes) + ' ' + String(dia);
            getDaysCalendar(mes, ano)
    }
    })

    const preview = document.getElementById('preview');

    dataCalendario.onclick = ()=>{
        let container = document.querySelector('.boxSearch');
        for (var i=0; i<12; i++){
            let boxSearch = document.createElement('div');

            boxSearch.classList.add('search');

            calendario.style.visibility = 'hidden';
            boxSearch.innerHTML = `<span data-mes = ${i} > ${meses[i]}  </span>`;
            container.appendChild(boxSearch);

             let opcoes = document.getElementsByTagName('span')[i];
             confirmarOpc(opcoes, boxSearch);
        }
    }

    //Botões de avanço ou retrocesso
    next.onclick = function () {
        mes++;
        if (mes >= mesAt && ano >= anoAt){
            mes = mesAt;
        } else if (mes > 11) {
            mes = 0;
            ano++;
        }
        getDaysCalendar(mes, ano);
    }
    preview.onclick = function () {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
            if(ano < anoAt-2){ //Verificação e definição da data limite do calendário
                mes = 0;
                ano = anoAt-2;
            }
        }
        getDaysCalendar(mes, ano);
    }

    getDaysCalendar(mes, ano);
})

