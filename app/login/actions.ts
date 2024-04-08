'use server';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !!user;
};

const formSchema = z.object({
  email: z.string().email().refine(checkEmailExists, {
    message: 'Email does not exist',
  }),
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
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();

      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['Email or password is incorrect'],
          email: [],
        },
      };
    }
  }
}
