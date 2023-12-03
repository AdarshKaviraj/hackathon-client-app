export const code = [
  {
    id: 1,
    slug: 'crop-recommend-python',
    code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import uvicorn



# Define the data model
class Item(BaseModel):
    temperature: float
    humidity: float
    soil_moisture: float

# Load the model
with open('final_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Create the FastAPI application
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/crop')
def recommend(item: Item):
    # Print the data received
    print(item)
    # Make a prediction using the model
    prediction = model.predict([[item.temperature, item.humidity, item.soil_moisture]])
    
    label_mapping = {
    0:'apple',1: 'banana',2: 'blackgram',3: 'chickpea',4: 'coconut',5: 'coffee',6: 'cotton', 7: 'grapes',8: 'jute',9: 'kidneybeans',10:'lentil',11:'maize',
    12:'mango',13:'mothbeans',14:'mungbeans',15:'muskmelon',16:'orange',17:'papaya',18:'pigeonpeas',19:'pomegranate',20:'rice',21:'watermelon'
}
    predicted_class = label_mapping[prediction[0]]
    print("predicted_class:", predicted_class)
    return {'crop': predicted_class}

# Run the application using uvicorn
# This should be in a separate file or under a __name__ == "__main__" condition
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)`,
  },
  {
    id: 2,
    slug: 'crop-recommend-react',
    code: `import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={"/crypto/{currency.uuid}"}>
              <Card
                title={{currency.rank}. {currency.name}}
                extra={
                  <img alt="" className="crypto-image" src={currency.iconUrl} />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;`,
  },
  {
    id: 3,
    slug: 'delicious',
    code: `import React from 'react';
import delicious from './images/delicious.jpg';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';

const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Delicious
        </Typography>
        <img className={classes.img} src={delicious} alt="logo" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;`,
  },
];
