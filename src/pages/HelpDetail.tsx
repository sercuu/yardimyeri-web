import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { IHelpListItem } from '@/models/helpList.model';
import Button from '../components/formElements/button';
import Input from '../components/formElements/input';
import InputPhone from '../components/formElements/input/inputPhone';
import Layout from '../components/shared/Layout';
import Modal from '../components/shared/Modal/Modal';
import PageTitle from '../components/shared/PageTitle';
import { getHelpsById, postHelperForm } from '../api/help.service';
import { regexp } from '../utils/constants';
import { IResponseType } from '@/models/general.model';
import HelpDetailContent from '../components/helpDetailContent/HelpDetailContent';

type FormData = {
  name: string;
  email: string;
  phone_number: string;
};

const HelpDetail = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const formSendMutation = useMutation<
    IResponseType,
    AxiosError<IResponseType>,
    FormData,
    string
  >((payload) => postHelperForm(id, payload), {
    onError: (error) => {
      toast.error(
        `(${error.response?.status}) ${error.response?.data?.message}`,
      );
    },
    onSuccess: (data) => {
      setIsOpen(false);
      if (data && data.success) {
        toast.success(data.message);
      }
      reset();
    },
  });

  const { data, isLoading } = useQuery<IHelpListItem>(
    ['helpById', id],
    getHelpsById,
  );

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const onSubmit: SubmitHandler<FormData> = (fields) => {
    formSendMutation.mutate(fields);
  };

  return (
    <Layout>
      <PageTitle title="Yardım Talebi Detayı" />
      {!isLoading && (
        <>
          <HelpDetailContent data={data} />
          {data?.status === 'Yardım Bekliyor' && (
            <div className="flex justify-center mt-6">
              <Button
                label="Yardım Et"
                onClick={handleModalOpen}
              />
            </div>
          )}
        </>
      )}

      <Modal
        title="Yardım Başlatılacak!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div>
          <p>
            Aşağıda bulunan bilgileri doldurduktan sonra yardımı
            başlatabilirsiniz.
          </p>
          <p className="text-red-500">
            Yardımı başlattığınız takdirde yardım talep edenin iletişim
            bilgilerine ulaşabilirsiniz.
          </p>

          <form
            className="mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: 'Bu alan zorunludur.',
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Adınız"
                    />
                  )}
                />
                <span className="text-red-600 text-sm">
                  {errors.name?.message}
                </span>
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    pattern: {
                      value: regexp.email,
                      message: 'Doğru formatta bir mail giriniz.',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="E-Posta Adresiniz"
                    />
                  )}
                />
                <span className="text-red-600 text-sm">
                  {errors.email?.message}
                </span>
                <p className="text-gray-500 text-sm">
                  Bu alan zorunlu değildir. Ancak e-posta adresinizi girdiğiniz
                  takdirde yeni oluşan talepleri mail olarak sizlere
                  bildiriyoruz.
                </p>
              </div>
              <div>
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: 'Bu alan zorunludur.',
                    pattern: {
                      value: regexp.phoneNumber,
                      message: 'Doğru formatta bir telefon numarası giriniz.',
                    },
                  }}
                  render={({ field }) => <InputPhone {...field} />}
                />
                <span className="text-red-600 text-sm">
                  {errors.phone_number?.message}
                </span>
                <p className="text-gray-500 text-sm">
                  Lütfen numaranızı başında sıfır olmadan girin.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <Button
                label="Vazgeç"
                type="error"
                size="small"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <Button
                htmlType="submit"
                label="Yardımı Başlat"
                type="success"
                size="small"
              />
            </div>
          </form>
        </div>
      </Modal>
    </Layout>
  );
};

export default HelpDetail;
