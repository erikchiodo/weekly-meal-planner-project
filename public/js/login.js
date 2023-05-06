const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  //c
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstname').value.trim();
    const lastName = document.querySelector('#lastname').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password').value.trim();
    const rePassword = document.querySelector('#re-password').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  //added^

  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

    document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);  
    //added^