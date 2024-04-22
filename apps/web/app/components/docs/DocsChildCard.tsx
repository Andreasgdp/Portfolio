'use client';

import { Card as ChildCard } from '@/app/components/common/Card';
import { Label } from '@/app/components/common/Label';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Card {
  urlPath: string;
  title: string;
  label?: string;
  excerpt: string;
}

interface DocsChildCardProps {
  card: Card;
}

export const DocsChildCard: React.FC<DocsChildCardProps> = ({ card }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(card.urlPath)} className="cursor-pointer">
      <ChildCard className="h-full p-6 py-4 hover:border-zinc-100 hover:bg-zinc-50 dark:hover:border-zinc-900/50 dark:hover:bg-zinc-900/20">
        <h3 className="mt-0 no-underline">{card.title}</h3>
        {card.label && <Label text={card.label} />}
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <p>{card.excerpt}</p>
        </div>
      </ChildCard>
    </div>
  );
};
