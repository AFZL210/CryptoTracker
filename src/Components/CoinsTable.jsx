import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { Container, createTheme, TableContainer, TableHead, ThemeProvider, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {

  // <ReactLoading type={'cylon'} color={'red'} height={100} width={100} />

  const { currency, symbol } = CryptoState()
  const [loading, setLoading] = useState(false)
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState(null)
  const navigate = useNavigate()
  const [page,setPage] = useState(1)
  const postPerPage = 10

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  }


  useEffect(() => {
    fetchCoins()
  }, [currency])


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  })

  const filterSearch = () => {
    if(search === null)  return(
      coins
    )
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <div className='container'>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center' }}>
          <h4 style={{ textTransform: 'capitalize', fontSize: '1.2rem', marginTop: '1rem', fontWeight: 300 }}>Cryptocurrency Prices by market cap</h4>

          <input placeholder='Search for a Cryptocurrency'
            style={{
              maxWidth: '700px',
              width: '100%',
              height: '2rem',
              margin: '10px',
              backgroundColor: 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '15px'
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          {
            loading ? (<div className='center' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: "cetnter" }}><ReactLoading type={'cylon'} color={'red'} height={100} width={100} /></div>) :
              (
                <TableContainer>
                  <Table>
                    <TableHead
                      style={{
                        backgroundColor: '#FFD700',
                        color: 'black'
                      }}
                    >
                      <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                          <TableCell
                            style={{
                              color: 'black',
                              fontWeight: '700'
                            }}
                            key={head}
                            align={head === "Coin" ? '' : 'right'}
                          >
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filterSearch().slice((page-1)*10,(page-1)*10 + 10).map((row) => {
                        const gain = row.price_change_percentage_24h >= 0

                        return (
                          <TableRow key={row.name} onClick={() => navigate(`/coin/${row.name}`)} style={{ cursor: 'pointer' }}>
                            <TableCell component="th" scope="row" style={{ display: 'flex', gap: 1, textAlign: 'center' }}>
                              <div className="row-cont" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 150, gap: 5 }}>

                                <img
                                  style={{
                                    height: 50,
                                    width: 50
                                  }}
                                  src={row.image}
                                />
                                <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{row.symbol}</span>
                                <span style={{ textTransform: 'capitalize', fontWeight: 400 }}>{row.name}</span>
                              </div>
                            </TableCell>
                            <TableCell align="right">{`${symbol} ${row.current_price}`}</TableCell>
                            <TableCell align="right" style={{color: gain>0? 'white':'red', fontWeight:500}}>{
                                gain && '+'
                                
                            }{row.price_change_percentage_24h.toFixed(2)}</TableCell>
                            <TableCell align="right">{`${symbol} ${row.market_cap.toString().slice(0,-6)}M`}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
          }

          <Pagination 
            count={(filterSearch()?.length/postPerPage).toFixed(0)}
            style={{
              padding: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
            onChange={(_, value) => {
              setPage(value)
              window.scroll(0, 450)
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default CoinsTable