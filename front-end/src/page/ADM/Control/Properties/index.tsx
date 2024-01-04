import InputSearch from '@/components/InputSearch';
import style from './Properties.module.scss';
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '@/context';
import { useAxios } from '@/service/hook/use-axios';
import api from '@/service/api/axios-config';
import Table from '@/components/Table';
import { filterSearch } from '@/functions/filter';
import Button from '@/components/Button';
import ButtonDelete from '@/components/ButtonDelete';
import { Property, Upload, Message as TypeMessage, Owner, Owners, User } from '@/types';
import FullPropertyForm from '@/components/FullPropertyForm';
import { deletePhoto, uploadPhoto } from '@/service/api/photo';
import { apiCep } from '@/service/api/cep';
import { createOwner, deleteOwner } from '@/service/api/owner';
import { deletePropertyMaster, updatePropertyMaster } from '@/service/api/property';
import FormUser from '@/components/FormUser';
import Message from '@/components/Message';
import { updatePartialUser, deleteUser as deleteUserMaster } from '@/service/api/user';
import DeletePropertyAndUser from '@/components/DeletePropertyAndUser';
import { transformarProperty } from '@/functions/transformation';
import { scrollToTop } from '@/functions/scroll';

const Properties = () => {
  const { token, user } = useContext(Context);
  const [search, setSearch] = useState<string>('');
  const [idProperty, setIdProperty] = useState<number>(0);
  const [property, setProperty] = useState<Property>({} as Property);
  const [upload, setUpload] = useState<Upload>({} as Upload);
  const [message, setMessage] = useState<TypeMessage>({} as TypeMessage);
  const [owner, setOwner] = useState<Owner>({} as Owner);
  const [formUser, setFormUser] = useState<User>({} as User);
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [deleteProperty, setDeleteProperty] = useState<boolean>(false);

  const [data, _loading, _error, sendData] = useAxios({
    axiosInstance: api,
    method: 'get',
    url: '/properties',
    config: { headers: { Authorization: `Bearer ${token}` } },
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (message.message) {
        setMessage({} as TypeMessage);
      }
    }, 10000);
  }, [message]);

  const handleIdPropertyChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      let value: number = Number(e.currentTarget.value);
      if (value === idProperty) {
        value = 0;
      }
      if (property && 'id' in property) {
        setProperty({} as Property);
      }
      setIdProperty(value);
    },
    [idProperty, property],
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

  const handleFormUserChange = useCallback(
    (e: FormEvent<HTMLInputElement | HTMLButtonElement>) => {
      setFormUser({
        ...formUser,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [formUser],
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

  const handleOwnerChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setOwner({ ...owner, [e.currentTarget.name]: e.currentTarget.value });
    },
    [owner],
  );

  const handleUpdateOnClick = async () => {
    if (idProperty > 0) {
      let property: Property = data.find(({ id }: Property) => id === idProperty);
      property = transformarProperty(property);
      setDeleteUser(false);
      setDeleteProperty(false);
      setProperty({ ...property });
      setFormUser({ ...property.user });
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
        sendData();
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

  const handleCreateOwnerOnClick = async () => {
    let data = await createOwner(token, { ...owner, propertyId: idProperty });

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'owner' });
    }

    if (data && 'about' in data) {
      data = transformarProperty(data);
      setProperty({ ...data });
      sendData();
    }

    setOwner({} as Owner);
  };

  const handleDeleteOwnerOnClick = async (id: number) => {
    const data = await deleteOwner(token, id);

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'owner' });
    }

    if (data && 'name' in data) {
      sendData();
      const owner: Owners[] = property.owners.filter(({ owner, ownerId, propertyId }) => {
        if (owner.id !== id) return { owner, ownerId, propertyId };
      });
      setProperty({ ...property, owners: owner });
    }
  };

  const handlePropertyUpdateMaster = async () => {
    const data = await updatePropertyMaster(token, property);

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'create' });
    }

    if (data && 'about' in data) {
      setMessage({
        message: `O imovél id ${data.id} foi atualizado com sucesso`,
        status: 201,
        type: 'successProperty',
      });
      setProperty({} as Property);
      setIdProperty(0);
      sendData();
    }
  };

  const handleUserUpdateMasterOnClick = async () => {
    const data = await updatePartialUser(property.user.id, formUser, token);

    if (data && 'message' in data) {
      setMessage({
        message: 'Ocorreu um erro ao modificar',
        status: data.statusCode,
        type: 'successUser',
      });
    }

    if (data && 'name' in data) {
      setMessage({
        message: `O usuario ${data.name} foi modificado com sucesso`,
        status: 201,
        type: 'successUser',
      });
      setProperty({ ...property, user: data });
    }
    setDeleteUser(false);
  };

  const handleUserDeleteMaster = async () => {
    const data = await deleteUserMaster(formUser.id, token);

    if (data && 'message' in data) {
      setMessage({
        message: 'Ocorreu um erro ao excluir',
        status: data.statusCode,
        type: 'successUser',
      });
    }

    if (data && 'name' in data) {
      setMessage({
        message: `O usuario ${data.name} foi excluido com sucesso`,
        status: 201,
        type: 'successUser',
      });
    }

    sendData();
    setProperty({} as Property);
    setUpload({} as Upload);
    setIdProperty(0);
    setDeleteUser(false);
  };

  const handlePropertyDeleteMaster = async () => {
    const data = await deletePropertyMaster(idProperty, token);

    if (data && 'message' in data) {
      setMessage({ message: 'Ocorreu um erro ao excluir', status: 201, type: 'successProperty' });
    }

    if (data && 'about' in data) {
      setMessage({
        message: `O imovél id ${data.id} foi excluido com sucesso`,
        status: 401,
        type: 'successProperty',
      });
    }
    sendData();
    setDeleteProperty(false);
    setIdProperty(0);
  };

  return (
    <div className={style.main}>
      <div className={style.search}>
        <InputSearch
          type='text'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder='busque aqui o imóvel'
        />
      </div>
      {message.type === 'successProperty' && <Message mss={message} />}
      {data && (
        <Table
          iten='property'
          properties={search === '' ? data : filterSearch(data, search)}
          idItem={idProperty}
          onChangeRadio={handleIdPropertyChange}
        />
      )}
      <div className={style.box}>
        <Button name='Alterar' disabled={idProperty === 0} onClick={() => handleUpdateOnClick()} />
        <ButtonDelete
          name='Excluir'
          disabled={idProperty === 0}
          onClick={() => {
            setDeleteProperty(!deleteProperty);
            setProperty({} as Property);
          }}
        />
      </div>
      {'about' in property && (
        <>
          <FullPropertyForm
            property={property}
            upload={upload}
            handlePropertyChange={handlePropertyChange}
            handleUploadChange={handleUploadChange}
            handlePhotoOnClick={handlePhotoOnClick}
            message={message}
            handlePhotoDeleteOnClick={handlePhotoDeleteOnClick}
            handleOwnerChange={handleOwnerChange}
            owner={owner}
            handleCreateOwnerOnClick={handleCreateOwnerOnClick}
            handleDeleteOwnerOnClick={handleDeleteOwnerOnClick}
            handlePropertyUpdateMaster={handlePropertyUpdateMaster}
          />
          {property.user && (
            <>
              <div className={style.margin} />
              {message.type === 'successUser' && <Message mss={message} />}
              <Table users={[{ ...property.user }]} iten='user' idItem={property.user.id} />
              <FormUser form={formUser} handleFormUserChange={handleFormUserChange} />
              <div className={style.box}>
                <Button name='Salvar' onClick={() => handleUserUpdateMasterOnClick()} />
                <ButtonDelete
                  name='Apagar Usuario'
                  onClick={() => {
                    setDeleteUser(!deleteUser);
                  }}
                  disabled={!(user?.role === 'master') || formUser.role === 'master'}
                />
              </div>
              {deleteUser && (
                <>
                  <div className={style.margin} />
                  <DeletePropertyAndUser
                    type='user'
                    id={formUser.id}
                    handleDeleteMaster={handleUserDeleteMaster}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
      {deleteProperty && (
        <>
          <div className={style.margin} />
          <DeletePropertyAndUser
            type='property'
            id={idProperty}
            handleDeleteMaster={handlePropertyDeleteMaster}
          />
        </>
      )}
    </div>
  );
};

export default Properties;
