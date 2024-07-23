const email = document.querySelector(".login-form .email"),
  password = document.querySelector(".login-form .password"),
  fristName = document.querySelector(".login-form .fname"),
  lastName = document.querySelector(".login-form .lname"),
  btnSignUp = document.querySelector(".login-form button");
btnSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    email.value &&
    password.value &&
    fristName.value &&
    lastName.value != ""
  ) {
    localStorage.setItem("email_account", JSON.stringify(email.value));
    localStorage.setItem("pass_account", JSON.stringify(password.value));
    localStorage.setItem("fname_account", JSON.stringify(fristName.value));
    localStorage.setItem("lname_account", JSON.stringify(lastName.value));
    window.location.assign("./login.html");
  } else {
    document.querySelectorAll(".login-form input").forEach((input) => {
      input.style.borderColor = "red";
      document.querySelectorAll(".login-form input").forEach((input) => {
        input.addEventListener("keyup", () => {
          input.style.borderColor = "#7153d5";
        });
      });
    });
  }
});
