import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

# Load the saved model
model = keras.models.load_model('model/DermaNet.keras')

# Preprocess the image
def preprocess_image(image_path, img_height, img_width):
    img = Image.open(image_path).convert("RGB")  # Ensure the image is in RGB format
    img = img.resize((img_height, img_width))
    img_array = np.array(img)  # Normalize the image
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

image_path = r"C:\Users\88017\Desktop\bangi.jpeg"  # Your PNG image path
img_height = 224
img_width = 224
processed_image = preprocess_image(image_path, img_height, img_width)

# Make a prediction
predictions = model.predict(processed_image)
print(predictions)
predicted_class = np.argmax(predictions, axis=1)
categories = ['Chickenpox', 'Cowpox', 'HFMD', 'Healthy', 'Measles', 'Monkeypox']
predicted_label = categories[predicted_class[0]]

print(f'The predicted class is: {predicted_label}')

# Visualize the image and prediction
img = Image.open(image_path)
plt.imshow(img)
plt.title(f'Predicted: {predicted_label}')
plt.axis('off')
plt.show()
