const tableWeightMPG = document.querySelector("#table-weight-mpg");

const tbody = tableWeightMPG.querySelector('tbody');
const thead = tableWeightMPG.querySelector('thead');

const init = async () => {
    
    const data = await fetchData(`/js/data.json`);
    const headRow = document.createElement('tr');
    const th0 = document.createElement('th');
    const th1 = document.createElement('th');
    const x_key = Object.keys(data[0])[0];
    const y_key = Object.keys(data[0])[1];
    th0.textContent = x_key;
    th1.textContent = y_key;
    headRow.appendChild(th0);
    headRow.appendChild(th1);
    thead.appendChild(headRow);
    data.forEach((item) => {
        const row = document.createElement('tr');
        const td0 = document.createElement('td');
        const td1 = document.createElement('td');
        td0.textContent = item[x_key];
        td1.textContent = item[y_key];
        row.appendChild(td0);
        row.appendChild(td1);
        tbody.appendChild(row);
    });
}

init();
