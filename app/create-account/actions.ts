'use server';

import { z } from 'zod';

// At least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);

const checkUsername = (username: string) => {
  return !username.includes('admin');
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
      .min(3, 'Way too short!!')
      .max(10, "That's too long!")
      .toLowerCase()
      .trim()
      .transform((data) => `${data}🔥`)
      .refine(checkUsername, {
        message: 'Username cannot contain "admin"',
      }),
    email: z.string().email(),
    password: z.string().min(8).regex(passwordRegex, 'Password is too weak'),
    confirm_password: z.string().min(8),
  })
  .refine(checkPassword, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log('Account created : ', result.data);
    return null;
  }
}
