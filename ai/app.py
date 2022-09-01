from flask import Flask, request, json
from model import ShapeClassifier, ColorClassifier, LetterRecognizer

app = Flask(__name__)

# assign model as global variable
shape_classifier = ShapeClassifier()
color_classifier = ColorClassifier()
letter_recognizer = LetterRecognizer()

@app.route("/predict", methods=["POST"])
def predict():
    # handle request 
    params = request.get_json()
    img_url = params["imgURL"]

    # model inference 
    shape_pred = shape_classifier.handle(img_url)
    color_pred = color_classifier.handle(img_url)
    letter_pred = letter_recognizer.handle(img_url)

    # response
    json_object = {
    "shape" : shape_pred,
    "colors" : color_pred,
    "letters" : letter_pred,
    }
    result = json.dumps(json_object, indent=2)
    return result


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')