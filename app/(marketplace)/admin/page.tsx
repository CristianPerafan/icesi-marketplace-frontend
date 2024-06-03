'use client';

import { Icon } from '@iconify/react';

export default function Admin() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ButtonCard
          title="Usuarios"
          icon={<Icon icon='lucide:user'/>}
          description="Gestionar vendedores y compradores"
          link="/admin/users"
        />
        <ButtonCard
          title="Productos"
          icon={<Icon icon='lucide:box' />}
          description="Gestionar productos"
          link="/admin/products"
        />
        <ButtonCard
          title="Ordenes"
          icon={<Icon icon='lucide:shopping-cart' />}
          description="Gestionar ordenes"
          link="/admin/orders"
        />
      </div>
    </div>
  );
}

interface ButtonCardProps {
  title: string;
  icon: JSX.Element;
  description: string;
  link: string;
}

function ButtonCard({ title, icon, description, link }: ButtonCardProps) {
  return (
    <a href={link} className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-4 bg-gray-200 rounded-full">{icon}</div>
        <h2 className="ml-4 text-xl font-semibold">{title}</h2>
      </div>
      <p>{description}</p>
    </a>
  );
}