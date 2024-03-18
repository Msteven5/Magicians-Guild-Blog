const commentFormHandler = async (event) => {
    event.preventDefault();


    const content = event.target.querySelector('.comment-input').value.trim();
    const post_id = event.target.querySelector('.post_id').value

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
    .querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', commentFormHandler)
    })