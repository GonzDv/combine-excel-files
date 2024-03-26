const dropZone = document.getElementById("drop_zone");
      const uploadForm = document.getElementById("uploadForm");
      const fileInput = document.getElementById("xlsxFiles");

      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        checkFiles(e)
      });

      dropZone.addEventListener("dragleave", function (e) {
        e.preventDefault();
        
      });

      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        checkFiles(e)
      });

      dropZone.addEventListener("click", function (e) {
        fileInput.click();
        
      });

      fileInput.addEventListener("change", function (e) {
        // Enable the submit button only if there are selected files
        uploadForm.querySelector(".btm-submit").disabled = !e.target.files.length;
      });

      function checkFiles(e) { 
        
        const files = e.dataTransfer.files;

        console.log(fileInput.file)
        const allowedExtensions = [".xlsx"];
        const validFiles = Array.from(files).filter((file) =>
          allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
        );
        if (validFiles.length > 0) {
          fileInput.files = validFiles;
          uploadForm.submit();
        } else {
          alert("Seleccione solo archivos de excel (XLSX).");
        }
      }