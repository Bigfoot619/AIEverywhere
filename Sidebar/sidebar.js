// sidebar.js
let isSidebarOpen = false; // State variable to track sidebar visibility

createSidebar();
createToggleButton()

function createSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.id = 'sidebar';
        sidebar.innerHTML = `<h1>Sidebar Title</h1><p>Content goes here...</p>`;
        document.body.appendChild(sidebar);
    }
    return sidebar;
}

function createToggleButton() {
    let toggleButton = document.getElementById('toggleButton');
    if (!toggleButton) {
        toggleButton = document.createElement('button');
        toggleButton.id = 'toggleButton';
        toggleButton.innerText = 'Open'; // Set initial text as 'Open'
        toggleButton.addEventListener('click', function () {
            if (isSidebarOpen) {
                closeSidebar();  // Function to close the sidebar
            } else {
                openSidebar();  // Function to open the sidebar
            }
        });
        document.body.appendChild(toggleButton); // Ensure button is also appended to the body
    }
    return toggleButton;
}

function toggleSidebar(content) {
    const sidebar = document.getElementById('sidebar');
    if (content) {
        sidebar.getElementsByTagName('p')[0].innerHTML = content; // Update content if provided
    }
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleButton');
    sidebar.style.right = '0'; // Move on-screen to show
    toggleButton.innerText = 'Close';
    isSidebarOpen = true;
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleButton');
    sidebar.style.right = '-300px'; // Move off-screen to hide
    toggleButton.innerText = 'Open';
    isSidebarOpen = false;
}
