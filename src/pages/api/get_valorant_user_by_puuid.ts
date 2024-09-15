import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'
import ValorantUserModel from '@/src/model/valorant_user.model';

const defaultValorantUser: ValorantUserModel = {
  account: {
    puuid: "",
    name: "",
    tag: "",
  },
  current: {
    tier: null,
    rr: 0,
    last_change: 0,
    games_needed_for_rating: 0,
    leaderboard_placement: null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let valorantUser: ValorantUserModel = defaultValorantUser;
  const headers = { 'Authorization': process.env.REACT_APP_HENRIKDEV_API_KEY }
  const region = req.query.region;
  const platform = req.query.platform;
  const puuid = req.query.puuid;

  try {
    const data = await axios.get(`https://api.henrikdev.xyz/valorant/v3/by-puuid/mmr/${region}/${platform}/${puuid}`, { headers })
    valorantUser.account = data.data.data.account;
    valorantUser.current = data.data.data.current;
    console.log(valorantUser)
    res.status(200).json({ message: "User found!", valorantUser: valorantUser });
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
}