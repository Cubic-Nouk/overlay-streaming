'use client'

import React, { createElement, useState } from 'react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import axios from 'axios';
import ValorantOverlayModel from '@/src/model/overlays/valorant_overlay.model';
import OverlayHexagonRank from '@/src/components/riot/valorant/overlay/rank';
import './style.css'

function ValorantOverlay() {
  const [overlayStats, setOverlayStats] = useState<ValorantOverlayModel>()
  const [tempAccountStat, setTempAccountStat] = useState<ValorantOverlayModel>()
  const [overlayInitialized, setOverlayInitializated] = useState<Boolean>(false)
  const path = usePathname();
  const puuid = path?.split('/').pop();
  const platform = "pc";
  const region = "eu";

  async function updateRRAnimation(rr_change: number) {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    var minus: Boolean = false;
    var rr_div = document.getElementById("rr-container")

    console.log(rr_change)
    if (rr_change < 0) {
      minus = true;
      rr_change = Math.abs(rr_change);
    }

    if (overlayStats === undefined || overlayStats.rr === undefined)
      return

    for (var index = 0; index < rr_change; index += 1) {
      var actual_rr_first_digit: HTMLElement | null;
      var actual_rr_second_digit: HTMLElement | null;
      var first_digit = document.createElement("p");

      if ((actual_rr_first_digit = document.getElementById("actual-down-first-digit")) === null)
        actual_rr_first_digit = document.getElementById("actual-up-first-digit");
      if ((actual_rr_second_digit = document.getElementById("actual-down-second-digit")) === null)
        actual_rr_second_digit = document.getElementById("actual-up-second-digit");

      if (minus) {
        actual_rr_first_digit?.setAttribute("id", "move-down-first-digit");
        first_digit.setAttribute("id", "actual-down-first-digit");
        if (overlayStats.rr%10 !== 0) {
          first_digit.innerHTML = String(overlayStats.rr%10 - 1);
        } else {
          var second_digit = document.createElement("p");
  
          actual_rr_second_digit?.setAttribute("id", "move-down-second-digit");
          second_digit.setAttribute("id", "actual-down-second-digit");
          second_digit.innerHTML = String(Math.trunc(overlayStats.rr/10 - 1));
          first_digit.innerHTML = "9";
          rr_div?.appendChild(second_digit);
        }
      } else {
          actual_rr_first_digit?.setAttribute("id", "move-up-first-digit");
          first_digit.setAttribute("id", "actual-up-first-digit");

          if (overlayStats.rr%10 !== 9) {
            first_digit.innerHTML = String(overlayStats.rr%10 + 1);
          } else {
            var second_digit = document.createElement("p");

            actual_rr_second_digit?.setAttribute("id", "move-up-second-digit");
            second_digit.setAttribute("id", "actual-up-second-digit");
            second_digit.innerHTML = String(Math.trunc(overlayStats.rr/10 + 1));
            first_digit.innerHTML = "0";
            rr_div?.appendChild(second_digit);
          }
        }

        rr_div?.appendChild(first_digit);
        await delay(200);
        if (overlayStats.rr%10 === 0 && minus)
          actual_rr_second_digit?.remove()
        if (overlayStats.rr%10 === 9 && minus === false)
          actual_rr_second_digit?.remove()
        if (minus)
          overlayStats.rr = overlayStats.rr - 1;
        else
          overlayStats.rr = overlayStats.rr + 1;
        actual_rr_first_digit?.remove();
      }
  }

  useEffect(() => {

    const getUserValorantInformation = async () => {
      const tempAccountStat: ValorantOverlayModel = {
        rank: 'Unranked',
        rr: 0,
        tier: 0,
      };
  
      try {
        await axios.get('/api/get_valorant_user_by_puuid', {params: {puuid: puuid, platform: platform, region: region}})
          .catch((error) => {
            throw new Error(error.message);
          })
          .then((response) => {
            const rank = response.data.valorantUser?.current.tier?.name.split(' ');
  
            if (response.data.valorantUser?.current.rank !== "Unranked") {
              tempAccountStat.tier = Number(rank[1]);
              tempAccountStat.rr = response.data.valorantUser?.current.rr;
            }
            if (rank === undefined) {
              return
            }
            tempAccountStat.rank = rank[0];
  
            return (tempAccountStat)
          })
      } catch (err) {
        console.log(err);
      }
  
      return (tempAccountStat)
    };

    const updateOverlay = () => {
      getUserValorantInformation()
      .then((tempAccountStat) => {
        setTempAccountStat(tempAccountStat);
      });

      const timer = setTimeout(() => {
        updateOverlay();
      }, 60000);
  
      return () => clearTimeout(timer);
    }

    updateOverlay();

  }, [])

  useEffect(() => {
    const checkStatsModif = () => {
      var rr_difference: number = 0;
  
      if (overlayStats?.rr !== undefined && tempAccountStat?.rr !== undefined) {
        rr_difference = tempAccountStat?.rr - overlayStats?.rr;
        if (rr_difference != 0) {
          updateRRAnimation(rr_difference)
        }
      }
    }

    if (overlayStats === undefined && tempAccountStat !== undefined) {
      setOverlayStats(tempAccountStat);
      setOverlayInitializated(false);
    } else {
      checkStatsModif()
    }
  }, [tempAccountStat]);

  useEffect(() => {
    const initializeOverlay = () => {
      var container = document.getElementById("rr-container");
      var first_digit = document.createElement("p");
      var second_digit = document.createElement("p");

      if (overlayStats === undefined || overlayStats.rr === undefined) {
        console.log("ERROR WHILE FETCHING THE DATA")
        return
      }
      first_digit.innerHTML = String(overlayStats?.rr % 10);
      first_digit.setAttribute("id", "actual-down-first-digit");
      second_digit.innerHTML = String(Math.trunc(overlayStats?.rr / 10));
      second_digit.setAttribute("id", "actual-down-second-digit");
      container?.appendChild(second_digit);
      container?.appendChild(first_digit);
    }

    initializeOverlay();
    setOverlayInitializated(true);
  }, [overlayInitialized]);

  if (overlayStats && overlayInitialized === true) {
    return (
      <div className='overlay' style={{height: '128px'}}>

        <OverlayHexagonRank rank={overlayStats.rank}></OverlayHexagonRank>

        <div className='stats' style={{height: '100px', padding: '0px 80px 0px calc(128px/2 + 20px)', marginLeft: 'calc(-128px/2)'}}>

          <div className='category' style={{marginRight: '34px'}}>
            <p className='title'>RATING</p>
            <div className='rank'>
              <p className=''>{overlayStats.rank}</p>
              <p>{overlayStats.tier}</p>
            </div>
          </div>

          <div className='category'>
            <p className='title'>RR</p>
            <div id="rr-container"></div>
          </div>

        </div>

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