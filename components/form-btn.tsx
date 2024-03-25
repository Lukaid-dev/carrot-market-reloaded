interface FormBtnProps {
  text: string;
  loading: boolean;
}

export default function FormBtn({ text, loading }: FormBtnProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300">
      {loading ? '로딩 중...' : text}
    </button>
  );
}
