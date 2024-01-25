<img width="1920" alt="KakaoTalk_20240125_184131837_01" src="https://github.com/madcamp12/Spirit/assets/64480531/5e047c58-8926-432f-ab40-f7cb92e8d401">



- 기본 사진 객체 (Basic Photo Object): "Snapshot"
- 사진전 (Photo Exhibition): "Showcase"
- 사진전들을 여는 작가 (Artist Opening Exhibitions): "Spirit"

  
<aside>
👻 여러분들은 하나의 영혼이 되어 다른 사진 작가의 깊은 공간에 들어갈 수 있습니다.
</aside>

<img width="1920" alt="KakaoTalk_20240125_184131837_02" src="https://github.com/madcamp12/Spirit/assets/64480531/1f71c68f-502d-4402-b3a8-640b569bf1aa">

SPIRIT의 초기 화면은 React의 Threejs를 이용해 구현했습니다.

> 밝게 빛나는 영역을 클릭하면 로그인을 진행할 수 있습니다.
*Kakao 로그인을 통해 하나의 Spirit이 될 수 있습니다.*

<img width="1920" alt="KakaoTalk_20240125_184131837_03" src="https://github.com/madcamp12/Spirit/assets/64480531/632891b8-c36d-46b8-8462-708fb6fa9bc7">
홈 화면에서, 다른 사람들의 사진전(showcase)을 확인할 수 있습니다.

> showcase를 클릭하면 Modal 창이 나타납니다.
> *Modal 창에서 작품을 미리 볼 수 있고, 자세히 보고 싶다면 실제 showcase로 이동해서 감상할 수 있습니다.*

![Untitled](https://github.com/madcamp12/Spirit/assets/64480531/2cb52467-393d-4854-b425-6f2debd0aa77)
다른 사용자에게 메세지를 보낼 수 있는 탭입니다.

> socket io를 이용해 실시간 채팅이 가능하도록 구현했습니다.  
> 새로운 사용자에게 채팅을 시작할 수 있고, 기존 채팅에 접속해 이어서 이야기할 수 있습니다.

![Untitled](https://github.com/madcamp12/Spirit/assets/64480531/c3092cc5-8b19-4a37-9f7d-3498d930a4a6)
실제 showcase에 입장한 모습입니다.

> *사진을 잘 감상할 수 있도록 조명을 설정했고, 낮/밤의 컨셉을 자유롭게 바꿀 수 있습니다 (E 키)*


## 기술 스택

---

서비스 개발을 위해 사용된 기술들에 대해 설명하는 섹션입니다.

### FrontEnd

- **React**
    - 3D 공간을 렌더링 하기 위해 선택
- **Threejs**
    - 사진전의 현실감을 위해 선택
    - 필요한 asset을 만들어 사용

### BackEnd

- **Express**
    - 게시글 형태로 작동하기 때문에 I/O가 많을 것으로 예상해 선택
    - React와의 호환성
- MongoDB
    - url, message 등의 정보를 쉽게 저장하기 위해 선택
- Docker
    - 서버에 독립적인 환경을 부여하기 위해 사용
    - 로컬 서버(개인 서버) 활용



