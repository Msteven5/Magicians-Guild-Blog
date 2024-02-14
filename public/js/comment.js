const commentFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const content = document.querySelector('#comment-input').value.trim();
    const post_id = document.querySelector('#post_id').value

    if (content) {
        try {

                const response = await fetch('/api/comment', {
                    method: 'POST',
                    body: JSON.stringify({ content, post_id }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    console.log("Posted successfully");
                    window.location.reload();
                } else {
                    alert('Failed to create comment');
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
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler)