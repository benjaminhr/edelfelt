import os
from PIL import Image, ImageFile

# Allow truncated images to be loaded partially
# ImageFile.LOAD_TRUNCATED_IMAGES = True

def find_corrupted_images(folder_path):
    corrupted_images = []
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif')):
            file_path = os.path.join(folder_path, filename)
            try:
                with Image.open(file_path) as img:
                    img.verify()  # Verify if it's an image file
            except (OSError, Image.DecompressionBombError) as e:
                print(f"Corrupted image found: {file_path} - Error: {e}")
                corrupted_images.append(file_path)
    return corrupted_images

folder_path = 'images'
corrupted_images = find_corrupted_images(folder_path)

if corrupted_images:
    print("\nList of corrupted images:")
    for img in corrupted_images:
        print(img)
else:
    print("No corrupted images found.")
