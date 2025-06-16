import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const item = await prisma.stockItem.findUnique({
          where: { id: Number(id) },
        });
        if (!item) {
          return res.status(404).json({ error: 'Stock item not found' });
        }
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching stock item' });
      }
      break;

    case 'PUT':
      try {
        const item = await prisma.stockItem.update({
          where: { id: Number(id) },
          data: req.body,
        });
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ error: 'Error updating stock item' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.stockItem.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Error deleting stock item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 