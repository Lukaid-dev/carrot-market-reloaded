'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone number',
  );

// coerce: force the value to be a number
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export default async function smsVerification(
  prevState: ActionState,
  formData: FormData,
) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      // send SMS
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return { token: true, error: result.error.flatten() };
    } else {
      // verify token and login
      redirect('/');
    }
  }
}
