import { ChangeEvent, FormEvent } from 'react';
import Button from '../Button';
import Input from '../Input';
import { Photograph, Upload } from '@/types';
import { Environment } from '@/env';
import style from './uploadImages.module.scss';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import './glider.scss';

interface UploadImagesProps {
  handleUploadChange: (e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) => void;
  upload: Upload;
  handlePhotoOnClick: () => Promise<void>;
  photo: Photograph[];
  handlePhotoDeleteOnClick: (id: number) => Promise<void>;
}

const UploadImages: React.FC<UploadImagesProps> = ({
  handleUploadChange,
  upload,
  handlePhotoOnClick,
  photo,
  handlePhotoDeleteOnClick,
}: UploadImagesProps) => {
  return (
    <form className={style.form}>
      <div className={style.box}>
        <div className={style.glider}>
          <Glider
            slidesToShow={'auto'}
            slidesToScroll={1}
            itemWidth={133}
            exactWidth
            draggable
            dots={false}
            hasArrows
            scrollLock={false}
          >
            {photo.map(({ id, describe, url }) => (
              <div className={style.photo} key={id}>
                <button
                  className={style.delete}
                  type='button'
                  onClick={() => handlePhotoDeleteOnClick(id)}
                >
                  x
                </button>
                <img src={`${Environment.URL_BASE}/uploads/${url}`} alt={describe} />
              </div>
            ))}
          </Glider>
        </div>
        <p>Limite de 10 Imagens / Total: {photo.length} </p>
      </div>
      <div className={style.custom}>
        <label htmlFor='photo'>
          Escolher o arquivo
          <input type='file' id='photo' name='photo' onChange={handleUploadChange} />
        </label>
        <div>
          <p>{upload.file?.name ? upload.file.name : 'Nenhum arquivo escolhido'}</p>
        </div>
      </div>
      <div className={style.descripton}>
        <Input
          type='text'
          label='Descrição da imagem'
          onChange={handleUploadChange}
          value={upload.describe === undefined ? '' : upload.describe}
        />
        <Button
          name='Inserir a imagem'
          disabled={upload.file === undefined || upload.file === null || upload.describe === ''}
          onClick={() => handlePhotoOnClick()}
        />
      </div>
    </form>
  );
};

export default UploadImages;
