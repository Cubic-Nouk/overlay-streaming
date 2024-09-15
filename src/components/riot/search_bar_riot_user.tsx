'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import ValorantUserModel from '@/src/model/valorant_user.model';

function HelloWorldComponent({ onDataFromChild }: {onDataFromChild: Function}) {
  const [riotId, setRiotId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [valorantUser, setValorantUser] = useState<ValorantUserModel>()
  const router = useRouter()

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        await axios.get('/api/get_riot_user_by_id', {params: {riotId: riotId}})
          .catch((error) => {
            throw new Error(error.message);
          })
          .then((response) => {
            setMessage(response.data.message);
            setValorantUser(response.data.valorantUser);
          })
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchMessage();
  }, [riotId]);

  function sentDataToParent () {
    onDataFromChild(valorantUser);
  }

  /*if (error) {
    return (
    <div>
      <input onChange={(event) => {setRiotId(event.target.value)}}></input>
      <p>Error: {error}</p>
    </div>);
  }*/

  return (
    <div>
      <input onChange={(event) => {setRiotId(event.target.value)}}></input>
      <p>{message || 'Loading...'}</p>
      <button onClick={() => sentDataToParent()}>Redirect</button>
    </div>
  );
}

export default HelloWorldComponent;