'use client'

import React from 'react'
import './rank.css'

function OverlayHexagonRank(props: any) {

  return (
    <div className='polygon'>
        
        <svg viewBox="0 0 58 64" className='glass-border' xmlns="http://www.w3.org/2000/svg" style={{height: '128px', width: '128px'}}>
            <g>
              <path d="M32.75 3.43301C30.4295 2.09327 27.5705 2.09327 25.25 3.43301L6.13526 14.4689C3.81475 15.8087 2.38526 18.2846 2.38526 20.9641V43.0359C2.38526 45.7154 3.81475 48.1913 6.13526 49.5311L25.25 60.567C27.5705 61.9067 30.4295 61.9067 32.75 60.567L51.8647 49.5311C54.1852 48.1913 55.6147 45.7154 55.6147 43.0359V20.9641C55.6147 18.2846 54.1852 15.8087 51.8647 14.4689L32.75 3.43301Z"
                fill='currentColor'/>          
            </g>
        </svg>

        <svg viewBox="0 0 52 58" className='content' xmlns="http://www.w3.org/2000/svg" style={{height: 'calc(128px - 10px)', width: 'calc(128px - 10px)'}}>
            
            <use href="#default-polygon" fill={`url("#${props.rank}")`}></use>

            <defs>

                <g id='default-polygon'>
                    <path d="M23 1.73205C24.8564 0.660254 27.1436 0.660254 29 1.73205L48.1147 12.7679C49.9711 13.8397 51.1147 15.8205 51.1147 17.9641V40.0359C51.1147 42.1795 49.9711 44.1603 48.1147 45.2321L29 56.2679C27.1436 57.3397 24.8564 57.3397 23 56.2679L3.88526 45.2321C2.02886 44.1603 0.885263 42.1795 0.885263 40.0359V17.9641C0.885263 15.8205 2.02886 13.8397 3.88526 12.7679L23 1.73205Z"/>
                </g>

                <linearGradient id="Radiant" x1="14" y1="53" x2="42.5" y2="8.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#B8802C"/>
                    <stop offset="0.515258" stop-color="#EFEA8E"/>
                    <stop offset="1" stop-color="#F4F4E2"/>
                </linearGradient>

                <linearGradient id="Immortal" x1="14" y1="53" x2="42.5" y2="8.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B1940"/>
                    <stop offset="0.515258" stop-color="#BE334D"/>
                    <stop offset="1" stop-color="#E2766A"/>
                </linearGradient>

                <linearGradient id="Ascendant" x1="14" y1="53" x2="42.5" y2="8.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1F7347"/>
                    <stop offset="0.515258" stop-color="#23A75F"/>
                    <stop offset="1" stop-color="#69CA9B"/>
                </linearGradient>

                <linearGradient id="Diamond" x1="14" y1="53" x2="42.5" y2="8.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#A671F0"/>
                    <stop offset="0.515258" stop-color="#D882E9"/>
                    <stop offset="1" stop-color="#F097F4"/>
                </linearGradient>

                <linearGradient id="Platinum" x1="14" y1="53" x2="42.5" y2="8.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#297183"/>
                    <stop offset="0.515258" stop-color="#318E9B"/>
                    <stop offset="1" stop-color="#52D3E0"/>
                </linearGradient>

                <linearGradient id="Gold" x1="14" y1="53" x2="42.5" y2="8.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D6871E"/>
                    <stop offset="0.515258" stop-color="#E1AC3B"/>
                    <stop offset="1" stop-color="#ECCF57"/>
                </linearGradient>

                <linearGradient id="Silver" x1="10.3853" y1="54.5359" x2="53.3853" y2="12.5359" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#979A98"/>
                    <stop offset="1" stop-color="#DBE2DF"/>
                </linearGradient>

                <linearGradient id="Bronze" x1="10.3853" y1="54.5359" x2="53.3853" y2="12.5359" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#523808"/>
                    <stop offset="0.475" stop-color="#937149"/>
                    <stop offset="1" stop-color="#CBB691"/>
                </linearGradient>

                <linearGradient id="Iron" x1="10.3853" y1="54.5359" x2="53.3853" y2="12.5359" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2E2E2E"/>
                    <stop offset="0.51" stop-color="#393A39"/>
                    <stop offset="1" stop-color="#5F5F5F"/>
                </linearGradient>

                <linearGradient id="Unrated" x1="10.3853" y1="54.5359" x2="53.3853" y2="12.5359" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#424446"/>
                    <stop offset="0.51" stop-color="#4F565A"/>
                    <stop offset="1" stop-color="#73767A"/>
                </linearGradient>

            </defs>

        </svg>

    </div>
  )
}

export default OverlayHexagonRank