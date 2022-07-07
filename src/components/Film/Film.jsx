import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { NavLink } from 'react-router-dom'
import './Film.css'
import Grid from '@mui/material/Grid';

export default function Film(props) {
    const { item } = props;
    return (
        <Grid item xs={6} md={4} lg={3}>
            <Card className='card-film'>
                <CardMedia
                    component="img"
                    image={item.image}
                />
                <div className="latest__overlay">
                    <div className="latest__icon">
                        <NavLink to={`/detail/${item.movieId}`} href="#">Đặt vé</NavLink>
                    </div>
                    <div className="latest__text">
                        <p> {item.title}</p>
                    </div>
                    <div className="latest__shine">
                    </div>
                </div>
            </Card>
        </Grid>
    );
}
