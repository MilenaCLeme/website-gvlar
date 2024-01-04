import Button from '@/components/Button';
import InputSearch from '@/components/InputSearch';
import Table from '@/components/Table';
import { Context } from '@/context';
import api from '@/service/api/axios-config';
import { useAxios } from '@/service/hook/use-axios';
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import ButtonDelete from '@/components/ButtonDelete';
import style from './myProperty.module.scss';
import FormProperty from '@/components/FormProperty';
import { Message as TypeMessage, Property, Upload } from '@/types';
import { apiCep } from '@/service/api/cep';
import { disabledProperty } from '@/functions/disabled';
import { updateProperty, createProperty, deleteProperty } from '@/service/api/property';
import UploadImages from '@/components/UploadImages';
import { deletePhoto, uploadPhoto } from '@/service/api/photo';
import Message from '@/components/Message';
import { scrollToTop } from '@/functions/scroll';
import { filterSearch } from '@/functions/filter';
import { transformarProperty } from '@/functions/transformation';

const MyProperty = () => {
  const { token } = useContext(Context);
  const [idProperty, setIdProperty] = useState<number>(0);
  const [property, setProperty] = useState<Property>({} as Property);
  const [create, setCreate] = useState<boolean>(false);
  const [photo, setPhoto] = useState<boolean>(false);
  const [upload, setUpload] = useState<Upload>({} as Upload);
  const [message, setMessage] = useState<TypeMessage>({} as TypeMessage);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    scrollToTop();
  }, []);

  const [data, _loading, _error, sendData] = useAxios({
    axiosInstance: api,
    method: 'get',
    url: '/properties/list/client',
    config: { headers: { Authorization: `Bearer ${token}` } },
  });

  const handleIdPropertyChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      let value: number = Number(e.currentTarget.value);
      if (value === idProperty) {
        value = 0;
      }
      setIdProperty(value);
    },
    [idProperty],
  );

  const handlePropertyChange = useCallback(
    (e: FormEvent<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>) => {
      const callApiCep = async (value: string) => {
        const data = await apiCep(value);

        if (data && 'logradouro' in data) {
          setProperty({
            ...property,
            address: data.logradouro,
            area: data.bairro,
            city: data.localidade,
            state: data.uf,
            zipcode: data.cep,
          });
        }

        if (data && 'erro' in data) {
          setProperty({
            ...property,
            address: 'CEP inválido',
            area: '',
            city: '',
            state: '',
            zipcode: value,
          });
        }
      };

      const type = e.currentTarget.type;
      let value: number | string = e.currentTarget.value;
      let name = e.currentTarget.name;

      if (type === 'checkbox') {
        name = 'business';
      }

      if (name === 'zipcode' && value.length === 9) {
        callApiCep(e.currentTarget.value);
      }

      if (type === 'number') {
        value = Number(value);
      }

      setProperty({
        ...property,
        [name]: value,
      });
    },
    [property],
  );

  const handleUploadChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.type === 'file') {
        const file = (e as ChangeEvent<HTMLInputElement>).target.files?.[0];
        if (file) {
          setUpload({
            ...upload,
            file: file,
          });
        }
      } else {
        setUpload({
          ...upload,
          describe: (e as FormEvent<HTMLInputElement>).currentTarget.value,
        });
      }
    },
    [upload],
  );

  const handleCreatePropertyOnClick = async () => {
    let data = await createProperty(token, property);

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'create' });
    }

    if (data && 'about' in data) {
      data = transformarProperty(data);
      setProperty({ ...data });
      setPhoto(true);
    }
  };

  const handleUpdateOnClick = async () => {
    if (idProperty > 0) {
      let property: Property = data.find(({ id }: Property) => id === idProperty);
      property = transformarProperty(property);
      setProperty({ ...property });
      setCreate(true);
      setPhoto(true);
    }
  };

  const handlePhotoOnClick = async () => {
    const formData = new FormData();
    formData.append('file', upload.file as File);
    formData.append('describe', upload.describe);

    if (property.id) {
      let data = await uploadPhoto(property.id, formData, token);

      if (data && 'message' in data) {
        setMessage({ message: data.message, status: data.statusCode, type: 'image' });
      }

      if (data && 'about' in data) {
        data = transformarProperty(data);
        setProperty({ ...data });
      }

      setUpload({} as Upload);
    }
  };

  const handlePhotoDeleteOnClick = async (id: number) => {
    let data = await deletePhoto(id, token);

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'image' });
    }

    if (data && 'about' in data) {
      data = transformarProperty(data);
      setProperty({ ...data });
    }
  };

  const handleUpdatePropertyOnClick = async () => {
    const data = await updateProperty(token, property);

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'create' });
    }

    if (data && 'about' in data) {
      setCreate(false);
      sendData();
      setPhoto(false);
      scrollToTop();
    }
  };

  const handleDeletePropertyOnClick = async () => {
    if (idProperty > 0) {
      const data = await deleteProperty(idProperty, token);

      if (data && 'message' in data) {
        setMessage({ message: data.message, status: data.statusCode, type: 'delete' });
      }

      if (data && 'about' in data) {
        setMessage({
          message:
            'Você solicitou a retirada de um imóvel de nosso banco de dados e agora deseja desfazer essa solicitação, pedimos que entre em contato com a GVlar para realizar o processo de reversão',
          status: 201,
          type: 'delete',
        });
        setIdProperty(0);
        sendData();
      }
    }
  };

  return (
    <div className={style.main}>
      <InputSearch
        type='text'
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder='busque aqui o imóvel'
      />
      {data && (
        <>
          {message.type === 'delete' && <Message mss={message} />}
          <Table
            idItem={idProperty}
            onChangeRadio={handleIdPropertyChange}
            iten='property'
            properties={search === '' ? data : filterSearch(data, search)}
            about='user'
          />
        </>
      )}
      <div className={style.box}>
        <Button
          name='Cadastrar'
          onClick={() => {
            setCreate(!create);
            setProperty({} as Property);
            setPhoto(false);
          }}
        />
        <Button name='Alterar' disabled={idProperty === 0} onClick={() => handleUpdateOnClick()} />
        <ButtonDelete
          name='Solicitar retirada'
          disabled={idProperty === 0}
          onClick={() => handleDeletePropertyOnClick()}
        />
      </div>
      {create && (
        <>
          {message.type === 'create' && <Message mss={message} />}
          <FormProperty property={property} handlePropertyChange={handlePropertyChange} />
          {!photo && (
            <Button
              name='Salvar as informações e inserir as imagens'
              className={style.button}
              disabled={disabledProperty(property)}
              onClick={() => handleCreatePropertyOnClick()}
            />
          )}
          {photo && (
            <>
              {message.type === 'image' && <Message mss={message} />}
              <UploadImages
                handleUploadChange={handleUploadChange}
                upload={upload}
                handlePhotoOnClick={handlePhotoOnClick}
                photo={property.photographs ? property.photographs : []}
                handlePhotoDeleteOnClick={handlePhotoDeleteOnClick}
              />
              <Button
                className={style.button}
                name='Salvar alterações'
                disabled={disabledProperty(property)}
                onClick={() => handleUpdatePropertyOnClick()}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyProperty;
