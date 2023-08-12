from bing_image_downloader import downloader
with open('readme.txt', 'r') as file:
    for row in file.readlines():
        print("Downloading Image For: " + row + "...")
        try:
            downloader.download(row, limit=1,  output_dir='img', adult_filter_off=True, force_replace=True, timeout=60, verbose=True)
        except Exception as e:
            print("Couldn't find image for: " + row + "..." +"Skipping...")
            with open('notFound.txt', 'a') as f:
                f.write(row + "\n")

    print("\n\nDone!\n\n")