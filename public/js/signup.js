const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const name = document.querySelector('#username-signup').value.trim();

  if (email && password && name) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response)
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
