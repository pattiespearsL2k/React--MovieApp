import React from 'react'
import { Grid } from "@mui/material"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import promotion1 from '../../assets/images/promotion1.jpg'
import promotion2 from '../../assets/images/promotion2.jpg'
import promotion3 from '../../assets/images/promotion3.jpg'
import promotion4 from '../../assets/images/promotion4.jpg'
import promotion5 from '../../assets/images/promotion5.jpg'
import promotion6 from '../../assets/images/promotion6.jpg'
import promotion7 from '../../assets/images/promotion7.jpg'
import promotion8 from '../../assets/images/promotion8.jpg'
import './Promotion.css'
var promotions = [promotion1, promotion2, promotion3, promotion4, promotion5, promotion6, promotion7, promotion8]

const Promotion = () => {
    return (
        <div className="promotion">
            <h3>TIN KHUYẾN MÃI</h3>
            <Grid container spacing={5}>
                {promotions.map((promotion) => (
                    <Grid item xs={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={promotion}
                            />
                            <div class="showcase__overlay">
                                <div class="showcase__icon">
                                    <a href="./img/showcase_img_1.webp" >
                                        Xem chi tiết
                                    </a>
                                </div>
                                <div class="showcase__text">
                                    <p>LOGO</p>
                                    <h3>FLIPPIN BIRD</h3>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Promotion