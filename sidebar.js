// sidebar.js
function createSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.id = 'sidebar'; // Use the same ID as defined in the CSS
        document.body.appendChild(sidebar);
    }
    return sidebar;
}

function toggleSidebar(content) {
    const sidebar = createSidebar();
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-300px';  // Hide by moving it off-screen
    } else {
        sidebar.style.right = '0';  // Show by moving it into view
        // Update content when re-showing sidebar
        sidebar.innerHTML = `<h1>Sidebar Title</h1><p>${content}</p>`;
    }
}

// Expose the toggleSidebar function to be callable from other scripts
window.toggleSidebar = toggleSidebar;
