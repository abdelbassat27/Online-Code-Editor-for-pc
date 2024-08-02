// script.js
document.getElementById('html-file').addEventListener('change', handleFileSelect);
document.getElementById('css-file').addEventListener('change', handleFileSelect);
document.getElementById('js-file').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result;
            const id = event.target.id;
            
            switch (id) {
                case 'html-file':
                    document.getElementById('html-code').value = content;
                    break;
                case 'css-file':
                    document.getElementById('css-code').value = content;
                    break;
                case 'js-file':
                    document.getElementById('js-code').value = content;
                    break;
            }
        };
        
        reader.readAsText(file);
    }
}

function updatePreview() {
    const htmlCode = document.getElementById('html-code').value;
    const cssCode = document.getElementById('css-code').value;
    const jsCode = document.getElementById('js-code').value;

    const iframe = document.getElementById('preview');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}<\/script>
        </body>
        </html>
    `);
    iframeDoc.close();
}

const resizer = document.querySelector('.resizer');
const editorSection = document.querySelector('.editor-section');
const preview = document.querySelector('#preview');

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

function handleMouseMove(e) {
    if (!isResizing) return;
    const offsetLeft = e.clientX - editorSection.getBoundingClientRect().left;
    editorSection.style.width = `${offsetLeft}px`;
    preview.style.width = `calc(100% - ${offsetLeft}px - 5px)`;
}

function toggleTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}
