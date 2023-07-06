import React from 'react'
import felix from '../../images/felix.jpg'
import gaddafi from '../../images/gaddafi.jpg'
import neom from '../../images/neom.jpg'
import ryan from '../../images/ryan.jpg'
import Image from 'next/image'
import styles from '../travel/travel.module.css'

export default function Travel() {

  const data =[{
    id: "1",
    image: felix
  },
  {
    id: "2",
    image: gaddafi
  },
  {
    id:"3",
    image: neom
  },
  {
    id:"4",
    image: ryan
  }
]

  return (
    <>
      <div className={styles.heading}>Travel and Explore</div>
      <div className={styles.mainContainer}>
        {data.map((pic)=>(
          <>
            <div key={pic.id} className={styles.cards}>
              <Image src={pic.image} alt="travel pic" width={360} height={360} priority />
            </div>
          </>
        )
        )}
      </div>
    </>
  )
}
