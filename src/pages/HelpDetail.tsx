import { AxiosError } from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Badge from '@/components/Badge';
import HelpDetailContent from '@/components/HelpDetailContent';
import Loader from '@/components/Loader';
import Button from '@/components/formElements/button';
import Input from '@/components/formElements/input';
import InputPhone from '@/components/formElements/input/inputPhone';
import Layout from '@/components/shared/Layout';
import Modal from '@/components/shared/Modal';
import PageTitle from '@/components/shared/PageTitle';

import { getHelpsById, postHelperForm } from '../api/Help';
import { regexp } from '../utils/Constants';

import { IResponseType } from '@/models/General';
import { IHelpListItem } from '@/models/HelpList';

type FormData = {
  name: string;
  email: string;
  phone_number: string;
};

const HelpDetail = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const { data, isLoading, refetch } = useQuery<IHelpListItem>(
    ['helpById', id],
    getHelpsById,
  );

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
    onSuccess: (resp, variables) => {
      const base64 = btoa(`${id}?${variables.phone_number}`);

      refetch();
      setIsOpen(false);
      if (resp && resp.success) {
        toast.success(resp.message);
        navigate(`/yardim?id=${base64}`);
      }

      reset();
    },
  });

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const checkHelpType = (status: string) => {
    switch (status) {
      case 'Yardım Bekliyor':
        return 'error';
      case 'Yardım Geliyor':
        return 'info';
      case 'Yardım Ulaştı':
        return 'success';
      default:
        return 'default';
    }
  };

  const onSubmit: SubmitHandler<FormData> = (fields) => {
    formSendMutation.mutate(fields);
  };

  return (
    <Layout>
      <Helmet>
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:creator"
          content="@yardimyericom"
        />
        <meta
          name="twitter:title"
          content="Yardımyeri.com"
        />
        <meta
          name="twitter:description"
          content="Yardımyeri.com - Deprem yardım."
        />
        <meta
          name="twitter:image"
          content={`${import.meta.env.VITE_API_KEY}/images/${id}.png`}
        />
      </Helmet>
      {(formSendMutation.isLoading || isLoading) && <Loader />}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 ">
        <PageTitle title="Yardım Talebi Detayı" />
        {data && (
          <div>
            <Badge
              label={data.status}
              type={checkHelpType(data.status)}
            />
          </div>
        )}
      </div>
      {!isLoading && data && (
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
