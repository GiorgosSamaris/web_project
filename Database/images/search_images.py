from google_images_search import GoogleImagesSearch
gis = GoogleImagesSearch('AIzaSyAKZ7m_ej3qKFIvC89uqn8UeneUEss2slA', '42c27e51b08664033')
file_path = 'readme.txt'  # Replace with the path to your text file

# Open the file in read mode
with open(file_path, 'r') as file:
    for line in file.readlines():
        _search_params = {
            'q': line,
            'num': 1,
            'fileType': 'jpg|png',
        }
        gis.search(search_params=_search_params, path_to_dir='img/'+line+'/', custom_image_name=line)
        print("Downloaded image for: " + line + "...")
print("All downloads completed and corresponding lines deleted.")

