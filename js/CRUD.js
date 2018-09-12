window.onload = function () {
            let localStorageKeyName = 'data';

            loadFromLocalStorage();

            document.querySelector("#btn-add").addEventListener('click', function () {
                let nombreMovimiento = document.getElementById("nombreMovimiento"),
                    tipoMovimiento = document.getElementById("tipoMovimiento"),
                    valorMovimiento = document.getElementById("valorMovimiento"),
                    date = new Date(),
                    dia = date.getDate(),
                    mes = date.getMonth(),
                    yyy = date.getFullYear();

                    mes = mes +1;
                    fecha = dia + '/' + mes + '/' + yyy;


                // Validación de los fatos
                if (nombreMovimiento.value.length === 0 || tipoMovimiento.value.length === 0 || !parseInt(valorMovimiento.value)) return;

                let user = {
                    nombreMovimiento: nombreMovimiento.value,
                    tipoMovimiento: tipoMovimiento.value,
                    valorMovimiento: valorMovimiento.value,
                    date: fecha                
                };
                
                // Limpieza de los datos
                nombreMovimiento.value = '';
                tipoMovimiento.value = '';
                valorMovimiento.value = '';
                date.value = '';

                // adicionar a localStorage
                appendObjectToLocalStorage(user);
            })

            function appendObjectToLocalStorage(obj) {
                let users = [],
                    dataInLocalStorage = localStorage.getItem(localStorageKeyName);

                if (dataInLocalStorage !== null) {
                    users = JSON.parse(dataInLocalStorage);
                }

                users.push(obj);

                localStorage.setItem(localStorageKeyName, JSON.stringify(users));

                loadFromLocalStorage();
            }

            function loadFromLocalStorage() {
                let users = [],
                    dataInLocalStorage = localStorage.getItem(localStorageKeyName),
                    gridBody = document.querySelector("#grid tbody");

                if (dataInLocalStorage !== null) {
                    users = JSON.parse(dataInLocalStorage);
                }

                // añadir los datos a el cuerpo de la tabla
                gridBody.innerHTML = '';

                users.forEach(function (x, i) {
                    let tr = document.createElement("tr"),
                        tdNombreMovimiento = document.createElement("td"),
                        tdTipoMovimiento = document.createElement("td"),
                        tdValorMovimiento = document.createElement("td"),
                        tdDate = document.createElement("td"),
                        tdRemove = document.createElement("td"),
                        btnRemove = document.createElement("button");
                    
                    tdNombreMovimiento.innerHTML = x.nombreMovimiento;
                    tdTipoMovimiento.innerHTML = x.tipoMovimiento;
                    tdValorMovimiento.innerHTML = x.valorMovimiento;
                    tdDate.innerHTML = x.date;
                    
                    btnRemove.textContent = 'Eliminar';
                    btnRemove.className = 'btn btn-xs eliminar';
                    btnRemove.addEventListener('click', function(){
                        removeFromLocalStorage(i);
                    });
                    
                    tdRemove.appendChild(btnRemove);
                    
                    tr.appendChild(tdNombreMovimiento);
                    tr.appendChild(tdTipoMovimiento);
                    tr.appendChild(tdValorMovimiento);
                    tr.appendChild(tdDate);
                    tr.appendChild(tdRemove);
                    
                    gridBody.appendChild(tr);
                });
            }
            
            function removeFromLocalStorage(index){
                let users = [],
                    dataInLocalStorage = localStorage.getItem(localStorageKeyName);
                
                users = JSON.parse(dataInLocalStorage);
                
                users.splice(index, 1);
                
                localStorage.setItem(localStorageKeyName, JSON.stringify(users));
                
                loadFromLocalStorage();
            }
        }