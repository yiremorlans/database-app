const req = require("express/lib/request")

document.getElementById('updateButton').addEventListener('click', updateEntry)

async function updateEntry() {
    try {
        const res = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName('name')[0].value,
                heroName: document.getElementsByName('heroName')[0].value,
                superPowers: document.getElementsByName('superPowers')[0].value,
                league: document.getElementsByName('league')[0].value,
                sideKick: document.getElementsByName('sideKick')[0].value,
                utilities: document.getElementsByName('utilities')[0].value,
                catchPhrase: document.getElementsByName('catchPhrase')[0].value
            })
        })
        const data = await res.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }

}