import styles from "./ProductIntro.module.css";
import React from "react";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}

const columns: ColumnsType<RowType> = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120,
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        align: "center",
    },
];

interface RowType {
    title: string;
    description: string | number | JSX.Element;
    key: number;
}

export const ProductIntro : React.FC<PropsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    discount,
    rating,
    pictures,
}) => {

    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: "Route name",
            description: title,
          },
          {
            key: 1,
            title: "Price",
            description: (
              <>
                ¥{" "}
                <Typography.Text type="danger" strong>
                  {price}
                </Typography.Text>
              </>
            ),
          },
          {
            key: 2,
            title: "Flash sale ",
            description: discount ? (
              <>
                ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
                <Typography.Text type="danger" strong>
                  ¥ {discount}
                </Typography.Text>
              </>
            ) : (
              "No discount"
            ),
          },
          {
            key: 2,
            title: "Claim coupon",
            description: coupons ? discount : "No coupon to use",
          },
          {
            key: 2,
            title: "Route comments",
            description: (
              <>
                <Rate allowHalf defaultValue={+rating} />
                <Typography.Text style={{ marginLeft: 10 }}>
                  {rating} Star
                </Typography.Text>
              </>
            ),
          },
    ];

    return <div className={styles["intro-container"]}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text>{shortDescription}</Typography.Text>
        <div className={styles["intro-detail-content"]}>
            <Typography.Text style={{ marginLeft: 20 }}>
                $ <span className={styles["intro-detail-strong-text"]}></span>{" "}
                /per person
            </Typography.Text>
            <Typography.Text style={{ marginLeft: 50 }}>
                <span className={styles["intro-detail-strong-text"]}>{rating}</span>{" "}
                score
            </Typography.Text>        
        </div>
        <Carousel autoplay slidesToShow={3}>
          {pictures.map(p =>
              <Image height={150} src={p} />
            )}
        </Carousel>
          <Table<RowType> 
           columns={columns} 
           dataSource={tableDataSource}
           size="small"
           bordered={false}
           pagination={false}
          />
    </div>
}