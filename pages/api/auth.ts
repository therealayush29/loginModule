import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email === "ayush.nerasoft@gmail.com" && password === "password") {
      const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "1h" });
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
      }));
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
