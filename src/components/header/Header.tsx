import React from "react";
import styles from "./Header.module.css";
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const language = useSelector((state: RootState) => state.language);

    return (
        <div className={styles["app-header"]}>
        {/* top-header */}
            <div className={styles['top-header']}>
            <div className={styles.inner}>
                <Typography.Text>Make traveling happier</Typography.Text>

                <Dropdown.Button
                style={{ marginLeft: 15, display: "inline",}}
                overlay={
                <Menu
                    items={[
                    { key: "1", label: "Chinese" },
                    { key: "2", label: "English" },
                    ]}
                />
                } 
                icon={<GlobalOutlined />} 
                >
                    Language
                </Dropdown.Button> 
                
                
                <Button.Group className={styles["button-group"]}>
                    <Button onClick={()=>navigate("/register")}>Register</Button>
                    <Button onClick={()=>navigate("/signin")}>Login</Button>
                </Button.Group>   
            </div>
            </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>navigate("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]}/>
          <Typography.Title level={3} className={styles.title}>
            React Travel
          </Typography.Title>
          </span>          
          <Input.Search
            placeholder={'Please input destination, theme, or keywords'}
            className={styles["search-input"]}
          />
        </Layout.Header>
        <Menu 
          mode={"horizontal"} 
          className={styles["main-menu"]}
          items={[
            {key:"1", label:"Travel Header"},
            {key:"2", label:"Group Tour"},
            {key:"3", label:"Weekends Tour"},
            {key:"4", label:"Free Travel"},
            {key:"5", label:"Private Travel"},
            {key:"6", label:"Cruise"},
            {key:"7", label:"Hotel+spots"},
            {key:"8", label:"Local spot"},
            {key:"9", label:"Theme Travel"},
            {key:"10", label:"Custom Travel"},
            {key:"11", label:"Study Tour"},
            {key:"12", label:"Visa"},
            {key:"13", label:"Business Travel"},
            {key:"14", label:"Luxury Travel"},
            {key:"15", label:"Outdoor Travel"},
            {key:"16", label:"Insurance"},            
          ]}          
        />
      </div>
    )
};