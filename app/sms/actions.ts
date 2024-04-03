'use server';

export default async function smsVerification(
  prevState: any,
  formData: FormData,
) {
  const data = {
    phone: formData.get('phone'),
  };

  console.log('Sending verification code to : ', data.phone);
  return null;
}
