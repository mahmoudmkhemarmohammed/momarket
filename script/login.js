const email = document.querySelector(".login-form .email"),
  password = document.querySelector(".login-form .password"),
  btnLogin = document.querySelector(".login-form button"),
  messgUnCorrect = document.querySelector(".login-form p"),
  helloUser = document.querySelector(".hello-user h2 span"),
  logOut = document.querySelector(".hello-user button");
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("email_account")) {
    if (
      JSON.parse(localStorage.pass_account) == password.value &&
      JSON.parse(localStorage.email_account) == email.value
    ) {
      localStorage.setItem("logedin", "true");
      setTimeout(() => {
        setTimeout(() => {
          document.querySelector(".login-form").style.opacity = ".8";
          document.querySelector(".login-form").style.scale = ".5";
          setTimeout(() => {
            document.querySelector(".login-form").style.opacity = "0";
            document.querySelector(".login-form").style.scale = "0";
            document.querySelector(".login-form").style.display = "none";
            setTimeout(() => {
              document.querySelector(".hello-user").style.display = "block";
              document.querySelector(".hello-user").style.scale = "0";
              setTimeout(() => {
                helloUser.innerHTML = JSON.parse(localStorage.fname_account);
                document.querySelector(".hello-user").style.scale = ".5";
                setTimeout(() => {
                  document.querySelector(".hello-user").style.scale = "1";
                  logOut.addEventListener("click", () => {
                    localStorage.removeItem("logedin");
                    window.location.reload();
                  });
                }, 50);
              }, 50);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    } else if (password.value === "" && email.value === "") {
      document.querySelectorAll(".login-form input").forEach((input) => {
        input.style.borderColor = "red";
        document.querySelectorAll(".login-form input").forEach((input) => {
          input.addEventListener("keyup", () => {
            input.style.borderColor = "#7153d5";
          });
        });
      });
    } else {
      messgUnCorrect.innerHTML =
        "The password or email you've entered is incorrect.";
    }
  } else if (password.value === "" && email.value === "") {
    document.querySelectorAll(".login-form input").forEach((input) => {
      input.style.borderColor = "red";
      document.querySelectorAll(".login-form input").forEach((input) => {
        input.addEventListener("keyup", () => {
          input.style.borderColor = "#7153d5";
        });
      });
    });
  } else {
    messgUnCorrect.innerHTML = "Sorry, you don't have an account";
  }
});
