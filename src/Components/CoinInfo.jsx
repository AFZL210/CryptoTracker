import React,{ useState, useEffect } from 'react'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import ReactLoading from 'react-loading';
import { Line } from 'react-chartjs-2'


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}))

const CoinInfo = ({coin}) => {
  const classes = useStyles()
  const [historyData, setHistoryData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const getHistoricalData = async() => {
    const { data } = await axios.get(HistoricalChart(coin.id,days,currency.toLowerCase()))
    setHistoryData(data.prices)
  }

  console.log(historyData)
  useEffect(() => {
    getHistoricalData()
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
          {
            !historyData? (
              <ReactLoading type={'cylon'} color={'red'} height={100} width={100} />
            ): (
              <>
                
              </>
            )
          }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo