import { useState, useEffect } from 'react';

function Home() {
  const [marmosetIsLoaded, setMarmosetIsLoaded] = useState(false);
  useScript(
    'https://viewer.marmoset.co/main/marmoset.js',
    setMarmosetIsLoaded,
  );

  return (
    <div>
      <div id="Viewer" />
      <Viewer marmosetIsLoaded={marmosetIsLoaded} />
    </div>
  );
}

const useScript = (url, callback) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => callback(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

function Viewer(props) {
  if (!props.marmosetIsLoaded) {
    return null;
  }

  // let sceneUrl;
  //     if process.env.ENVIRONMENT == "Dev" {
  //     const port = 8000;
  //     const localSceneUrl = `http://localhost:${port}/public/scene.mview`
  // }
  const remoteSceneUrl = 'https://fantasy-trophy.s3-us-west-2.amazonaws.com/scene.mview';

  const width = window.innerWidth / 2;
  const height = window.innerHeight - 20;
  const myviewer = new window.marmoset.WebViewer(
    width,
    height,
    remoteSceneUrl,
  );
  document.getElementById('Viewer').appendChild(myviewer.domRoot);
  myviewer.loadScene();

  return null;
}

export default Home;
