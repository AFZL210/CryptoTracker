
# CryptoTracker


## Demo

![IMG](https://res.cloudinary.com/primeflix/image/upload/v1676201263/home_gwo33a.png)
![VID](https://res.cloudinary.com/primeflix/image/upload/v1676477124/ezgif.com-video-to-gif_w02fod.gif)



## API Reference

#### Get Trending Coins
replace the currency field

```http
  GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h
```


