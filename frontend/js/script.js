const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem("token")
    }
  }

fetch("http://localhost:3000/api/info", config).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        console.error('API connection failed');
    }
}).then(responseData => {
    responseData.forEach(elm => {
        if (elm.from == "admin") {
            const adminInfos = document.getElementById("adminInfos")
            adminInfos.setAttribute("class", elm._id)

            let info1 = document.createElement("p")
            info1.innerHTML = elm.infoText1
            info1.setAttribute("class", "adminText")

            let info2 = document.createElement("p")
            info2.innerHTML = elm.infoText2
            info2.setAttribute("class", "adminText")

            adminInfos.appendChild(info1)
            adminInfos.appendChild(info2)
        } else {
            const bdeInfos = document.getElementById("bdeInfos")
            bdeInfos.setAttribute("class", elm._id)

            let info1 = document.createElement("p")
            info1.innerHTML = elm.infoText1
            info1.setAttribute("class", "bdeText")

            let info2 = document.createElement("p")
            info2.innerHTML = elm.infoText2
            info2.setAttribute("class", "bdeText")


            bdeInfos.appendChild(info1)
            bdeInfos.appendChild(info2)
        }
    });
}).catch(error => {
    console.log(error);
})

let userMail = {
    email: sessionStorage.getItem("email")
}
fetch('http://localhost:3000/api/auth/id', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(userMail)
    })
    .then(response => response.json())
    .then(data => {
        let level = data.level

        if (level == "bde") {
            document.getElementById("adminSendBtn").setAttribute("disabled", "")
            document.getElementById("adminSendBtn").classList.add("disabled")
            document.getElementById("addBtn").setAttribute("disabled", "")
            document.getElementById("addBtn").classList.add("disabled")
        }
    })
    .catch(err => console.log(err))

const modifyAdminInfo = () => {
    let adminInfos = document.getElementById("adminInfos")
    let id = adminInfos.getAttribute("class")

    if (document.getElementById("admin-info-1").value == "") {
        document.getElementById("admin-info-1").value = "Rien, vous êtes tranquille 🥳"
    }

    if (document.getElementById("admin-info-2").value == "") {
        document.getElementById("admin-info-2").value = "Rien, vous êtes tranquille 🥳"
    }

    let infoAdmin = {
        infoText1: document.getElementById("admin-info-1").value,
        infoText2: document.getElementById("admin-info-2").value,
        from: "admin"
    }

    fetch('http://localhost:3000/api/info/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify(infoAdmin)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("adminEventNotif").classList.add("showNotif")
            setTimeout(() => {
                document.getElementById("adminEventNotif").classList.remove("showNotif")
            }, 3000);
            setTimeout(() => {
                location.reload()
            }, 3500);
        })
        .catch(err => console.log(err))
}

const modifyBdeInfo = () => {
    let bdeInfos = document.getElementById("bdeInfos")
    let id = bdeInfos.getAttribute("class")

    if (document.getElementById("bde-info-1").value == "") {
        document.getElementById("bde-info-1").value = "Le BDE vous souhaite une bonne journée 😉"
    }

    if (document.getElementById("bde-info-2").value == "") {
        document.getElementById("bde-info-2").value = "Le BDE vous souhaite une bonne journée 😉"
    }

    let infoBde = {
        infoText1: document.getElementById("bde-info-1").value,
        infoText2: document.getElementById("bde-info-2").value,
        from: "bde"
    }

    fetch('http://localhost:3000/api/info/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify(infoBde)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("bdeEventNotif").classList.add("showNotif")
            setTimeout(() => {
                document.getElementById("bdeEventNotif").classList.remove("showNotif")
            }, 3000);
            setTimeout(() => {
                location.reload()
            }, 3500);
        })
        .catch(err => console.log(err))
}

//! in case of probleme with the bdd (like info deleted) you can repost info with this code
//! uncomment the code in the "home.html" file
const postUrl = "http://localhost:3000/api/info"

const sendAdminInfos = () => {
    let infoAdmin = {
        infoText1: document.getElementById("admin-info-1").value,
        infoText2: document.getElementById("admin-info-2").value,
        from: "admin"
    }

    fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify(infoAdmin),
        })
        .then(response => response.json())
        .then(data => {
            console.log('infos sended to API');
        })
        .catch(error => {
            console.error(error);
        })
}

const sendBdeInfos = () => {
    let infoBde = {
        infoText1: document.getElementById("bde-info-1").value,
        infoText2: document.getElementById("bde-info-2").value,
        from: "bde"
    }

    fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify(infoBde),
        })
        .then(response => response.json())
        .then(data => {
            console.log('infos sended to API');
        })
        .catch(error => {
            console.error(error);
        })
}

const quitApp = () => {
    sessionStorage.clear()
    location = "../../index.html"
}