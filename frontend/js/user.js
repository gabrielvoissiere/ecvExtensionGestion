const signup = () => {
    let userInfo = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        level: document.getElementById("level").value
    }

    fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('user created !');
            document.getElementById("email").value = ""
            document.getElementById("password").value =""
        })
        .catch(err => console.log(err))
}

const login = () => {
    let userInfo = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => {

            function maskEmail(email) {
                const splited = email.split('@');
                const leftMail = replaceWithStars(splited[0]);
                const rightMail = replaceWithStars(splited[1]);
                return `${leftMail}@${rightMail}`;
              }

              function replaceWithStars(str) {
                let newStr = '';
                for (let i = 0; i < str.length; i++) {
                  if (i < str.length / 2) {
                    newStr += '*'
                  } else {
                    newStr += str[i]
                  }
                }
                return newStr;
              }

            console.log('user connected !');
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("email", maskEmail(document.getElementById("email").value))
            location = "frontend/pages/home.html"
        })
        .catch(err => console.log(err))
}