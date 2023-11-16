import ButtonDelete from '../ButtonDelete';
import style from './deleteProperty.module.scss';

interface DeletePropertyAndUserProps {
  type: 'user' | 'property';
  id: number;
  handleDeleteMaster: () => Promise<void>;
}

const DeletePropertyAndUser: React.FC<DeletePropertyAndUserProps> = ({
  type,
  id,
  handleDeleteMaster,
}: DeletePropertyAndUserProps) => {
  return (
    <section className={style.main}>
      {type === 'property' && (
        <p>
          Para confirmar a exclusão completa do imóvel com ID {id}, clique no botão abaixo. Após a
          exclusão não poderá recuperar nenhum dado cadastrado
        </p>
      )}
      {type === 'user' && (
        <p>
          Para confirmar a exclusão completa do usuário com ID {id}, clique no botão abaixo. Após a
          exclusão não poderá recuperar nenhum dado cadastrado e todos os imoveis cadastrados passar
          ao registro no usuario 1
        </p>
      )}
      <ButtonDelete name='Confirmar Exclusão' onClick={() => handleDeleteMaster()} />
    </section>
  );
};

export default DeletePropertyAndUser;
