const postFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    
    if (title && content) {
        try {

                const response = await fetch('/api/post', {
                    method: 'POST',
                    body: JSON.stringify({ title, content }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    console.log("Posted successfully");
                    window.location.reload();
                } else {
                    alert('Failed to create post');
                }
           
        } catch (error) {
            console.error('Error fetching user information:', error);
            alert('An error occurred while fetching user information');
        }
    } else {
        alert('You must be logged in and provide both title and content to create a post');
    }
};
document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler)