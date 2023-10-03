import { redirect } from '@remix-run/node';

// redirect to the contacts page
export const loader = async () => {
  return redirect('/contacts');
};
