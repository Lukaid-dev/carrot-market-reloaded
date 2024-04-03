'use server';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string({
      required_error: 'Please enter a password',
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, 'Password is too weak'),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log('Logged in : ', result.data.email);
    return null;
  }
}
