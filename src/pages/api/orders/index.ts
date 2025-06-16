// src/pages/api/orders/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Dummy order data for demonstration
// Replace with real DB logic as needed
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: 'Missing userId' });
    return;
  }

  // TODO: Fetch orders from DB for the given userId
  // For now, return an empty array
  res.status(200).json([]);
}
