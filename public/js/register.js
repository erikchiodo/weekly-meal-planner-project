
 async function registerUserHandler(event) {
    event.preventDefault();
  console.log("hello")
    await fetch("/register", {
    method: "POST",
    body: JSON.stringify({ first_name, last_name, email, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Registration Failed");
  }
};

document
  .getElementById("form-submit")
  .addEventListener("submit", registerUserHandler);