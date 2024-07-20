document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('design-canvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('text-input');
    const fontSizeInput = document.getElementById('font-size-input');
    const fontStyleSelect = document.getElementById('font-style-select');
    const colorInput = document.getElementById('color-input');
    const addTextBtn = document.getElementById('add-text-btn');
    const canvasContainer = document.getElementById('canvas-container');
    const downloadBtn = document.getElementById('download-btn');

    addTextBtn.addEventListener('click', function() {
        const text = textInput.value;
        const fontSize = fontSizeInput.value;
        const fontStyle = fontStyleSelect.value;
        const color = colorInput.value;

        if (text.trim() !== '') {
            const textElement = document.createElement('div');
            textElement.className = 'draggable';
            textElement.style.fontSize = fontSize + 'px';
            textElement.style.fontFamily = fontStyle;
            textElement.style.color = color;
            textElement.textContent = text;
            textElement.style.left = '50px';
            textElement.style.top = '50px';
            canvasContainer.appendChild(textElement);

            makeDraggable(textElement);
        }
    });

    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                element.style.left = e.clientX - offsetX + 'px';
                element.style.top = e.clientY - offsetY + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }

    downloadBtn.addEventListener('click', function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redraw all the text elements onto the canvas
        const textElements = document.querySelectorAll('.draggable');
        textElements.forEach(element => {
            const x = parseInt(element.style.left, 10);
            const y = parseInt(element.style.top, 10) + parseInt(element.style.fontSize, 10);
            ctx.font = `${element.style.fontSize} ${element.style.fontFamily}`;
            ctx.fillStyle = element.style.color;
            ctx.fillText(element.textContent, x, y);
        });

        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'celebrare-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
