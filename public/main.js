document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

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
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function deleteEntry() {
    const input = document.getElementById('deleteInput')
    try {
        const res = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await res.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}