import { type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import DataTable from '~/components/DataTable';
import type { Contact } from '~/models/contact';
import { db } from '~/utils/db.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Contacts' }];
};

export const loader = async () => {
  const contacts: Contact[] = await db.contact.findMany();
  console.log(contacts);
  return contacts;
};

export default function Index() {
  const contacts = useLoaderData<typeof loader>();

  const columns = useMemo(
    () => [
      {
        key: 'name',
        label: 'Name',
        render: (c: Contact) => c.name,
      },
      {
        key: 'email',
        label: 'Email',
        render: (c: Contact) => c.email,
      },
      {
        key: 'phone',
        label: 'Phone',
        render: (c: Contact) => c.phone,
      },
      {
        key: 'website',
        label: 'Website',
        render: (c: Contact) => c.website,
      },
      {
        key: 'company',
        label: 'Company',
        render: (c: Contact) => c.companyName,
      },
    ],
    [],
  );

  return (
    <>
      <DataTable
        className="container mx-auto"
        data={contacts}
        columns={columns}
        createLink="/contacts/create"
        canSearch
      />
    </>
  );
}
