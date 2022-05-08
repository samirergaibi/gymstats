import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@utils/supabaseClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user: hasCookie } = await supabase.auth.api.getUserByCookie(req);
  return res.status(200).json({ hasCookie });
};

export default handler;
