import React, { useState, useEffect } from "react";
import { withMedia } from "react-media-query-hoc";
import { FetchUserControllerGetMenu } from '../../../network/api.Fetched'
import * as Colors from "../../../config/colorConfig";
import { writeCookie } from '../../../helper/cookieHome'
import { ImageAPI } from '../../../network/imperial.api'
import * as Font from "../../../config/fontConfig";
import { fsc } from "../../../assets/fontControlHelper";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import FilerMenu from '../../../assets/images/filter menu.png'
import UnderLine from '../../../assets/images/underline.png'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const FoodCards = props => {
  const { media, val, val1, handleOnChange, tempData, food, MenuLists } = props;
  const [currentPage, setCurrentPage] = useState(1)
  const [FoodPerPage] = useState(8)
  const [hover, setHover] = useState(false);
  const [isShow, setTrue] = useState(false)
  const indexOfLastPost = currentPage * FoodPerPage
  const indexOfFirstPost = indexOfLastPost - FoodPerPage
  const CurrentFoodLists = food.slice(indexOfFirstPost, indexOfLastPost)
  console.log(indexOfLastPost)
  const onChange = (current, page) => {
    setCurrentPage(current)
  }

  const _handleHover = e => {
    setHover(!hover);
    const ID = document.getElementById(e.target.id)

    if (hover === true) {
      ID.style.transform = "scale(1)";
    } else {
      ID.style.transform = "scale(1.2)";
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: '-120px', backgroundColor: 'rgb(128,0,0)' }}>
      <div className="row">
        {media.mobile?
        null:
        <div className="col-lg-3 py-2">
          <div className="text-center text-justify">

            <img alt="filter menu" src={FilerMenu} />

          </div>
          
          <div className="row my-4" style={{marginLeft:media.mobile?'150px':'0px'}}>

            {MenuLists.map((value, k) => {
              return <div className="col-xl-6 col-lg-6 col-md-6" key={k}>

                <FormGroup row className="mx-2">
                  <FormControlLabel style={{ color: Colors.textWhite, fontWeight: 'bold', fontSize: fsc(media, 14) }}
                    control={
                      <Checkbox checked={val.includes(value.menu_id)}
                        onChange={(e) => handleOnChange(value.menu_id)}
                        value={value.menu_id}
                        style={{ width: '14px', height: '14px', color: "#fff", marginRight: "10px" }}
                      />
                    }
                    label={value.menu_name}
                  />
                </FormGroup>
              </div>

            })}

          </div>
        </div>
        }
        
        <div className="col-lg-9 py-2">
          <div className="text-center text-justify">
            <img alt="underline" src={UnderLine} className="img-fluid" style={{ width: '400px', transform: "rotate(-180deg)" }} />
            <h4 style={{ color: 'white' }}>Avialable Foods In Our Restaurant</h4>
            <img alt="underline" src={UnderLine} className="img-fluid" style={{ width: '400px' }} />
          </div>
          <div className="row p-5 m-0" style={{ borderLeft: media.tablet || media.mobile ? null : '1px solid white' }}>
            {val.length > 0 || val1 ?
              tempData.map((v, k) => (
                <div className='col-lg-4 col-md-4 my-2 p-0' key={k}>
                  <div className="card shadow" style={{ width: '90%', height: media.mobile ? '100%' : "300px" }}>
                    <div
                      style={{
                        overflow: "hidden",
                        height: media.mobile || media.tablet ? "90%" : "70%"
                      }}
                    >
                      <img
                        src={`${ImageAPI}/${v.image}`}
                        id={v.food_id}
                        onMouseLeave={id => _handleHover(id)}
                        onMouseOver={id => _handleHover(id)}
                        className="card-img-top"
                        style={{
                          transition: ".5s",
                          filter: 'contrast(120%)',

                        }}
                        alt="rooms"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{v.food_name}</h5>
                      <div className="card-text" >
                        <span className='w-100'>{v.food_name}</span><br />
                        <span>{v.size}</span><br />
                        <span style={{ color: Colors.textBlack, fontWeight: 'bold', fontSize: fsc(media, 25) }}>{v.price} ks</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              CurrentFoodLists.map((v, k) => (
                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-12 my-2 p-0' key={k}>
                  <div className="card shadow" style={{ width: '90%', height: media.mobile ? '100%' : '300px' }}>
                    <div
                      style={{
                        overflow: "hidden",
                        height: media.mobile || media.tablet ? "90%" : "70%"
                      }}
                    >
                      <img
                        src={`${ImageAPI}/${v.image}`}
                        id={v.food_id}
                        onMouseLeave={id => _handleHover(id)}
                        onMouseOver={id => _handleHover(id)}
                        className="card-img-top"
                        style={{
                          transition: ".5s",
                          filter: 'contrast(120%)',

                        }}
                        alt="rooms"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{v.food_name}</h5>
                      <div className="card-text" >
                        <span className='w-100 text-justify'>{v.food_name}</span><br />
                        <span>{v.size}</span><br />
                        <span style={{ color: Colors.textBlack, fontWeight: 'bold', fontSize: fsc(media, 20) }}>{v.price} ks</span>
                      </div>
                    </div>
                  </div>
                </div>))
            }
          </div>

          <div className="my-3 d-flex justify-content-center">
            {val.length > 0 || val1 ? null : <Pagination onChange={(c, page) => onChange(c, page)} showTitle={false} current={currentPage} total={food.length} />}

          </div>
        </div>
      </div>
    </div>



  );
};

export default withMedia(FoodCards)