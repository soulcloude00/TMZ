import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const items = await prisma.stockItem.findMany();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching stock items' });
      }
      break;

    case 'POST':
      try {
        const item = await prisma.stockItem.create({
          data: req.body,
        });
        res.status(201).json(item);
      } catch (error) {
        res.status(500).json({ error: 'Error creating stock item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 