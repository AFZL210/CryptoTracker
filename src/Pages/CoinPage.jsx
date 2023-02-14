import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { SingleCoin } from '../config/api'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import CoinInfo from '../Components/CoinInfo'
import ReactHtmlParser from 'react-html-parser'


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    display: 'flex',
    [theme.breakpoints.down('md')] : {
      flexDirection: 'column',
      alignItems: "center"
    },
  },

  sidebar: {
    width: '30%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
    justifyContent: 'center'
  },

  description: {
    width: '100%',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify'
  },

  dataText: {
    fontSize: '1.2rem',
    marginLeft: 10
  },
  dataTwo:{
    fontWeight: '300'
  },

  marketData: {
    alignSelf: 'start',
    padding: 30,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    }
  }
}))

const CoinPage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = CryptoState()

  const fetchCoinData = async() => {
    const { data } = await axios.get(SingleCoin(id.toLowerCase()))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoinData()
  }, [currency])

  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large}
          height= '200'
          style={{marginBottom: 20}}
        />

        <h1
          style={{
            textTransform: 'capitalize',
          }}
        >{coin?.name}</h1>

        <p style={{textAlign: 'center'}}>{coin?.description.en.split(".")[0]}</p>

        <div className={classes.marketData}>
          <span style={{display: 'flex'}}>
            <h5 className={classes.dataText}>Rank:</h5>
            <h5 className={`${classes.dataText} ${classes.dataTwo}`}>{coin?.market_cap_rank}</h5>
          </span>

          <span style={{display: 'flex'}}>
            <h5 className={classes.dataText}>Current Price:</h5>
            <h5 className={`${classes.dataText} ${classes.dataTwo}`}>{symbol} {coin?.market_data.current_price[currency.toLowerCase()]}</h5>
          </span>

          <span style={{display: 'flex'}}>
            <h5 className={classes.dataText}>Market Cap:</h5>
            <h5 className={`${classes.dataText} ${classes.dataTwo}`}>{symbol} {coin?.market_data.market_cap[currency.toLowerCase()] } M</h5>
          </span>
        </div>
      </div>

     {/** CHART */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage