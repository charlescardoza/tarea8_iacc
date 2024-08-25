
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

const destinos = [
    { nombre: "Santiago", precioCLP: 50000, precioUSD: 60 },
    { nombre: "Valparaíso", precioCLP: 45000, precioUSD: 55 },
    { nombre: "La Serena", precioCLP: 40000, precioUSD: 50 },
    { nombre: "Pucón", precioCLP: 60000, precioUSD: 70 },
    { nombre: "Puerto Varas", precioCLP: 70000, precioUSD: 85 }
];

const vuelos = [
    { origen: "Santiago", destino: "Valparaíso", precioCLP: 80000, precioUSD: 100 },
    { origen: "Santiago", destino: "La Serena", precioCLP: 90000, precioUSD: 110 },
    { origen: "Valparaíso", destino: "Pucón", precioCLP: 100000, precioUSD: 120 },
    { origen: "Pucón", destino: "Puerto Varas", precioCLP: 120000, precioUSD: 150 },
    { origen: "La Serena", destino: "Puerto Varas", precioCLP: 110000, precioUSD: 135 }
];

function search() {
    const searchValue = normalizeText(document.getElementById('searchDestination').value);
    const filteredDestinos = destinos.filter(d => normalizeText(d.nombre).includes(searchValue));
    const filteredVuelos = vuelos.filter(v =>
        normalizeText(v.origen).includes(searchValue) ||
        normalizeText(v.destino).includes(searchValue)
    );

    displayResults(filteredDestinos, filteredVuelos);
}

function displayResults(destinos, vuelos) {
    const tablesDiv = document.getElementById('tables');
    tablesDiv.innerHTML = '';

    if (destinos.length > 0) {
        let destinosTable = `<table>
            <thead>
                <tr>
                    <th>Destino</th>
                    <th>Precio (CLP)</th>
                    <th>Precio (USD)</th>
                </tr>
            </thead>
            <tbody>`;

        destinos.forEach(d => {
            destinosTable += `<tr>
                <td>${d.nombre}</td>
                <td>${d.precioCLP}</td>
                <td>${d.precioUSD}</td>
            </tr>`;
        });

        destinosTable += `</tbody></table>`;
        tablesDiv.innerHTML += destinosTable;
    }

    if (vuelos.length > 0) {
        let vuelosTable = `<table>
            <thead>
                <tr>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Precio (CLP)</th>
                    <th>Precio (USD)</th>
                </tr>
            </thead>
            <tbody>`;

        vuelos.forEach(v => {
            vuelosTable += `<tr>
                <td>${v.origen}</td>
                <td>${v.destino}</td>
                <td>${v.precioCLP}</td>
                <td>${v.precioUSD}</td>
            </tr>`;
        });

        vuelosTable += `</tbody></table>`;
        tablesDiv.innerHTML += vuelosTable;
    }
}
