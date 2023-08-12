import os
rootdir = '/home/ptriantafy/Documents/Project Web Development/Database/images/img'

for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        print("Resizing: "+os.path.join(subdir, file)+"...")
    print("OK!")