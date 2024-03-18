const postChangeHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.value


    if (post_id) {
        try {

            const response = await fetch(`/api/post/${post_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log("Post deleted successfully");
                window.location.reload();
            } else {
                alert('Failed to delete post');
            }

        } catch (error) {
            console.error('Error fetching post information:', error);
            alert('An error occurred while fetching post information');
        }
    } else {
        alert('You must be logged in and provide both title and content to create a post');
    }
};

document
    .querySelectorAll('.deletePost').forEach(button => {
        button.addEventListener('click', postChangeHandler)
    })

const commentChangeHandler = async (event) => {
    event.preventDefault();

    const comment_id = event.target.value


    if (comment_id) {
        try {

            const response = await fetch(`/api/comment/${comment_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log("Comment deleted successfully");
                window.location.reload();
            } else {
                alert('Failed to delete comment');
            }

        } catch (error) {
            console.error('Error fetching comment information:', error);
            alert('An error occurred while fetching comment information');
        }
    } else {
        alert('You must be logged in and provide both title and content to create a post');
    }
};

document
    .querySelectorAll('.deleteComment').forEach(button => {
        button.addEventListener('click', commentChangeHandler)
    })