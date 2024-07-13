from tensorflow.keras.preprocessing import image
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image
model_path = "model/DermaNet.keras"
model = tf.keras.models.load_model(model_path, compile=False)
print(model.summary())

def preprocess_image(image_path, target_size):
    try:
        # Load image using PIL
        img = Image.open(image_path)
        print(img)
        img = img.resize(target_size)  # Resize to target_size
        print(img)
        img_array = np.asarray(img)  # Convert PIL Image to numpy array
        print(img_array)
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array = img_array.astype('float32') / 255.0  # Normalize to [0, 1] range
        return img_array
    except Exception as e:
        print(f"Error loading image: {e}")
        return None


# Example image path
image_path = r"C:\Users\88017\Desktop\M17_01_00.jpg"# Using raw string

# Preprocess the image
input_size = (224, 224)  # Image size used in your generators
img_array = preprocess_image(image_path, target_size=input_size)
print('----------------------------')
print(img_array)

# Make a prediction
predictions = model.predict(img_array)
print(predictions)

# If binary classification, apply sigmoid and interpret the result
if model.output_shape[-1] == 1:
    probability = predictions[0][0]
    predicted_class = 1 if probability >= 0.5 else 0
    print(f"Predicted Probability: {probability}")
    print(f"Predicted Class: {predicted_class}")
else:
    # For multi-class classification
    predicted_class = np.argmax(predictions[0])
    print(f"Predicted Class: {predicted_class}")
    print(f"Predicted Probabilities: {predictions[0]}")