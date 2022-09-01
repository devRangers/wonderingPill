# ai-flask

## 가상환경 생성
```
# ai 폴더로 이동
$ cd ai

# 가상환경 생성
$ py -3.9 -m venv myvenv
```

## 가상환경 활성화
```
$ myvenv/Scripts/activate
```

## 패키지 설치
```
$ pip install -r requirements.txt
```

## flask 서버 실행
```
$ python app.py
```

-------

## ai 폴더 구조

```
# models 폴더 안에 넣어야할 모델 가중치 링크
- https://drive.google.com/drive/folders/19w4LiKE6K9aR3a0vxnZSZuSkA3W7KjVP?usp=sharing

# pill-text-recognition-a3e91afb350f.json 파일은 디스코드 ai 채널 고정메세지에서 다운로드
```

```
📂ai
┣ 📂labels
┃ ┣ 📜color_label.py
┃ ┗ 📜shape_label.py
┣ 📂models
┃ ┣ 📂color_classifier_2
┃ ┗ 📂shape_classifier_4
┣ 📂myvenv
┣ 📜.gitignore
┣ 📜app.py
┣ 📜model.py
┣ 📜img_augmentation.py
┣ 📜pill-text-recognition-a3e91afb350f.json
┣ 📜README.md
┗ 📜requirements.txt
```

