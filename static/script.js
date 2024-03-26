$(document).ready(function(){
    $('#uploadForm').submit(function(e){
        e.preventDefault();
        var formData = new FormData();
        var files = $('#xlsxFiles')[0].files;
        for(var i=0; i<files.length; i++){
            formData.append('xlsxFiles', files[i]);
        }
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                $('#result').html('<button class="download"><a href="/download/' + response + '">Descargar</a></button>');
            }
        });
    });
});
