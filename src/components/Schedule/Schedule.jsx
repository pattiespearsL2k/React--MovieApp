import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react'
import './Schedule.css'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';

const { TabPane } = Tabs;


export default function Schedule() {
  const [state, setState] = useState({
    tabPosition: 'left',
  })


  const dispatch = useDispatch()
console.log(window.location)

  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction())
  }, [])

  const heThongRapData = useSelector(state => state.QuanLyRapReducer)

  console.log(heThongRapData, 'heThongRapData');

  const { tabPosition } = state;
  return (
    <>
      <Tabs className='film-detail cinema' tabPosition={tabPosition}>
        {
          heThongRapData.heThongRapChieu?.map((heThongRap, index) => (

            <TabPane tab={<img src={heThongRap.logo} style={{ width: '50px' }} />} key={index}>
              <Tabs className="cinema-cum" tabPosition={tabPosition}>
                {
                  heThongRap.lstCinemaChild?.map((cumRap, index) => (
                    <TabPane className='cinema-tab' tab={
                      <div >
                        <img className='cinema-img' src={heThongRap.logo} style={{ width: '30px', height: '30px' }} /> <br />
                        <p className='cinema-name-cum'>
                          {cumRap.cinemaChildName}
                        </p>
                      </div>}
                      key={index}>

                      {/* load fim tương ứng */}

                      {cumRap.listMovie.reverse().map((phim, index) => (
                        <Fragment key={index}>
                          <div className='my-5 film-main'>
                            <div style={{ border: '4px' }} className='film-img-schedule'>
                              <img className='' src={phim.image} alt={phim.title} style={{ width: '150px', height: '150px' }} />
                            </div>
                            <div className='film-info'>
                              <h3 className='name-film'>{phim.title}</h3>
                              <p>{cumRap.address}</p>
                              <div className="grid grid-cols-6 gap-6">
                                {phim.lstShowFlowMovie?.slice(0, 12).map((lichChieu, index) => (
                                  <NavLink to={`/booking/${lichChieu.showID}`} className='schedule-info mr-2' key={index}>
                                     {(lichChieu.showday)}
                                    {(lichChieu.showtime)}
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </Fragment>
                      ))}

                    </TabPane>
                  ))
                }
              </Tabs>

            </TabPane>
          ))
        }

      </Tabs>
    </>
  )
}