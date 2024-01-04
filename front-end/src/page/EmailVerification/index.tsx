import Man from '@/assets/confirmation/man.svg';
import Woman from '@/assets/confirmation/woman.svg';
import { decodeString } from '@/functions/decode';
import { validationEmail } from '@/service/api/auth';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import style from './emailVerification.module.scss';
import { scrollToTop } from '@/functions/scroll';

const EmailVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      if (load && id) {
        const decodeId = Number(decodeString(id));

        if (decodeId === 0 || !decodeId) {
          navigate('/');
        }

        await validationEmail(decodeId);

        setLoad(false);
      }
    };

    callApi();
  }, [id, navigate, load]);

  return (
    <main className={style.main}>
      <section className={style.section}>
        <Man />
        <div className={style.text}>
          <h1>Cadastro Liberado</h1>
          <p>
            Parabéns! Seu cadastro foi liberado com sucesso! Agora, você pode acessar o seu painel e
            desfrutar de todas as vantagens que a GVLAR tem para oferecer! Agradecemos por fazer
            parte da nossa comunidade.
          </p>
          <NavLink to='/'>
            Voltar para GVLAR
            <div />
          </NavLink>
        </div>
        <Woman />
      </section>
    </main>
  );
};

export default EmailVerification;
