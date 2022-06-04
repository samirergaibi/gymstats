import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@utils/supabaseClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  return res.status(200).json({ isLoggedIn: !!user });
};

export default handler;
