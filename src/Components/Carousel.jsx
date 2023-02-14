import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { CryptoState } from '../CryptoContext'
import { TrendingCoins } from '../config/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'

const useStyles = makeStyles({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        width: '100vw'
    },

    carouselItem: {
      display: 'flex',
      flexDirection: 'column',
      width: 80,
      height: '100%',
      fontSize: '.8rem',
      alignItems: 'center'
    }
})

const Carousel = () => {

  const [trending, setTrending] = useState([])
  const classes = useStyles()
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async() => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }


  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  
  const responsiveSize = {
    0: {
        items: 2
    },

    512: {
        items: 4
    }
  }

  const items = trending.map((coin) => {

    let profit = coin.price_change_percentage_24h >= 0

    return (
        <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
            <img 
            src={coin?.image}
            alt={coin.name}
            height='80'
            style={{ marginBottom: 10 }}
            />

            <span>
                {coin?.symbol}
                &nbsp;

                <span>
                  {profit && '+'} {coin?.price_change_percentage_24h.toFixed(2)}
                </span>
            </span>

            <span style={{
              fontWeight: 'bold'
            }}>
              {symbol} {coin?.current_price.toFixed(2)}
            </span>
        </Link>
    )
  })

  return (
    <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsiveSize}
            autoPlay
            disableButtonsControls
            items={items}
        />
    </div>
  )
}

export default Carousel
