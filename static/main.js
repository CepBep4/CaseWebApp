const LOGIN = "test";
const PASSWORD = "123";
const HOST = "http://127.0.0.1:5000"

class State {
    constructor() {
        this.json = {}
    }
}

let state = new State()

function checkCorrect() {
    if (document.getElementById('login').value == LOGIN & document.getElementById('password').value == PASSWORD) {
        document.getElementsByClassName('login-content')[0].style.display = 'none';
        document.getElementsByClassName('main-content-hidden')[0].className = 'main-content';
    }
}

function loadCookie() {
    loadSelectTable()
    document.getElementsByClassName('main-content')[0].style.width = `${outerWidth - 30}px`
}

function loadSelectTable() {
    fetch(`${HOST}/api`, { method: "GET" }).then(res => res.text()).then(anwser => {
        let tbs = Object.keys(JSON.parse(anwser));
        console.log()
        for (i = 0; i < Number(tbs.length); i++) {
            document.getElementById('select-table').innerHTML += `<option>${tbs[i]}</option>`
        }
    })
}

function loadStruct() {
    document.getElementById('choice-operation').value = 'Смотреть'
    document.getElementById('table-view').innerHTML = ''

    fetch(`${HOST}/api/${document.getElementById('select-table').value}`, { method: "GET" }).then(res => res.text()).then(anwser => {
        let data = JSON.parse(anwser);
        let tbs = Object.keys(data[0]);

        let headerTb = '<tr>';
        for (i = 0; i < Number(Object.keys(data[0]).length); i++) {
            headerTb += `<th>${tbs[i]}</th>`;
        }
        headerTb += '</tr>'
        document.getElementById('table-view').innerHTML = headerTb

        let rowTb = '<tr>';

        for (i = 0; i < data.length; i++) {
            for (j = 0; j < Number(Object.keys(data[0]).length); j++) {
                if ((Object.keys(data[0]))[j] == 'id') {
                    rowTb += `<td onclick="redact('id ${JSON.stringify(data[i][tbs[j]])}')" id="id ${JSON.stringify(data[i][tbs[j]])}">${JSON.stringify(data[i][tbs[j]])}</td>`;
                }
                else {
                    rowTb += `<td>${JSON.stringify(data[i][tbs[j]])}</td>`;
                }
            }
            rowTb += '</tr>'
            document.getElementById('table-view').innerHTML += rowTb
            rowTb = '<tr>';
        }
    })
}

function checkOperation(element) {
    if (document.getElementById('choice-operation').value == 'Добавить') {
        fetch(`${HOST}/api/${document.getElementById('select-table').value}`, { method: "GET" }).then(res => res.text()).then(anwser => {
            let data = JSON.parse(anwser);
            let tbs = Object.keys(data[0]);

            let headerTb = '<tr>';
            for (i = 0; i < Number(Object.keys(data[0]).length); i++) {
                headerTb += `<th>${tbs[i]}</th>`;
            }
            headerTb += '</tr>'
            document.getElementById('table-view').innerHTML = headerTb

            let rowTb = '<tr>';

            for (j = 0; j < Number(Object.keys(data[0]).length); j++) {
                rowTb += `<td><input class="${document.getElementById('select-table').value}-input" id="${tbs[j]} ${[i]}" type="text" style="width:98%"></td>`;
            }
            rowTb += '</tr>'
            document.getElementById('table-view').innerHTML += rowTb

            document.getElementById('table-view').innerHTML +=
                `<tr><td colspan="${Number(Object.keys(data[0]).length)}"><div class="accept-button" onclick="addData()">Применить</div></td></tr>`

        })
    }

    if (element != undefined) {
        fetch(`${HOST}/api/${document.getElementById('select-table').value}?${element.split(' ')[0]}=${element.split(' ')[1]}`, { method: "GET" }).then(res => res.text()).then(anwser => {
            let data = JSON.parse(anwser);
            let tbs = Object.keys(data);

            let headerTb = '<tr>';
            for (i = 0; i < Number(Object.keys(data).length); i++) {
                headerTb += `<th>${tbs[i]}</th>`;
            }
            headerTb += '</tr>'
            document.getElementById('table-view').innerHTML = headerTb

            let rowTb = '<tr>';

            for (j = 0; j < Number(Object.keys(data).length); j++) {
                rowTb += `<td><input class="${document.getElementById('select-table').value}-input-t" id="${tbs[j]} ${[i]}" value="${data[tbs[j]]}" type="text" style="width:98%"></td>`;
            }
            rowTb += '</tr>'
            document.getElementById('table-view').innerHTML += rowTb

            document.getElementById('table-view').innerHTML +=
                `<tr><td colspan="${Number(Object.keys(data).length)}"><div class="accept-button" onclick="editData('${element}')">Применить</div></td></tr>`

        })
    }
}
function changeOperation() {
    if (document.getElementById('choice-operation').value == 'Редактировать')
        fetch(`${HOST}/api/${document.getElementById('select-table').value}`, { method: "GET" }).then(res => res.text()).then(anwser => {
            let data = JSON.parse(anwser);
            let tbs = Object.keys(data[0]);

            let headerTb = '<tr>';
            for (i = 0; i < Number(Object.keys(data[0]).length); i++) {
                headerTb += `<th>${tbs[i]}</th>`;
            }
            headerTb += '</tr>'
            document.getElementById('table-view').innerHTML = headerTb

            let rowTb = '<tr>';

            for (j = 0; j < Number(Object.keys(data[0]).length); j++) {
                rowTb += `<td><input class="${document.getElementById('select-table').value}-input" id="${tbs[j]} ${[i]}" type="text" style="width:98%"></td>`;
            }
            rowTb += '</tr>'
            document.getElementById('table-view').innerHTML += rowTb

            document.getElementById('table-view').innerHTML +=
                `<tr><td colspan="${Number(Object.keys(data[0]).length)}"><div class="accept-button" onclick="addData()">Применить</div></td></tr>`

        })
}

function addData() {
    document.getElementById('choice-operation').value = 'Смотреть'
    fetch(`${HOST}/api/${document.getElementById('select-table').value}`, { method: "GET" }).then(res => res.text()).then(anwser => {
        let data = JSON.parse(anwser);
        let tbs = Object.keys(data[0]);

        let inpts = document.getElementsByClassName(`${document.getElementById('select-table').value}-input`)
        let json = {};

        for (i = 0; i < Number(tbs.length); i++) {
            json[tbs[i]] = inpts[i].value
        }
        state.json = json

        fetch(`${HOST}/api/${document.getElementById('select-table').value}`, {
            method: "POST",
            body: JSON.stringify(json)
        })
    })

}

function editData(element) {
    document.getElementById('choice-operation').value = 'Смотреть'
    fetch(`${HOST}/api/${document.getElementById('select-table').value}?${element.split(' ')[0]}=${element.split(' ')[1]}`, { method: "GET" }).then(res => res.text()).then(anwser => {
        let data = JSON.parse(anwser);
        let tbs = Object.keys(data);

        let inpts = document.getElementsByClassName(`${document.getElementById('select-table').value}-input-t`)
        let json = {};

        for (i = 0; i < Number(tbs.length); i++) {
            json[tbs[i]] = inpts[i].value
        }
        state.json = json
        alert(JSON.stringify(json))
        fetch(`${HOST}/api/${document.getElementById('select-table').value}?${element.split(' ')[0]}=${element.split(' ')[1]}`, {
            method: "POST",
            body: JSON.stringify(json)
        })
    })

}

function redact(element) {
    checkOperation(element)
}