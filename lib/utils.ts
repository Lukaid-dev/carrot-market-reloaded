export function formatToTimeAgo(date: string): string {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diffInMs = now - time;

  const secInMs = 1000;
  const minInMs = secInMs * 60;
  const hourInMs = minInMs * 60;
  const dayInMs = hourInMs * 24;

  const formatter = new Intl.RelativeTimeFormat('ko');

  if (diffInMs >= dayInMs) {
    const diff = Math.round(diffInMs / dayInMs);
    return formatter.format(-diff, 'days');
  } else if (diffInMs >= hourInMs) {
    const diff = Math.round(diffInMs / hourInMs);
    return formatter.format(-diff, 'hours');
  } else if (diffInMs >= minInMs) {
    const diff = Math.round(diffInMs / minInMs);
    return formatter.format(-diff, 'minutes');
  } else {
    const diff = Math.round(diffInMs / secInMs);
    return formatter.format(-diff, 'seconds');
  }
}

export function formatToWon(price: number): string {
  return price.toLocaleString('ko-KR');
}
