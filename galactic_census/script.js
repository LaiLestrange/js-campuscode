let planetInfo = document.getElementById('planetInfo')
let planetList = document.getElementById('planetList')

getPlanets()

async function getPlanets() {
  let planets = await fetch('https://swapi.dev/api/planets?format=json')
  let { results } = await planets.json()
  listPlanets(results)
}

// tarefa 1
function showConsole(r) {
  console.log(r)
}

// tarefa 2
async function listPlanets(planets) {
  planets.forEach(planet => {
    let btn = document.createElement('button')
    btn.textContent = planet.name

    btn.addEventListener('click', function () {
      planetInfo.innerHTML = ''
      showPlanet(planet)
    })

    planetList.appendChild(btn)
  })
}

// tarefa 3
function showPlanet(planet) {
  planetInfo.appendChild(planetData(planet))
}

// tarefa 4
async function searchPlanet() {
  planetInfo.innerHTML = ''
  search_input = document.getElementById('search_input').value
  search_url = 'https://swapi.dev/api/planets/?search=' + search_input
  let search_result = await fetch(search_url)
  let { results } = await search_result.json()
  results.forEach(planet => {
    showPlanet(planet)
  })
}

function planetData(planet) {
  let residents = planet.residents
  let has_residents = residents.length > 0
  let card = document.createElement('div')

  card.innerHTML = ` -------------------
  <h2>${planet.name}</h2>
  <strong>Clima: </strong> ${planet.climate}<br>
  <strong>População: </strong>${planet.population} habitantes<br> 
  <strong>Terreno: </strong>${planet.terrain}<br>`

  if (has_residents) {
    let residentCard = document.createElement('div')
    residentCard.innerHTML = '<h3>Residentes:</h3>'
    residentCard.appendChild(residentsTable(residents))
    card.appendChild(residentCard)
  }

  return card
}

// tarefa Bonus
function residentsTable(residents) {
  let residentsTable = document.createElement('table')

  let residentsHeader = residentsTable.createTHead()
  let residentsInfo = residentsHeader.insertRow()
  let name_cell = residentsInfo.insertCell()
  let birth_cell = residentsInfo.insertCell()
  name_cell.textContent = 'Nome'
  birth_cell.textContent = 'Data de Nascimento'
  let residentsBody = residentsTable.createTBody()
  getResidentsData(residents, residentsBody)
  return residentsTable
}

function getResidentsData(residents, residentsBody) {
  residents.forEach(r => {
    getData(r, residentsBody)
  })
}

async function getData(url, table) {
  console.log(url)

  let residentData = await fetch(url + '?format=json')
  let data = await residentData.json()
  console.log(data)

  let new_resident = table.insertRow()
  let name_resident = new_resident.insertCell()
  name_resident.textContent = data.name
  let birth_resident = new_resident.insertCell()
  birth_resident.textContent = data.birth_year
}
