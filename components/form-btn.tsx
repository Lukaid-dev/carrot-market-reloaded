'use client';

import { useFormStatus } from 'react-dom';

interface FormBtnProps {
  text: string;
}

export default function FormBtn({ text }: FormBtnProps) {
  const { pending } = useFormStatus(); // from react-dom

  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300">
      {pending ? '로딩 중...' : text}
    </button>
  );
}
