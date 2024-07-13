import keras as k

model_path = "model/model.h5"
model = k.models.load_model(model_path, compile=False)
print(model.summary())