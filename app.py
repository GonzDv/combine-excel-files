import os
from flask import Flask, render_template, request, send_file
import pandas as pd
import numpy as np
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'xlsxFiles' not in request.files:
        return 'No file part'
    
    files = request.files.getlist('xlsxFiles')
    dfs = []
    
    for file in files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        dfs.append(df)
    
    df_combined = pd.concat(dfs, ignore_index=True)
    combined_filename = 'Nuevo Archivo.xlsx'
    combined_filepath = os.path.join(app.config['UPLOAD_FOLDER'], combined_filename)
    df_combined.to_excel(combined_filepath, index=False, engine='xlsxwriter')
    
    return combined_filename

@app.route('/download/<filename>')
def download(filename):
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename), as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
