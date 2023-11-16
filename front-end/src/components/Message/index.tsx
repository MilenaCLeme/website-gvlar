import { Message as MessageProps } from '@/types';
import classNames from 'classnames';
import style from './message.module.scss';
import Button from '@/components/Button';

interface MessageNewProps {
  mss: MessageProps;
  handleResendEmailClick?: () => Promise<void>;
}

const Message: React.FC<MessageNewProps> = ({ mss, handleResendEmailClick }: MessageNewProps) => {
  const { type, message, status } = mss;
  if (
    type === 'create' ||
    type === 'delete' ||
    type === 'owner' ||
    type === 'successProperty' ||
    type === 'successUser'
  ) {
    return (
      <p
        className={classNames({
          [style.message]: true,
          [style.message__alert]: !(status === 201),
          [style.message__ok]: status === 201,
        })}
      >
        {message}
      </p>
    );
  }

  if (type === 'login') {
    return (
      <div>
        <p className={style.message}>
          {message === 'Email não validato'
            ? `E-mail não validato! Por favor confirme seu cadastro no seu e-mail ou click em reenviar para enviar novamente o e-mail de confirmação`
            : message}
        </p>
        {message === 'Email não validato' && handleResendEmailClick && (
          <Button
            className={style.button}
            name='Reenviar'
            onClick={() => handleResendEmailClick()}
          />
        )}
      </div>
    );
  }

  if (type === 'image') {
    return (
      <p
        className={classNames({
          [style.message]: true,
          [style.message__alert]: !(status === 201),
          [style.message__ok]: status === 201,
        })}
      >
        {message === 'Validation failed (expected type is image/jpeg)'
          ? 'Envie uma imagem no formato JPEG ou JPG'
          : message}
      </p>
    );
  }
};

export default Message;
