'use client'

import React from 'react'
import HelloWorldComponent from '../../search_bar_riot_user';
import { useState } from 'react';
import RiotUserModel from '@/src/model/riot_user_model';

function ValorantOverlayEditor() {
  const [riotUser, setRiotUser] = useState<RiotUserModel>();

  const handleDataFromChild = (riotUser: RiotUserModel | undefined) => {
    setRiotUser(riotUser);
  }

  if (riotUser) {
    return (
        <div>
            <p>Overlay</p>
        </div>
    )
  }

  return (
    <div>
      <h1>Data from Riot API</h1>
      <HelloWorldComponent onDataFromChild={handleDataFromChild} />
    </div>
  )
}

export default ValorantOverlayEditor