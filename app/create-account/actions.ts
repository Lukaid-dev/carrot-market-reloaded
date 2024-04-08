'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bycryt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const checkUsername = (username: string) => {
  return !username.includes('admin');
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Please enter a valid username',
        required_error: 'Please enter a username',
      })
      .toLowerCase()
      .trim()
      .refine(checkUsername, {
        message: 'Username cannot contain "admin"',
      })
      .refine(checkUniqueUsername, {
        message: 'Username is already taken',
      }),
    email: z.string().email().refine(checkUniqueEmail, {
      message: 'Email is already taken',
    }),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  console.log(cookies());
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 유효성 검사는 모두 zod로 이관

    const hashedPassword = await bycryt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const cookie = await getIronSession(cookies(), {
      cookieName: 'carrot-cookie',
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;

    await cookie.save();

    redirect('/profile');
  }
}
