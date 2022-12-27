import { useEffect, useState } from 'react';
import styles from './camera.module.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

enum VIDEOS_TYPE {
  YOUTUBE,
  ESP32_LIVE,
}

const screenList = {
  youtubeSrc: [
    "https://www.youtube.com/embed/N4r9tQGmAaY",
    "https://www.youtube.com/embed/aDKadRU3T80"],
    esp32LiveSrc: [
      `http://${process.env.CAMERA_IP}/`,
      `http://${process.env.CAMERA_IP}:81/stream`
    ]
}

export default function Camera() {
  const [videoType, setVideoType] = useState(VIDEOS_TYPE.YOUTUBE);
  const [screenListSrc, setScreenSrc] = useState(screenList.youtubeSrc);

  useEffect(() => {
    switch (videoType) {
      case VIDEOS_TYPE.YOUTUBE:
      default:
        setScreenSrc(screenList.youtubeSrc)
        break;
      case VIDEOS_TYPE.ESP32_LIVE:
        setScreenSrc(screenList.esp32LiveSrc)
        break;
    }
  }, [videoType]);

  return (
    <div>
      {screenListSrc.map(src =>
        <iframe key={src} title={videoType.toString()} width="560" height="315"
          src={src} frameBorder="0" allowFullScreen />
      )}

      <br />
      
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button className={styles.button}
          disabled={videoType === VIDEOS_TYPE.YOUTUBE}
          onClick={() => setVideoType(VIDEOS_TYPE.YOUTUBE)}>
          機關試做
        </Button>
        <Button className={styles.button}
          disabled={videoType === VIDEOS_TYPE.ESP32_LIVE}
          onClick={() => setVideoType(VIDEOS_TYPE.ESP32_LIVE)}>
          畫面串流
        </Button>
      </ButtonGroup>
    </div>
  );
}

