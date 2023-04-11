// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let ownerInput = document.getElementById('owner');
    let repoInput = document.getElementById('repo');

    // Get the value of the GitHub username input field
    let owner = ownerInput.value;
    let repo = repoInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestRepoCommits(owner, repo)
        .then(response => response.json()) // parse response into json
        .then(data => {

            let ul = document.getElementById('commits');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild)
            }

            // update html with data from github
            for (let i in data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${owner}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                } else {

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>Date:</strong> ${data[i].commit.author.date}</p>
                <p><strong>Message:</strong> ${data[i].commit.message}</p>
                <p><strong>URL:</strong> <a target="_blank" href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})

function requestRepoCommits(owner, repo) {
    // create a variable to hold the `Promise` returned from `fetch`
    return fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`);
}
