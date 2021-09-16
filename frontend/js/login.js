const signup = () => {
    let userInfo = {
        email: document.getElementById("pseudo").value,
        password: document.getElementById("password").value
    }

    fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('user created !');
        })
        .catch(err => console.log(err))
}

const login = () => {
    let userInfo = {
        email: document.getElementById("pseudo").value,
        password: document.getElementById("password").value
    }

    fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('user connected !');
            sessionStorage.setItem("token", data.token);
        })
        .catch(err => console.log(err))
}