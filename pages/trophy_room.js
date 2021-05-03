import { useState, useEffect, useRef } from 'react';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'

function TrophyRoom() {

    const [marmosetIsLoaded, setMarmosetIsLoaded] = useState(false);

    useScript(
        'https://viewer.marmoset.co/main/marmoset.js',
        loadMarmosetViewer,
    );

    // loadMarmosetViewer(marmosetIsLoaded);

    return (
        <div>
            {/* <div id="viewerDiv" /> */}
            <Test></Test>
            {/* <MarmosetViewer marmosetIsLoaded={marmosetIsLoaded} /> */}
            {/* <DetailsPanel /> */}
        </div>
    );
}

const useScript = (url, callback) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => callback();
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [url]);
};

function loadMarmosetViewer(containerDiv) {
    const remoteSceneUrl = 'https://fantasy-trophy.s3-us-west-2.amazonaws.com/scene.mview';

    document.getElementById(containerDiv);
    const width = window.innerWidth / 2;
    const height = window.innerHeight;
    const myviewer = new window.marmoset.WebViewer(
        width,
        height,
        remoteSceneUrl,
    );
    document.getElementById('viewerDiv').appendChild(myviewer.domRoot);
    myviewer.loadScene();

    return null;
}

function MarmosetViewer(props) {
    if (!props.marmosetIsLoaded) {
        return null;
    }

    // let sceneUrl;
    //     if process.env.ENVIRONMENT == "Dev" {
    //     const port = 8000;
    //     const localSceneUrl = `http://localhost:${port}/public/scene.mview`
    // }
    const remoteSceneUrl =
        "https://fantasy-trophy.s3-us-west-2.amazonaws.com/scene.mview";

    const width = window.innerWidth / 2;
    const height = window.innerHeight - 20;
    const myviewer = new window.marmoset.WebViewer(width, height, remoteSceneUrl);
    document.getElementById("Viewer").appendChild(myviewer.domRoot);
    myviewer.loadScene();

    return null;
}


function DetailsPanel(props) {
    return (
        // <div id="detailsPanel">
        <ul>
            <li>2020 - Cody W.</li>
            <li>2019 - Peter</li>
            <li>2018 - Cody W.</li>
            <li>2017 - Marcus</li>
            <li>2016 - Luke</li>
        </ul>
        // </div>
    )
}

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function Test(props) {
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.getElementById("viewerDiv").appendChild(renderer.domElement);
    return (
        <div class="container">
            <div id="trophy-canvas">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </div>
            <div id="trophy-details">
                <DetailsPanel />
            </div>
        </div>
    )
}

export default Test;
