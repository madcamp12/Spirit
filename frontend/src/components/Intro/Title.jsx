import React from 'react';
import { css } from '@emotion/css';

// ScrollAnotation 컴포넌트: 스크롤 안내 문구를 표시
export const Title = () => {
    return (
        <div>
            {/* <span className={styles.text}>SPIRIT</span> */}
            <img className={styles.logo} src='logo/logo_text.png' style={{ width: "260px", height: "130px" }}/>
            <span className={styles.text2}>Your Own Art Gallery</span>
        </div>
    );
};

const styles = {
    text: css`
      font-size: 4rem;
      color: #fff;
      left: 50px;
      text-align: left;
      position: absolute;
      top: 48%;
      transform: translateY(-50%);
    `,
    text2: css`
    font-size: 1.5rem;
    color: #fff;
    left: 50px;
    text-align: left;
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
  `,
  logo: css`
      color: #fff;
      left: 50px;
      text-align: left;
      position: absolute;
      top: 45%;
      transform: translateY(-50%);
    `,
};

