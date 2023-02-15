import React, { useState, useEffect } from 'react'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import ReactLoading from 'react-loading';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import SelectButton from './SelectButton'

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];



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

const CoinInfo = ({ coin }) => {
  const [flag, setFlag] = useState(false)
  const classes = useStyles()
  const [historyData, setHistoryData] = useState()
  const [days, setDays] = useState(1)

  const { currency, setCurrency } = CryptoState()


  const getHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency.toLowerCase()))
    setHistoryData(data.prices)
  }

  console.log(historyData)
  useEffect(() => {
    getHistoricalData()
  }, [currency, days, historyData])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  })
  setTimeout(() => {
    if (historyData === undefined) setCurrency(currency)
  }, 1000)

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historyData ? (
            <ReactLoading type={'cylon'} color={'red'} height={100} width={100} />
          ) : (
            <>
              <Line
                data={{
                  labels: historyData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historyData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />


              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setFlag(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>

          )


        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo