'use server';

import { redirect } from 'next/navigation';

export default async function handleForm(prevState: any, formData: FormData) {
  console.log('prevState : ', prevState);
  console.log('email : ', formData.get('email'));
  console.log('password : ', formData.get('password'));
  // 3초 지연
  await new Promise((resolve) => setTimeout(resolve, 3000));
  redirect('/');
  return { errors: ['wrong password', 'password too short'] };
}
