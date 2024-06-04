'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { getSession } from 'next-auth/react';

interface Props {
  signOut: () => void;
}

const Header: React.FC<Props> = ({ signOut }) => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchSession = async () => {
          try {
              const sessionData = await getSession();
              setSession(sessionData);
          } catch (error) {
              console.error('Error fetching session:', error);
          } finally {
              setLoading(false);
          }
      };

      fetchSession();
  }, []);

  if (loading) {
      return <div>Loading...</div>; // You can replace this with a more elaborate loading component if needed
  }


  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
          <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{`${session?.user.name} ${session?.user.lastName}`}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Configuración</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={signOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;