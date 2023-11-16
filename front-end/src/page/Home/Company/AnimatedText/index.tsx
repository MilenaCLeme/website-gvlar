import { useEffect, useState } from 'react';
import VisionOn from '@/assets/vision/visionOn.svg';
import VisionOff from '@/assets/vision/visionOff.svg';
import MissionOn from '@/assets/mission/MissionOn.svg';
import MissionOff from '@/assets/mission/MissionOff.svg';
import ValuesOff from '@/assets/values/valuesOff.svg';
import ValuesOn from '@/assets/values/valuesOn.svg';
import style from './animatedText.module.scss';

const texts = ['Missão', 'Visão', 'Valores'];

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState<string>(texts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = texts.indexOf(currentText);
      const nextIndex = (currentIndex + 1) % texts.length;
      setCurrentText(texts[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentText]);

  return (
    <div className={style.main}>
      <div className={style.image}>
        {currentText === 'Missão' ? <MissionOn /> : <MissionOff />}
        {currentText === 'Visão' ? <VisionOn /> : <VisionOff />}
        {currentText === 'Valores' ? <ValuesOn /> : <ValuesOff />}
      </div>
      <div className={style.text}>
        <h3>{currentText}</h3>
        <div>
          {currentText === 'Missão' && (
            <p>Realizar o sonho da casa própria que supere as expectativas dos nossos clientes.</p>
          )}
          {currentText === 'Visão' && (
            <p>
              Ser referência imobiliária para nossos clientes, apresentando o imóvel certo para a
              necessidade de cada um.
            </p>
          )}
          {currentText === 'Valores' && (
            <ul>
              <li> Clientes realizados</li>
              <li>Ética sempre, sem exceções</li>
              <li>Gente excepcional</li>
              <li>Ser pensar e agir como dono.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;
