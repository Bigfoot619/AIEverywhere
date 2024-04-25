
let isSidebarOpen = false; // State variable to track sidebar visibility
let sidebar = null; // Global reference to the sidebar element
let toggleButton = null; // Global reference to the toggle button


initUI();

function initUI() {
    createSidebar();
    createToggleButton();
}

function formatContent(subTitle1, content1, subTitle2, content2) {
    return `<h2>${subTitle1}</h2><p>${content1}</p><br><h2>${subTitle2}</h2><p>${content2}</p>`;
}

function createSidebar() {
    sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        sidebar = createSidebarElement();
    }
    return sidebar;
}

function createSidebarElement() {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.innerHTML = getSidebarContentHTML();
    document.body.appendChild(sidebar);
    return sidebar;
}

function getSidebarContentHTML() {
    return `<h1>3 Easy Steps to Use!</h1><p><br>1. Select text!<br>2. Right Click!<br>3. Choose Feature!<br><br>Enjoy!</p>`;
}

function createToggleButton() {
    toggleButton = document.getElementById('toggleButton');
    if (!toggleButton) {
        toggleButton = createToggleButtonElement();
    }
    return toggleButton;
}

function createToggleButtonElement() {
    const button = document.createElement('button');
    button.id = 'toggleButton';
    button.innerText = 'Open'; // Set initial text as 'Open'
    button.addEventListener('click', toggleSidebarState);
    document.body.appendChild(button);
    return button;
}

function toggleSidebar(title, originalContent, enhancedContent) {
    if (title && originalContent && enhancedContent) {
        updateSidebarContent(title, originalContent, enhancedContent);
    }
    openSidebar();
}

function updateSidebarContent(title, originalContent, enhancedContent) {
    originalContent = normalizeText(originalContent);
    enhancedContent = normalizeText(enhancedContent);
    sidebar.getElementsByTagName('h1')[0].innerHTML = title;
    if (originalContent.split(/\s+/).length < 150) {
        sidebar.getElementsByTagName('p')[0].innerHTML = formatContent('Original Content', originalContent, 'Enhanced Content', enhancedContent);
    }
    else {
        sidebar.getElementsByTagName('p')[0].innerHTML = formatContent('Error: Overload Content!', '', 'Enhanced Content', enhancedContent);
    }

}

function normalizeText(text) {
    // Normalize spaces globally
    text = text.replace(/\s+/g, ' ').trim();
    // Remove spaces before commas, periods, question marks, and exclamation marks
    text = text.replace(/\s+([,\.?!])/g, '$1');
    // Ensure there is exactly one space after punctuation if followed by a letter (not another punctuation)
    text = text.replace(/([,\.?!])([^\s])/g, '$1 $2');
    return text;
}

function toggleSidebarState() {
    if (isSidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    sidebar.style.right = '0'; // Move on-screen to show
    toggleButton.innerText = 'Close';
    isSidebarOpen = true;
}

function closeSidebar() {
    sidebar.style.right = '-300px'; // Move off-screen to hide
    toggleButton.innerText = 'Open';
    isSidebarOpen = false;
}
