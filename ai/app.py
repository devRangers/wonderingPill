from flask import Flask, request, json
from model import ShapeClassifier, ColorClassifier, LetterRecognizer, ImgPreprocesser 

app = Flask(__name__)

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

    # response
    json_object = {
    "shape" : shape_pred,
    "colors" : color_pred,
    "letters" : letter_pred,
    }
    result = json.dumps(json_object, indent=2)
    return result


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5001')