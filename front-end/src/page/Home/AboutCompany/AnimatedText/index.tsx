import { useState, useEffect } from 'react';
import Mission from '@/assets/home/animationText/mission/mission.svg';
import MissionActive from '@/assets/home/animationText/mission/missionActive.svg';
import Values from '@/assets/home/animationText/values/values.svg';
import ValuesActive from '@/assets/home/animationText/values/valuesActive.svg';
import Vision from '@/assets/home/animationText/vision/vision.svg';
import VisionActive from '@/assets/home/animationText/vision/visionActive.svg';
import style from './animatedText.module.scss';

const texts = ['missão', 'visão', 'valores'];

const AnimatedText: React.FC = () => {
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
    <div className={style.container}>
      <div className={style.container__icons}>
        <div>{currentText === 'missão' ? <MissionActive /> : <Mission />}</div>
        <div>{currentText === 'visão' ? <VisionActive /> : <Vision />}</div>
        <div>{currentText === 'valores' ? <ValuesActive /> : <Values />}</div>
      </div>
      <div className={style.container__texts}>
        <h3>{currentText}</h3>
        <div className={style.container__box}>
          {currentText === 'missão' && (
            <p className={style.container__box__text}>
              Realizar o sonho da casa própria que supere as expectativas dos nossos clientes.
            </p>
          )}
          {currentText === 'visão' && (
            <p className={style.container__box__text}>
              Ser referência imobiliária para nossos clientes, apresentando o imóvel certo para a
              necessidade de cada um.
            </p>
          )}
          {currentText === 'valores' && (
            <ul className={style.container__box__list}>
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
