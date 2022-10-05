# ai 폴더 구조

> ### models 폴더 안에 넣어야할 모델 가중치 링크 ###
[구글공유드라이브](https://drive.google.com/drive/folders/19w4LiKE6K9aR3a0vxnZSZuSkA3W7KjVP?usp=sharing)

> ### 아래 파일은 디스코드 ai 채널 고정메세지에서 다운로드 ###
-  pill-text-recognition-a3e91afb350f.json 
-  .env


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

<br/>
<br/>

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

<br/>
<br/>

# API documentation

## POST

**촬영한 알약 이미지 url POST**
```
http://34.64.168.83:5001/predict
```
**BODY**
```json
{  
	"imgURL":"https://cdn.discordapp.com/attachments/1004560087886614620/1015072060688576533/20220902_103331.jpg"
}
```
**Response** 
```
{
	status: 200
}
```

<br/>
<br/>

## GET
**모델 결과**

클라이언트는 서버로부터 스트림을 받아 `EventSource` 객체를 통해 서버가 푸시하는 데이터를 받아 처리할 수 있다.

```js
const eventSource = new EventSource('http://34.64.168.83:5001/classify')

eventSource.addEventListener('sse', function (e) {
	const  data = JSON.parse(e.data);
	console.log(data);
})
```

```
{colors: 'brown', letters: 'BMT', shape: 'oval'}
```

<br/>

## example

<p align="center"><img  src="https://cdn.discordapp.com/attachments/1004560087886614620/1015069980682895441/20220902_102301.jpg"  width="300"></p>

```
{colors: 'brown', letters: 'BMT', shape: 'oval'}
```

<br/>

<p align="center"><img  src="https://cdn.discordapp.com/attachments/1004560087886614620/1015071710766170122/20220902_102945.jpg"  width="300"></p>

**글자가 없을 경우 'NONE' 이 반환됨**

```
{colors: 'green', letters: 'NONE', shape: 'oval'}
```

<br/>

<p align="center"><img  src="https://cdn.discordapp.com/attachments/977566878522294312/1019989326936952943/unknown.png"  width="300"></p>

**두 가지 색상일 경우 'red/yellow'로 반환됨**

```
{colors: 'red/yellow', letters: '65SINIL', shape: 'rectangle'}
```

<br/>

## 출력값 라벨

### shape
```
{
	장방형: rectangle, 
	타원형: oval,
	원형: circle, 
	오각형: pentagon, 
	사각형: square, 
	삼각형: triangle, 
	마름모형: rhombus, 
	육각형: hexagon, 
	기타: etc
}
```

### color

```
{
	하양 : white,
	갈색 : brown, 
	초록 : green, 
	노랑 : yellow, 
	분홍 : pink, 
	파랑 : blue, 
	주황 : orange, 
	빨강 : red, 
	투명 : transparent, 
	검정 : black, 
	보라 : purple, 
	회색 : gray
}
```