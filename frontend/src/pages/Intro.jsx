import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import SpiritSphere from "../components/SpiritSphere";
import { TCanvas } from '../components/Intro/TCanvas';
import { MouseTracker } from '../components/Intro/MouseTracker';
import { Loading } from '../components/Intro/Loading';
import { Anotation } from '../components/Intro/Anotation';
import { Title } from "../components/Intro/Title";
import LoginForm from "../components/Login/LoginForm";

import { css } from '@emotion/css';
import { sceneState } from '../components/Intro/modules/store';
import '../components/Intro/Intro.css'
import { useSnapshot } from 'valtio';

function Intro() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/home`)
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    const snap = useSnapshot(sceneState);
    console.log(snap);
    console.log(snap.camera.name);

    // const handleWheel = (e) => {
    //     if (e.deltaY > 0) {
    //         sceneState.lightProgress -= 0.05;
    //         sceneState.lightProgress = Math.max(sceneState.lightProgress, 0);
    //     } else {
    //         sceneState.lightProgress += 0.05;
    //         sceneState.lightProgress = Math.min(sceneState.lightProgress, 1);
    //     }
    // };

    useEffect(() => {
        // lightProgress 값을 조정하는 로직
        let newLightProgress = sceneState.lightProgress + 0.05;
        sceneState.lightProgress = Math.min(newLightProgress, 1);
    }, []);


    return (
        <div className={styles.container}>
            <TCanvas />
            <MouseTracker />
            {snap.camera.name === 'ORIGINAL' && <Title />}
            {snap.camera.name === 'ORIGINAL' && <Anotation />}
            {snap.camera.name === 'LOGIN' && <LoginForm />}
            <Loading />
        </div>
    )
}

export default Intro;

const styles = {
    container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
	`
}