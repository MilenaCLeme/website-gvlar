import FormUser from '@/components/FormUser';
import InputSearch from '@/components/InputSearch';
import Table from '@/components/Table';
import { Context } from '@/context';
import api from '@/service/api/axios-config';
import { useAxios } from '@/service/hook/use-axios';
import { Property, Upload, User, Message as TypeMessage, Owner, Owners } from '@/types';
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import style from './Users.module.scss';
import Button from '@/components/Button';
import ButtonDelete from '@/components/ButtonDelete';
import {
  deletePropertyMaster,
  getAllPropertiesUser,
  updatePropertyMaster,
} from '@/service/api/property';
import FullPropertyForm from '@/components/FullPropertyForm';
import { apiCep } from '@/service/api/cep';
import { deletePhoto, uploadPhoto } from '@/service/api/photo';
import { createOwner, deleteOwner } from '@/service/api/owner';
import DeletePropertyAndUser from '@/components/DeletePropertyAndUser';
import Message from '@/components/Message';
import { updatePartialUser, deleteUser as deleteUserMaster } from '@/service/api/user';
import { filterUser } from '@/functions/filter';
import { transformarProperty } from '@/functions/transformation';
import { scrollToTop } from '@/functions/scroll';

const Users = () => {
  const { token, user } = useContext(Context);
  const [deleteProperty, setDeleteProperty] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number>(0);
  const [form, setForm] = useState<User>({} as User);
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [idProperty, setIdProperty] = useState<number>(0);
  const [property, setProperty] = useState<Property>({} as Property);
  const [upload, setUpload] = useState<Upload>({} as Upload);
  const [message, setMessage] = useState<TypeMessage>({} as TypeMessage);
  const [owner, setOwner] = useState<Owner>({} as Owner);
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const [data, _loading, _error, sendData] = useAxios({
    axiosInstance: api,
    method: 'get',
    url: '/users',
    config: { headers: { Authorization: `Bearer ${token}` } },
  });

  useEffect(() => {
    scrollToTop();
  }, []);

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
      setDeleteProperty(false);
    },
    [idProperty, property],
  );

  const handleOwnerChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setOwner({ ...owner, [e.currentTarget.name]: e.currentTarget.value });
    },
    [owner],
  );

  const handleIdUserChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const callUser = (idUser: number) => {
        if (idUser > 0) {
          const user: User = data.find(({ id }: User) => id === idUser);

          setForm({ ...user });
        } else {
          setForm({} as User);
        }
      };
      let value: number = Number(e.currentTarget.value);
      if (value === idUser) {
        value = 0;
      }
      callUser(value);
      setIdUser(value);
      setProperties(null);
      setIdProperty(0);
      setProperty({} as Property);
      setOwner({} as Owner);
      setDeleteProperty(false);
      setDeleteUser(false);
    },
    [idUser, data],
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

  const handleFormUserChange = useCallback(
    (e: FormEvent<HTMLInputElement | HTMLButtonElement>) => {
      setForm({
        ...form,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [form],
  );

  const handlePropertyListingsOnClick = async () => {
    const data = await getAllPropertiesUser(idUser, token);

    if (data && Array.isArray(data)) {
      setProperties(data);
    }
  };

  const handleUpdateOnClick = async () => {
    if (idProperty > 0 && properties) {
      let property: Property =
        properties.find(({ id }: Property) => id === idProperty) ?? ({} as Property);

      property = transformarProperty(property);
      setProperty({ ...property });
      setMessage({} as TypeMessage);
      setOwner({} as Owner);
      setUpload({} as Upload);
    }
  };

  const handleCreateOwnerOnClick = async () => {
    let data = await createOwner(token, { ...owner, propertyId: idProperty });

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'owner' });
    }

    if (data && 'about' in data) {
      data = transformarProperty(data);
      await handlePropertyListingsOnClick();
      setProperty({ ...data });
    }

    setOwner({} as Owner);
  };

  const handleDeleteOwnerOnClick = async (id: number) => {
    const data = await deleteOwner(token, id);

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'owner' });
    }

    if (data && 'name' in data) {
      await handlePropertyListingsOnClick();
      const owner: Owners[] = property.owners.filter(({ owner, ownerId, propertyId }) => {
        if (owner.id !== id) return { owner, ownerId, propertyId };
      });
      setProperty({ ...property, owners: owner });
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
        await handlePropertyListingsOnClick();
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
      await handlePropertyListingsOnClick();
    }

    setUpload({} as Upload);
  };

  useEffect(() => {
    setTimeout(() => {
      if (message.message) {
        setMessage({} as TypeMessage);
      }
    }, 10000);
  }, [message]);

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
      await handlePropertyListingsOnClick();
    }
  };

  const handleUserDeleteMaster = async () => {
    const data = await deleteUserMaster(idUser, token);

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
    setIdUser(0);
    setProperties(null);
    setIdProperty(0);
    setProperty({} as Property);
    setOwner({} as Owner);
    setDeleteProperty(false);
    setDeleteUser(false);
    sendData();
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
    setDeleteProperty(false);
    setIdProperty(0);
    await handlePropertyListingsOnClick();
  };

  const handleUserUpdateMasterOnClick = async () => {
    const data = await updatePartialUser(idUser, form, token);

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
    }
    setIdUser(0);
    setProperties(null);
    setIdProperty(0);
    setProperty({} as Property);
    setOwner({} as Owner);
    setDeleteProperty(false);
    sendData();
    setDeleteUser(false);
  };

  return (
    <div className={style.main}>
      <div className={style.search}>
        <InputSearch
          type='text'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder='busque aqui o usuário'
        />
      </div>
      {message.type === 'successUser' && <Message mss={message} />}
      {data && (
        <Table
          iten='user'
          users={search === '' ? data : filterUser(data, search)}
          idItem={idUser}
          onChangeRadio={handleIdUserChange}
        />
      )}
      {idUser > 0 && (
        <>
          <FormUser form={form} handleFormUserChange={handleFormUserChange} />
          <div className={style.box}>
            <Button
              name='Lista de Imóveis'
              className={style.button}
              onClick={() => {
                handlePropertyListingsOnClick();
                setDeleteUser(false);
              }}
            />
            <Button
              name='Salvar'
              onClick={() => {
                handleUserUpdateMasterOnClick();
                setDeleteUser(false);
              }}
            />
            <ButtonDelete
              name='Apagar Usuario'
              onClick={() => {
                setDeleteUser(!deleteUser);
                setProperties(null);
                setIdProperty(0);
                setProperty({} as Property);
                setOwner({} as Owner);
                setDeleteProperty(false);
              }}
              disabled={!(user?.role === 'master') || form.role === 'master'}
            />
          </div>
        </>
      )}
      {deleteUser && (
        <DeletePropertyAndUser
          type='user'
          id={idUser}
          handleDeleteMaster={handleUserDeleteMaster}
        />
      )}
      {message.type === 'successProperty' && <Message mss={message} />}
      {properties &&
        (properties.length > 0 ? (
          <>
            <Table
              iten='property'
              idItem={idProperty}
              properties={properties}
              onChangeRadio={handleIdPropertyChange}
            />
            <div className={style.box}>
              <Button
                name='Alterar'
                onClick={() => handleUpdateOnClick()}
                disabled={idProperty === 0}
              />
              <ButtonDelete
                name='Excluir'
                onClick={() => {
                  setProperty({} as Property);
                  setDeleteProperty(!deleteProperty);
                }}
                disabled={!(user?.role === 'master') || idProperty === 0}
              />
            </div>
          </>
        ) : (
          <p className={style.message}>Nenhum imóvel cadastrado</p>
        ))}
      {'about' in property && (
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
      )}
      {deleteProperty && (
        <DeletePropertyAndUser
          type='property'
          id={idProperty}
          handleDeleteMaster={handlePropertyDeleteMaster}
        />
      )}
    </div>
  );
};

export default Users;
