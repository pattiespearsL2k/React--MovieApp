import React from 'react'
import './Member.css'
import { Grid } from "@mui/material"
import member1 from "../../assets/images/member1.jpg"
import member2 from "../../assets/images/member2.jpg"

export const Member = () => {
    return (
        <div className="member">
            <Grid container spacing={5}>
                <Grid item xs={6} md={4} lg={12} >
                    <h1>QUYỀN LỢI THÀNH VIÊN </h1>
                </Grid>
                <Grid item xs={6} md={4} lg={12} >
                    <div className='member-img'>
                        <div className='member-img1'>
                            <img src={member1} alt="" />
                            <h5>KHUYẾN MÃI COMBO BẮP, NƯỚC U22</h5>
                        </div>
                        <div className='member-img2'>
                            <img src={member2} alt="" />
                            <h5>KHUYẾN MÃI GIÁ VÉ U22</h5>
                        </div>

                    </div>

                </Grid>
            </Grid>
        </div>
    )
}

export default Member