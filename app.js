document.addEventListener('DOMContentLoaded', function () {
    // This function sets up the app and prepares the elements for user interaction.
    const pressHereButton = document.getElementById('pressHereButton');
    const appContainer = document.getElementById('app');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageContainer = document.getElementById('messageContainer');

    // This function shows a message to the user. It is used to provide feedback for success or error messages.
    function showMessage(message) {
        messageContainer.textContent = message;
        messageContainer.classList.add('show');
        setTimeout(() => {
            messageContainer.classList.remove('show');
        }, 3000);
    }

    // This function clears the username and password input fields.
    function clearInputFields() {
        usernameInput.value = '';
        passwordInput.value = '';
    }

    // This function switches the interface to login mode, allowing users to log in to their account.
    function switchToLoginMode() {
        clearInputFields();
        appContainer.querySelector('h1').textContent = 'MiDA';
        appContainer.querySelector('p').textContent = '...a Multi-Tool';
        appContainer.querySelector('h2').textContent = 'Log In';
        appContainer.querySelector('.small-text').innerHTML = 
            `If you don't have an account, <button id="signUpButton" class="link-button">press here</button>.`;

        loginButton.textContent = 'Access';
        loginButton.style.backgroundColor = '#B22222';
        document.body.style.background = 'linear-gradient(to bottom, #FFA07A, #FF6347)';

        const signUpButton = document.getElementById('signUpButton');
        signUpButton.style.color = '#FF6347';
        signUpButton.addEventListener('click', switchToSignUpMode);
    }

    // This function switches the interface to sign-up mode, allowing users to create a new account.
    function switchToSignUpMode() {
        clearInputFields();
        appContainer.querySelector('h1').textContent = 'MiDA';
        appContainer.querySelector('p').textContent = '...a Multi-Tool';
        appContainer.querySelector('h2').textContent = 'Sign Up';
        appContainer.querySelector('.small-text').innerHTML = 
            `If you already have an account, <button id="pressHereButton" class="link-button">press here</button>.`;

        loginButton.textContent = 'Store';
        loginButton.style.backgroundColor = '#4682B4';
        document.body.style.background = 'linear-gradient(to bottom, #87CEFA, #4682B4)';

        const originalPressHereButton = document.getElementById('pressHereButton');
        originalPressHereButton.style.color = '#5A9BD4';
        originalPressHereButton.addEventListener('click', switchToLoginMode);
    }

    // This function switches the interface to the accessed state after a successful login.
    function switchToAccessedState(loggedInUser) {
        appContainer.innerHTML = `
            <div style="position: absolute; left: 0; top: 0; height: 100%; width: 300px; background-color: rgba(200, 0, 0, 0.5);">
                <div style="position: absolute; top: 10px; left: 25px; color: white; font-size: 32px; font-weight: bold;">Mida-Tool</div>
                <div style="display: flex; flex-direction: column; height: 100%; border-right: 1px solid black;">
                    <div style="flex: 0.5; border-bottom: 1px solid black; display: flex; justify-content: center; align-items: center;">
                        <span style="color: white; font-size: 14px;">Logged in as: ${loggedInUser}</span>
                    </div>
                    <div id="secondTab" style="flex: 1.25; border-bottom: 1px solid black; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <span style="color: white; font-size: 14px; margin-bottom: 10px; text-align: center;">
                            This button will swap between showing you all your data or taking you back to the home "search" page.
                        </span>
                        <button id="viewStoredDataButton" style="width: 80%; padding: 10px; border: none; border-radius: 5px; background-color: #B22222; color: white; cursor: pointer; font-size: 16px;">View Stored Data</button>
                    </div>
                    <div style="flex: 1.25; display: flex; justify-content: center; align-items: center;">
                        <span style="color: white; font-size: 14px;">More features to come! Maybe...</span>
                    </div>
                </div>
            </div>
            <div id="searchBar" style="position: absolute; left: 310px; top: 10px; width: calc(100% - 400px);">
                <input id="searchInput" type="text" placeholder="Search websites..." style="width: 100%; padding: 10px; border: none; border-radius: 5px;" maxlength="100">
            </div>
            <button id="addWebsiteButton" style="position: absolute; left: 310px; top: 70px; width: 30px; height: 30px; border: none; border-radius: 5px; background-color: #FF6347; color: white; cursor: pointer; font-size: 16px; display: flex; justify-content: center; align-items: center;">+</button>
            <button id="removeWebsiteButton" style="position: absolute; left: 350px; top: 70px; width: 30px; height: 30px; border: none; border-radius: 5px; background-color: #4682B4; color: white; cursor: pointer; font-size: 16px; display: flex; justify-content: center; align-items: center;">-</button>
            <button id="storeWebsiteButton" style="position: absolute; left: 390px; top: 70px; width: 30px; height: 30px; border: none; border-radius: 5px; background-color: #228B22; color: white; cursor: pointer; font-size: 16px; display: flex; justify-content: center; align-items: center;">=</button>
            <div id="feedbackMessage" style="position: absolute; left: 430px; top: 70px; background-color: rgba(0, 0, 0, 0.8); color: white; font-size: 14px; padding: 5px 10px; border-radius: 5px; display: none; text-align: center;"></div>
            <div id="websiteInputContainer" style="position: absolute; left: 310px; top: 120px; width: calc(100% - 400px);"></div>
            <div id="searchResults" style="position: absolute; left: 310px; top: 10px; width: calc(100% - 400px); color: black; font-size: 14px;"></div>
            <div id="pageControls" style="position: absolute; left: 310px; bottom: 20px; width: calc(100% - 400px); display: flex; justify-content: center; align-items: center; gap: 10px;"></div>
        `;
        document.body.style.background = 'linear-gradient(to bottom, #FFA07A, #FF6347)';

        const addWebsiteButton = document.getElementById('addWebsiteButton');
        const removeWebsiteButton = document.getElementById('removeWebsiteButton');
        const storeWebsiteButton = document.getElementById('storeWebsiteButton');
        const viewStoredDataButton = document.getElementById('viewStoredDataButton');
        const searchResults = document.getElementById('searchResults');
        const pageControls = document.getElementById('pageControls');
        const websiteInputContainer = document.getElementById('websiteInputContainer');
        const secondTab = document.getElementById('secondTab');

        let websiteInputCreated = false;
        let websiteData = {};
        let currentPage = 1;

        function renderPage(data, page) {
            const itemsPerPage = 5;
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageData = data.slice(startIndex, endIndex);

            searchResults.innerHTML = pageData
                .map(
                    (item, index) =>
                        `<div style="background-color: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <strong>Website:</strong> ${item.website}<br>
                            <strong>Username:</strong> ${item.username}<br>
                            <strong>Password:</strong> ${item.password}<br>
                            <button class="deleteEntryButton" data-index="${startIndex + index}" style="margin-top: 10px; padding: 5px 10px; border: none; border-radius: 5px; background-color: #FF6347; color: white; cursor: pointer;">Delete</button>
                        </div>`
                )
                .join('');

            const deleteButtons = document.querySelectorAll('.deleteEntryButton');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    data.splice(index, 1);
                    localStorage.setItem('websites', JSON.stringify(data));
                    renderPage(data, currentPage);
                });
            });
        }

        function updatePaginationControls(data) {
            pageControls.innerHTML = '';

            const totalPages = Math.ceil(data.length / 5);

            const prevButton = document.createElement('button');
            prevButton.textContent = '<<';
            prevButton.style = `
                padding: 2px 5px;
                border: none;
                border-radius: 5px;
                background-color: #B22222;
                color: white;
                cursor: pointer;
                margin-right: 20px;
            `;
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(data, currentPage);
                    updatePaginationControls(data);
                }
            });

            const pageNumber = document.createElement('span');
            pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
            pageNumber.style = `
                font-size: 14px;
                color: white;
            `;

            const nextButton = document.createElement('button');
            nextButton.textContent = '>>';
            nextButton.style = `
                padding: 2px 5px;
                border: none;
                border-radius: 5px;
                background-color: #B22222;
                color: white;
                cursor: pointer;
                margin-left: 20px;
            `;
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPage(data, currentPage);
                    updatePaginationControls(data);
                }
            });

            pageControls.appendChild(prevButton);
            pageControls.appendChild(pageNumber);
            pageControls.appendChild(nextButton);
        }

        addWebsiteButton.addEventListener('click', () => {
            if (!websiteInputCreated) {
                const websiteInput = document.createElement('input');
                websiteInput.type = 'text';
                websiteInput.placeholder = 'Enter website name';
                websiteInput.style = 'width: 100%; margin-top: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
                websiteInput.maxLength = 100;
                websiteInputContainer.appendChild(websiteInput);

                const usernamePasswordContainer = document.createElement('div');
                usernamePasswordContainer.style = 'display: flex; justify-content: space-between; margin-top: 10px;';

                const usernameInput = document.createElement('input');
                usernameInput.type = 'text';
                usernameInput.placeholder = 'Username';
                usernameInput.style = 'width: 48%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
                usernameInput.maxLength = 100;
                usernameInput.addEventListener('blur', () => {
                    websiteData.username = usernameInput.value.trim();
                });

                const passwordInput = document.createElement('input');
                passwordInput.type = 'password';
                passwordInput.placeholder = 'Password';
                passwordInput.style = 'width: 48%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
                passwordInput.maxLength = 100;
                passwordInput.addEventListener('blur', () => {
                    websiteData.password = passwordInput.value.trim();
                });

                usernamePasswordContainer.appendChild(usernameInput);
                usernamePasswordContainer.appendChild(passwordInput);
                websiteInputContainer.appendChild(usernamePasswordContainer);

                websiteInput.addEventListener('blur', () => {
                    if (websiteInput.value.trim() !== '') {
                        websiteData.website = websiteInput.value.trim();
                    }
                });

                websiteInputCreated = true;
            } else {
                showMessage('You can only create one website input box.');
            }
        });

        removeWebsiteButton.addEventListener('click', () => {
            if (websiteInputCreated) {
                websiteInputContainer.innerHTML = '';
                websiteInputCreated = false;
                websiteData = {};
            } else {
                showMessage('No website input box to remove.');
            }
        });

        storeWebsiteButton.addEventListener('click', () => {
            if (websiteData.website && websiteData.username && websiteData.password) {
                const storedData = JSON.parse(localStorage.getItem(loggedInUser)) || [];
                storedData.push(websiteData);
                localStorage.setItem(loggedInUser, JSON.stringify(storedData));

                showMessage('Website information stored successfully!');
                websiteInputContainer.innerHTML = '';
                websiteInputCreated = false;
                websiteData = {};
            } else {
                showMessage('Please complete all fields before storing.');
            }
        });

        viewStoredDataButton.addEventListener('click', () => {
            addWebsiteButton.style.display = 'none';
            removeWebsiteButton.style.display = 'none';
            storeWebsiteButton.style.display = 'none';
            document.getElementById('searchBar').style.display = 'none';
            viewStoredDataButton.style.display = 'none';

            websiteInputContainer.innerHTML = '';
            websiteInputCreated = false;

            const storedData = JSON.parse(localStorage.getItem(loggedInUser)) || [];
            currentPage = 1;

            searchResults.style = `
                position: absolute;
                left: 310px;
                top: 10px;
                width: calc(100% - 400px);
                color: black;
                font-size: 14px;
            `;

            renderPage(storedData, currentPage);
            updatePaginationControls(storedData);

            const backButton = document.createElement('button');
            backButton.textContent = 'Back to Search';
            backButton.style = `
                width: 80%;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background-color: #228B22;
                color: white;
                cursor: pointer;
                font-size: 16px;
            `;
            backButton.addEventListener('click', () => {
                addWebsiteButton.style.display = 'block';
                removeWebsiteButton.style.display = 'block';
                storeWebsiteButton.style.display = 'block';
                document.getElementById('searchBar').style.display = 'block';
                viewStoredDataButton.style.display = 'block';

                searchResults.innerHTML = '';
                pageControls.innerHTML = '';
                backButton.remove();
            });

            secondTab.appendChild(backButton);
        });

        viewStoredDataButton.style.backgroundColor = '#B22222';

        const searchButton = document.createElement('button');
        searchButton.textContent = '?';
        searchButton.style = `
            position: absolute;
            right: 0;
            top: 0px;
            width: 35px;
            height: 38px;
            margin-left: 10px;
            border: none;
            border-radius: 5px;
            background-color: black;
            color: white;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        document.getElementById('searchBar').appendChild(searchButton);

        searchButton.addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
            const storedData = JSON.parse(localStorage.getItem(loggedInUser)) || [];
            const matchingResults = storedData.filter((data) =>
                data.website.toLowerCase() === searchInput
            );

            searchResults.style = `
                position: absolute;
                left: 310px;
                top: 275px;
                width: calc(100% - 400px);
                max-height: 300px;
                overflow-y: auto;
                color: black;
                font-size: 14px;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 5px;
                padding: 10px;
            `;

            searchResults.innerHTML = matchingResults
                .map(
                    (data, index) =>
                        `<div class="searchResult" style="background-color: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <strong>Website:</strong> ${data.website}<br>
                            <strong>Username:</strong> ${data.username}<br>
                            <strong>Password:</strong> ${data.password}<br>
                            <button class="hideSearchResultButton" data-index="${index}" style="margin-top: 10px; padding: 5px 10px; border: none; border-radius: 5px; background-color: #4682B4; color: white; cursor: pointer;">Hide Answer</button>
                        </div>`
                )
                .join('');

            const hideButtons = document.querySelectorAll('.hideSearchResultButton');
            hideButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    const resultDiv = document.querySelector(`.searchResult:nth-child(${parseInt(index) + 1})`);
                    if (resultDiv) {
                        resultDiv.style.backgroundColor = 'transparent';
                        resultDiv.style.display = 'none';
                    }
                });
            });
        });

        function updatePageControls(data) {
            pageControls.innerHTML = '';

            const totalPages = Math.ceil(data.length / 5);

            const prevButton = document.createElement('button');
            prevButton.textContent = '<<';
            prevButton.style = `
                padding: 2px 5px;
                border: none;
                border-radius: 5px;
                background-color: #B22222;
                color: white;
                cursor: pointer;
                margin-right: 20px;
            `;
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(data, currentPage);
                    updatePageControls(data);
                }
            });

            const pageNumber = document.createElement('span');
            pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
            pageNumber.style = `
                font-size: 14px;
                color: white;
            `;

            const nextButton = document.createElement('button');
            nextButton.textContent = '>>';
            nextButton.style = `
                padding: 2px 5px;
                border: none;
                border-radius: 5px;
                background-color: #B22222;
                color: white;
                cursor: pointer;
                margin-left: 20px;
            `;
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPage(data, currentPage);
                    updatePageControls(data);
                }
            });

            pageControls.appendChild(prevButton);
            pageControls.appendChild(pageNumber);
            pageControls.appendChild(nextButton);
        }
    }

    // This function deals with the login and sign-up process based on the current mode.
    loginButton.addEventListener('click', function () {
        const mode = appContainer.querySelector('h2').textContent;
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (mode === 'Sign Up') {
            if (username && password) {
                const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
                const userExists = credentials.some((cred) => cred.username === username);

                if (userExists) {
                    showMessage('Username already exists. Please choose a different username.');
                } else {
                    credentials.push({ username, password });
                    localStorage.setItem('credentials', JSON.stringify(credentials));
                    localStorage.setItem(username, JSON.stringify([]));
                    showMessage('Account created successfully!');
                }
            } else {
                showMessage('Please enter both username and password.');
            }
        } else if (mode === 'Log In') {
            const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
            const match = credentials.some(
                (cred) => cred.username === username && cred.password === password
            );

            if (match) {
                showMessage('Login successful!');
                switchToAccessedState(username);
            } else {
                showMessage('Invalid username or password.');
            }
        }
    });

    pressHereButton.addEventListener('click', switchToLoginMode);

});