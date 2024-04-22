import os
import json

# Define your project's root directory (where the manifest.json is located)
root_dir = os.path.dirname(os.path.abspath(__file__))

# Load the existing manifest.json if it exists, or create a new template
manifest_file_path = os.path.join(root_dir, 'manifest.json')
if os.path.exists(manifest_file_path):
    with open(manifest_file_path, 'r') as file:
        manifest = json.load(file)
else:
    manifest = {
        "manifest_version": 3,
        "name": "AIEverywhere",
        "description": "Bigfoot's Extension",
        "version": "1.0",
        "permissions": [
            "activeTab", "contextMenus", "scripting", "storage", "https://api.openai.com/"
        ],
        "background": {
            "service_worker": "service-worker.js"
        },
        "content_scripts": [{
            "matches": ["<all_urls>"],
            "js": [],
            "css": [],
            "run_at": "document_idle"
        }],
        "action": {
            "default_popup": "Popup/popup.html",
            "default_icon": {
                "16": "assets/icon16.png",
                "48": "assets/icon48.png",
                "128": "assets/icon128.png"
            }
        },
        "icons": {
            "16": "assets/icon16.png",
            "48": "assets/icon48.png",
            "128": "assets/icon128.png"
        }
    }

def add_files_to_manifest(directory, manifest):
    """Recursively adds JavaScript and CSS files to the manifest content script section."""
    # Clear current js and css arrays to avoid duplicating old entries
    manifest['content_scripts'][0]['js'] = []
    manifest['content_scripts'][0]['css'] = []
    
    for subdir, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.relpath(os.path.join(subdir, file), root_dir)
            # Ensure service-worker.js isn't added to content scripts
            if file_path == 'service-worker.js':
                continue
            if file_path.endswith('.js'):
                manifest['content_scripts'][0]['js'].append(file_path.replace("\\", "/"))
            elif file_path.endswith('.css'):
                manifest['content_scripts'][0]['css'].append(file_path.replace("\\", "/"))

# Scan for files starting from the root directory
add_files_to_manifest(root_dir, manifest)

# Write the updated manifest to a file
with open(manifest_file_path, 'w') as file:
    json.dump(manifest, file, indent=4)

print('Manifest updated successfully!')
