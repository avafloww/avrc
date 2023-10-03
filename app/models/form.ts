export interface FormResponse {
  fieldErrors: { [key: string]: string | undefined };
  fields: { [key: string]: string | undefined };
  formError: string | null;
}
