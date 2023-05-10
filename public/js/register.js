 const firstNameInput = document.getElementById("fistname");
 const lastNameInput = document.getElementById("lastname");
 const emailInput = document.getElementById("email-signup");
 const passwordInput = document.getElementById("password");

 async function registerUserHandler(event) {
    event.preventDefault();
    const userData = { 
    first_name: firstNameInput.value,
    last_name: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };

    response = await fetch("/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Registration Failed");
  };

}

document
  .getElementById("form-submit")
  .addEventListener("submit", registerUserHandler);
