import { FormEvent, useCallback, useState } from 'react';
import style from './schedulingButton.module.scss';
import ReactModal from 'react-modal';
import { Card as TypeCard } from '@/types';
import Card from '@/components/Card';
import Input from '@/components/Input';
import DateCalendar from './Date';
import InputCheck from '@/components/InputCheck';
import Closet from '@/assets/menu/MenuCloset.svg';
import Button from '@/components/Button';
import { sendEmail } from '@/service/api/email';
import { formatarData } from '@/functions/transformation';

interface Form {
  name: string;
  phone: string;
  email: string;
  date: Date;
  period: string;
  obs: string;
}

const SchedulingButton = (card: TypeCard) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({} as Form);

  const handleFormChange = useCallback(
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.currentTarget.type === 'checkbox') {
        e.currentTarget.name = 'period';
      }

      setForm({
        ...form,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [form],
  );

  const handleDateChange = (dateSelect: Date | null) => {
    if (dateSelect) {
      setForm({
        ...form,
        date: dateSelect,
      });
    }
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const sendEmailAboutSchedule = async () => {
    const data = await sendEmail({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: `Agendamento do imovel id: ${card.id}`,
      text: `Esse imóvel de referência ${card.id} despertou o interesse de ${
        form.name
      }, que está interessado(a) em agendar uma visita. A data selecionada para a visita é ${formatarData(
        form.date,
      )}, durante o período de ${
        form.period
      }. Gostaríamos de confirmar a disponibilidade deste imóvel para a data mencionada.`,
    });

    console.log(data);
  };

  return (
    <>
      <button className={style.button} onClick={() => setOpenModal(true)}>
        AGENDAR VISITA
      </button>
      <ReactModal
        contentLabel='ModalScheduling'
        isOpen={openModal}
        onRequestClose={toggleModal}
        className={style.modal}
        style={{
          overlay: {
            backgroundColor: 'rgba(36,32,33,0.5)',
            zIndex: '3',
          },
        }}
      >
        <div>
          <div className={style['div-titles']}>
            <h1>Agendar Visita</h1>
            <button onClick={() => setOpenModal(false)}>
              <Closet />
            </button>
          </div>
          <div className={style['box']}>
            <div className={style['box-card']}>
              <Card {...card} to='/' action={true} />
            </div>
            <form className={style['box-form']}>
              <Input type='text' name='name' placeholder='Nome' onChange={handleFormChange} />
              <Input
                type='text'
                name='phone'
                placeholder='Telefone'
                onChange={handleFormChange}
                mask='phone'
              />
              <Input type='text' name='email' placeholder='E-mail' onChange={handleFormChange} />
              <div>
                <h2 className={style['title-calendar']}>Selecione a melhor data para visitação:</h2>
                <div className={style['box-calendar']}>
                  <DateCalendar onChange={handleDateChange} selectedDate={form.date} />
                  <div>
                    <h3 className={style['title-time']}>Período</h3>
                    <div className={style['box-time']}>
                      <InputCheck
                        type='checkbox'
                        label='Manhã'
                        value='Manhã'
                        checked={form.period === 'Manhã'}
                        onChange={handleFormChange}
                      />
                      <InputCheck
                        type='checkbox'
                        label='Tarde'
                        value='Tarde'
                        checked={form.period === 'Tarde'}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <textarea
                className={style.textarea}
                name='obs'
                onChange={handleFormChange}
                placeholder='Observação'
              />
              <div className={style['box-button']}>
                <Button
                  name='Agendar'
                  onClick={() => {
                    sendEmailAboutSchedule();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default SchedulingButton;
