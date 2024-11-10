import { HoveredLink, Menu, MenuItem } from "~/components/ui/navbar-menu";
import { useState } from 'react';
import { cn } from '~/lib/utils';
import Image from 'next/image';
import Link from 'next/link';


export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
      <div className='mr-16'>
          <Link href={'/'} >
            <Image src='/PROENG.png' width={100} height={50} alt={''} />
          </Link>
        </div>
        <MenuItem setActive={setActive} active={active} item="Serviços">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Solo Grampeado</HoveredLink>
            <HoveredLink href="/">Concreto Projetado</HoveredLink>
            <HoveredLink href="/">Injeções de Consolidação </HoveredLink>
            <HoveredLink href="/">Estaca Tipo Raíz</HoveredLink>
          </div>
        </MenuItem>
        
        {/* <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem> */}
        <MenuItem setActive={setActive} active={active} item="Contato">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Blog">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Postagens</HoveredLink>
            <HoveredLink href="/">Vídeos</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}