import os
import cv2
import requests
import numpy as np
from rembg import remove
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input

from labels.color_label import color_label
from labels.shape_label import shape_label

class ModelHandler:
    def __init__(self):
        pass

    def preprocess_url(self, url):
        img_nparray = np.asarray(bytearray(requests.get(url).content), dtype=np.uint8)
        input = cv2.imdecode(img_nparray, cv2.IMREAD_COLOR)
        input = cv2.cvtColor(input, cv2.COLOR_BGR2RGB)

        rmbg_img = remove(input)[...,:3]
        zoomed_img = self.zoom_at(rmbg_img, 1.5)
        return zoomed_img

    def zoom_at(self, img, zoom, coord=None):
        h, w, _ = [ zoom * i for i in img.shape ]
        
        if coord is None: cx, cy = w/2, h/2
        else: cx, cy = [ zoom*c for c in coord ]
        
        img = cv2.resize( img, (0, 0), fx=zoom, fy=zoom)
        img = img[ int(round(cy - h/zoom * .5)) : int(round(cy + h/zoom * .5)),
                int(round(cx - w/zoom * .5)) : int(round(cx + w/zoom * .5)),
                    : ] 
        return img
    
    def preprocess_for_model(self, img):
        img = cv2.resize(img, dsize=(224,224))
        img = preprocess_input(img)
        img = np.expand_dims(img, axis=0)
        return img


class ShapeClassifier(ModelHandler):
    def __init__(self):
        super().__init__()
        self.initialize()

    def initialize(self, **kwargs):
        import keras
        self.model_path = "./models/shape_classifier_5"
        self.model = keras.models.load_model(self.model_path)

    def preprocess(self, url):
        model_input = self.preprocess_url(url)
        model_input = self.preprocess_for_model(model_input)
        return model_input

    def inference(self, model_input):
        model_output = self.model.predict(model_input)
        return model_output

    def postprocess(self, model_output):
        predict_shape_class = np.argmax(model_output, axis=1)
        predict_shape_label = shape_label[predict_shape_class[0]]
        return predict_shape_label

    def handle(self, url):
        model_input = self.preprocess(url)
        model_output = self.inference(model_input)
        return self.postprocess(model_output)


class ColorClassifier(ModelHandler):
    def __init__(self):
        super().__init__()
        self.initialize()

    def initialize(self, **kwargs):
        import keras
        self.model_path = "./models/color_classifier_2"
        self.model = keras.models.load_model(self.model_path)

    def preprocess(self, url):
        model_input = self.preprocess_url(url)
        model_input = self.preprocess_for_model(model_input)
        return model_input

    def inference(self, model_input):
        model_output = self.model.predict(model_input)
        return model_output

    def postprocess(self, model_output):
        predict_color_class = np.argmax(model_output, axis=1)
        predict_color_label = color_label[predict_color_class[0]]
        return predict_color_label

    def handle(self, url):
        model_input = self.preprocess(url)
        model_output = self.inference(model_input)
        return self.postprocess(model_output)


class LetterRecognizer(ModelHandler):
    def __init__(self):
        super().__init__()
        self.initialize()

    def initialize(self, **kwargs):
        from google.cloud import vision
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './pill-text-recognition-a3e91afb350f.json'
        self.model = vision.ImageAnnotatorClient()

    def preprocess(self, url):
        model_input = self.preprocess_url(url)        
        return model_input

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

    def handle(self, url):
        model_input = self.preprocess(url)
        response, model_output = self.inference(model_input)
        model_output = self.postprocess(response, model_output)
        return ''.join(model_output.split()).upper()