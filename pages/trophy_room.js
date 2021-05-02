import { useState, useEffect } from 'react';


function TrophyRoom() {

    const [marmosetIsLoaded, setMarmosetIsLoaded] = useState(false);

    useScript(
        'https://viewer.marmoset.co/main/marmoset.js',
        loadMarmosetViewer,
    );

    // loadMarmosetViewer(marmosetIsLoaded);

    return (
        <div>
            <div id="viewerDiv" />
            <MarmosetViewer marmosetIsLoaded={marmosetIsLoaded} />
            <DetailsPanel />
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
        <div id="detailsPanel">
            <ul>
                <li>2020 - Cody W.</li>
                <li>2019 - Peter</li>
                <li>2018 - Cody W.</li>
                <li>2017 - Marcus</li>
                <li>2016 - Luke</li>
            </ul>
        </div>
    )
}


export default TrophyRoom;
