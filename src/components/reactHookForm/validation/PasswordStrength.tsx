import { PasswordStrengthProps } from "../../../types/types";

export const PASSWORD_NUMBER_CHECK = /(?=.*[0-9])/;
export const PASSWORD_SPECIAL_SYMBOL_CHECK = /(?=.*[!@#$%^&*])/;
export const PASSWORD_UPPER_CASE_SYMBOL_CHECK = /(?=.*[A-Z])/;
export const PASSWORD_LOWER_CASE_SYMBOL_CHECK = /(?=.*[a-z])/;

export function PasswordStrength({ value }: PasswordStrengthProps) {
  let strength = 0;

  if (PASSWORD_LOWER_CASE_SYMBOL_CHECK.test(value)) {
    strength++;
  }
  if (PASSWORD_UPPER_CASE_SYMBOL_CHECK.test(value)) {
    strength++;
  }
  if (PASSWORD_NUMBER_CHECK.test(value)) {
    strength++;
  }
  if (PASSWORD_SPECIAL_SYMBOL_CHECK.test(value)) {
    strength++;
  }

  const strengthColor = strength < 2 ? "" : strength < 4 ? "medium" : "hard";
  const strengthText =
    strength < 2
      ? "Easy password"
      : strength < 4
        ? "Medium password"
        : "Hard password";

  return (
    <span className={`errorMsg ${strengthColor}`}>{`${strengthText}`}</span>
  );
}
