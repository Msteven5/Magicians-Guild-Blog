const postFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    
    if (title && content) {
        try {
                const requestData = {
                    title,
                    content,
                };

                const response = await fetch('/api/post', {
                    method: 'POST',
                    body: JSON.stringify(requestData),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    res.status(200).json({message: "Posted successfully"});
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