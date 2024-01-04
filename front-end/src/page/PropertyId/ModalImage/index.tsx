import { useState } from 'react';
import style from './modalImage.module.scss';
import ReactModal from 'react-modal';

const ModalImage = ({ img, alt }: { img: string; alt: string }) => {
  const [openImage, setOpenImage] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenImage(!openImage);
  };

  return (
    <>
      <button className={style.buttonImage} onClick={() => setOpenImage(true)}>
        <img src={img} alt={alt} />
      </button>
      <ReactModal
        contentLabel='ModalImage'
        isOpen={openImage}
        onRequestClose={toggleModal}
        className={style.modal}
        style={{
          overlay: {
            backgroundColor: 'rgba(36,32,33,0.5)',
            zIndex: '3',
          },
        }}
      >
        <button className={style.button} onClick={() => setOpenImage(false)}>
          x
        </button>
        <img className={style.image} src={img} alt={alt} />
      </ReactModal>
    </>
  );
};

export default ModalImage;
