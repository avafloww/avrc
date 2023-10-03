// basic page to create a new contact

import { redirect, type ActionFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import { db } from '~/utils/db.server';
import { badRequest } from '~/utils/request.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Create Contact' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get('name');
  const email = body.get('email');
  const phone = body.get('phone');
  const website = body.get('website');
  const companyName = body.get('companyName');

  const fieldErrors = {
    name: validateNonEmpty(name),
    email: validateNonEmpty(email),
    phone: validateNonEmpty(phone),
    website: validateNonEmpty(website),
    companyName: validateNonEmpty(companyName),
  };
  const fields = { name, email, phone, website, companyName };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fields, fieldErrors });
  }

  console.log(fields);
  await db.contact.create({
    // @ts-ignore - we've already validated that these fields are not null
    data: fields,
  });

  return redirect('/contacts');
};

function validateNonEmpty(value: string | null | undefined) {
  if (!value) {
    return 'This field is required';
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h1 className="text-2xl">Create Contact</h1>
      <form className="flex flex-col space-y-4" method="post">
        <div className="flex flex-col space-y-1">
          <label htmlFor="name">Name</label>
          <TextField
            defaultValue={actionData?.fields?.name ?? undefined}
            initError={actionData?.fieldErrors?.name ?? undefined}
            label="Name"
            name="name"
            type="text"
            validate={validateNonEmpty}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <TextField
            defaultValue={actionData?.fields?.email ?? undefined}
            initError={actionData?.fieldErrors?.email ?? undefined}
            label="Email"
            name="email"
            type="email"
            validate={validateNonEmpty}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="phone">Phone</label>
          <TextField
            defaultValue={actionData?.fields?.phone ?? undefined}
            initError={actionData?.fieldErrors?.phone ?? undefined}
            label="Phone"
            name="phone"
            type="text"
            validate={validateNonEmpty}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="website">Website</label>
          <TextField
            defaultValue={actionData?.fields?.website ?? undefined}
            initError={actionData?.fieldErrors?.website ?? undefined}
            label="Website"
            name="website"
            type="text"
            validate={validateNonEmpty}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="companyName">Company Name</label>
          <TextField
            defaultValue={actionData?.fields?.companyName ?? undefined}
            initError={actionData?.fieldErrors?.companyName ?? undefined}
            label="Company Name"
            name="companyName"
            type="text"
            validate={validateNonEmpty}
          />
        </div>
        <Button label="Create Contact" type="submit" />
      </form>
    </div>
  );
}
