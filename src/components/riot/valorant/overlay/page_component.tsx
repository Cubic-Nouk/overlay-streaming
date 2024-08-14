'use client'

import React from 'react'
import HelloWorldComponent from '../../search_bar_riot_user';
import { useState } from 'react';
import ValorantUserModel from '@/src/model/valorant_user_model';

function ValorantOverlayPage() {
  const [valorantUser, setValorantUser] = useState<ValorantUserModel>();

  const handleDataFromChild = (valorantUser: ValorantUserModel | undefined) => {
    setValorantUser(valorantUser);
  }

  if (valorantUser) {
    return (
        <div>
            <p>{valorantUser.account.name}#{valorantUser.account.tag}</p>
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

export default ValorantOverlayPage