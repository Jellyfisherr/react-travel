import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro, ProductComments } from "../../components";
import { DatePicker, Space } from 'antd';
import { commentMockData } from "./mockup";
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useDispatch } from "react-redux"; 
import { MainLayout } from "../../layouts/mainLayout";

const { RangePicker } = DatePicker;

type MatchParams = {
    touristRouteId : string,
}

export const DetailPage: React.FC = () => {
    const { touristRouteId } = useParams<MatchParams>();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [product, setProduct] = useState<any>(null);
    // const [error, setError] = useState<string | null>(null);

    const loading = useSelector(state => state.productDetail.loading)
    const error = useSelector(state => state.productDetail.error)
    const product = useSelector(state => state.productDetail.data)

    const dispatch = useAppDispatch();

    useEffect(()=>{
        const fetchData = async()=> {
          if(touristRouteId) {
            dispatch(getProductDetail(touristRouteId))
          } 
        };
        fetchData();
    }, [])
    if (loading) {
        return (
          <Spin 
          size="large"
          style={{
              marginTop: 200,
              marginBottom: 200,
              marginRight: "auto",
              marginLeft: "auto",
              width: "100%",
          }}
        />
      );
    }

    if (error) {
      return <div>Error: {error}</div>
    }
    return ( 
        <MainLayout>
            <div className={styles["product-intro-container"]}></div>
              <Row>
                <Col span={13}><ProductIntro 
                     title={product.title}
                     shortDescription= {product.description}
                     price= {product.originalPrice}
                     coupons= {product.coupons}
                     points= {product.points}
                     discount= {product.price}
                     rating= {product.rating}
                     pictures= {product.touristRoutePictures.map((p) => p.url)}
                />  
                </Col>
                <Col span={11}><RangePicker open style={{marginTop:20}} /></Col>
              </Row>
            <Anchor className={styles["product-detail-anchor"]}>
                <Menu mode="horizontal">
                    <Menu.Item key="1">
                        <Anchor.Link href="#feature" title="Product feature"></Anchor.Link>                        
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Anchor.Link href="#fees" title="Fees"></Anchor.Link>                        
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Anchor.Link href="#note" title="Reserve notes"></Anchor.Link>                        
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Anchor.Link href="#comments" title="User comments"></Anchor.Link>                        
                    </Menu.Item>
                </Menu>
            </Anchor>
            <div id='feature' className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>Product features</Typography.Title>
                </Divider>
                  <div 
                  dangerouslySetInnerHTML={{__html: product.features}}
                  style={{ margin: 50 }}
                ></div>
            </div>
            <div id='fees' className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
                    <Typography.Title level={3}>Fees</Typography.Title>
                </Divider>
                  <div 
                  dangerouslySetInnerHTML={{__html: product.fees}}
                  style={{ margin: 50 }}
                ></div>
            </div>
            <div id='notes' className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
                    <Typography.Title level={3}>Reserve notes</Typography.Title>
                </Divider>
                  <div 
                  dangerouslySetInnerHTML={{__html: product.notes}}
                  style={{ margin: 50 }}
                ></div>
            </div>
            <div id='comments' className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
                    <Typography.Title level={3}>User comments</Typography.Title>
                </Divider>
                 <div style={{margin: 40}}>
                    <ProductComments data={commentMockData} />
                 </div>
            </div>
        </MainLayout>
    );
};