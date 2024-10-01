import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
      })
    );
    res.status(200).json({ message: 'Logged out' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
