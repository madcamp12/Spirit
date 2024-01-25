import React from 'react';
import { css } from '@emotion/css';

// ScrollAnotation 컴포넌트: 스크롤 안내 문구를 표시
export const Anotation = () => {
	return (
		<div className={styles.container}>
			<span className={styles.text}>Tap the light to Login</span>
		</div>
	);
};

const styles = {
	container: css`
		position: absolute;
		bottom: 20px;
		right: 20px;
	`,
	text: css`
		font-size: 1rem;
		color: #fff;
	`
};
