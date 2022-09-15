# 로컬 환경에서 실행

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
### models 폴더 안에 넣어야할 모델 가중치 링크 ###
- https://drive.google.com/drive/folders/19w4LiKE6K9aR3a0vxnZSZuSkA3W7KjVP?usp=sharing

### 아래 파일은 디스코드 ai 채널 고정메세지에서 다운로드 ###
# pill-text-recognition-a3e91afb350f.json 
# .env
```

```
📂ai
┣ 📂labels
┃ ┣ 📃color_label.py
┃ ┗ 📃shape_label.py
┣ 📂models
┃ ┣ 📂color_classifier
┃ ┗ 📂shape_classifier
┣ 📂myvenv
┣ 📃.dockerignore
┣ 📃.env
┣ 📃.gitignore
┣ 📃app.py
┣ 📃docker-compose.yml
┣ 📃model.py
┣ 📃pill-text-recognition-a3e91afb350f.json
┣ 📃README.md
┗ 📃requirements.txt
```

