let isSidebarOpen = false; // State variable to track sidebar visibility
let sidebar = null; // Global reference to the sidebar element
let toggleButton = null; // Global reference to the toggle button

initUI();

function initUI() {
    createSidebar();
    createToggleButton();
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
        if (title === "Code with Comments") {
            enhancedContent = formatCodeForDisplay(enhancedContent);
        }
        if (title === "Improve English Version" || title === "Creatively Improved English" || title === "Summary") {
            sidebar.getElementsByTagName('p')[0].innerHTML = formatContentImproveEnglish('<br>Original Content', originalContent, '<br>Enhanced Content', enhancedContent);
        }
    }
    else {
        sidebar.getElementsByTagName('p')[0].innerHTML = formatContentImproveEnglish('<br>Error: Overload Content!', '', '<br>Enhanced Content', enhancedContent);
    }
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

// Function to format content for Improve English feature
function formatContentImproveEnglish(subTitle1, content1, subTitle2, content2) {
    return `<h2>${subTitle1}</h2><p>${content1}</p><br><h2>${subTitle2}</h2><p>${content2}</p>`;
}

function formatContentAddComments(title, enhancedContent) {
    return `<h2>${title}</h2><p>${enhancedContent}</p>`;
}

function normalizeText(text) {
    text = text.replace(/\s+/g, ' ').trim();
    text = text.replace(/\s+([,\.?!])/g, '$1');
    text = text.replace(/([,\.?!])([^\s])/g, '$1 $2');
    return text;
}

function formatCodeForDisplay(code) {
    const escapedCode = escapeHTML(code);
    return `<pre>${escapedCode}</pre>`;
}

function escapeHTML(code) {
    return code.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}