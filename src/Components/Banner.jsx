import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'


const useStyles = makeStyles({
  banner: {
    backgroundImage: 'url(./banner2.jpg)',
    width: '100vw',
  },
  
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const Banner = () => {

  const classes = useStyles()

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
              <Typography 
                variant='h2'
                style={{
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}
              >
                CryptoTracker
              </Typography>

              <Typography 
                variant='subtitle2'
                style={{
                  color: 'darkgray',
                  textTransform: 'capitalize',
                }}
              >
                Get all information regarding your favorite crypto currency
              </Typography>
          </div>
            
          <Carousel />

      </Container>
    </div>
  )
}

export default Banner