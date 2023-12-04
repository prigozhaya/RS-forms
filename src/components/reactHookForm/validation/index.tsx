export const EMAIL_SEPARATORS_CHECK =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

export function getEmailErrorMsg(value: string) {
  return !EMAIL_SEPARATORS_CHECK.test(value.toLowerCase())
    ? `e-mail address must contain an '@' and domain name`
    : true;
}

export function getPasswordErrorMsg(value: string) {
  return value.length < 8
    ? `Password must be at least 8 characters long`
    : true;
}
