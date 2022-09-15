from flask_cors import CORS
from flask import Flask, request, Response
from model import ShapeClassifier, ColorClassifier, LetterRecognizer, ImgPreprocesser
from flask_sse import sse
import os
from dotenv import load_dotenv

load_dotenv()
REDIS_HOST=os.environ.get('REDIS_HOST')
REDIS_PORT=os.environ.get('REDIS_PORT')
REDIS_PASSWORD=os.environ.get('REDIS_PASSWORD')

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["REDIS_URL"] = f"redis://:{REDIS_PASSWORD}@{REDIS_HOST}" 
app.register_blueprint(sse, url_prefix='/classify')

# assign model as global variable
img_preprocessor = ImgPreprocesser()
shape_classifier = ShapeClassifier()
color_classifier = ColorClassifier()
letter_recognizer = LetterRecognizer()


@app.route("/predict", methods=["POST"])
def predict():
    # handle request 
    params = request.get_json()
    img_url = params["imgURL"]

    # preprocessing
    preprocessed_img_nparray = img_preprocessor.url_to_nparray(img_url)
    preprocessed_for_model = img_preprocessor.preprocess_for_model(preprocessed_img_nparray)

    # model inference 
    shape_pred = shape_classifier.handle(preprocessed_for_model)
    color_pred = color_classifier.handle(preprocessed_for_model)
    letter_pred = letter_recognizer.handle(preprocessed_img_nparray)

    sse.publish({"shape": shape_pred, "colors": color_pred, "letters": letter_pred}, type="sse")
    return Response(status=204)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5001')