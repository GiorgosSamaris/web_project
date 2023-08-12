from bing_image_downloader import downloader
import csv
rows = []
_search_params = {}
with open("../php/products.csv", 'r') as file:
    csvreader = csv.reader(file)
    next(csvreader)
    for row in csvreader:
        print("Downloading Image For: " + row[1] + "...")
        try:
            downloader.download(row[1], limit=1,  output_dir='img', adult_filter_off=True, force_replace=True, timeout=60, verbose=True)
        except Exception as e:
            print("Couldn't find image for: " + row[1] + "..." +"Skipping...")
            with open('readme.txt', 'a') as f:
                f.write(row[1] + "\n")

    print("\n\nDone!\n\n")