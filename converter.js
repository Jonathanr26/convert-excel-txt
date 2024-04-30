function convertToTxt() {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecciona un archivo Excel.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const txt = json.map(row => row.join('|')).join('\n');
        document.getElementById('txtOutput').value = txt;
    };
    reader.readAsBinaryString(file);
}

function downloadTxt() {
    const text = document.getElementById('txtOutput').value;
    const fileInput = document.getElementById('excelFile');
    const originalFileName = fileInput.files[0].name;
    const baseFileName = originalFileName.replace(/\.[^/.]+$/, ""); // Elimina la extensión del archivo original
    const newFileName = baseFileName + ".txt"; // Crea el nuevo nombre del archivo con extensión .txt

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', newFileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
