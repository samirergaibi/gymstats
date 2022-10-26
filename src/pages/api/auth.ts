import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import config from '../../config';

const supabase = createClient(config.SUPABASE_URL, config.SERVICE_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await supabase.auth.admin.listUsers();
  res.status(200).json({
    amountOfUsers: data.data.users.length,
  });
};

export default handler;
