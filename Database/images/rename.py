import os
import glob
import shutil

def rename_images(root_dir):
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']  # Add more extensions if needed

    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            _, extension = os.path.splitext(filename)
            if extension.lower() in image_extensions:
                new_filename = "img.jpg"
                new_path = os.path.join(dirpath, new_filename)
                if not os.path.exists(new_path):
                    old_path = os.path.join(dirpath, filename)
                    shutil.move(old_path, new_path)
                    print(f"Renamed: {filename} -> {new_filename}")

if __name__ == "__main__":
    root_directory = "/home/ptriantafy/Documents/Project Web Development/Database/images/img"
    rename_images(root_directory)
