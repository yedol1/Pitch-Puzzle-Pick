# Pitch-Puzzle-Pick

<aside>
📌 FM2023의 데이터를 추출하여 선수 검색 사이트를 제작했습니다.<br/> 
해당 사이트를 통해 사용자는 여러 옵션을 선택하여 찾고자 하는 선수를 찾을 수 있습니다.<br/>
또한, 나만의 스쿼드를 구성할 수 있는 서비스도 함께 제공합니다.

</aside>

## 🌎URL

> 📎 <a href='https://pitchpuzzlepick.site'>사이트 URL</a>

## 🛠️ 사용 기술 및 라이브러리

- React, TypeScript, Next.js
- Prisma, React-Query, Redux, React-Select, Tailwind CSS, Material-Tailwind, chart.js, Beautiful-dnd
- MySQL, AWS S3
- Webpack

## 🎥 시연영상

### 1) 홈 ( 선수검색 기능 )

| 이름 | 클럽 |
| --- | --- |
|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/043b94ba-0aa7-4e6a-a4ac-0342c4019c95" width="450" height="327"/>|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/f63a50b9-5415-4068-a5ca-4117d79213ee" width="450" height="327"/>|

| 포지션 | 상세 능력치 |
| --- | --- |
|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/5a31b073-00c4-4643-b759-b34038cd3586" width="450" height="327"/>|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/566571d5-83b6-4dea-8f4f-62aebd37369e" width="450" height="327"/> |

| 선수 리스트 | 선수 정렬 |
| :---: | :---: |
|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/f509ef3b-599a-400c-866b-8a7c94e66d95" width="450" height="327"/>|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/68b31ff8-da08-445e-adb0-4d9f69be893e" width="450" height="327"/>|

| 더이상 정보가 없을 경우 |
| :---------------------: |
|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/b7c8ce2d-e295-4d0e-a4ae-78dd936ae3aa" width="450" height="327"/>|

### 2) 스쿼드 만들기

|스쿼드 추가 | 저장 / 불러오기 / 초기화|
| :----------------------: | :---------: |
| <img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/c7cfd782-881a-47ca-aeef-cd7d706da923" width="450" height="327"/>  | <img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/e96fb04f-3745-434b-96f7-0d6956fed23f" width="450" height="327"/> |


| 드래그 앤 드랍 |
| :------------: |
|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/09ddc195-9cf0-4c8d-8cac-b521f07679c9" width="450" height="327"/>|


### 4) 선수 상세 정보

| 상세 정보 ( 그래프&숫자 ) |
| :-----------------------: |
|<img src="https://github.com/yedol1/Pitch-Puzzle-Pick/assets/57481378/0f93493b-f130-430d-9616-495a21acbf90" width="450" height="327"/>|

## 🌸 기능

### 🌎 Back-End

- AWS EC2를 사용하여 인스턴스를 생성하고 MySQL DB(선수 정보, 클럽 정보, 사용자 정보 등)를 사용합니다.
- AWS S3를 사용하여 선수 및 클럽 이미지를 저장합니다.
- FM2023 데이터를 사용하여 PA 기준 100 이상의 모든 선수에 대한 정보를 생성 및 가공합니다.

### 🌠 Front-End

- React-Query를 사용하여 선수 정보 및 사용자 정보 등의 데이터를 패칭하고 캐싱 처리합니다.
    - Prisma와 useInfiniteQuery를 사용하여 무한 스크롤을 구현합니다.
    - Prisma를 사용하여 MySQL DB에 액세스합니다.
- Redux를 사용하여 옵션 상태를 전역에서 관리합니다.
- 여러 옵션을 통해, 선수 검색을 구현했습니다.
- Beautiful Drag N Drop 을 통해, 스쿼드 만드는 기능을 추가 하였습니다. ( CRUD )
- 전역으로 설정된 옵션이 변경되면 즉시 Dispatch됩니다. React-Query Key가 변경되어 Refetching됩니다.
- Next Auth를 사용하여 소셜 로그인을 구현합니다.
    - 기존의 User 같은 경우, 저장된 Squad 를 패칭
    - 새로운 User 같은 경우, 초기 값 설정하여 Squad 생성
- Next Route를 사용하여 API를 핸들링합니다.
- Next Image를 적극적으로 사용하여 이미지를 최적화합니다.
    - onError 속성 사용
    - Custom Image 컴포넌트를 생성하여, onError 시 기본 이미지 사용하도록 설정


