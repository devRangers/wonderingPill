import os
import cv2
import requests
import numpy as np
from rembg import remove
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input

from labels.color_label import color_label
from labels.shape_label import shape_label

class ImgPreprocesser:
    def __init__(self):
        self.zoom_size = 1.5

    def zoom_at(self, img, zoom, coord=None):
        h, w, _ = [ zoom * i for i in img.shape ]
        
        if coord is None: cx, cy = w/2, h/2
        else: cx, cy = [ zoom*c for c in coord ]
        
        img = cv2.resize( img, (0, 0), fx=zoom, fy=zoom)
        img = img[ int(round(cy - h/zoom * .5)) : int(round(cy + h/zoom * .5)),
                int(round(cx - w/zoom * .5)) : int(round(cx + w/zoom * .5)),
                    : ] 
        return img
    
    def crop_center(self, img):
        y, x, c = img.shape
        sx = x // 2-(min(x, y) // 2)
        sy = y // 2-(min(x, y) // 2)
        img = img[sy:sy+min(x,y), sx:sx+min(x,y)]
        return img

    def url_to_nparray(self, url):
        img_nparray = np.asarray(bytearray(requests.get(url).content), dtype=np.uint8)
        input = cv2.imdecode(img_nparray, cv2.IMREAD_COLOR)
        input = cv2.cvtColor(input, cv2.COLOR_BGR2RGB)

        rmbg_img = remove(input)[...,:3]
        rmbg_img = self.crop_center(rmbg_img)
        zoomed_img = self.zoom_at(rmbg_img, self.zoom_size)
        return zoomed_img
    
    def preprocess_for_model(self, img):
        img = cv2.resize(img, dsize=(224,224))
        img = preprocess_input(img)
        img = np.expand_dims(img, axis=0)
        return img



class ShapeClassifier():
    def __init__(self):
        self.initialize()

    def initialize(self):
        import keras
        self.model_path = "./models/shape_classifier"
        self.model = keras.models.load_model(self.model_path)

    def inference(self, model_input):
        model_output = self.model.predict(model_input)
        return model_output

    def postprocess(self, model_output):
        predict_shape_class = np.argmax(model_output, axis=1)
        predict_shape_label = shape_label[predict_shape_class[0]]
        return predict_shape_label

    def handle(self, input):
        model_output = self.inference(input)
        return self.postprocess(model_output)


class ColorClassifier():
    def __init__(self):
        self.initialize()

    def initialize(self):
        import keras
        self.model_path = "./models/color_classifier"
        self.model = keras.models.load_model(self.model_path)

    def inference(self, model_input):
        model_output = self.model.predict(model_input)
        return model_output

    def postprocess(self, model_output):
        predict_color_class = np.argmax(model_output, axis=1)
        predict_color_label = color_label[predict_color_class[0]]
        return predict_color_label

    def handle(self, input):
        model_output = self.inference(input)
        return self.postprocess(model_output)


class LetterRecognizer():
    def __init__(self):
        self.initialize()

    def initialize(self):
        from google.cloud import vision
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './pill-text-recognition-a3e91afb350f.json'
        self.model = vision.ImageAnnotatorClient()

    def inference(self, model_input):
        from google.cloud import vision
        img = cv2.imencode('.jpg', model_input)[1].tobytes()
        img = vision.Image(content=img)

        response = self.model.text_detection(image=img)
        model_output = response.text_annotations
        return response, model_output

    def postprocess(self, response, model_output):
        if response.error.message:
            raise Exception(
                '{}\nFor more info on error messages, check: '
                'https://cloud.google.com/apis/design/errors'.format(
                    response.error.message))
        if model_output:
            return model_output[0].description
        return ''

    def handle(self, input):
        response, model_output = self.inference(input)
        model_output = self.postprocess(response, model_output)
        return ''.join(model_output.split()).upper()