import { Message as TypeMessage, Property, Upload, Owner } from '@/types';
import Button from '../Button';
import FormOwner from '../FormOwner';
import FormProperty from '../FormProperty';
import InputSelect from '../InputSelect';
import UploadImages from '../UploadImages';
import { ChangeEvent, FormEvent } from 'react';
import Message from '../Message';
import style from './fullPropertyForm.module.scss';
import { disabledProperty } from '@/functions/disabled';

interface FullPropertyFormProp {
  property: Property;
  handlePropertyChange: (
    e: FormEvent<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>,
  ) => void;
  handleUploadChange: (e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) => void;
  upload: Upload;
  handlePhotoOnClick: () => Promise<void>;
  handlePhotoDeleteOnClick: (id: number) => Promise<void>;
  message: TypeMessage;
  handleOwnerChange: (e: FormEvent<HTMLInputElement>) => void;
  owner: Owner;
  handleCreateOwnerOnClick: () => Promise<void>;
  handleDeleteOwnerOnClick: (id: number) => Promise<void>;
  handlePropertyUpdateMaster: () => Promise<void>;
}

const FullPropertyForm: React.FC<FullPropertyFormProp> = ({
  property,
  handlePhotoDeleteOnClick,
  handlePhotoOnClick,
  handlePropertyChange,
  handleUploadChange,
  upload,
  message,
  owner,
  handleOwnerChange,
  handleCreateOwnerOnClick,
  handleDeleteOwnerOnClick,
  handlePropertyUpdateMaster,
}: FullPropertyFormProp) => {
  return (
    <>
      {message.type === 'create' && <Message mss={message} />}
      <FormProperty property={property} handlePropertyChange={handlePropertyChange} />
      {message.type === 'image' && <Message mss={message} />}
      <UploadImages
        upload={upload}
        photo={property.photographs}
        handlePhotoDeleteOnClick={handlePhotoDeleteOnClick}
        handlePhotoOnClick={handlePhotoOnClick}
        handleUploadChange={handleUploadChange}
      />
      <FormOwner
        handleDeleteOwnerOnClick={handleDeleteOwnerOnClick}
        owners={property.owners}
        owner={owner}
        handleCreateOwnerOnClick={handleCreateOwnerOnClick}
        handleOwnerChange={handleOwnerChange}
        message={message}
      />
      <div className={style.box}>
        <InputSelect handleChange={handlePropertyChange} iten='adm' valeu={property.situation} />
        <Button
          className={style.button}
          name='Salvar alterações'
          disabled={disabledProperty(property)}
          onClick={() => handlePropertyUpdateMaster()}
        />
      </div>
    </>
  );
};

export default FullPropertyForm;
