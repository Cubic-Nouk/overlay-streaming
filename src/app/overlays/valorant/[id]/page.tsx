'use client'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import axios from 'axios';
import ValorantUserModel from '@/src/model/valorant_user_model';
import './style.css'

function ValorantOverlay() {
  const [valorantUser, setValorantUser] = useState<ValorantUserModel>()
  const path = usePathname();
  const puuid = path?.split('/').pop();
  const platform = "pc";
  const region = "eu";

  useEffect(() => {
    const getUserValorantInformation = async () => {
      try {
        await axios.get('/api/get_valorant_user_by_puuid', {params: {puuid: puuid, platform: platform, region: region}})
          .catch((error) => {
            throw new Error(error.message);
          })
          .then((response) => {
            setValorantUser(response.data.valorantUser);
          })
      } catch (err) {
        console.log(err);
      }
      setTimeout(getUserValorantInformation, 150000)
    };

    getUserValorantInformation();
  }, [])

  if (valorantUser) {
    return (
      <div>
        <p>TEST</p>
        <p>{valorantUser?.account.name}</p>
        <p>{valorantUser?.current.rr}rr</p>
      </div>
    )
  }

  return (
    <div>
        <p>LOADING</p>
    </div>
  )
}
  
export default ValorantOverlay;