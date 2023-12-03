export enum FormType {
  reactHook,
  uncontrolled,
}

export type FormTitleProps = {
  form: FormType;
};

export type PasswordStrengthProps = {
  value: string;
};

export type InfoCardProps = {
  data: {
    name: string;
    age: number;
    email: string;
    gender: string;
    image: string;
    country: string;
    newInfo: boolean;
  };
};
