import React from "react";
import styles from "./Header.module.css";
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons"
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import { RootState }  from "../../redux/store"
import { withTranslation, WithTranslation } from "react-i18next";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions"
import { connect } from "react-redux";
import { Dispatch } from "redux";


const mapStateToProps = (state: RootState) => {
  return{
    language: state.language.language,
    languageList: state.language.languageList
  };
};

const mapDispatchToProps =(dispatch: Dispatch) => {
  return {
    changeLanguage: (code:  "en" | "zh") => {
      console.log(code);
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = RouteComponentProps & //Types of react-router props 
  WithTranslation & //i18n props type
  ReturnType<typeof mapStateToProps> & //redux store map-type
  ReturnType<typeof mapDispatchToProps>; //redux dispatch map-type

class HeaderComponent extends React.Component<PropsType>{   
  

  menuClickHandler = (e) => {
    console.log(e);
    if(e.key === "new") {
      // Processing "new language add" action 
      this.props.addLanguage("new language", "new_lang");
    } else {    
      this.props.changeLanguage(e.key)
   }
  };

  render(): React.ReactNode {
    const { navigate, t } = this.props
    return ( 
        <div className={styles["app-header"]}>
        {/* top-header */}
            <div className={styles['top-header']}>
            <div className={styles.inner}>
                <Typography.Text>{t("header.slogan")}</Typography.Text>

                <Dropdown.Button
                style={{ marginLeft: 15, display: "inline",}}
                overlay={
                <Menu 
                    onClick={this.menuClickHandler}
                    items={[...this.props.languageList.map( l => {
                      return {key:l.code, label:l.name}
                    }), 
                    { key: "new", label: t("header.add_new_language") } 
                  ]}
                />
                } 
                icon={<GlobalOutlined />} 
                >
                    {this.props.language === "en" ? "English" : "简体中文"}
                </Dropdown.Button> 
                
                
                <Button.Group className={styles["button-group"]}>
                    <Button onClick={()=>navigate("/register")}>{t("header.register")}</Button>
                    <Button onClick={()=>navigate("/signin")}>{t("header.signin")}</Button>
                </Button.Group>   
            </div>
            </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>navigate("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]}/>
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
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
            { key: "1", label: t("header.home_page") },
            { key: "2", label: t("header.weekend") },
            { key: "3", label: t("header.group") },
            { key: "4", label: t("header.backpack") },
            { key: "5", label: t("header.private") },
            { key: "6", label: t("header.cruise") },
            { key: "7", label: t("header.hotel") },
            { key: "8", label: t("header.local") },
            { key: "9", label: t("header.theme") },
            { key: "10", label: t("header.custom") },
            { key: "11", label: t("header.study") },
            { key: "12", label: t("header.visa") },
            { key: "13", label: t("header.enterprise") },
            { key: "14", label: t("header.high_end") },
            { key: "15", label: t("header.outdoor") },
            { key: "16", label: t("header.insurance") },    
          ]}          
        />
      </div>
    )
  }
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(withRouter(HeaderComponent))
) ;