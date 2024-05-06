import os

def replace_txt_with_text(directory):
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            if file_name.endswith('.txt'):
                old_file_path = os.path.join(root, file_name)
                new_file_path = os.path.join(root, file_name.replace('.txt', '.text'))
                os.rename(old_file_path, new_file_path)
                print(f'Renamed: {old_file_path} to {new_file_path}')

# Specify the directory where the files are located
directory = './smart-contract/src'

# Call the function to replace .txt with .text recursively
replace_txt_with_text(directory)