// FILE api


// Providing files

const fileAPI = (window.File && window.FileReader);

if (fileAPI) {

  // Via form input
  const inputField = document.getElementById('formFileInput');

  inputField.addEventListener('change', (evt) => {
    return evt.target.files;
  });


  // Via drag-n-drop
  const dropArea = document.getElementById('dropDiv');

  dropArea.addEventListener('dragover', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  })
  
  dropArea.addEventListener('drop', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    return evt.dataTransfer.files;
  });
}


// Reading file contents

const fileAPI = (window.File && window.FileReader);

if (fileAPI) {

  const inputField = document.getElementById('formFileInput');

  // As text (utf-8)
  inputField.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        return evt.target.result;
      };
      reader.readAsText(file);
    }
  });

  // As dataURL with progress tracking
  inputField.addEventListener('change', (evt) => {
    let isInitiated = false;
    const file = evt.target.files[0];

    if (file.type.match("image.*")) {
      const reader = new FileReader();
      const status = document.getElementById('fileStatus');

      const startBtn =  document.getElementById('btnStart');
      startBtn.addEventListener('click', (evt) => {
        reader.readAsDataURL(file);
      });

      const abortBtn = document.getElementById('btnAbort');
      abortBtn.addEventListener('click', (evt) => {
        reader.abort();
      });
      
      reader.onloadstart = () => {
        status.innerText = 'Loading is about to start';
      }
      reader.onloadend = () => {
        status.innerText = 'Loading is ended';
      }
      reader.onabort = () => {
        status.innerText = 'Aborted by user';
      }
      reader.onerror = (evt) => {
        status.innerText = evt.target.error.code;
      }
      reader.onprogress = (evt) => {
        if (evt.lengthComputable) {
          status.innerText = `File progress: ${Math.round(evt.loaded / evt.total * 100)}%`;
        }
      };
      reader.onload = (evt) => {
        const image = new Image();
        image.src = evt.target.result;
        document.body.appendChild(image);
        status.innerText = 'File progress: 100%';
      };
    }
  });
}
