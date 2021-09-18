const signup = () => {
  const testMail = /[A-Z0-9._%+-]+@[A-Z0-9-]+[.]+[A-Z]{2,3}/i
  let email = document.getElementById("email").value
  if (testMail.test(email) == false) {
    console.log("mail synthaxe error");
  } else {
    let userInfo = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      level: document.getElementById("level").value
    }

    fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(userInfo)
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById("email").value = ""
        document.getElementById("password").value = ""

        document.getElementById("addUserNotif").classList.add("showNotif")
        setTimeout(() => {
          document.getElementById("addUserNotif").classList.remove("showNotif")
        }, 3000);
      })
      .catch(err => console.log(err))
  }
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
      console.log(data.error);

      if (data.error == undefined) {
        console.log('user connected !');
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("email", maskEmail(document.getElementById("email").value))
        location = "frontend/pages/home.html"
      } else {
        console.error("user error");
        document.getElementById("login-menu").classList.add("error")
        document.getElementById("login-title").classList.add("error-title")
        setTimeout(() => {
          document.getElementById("login-menu").classList.remove("error")
          document.getElementById("login-title").classList.remove("error-title")
        }, 1000);
      }
    })
    .catch(err => console.log(err))
}