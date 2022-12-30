import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START ="FETCH_RECOMMEND_PRODUCTS_START";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL";

interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSucecssAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any,
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any,
}

export type RecommendProductAction = 
| FetchRecommendProductStartAction 
| FetchRecommendProductSucecssAction 
| FetchRecommendProductFailAction;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    };
};

export const fetchRecommendProductSucecssActionCreator = (data): FetchRecommendProductSucecssAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    };
};

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    };
}

export const giveMeDataActionCreator = (): ThunkAction<
    void,
    RootState, 
    undefined, 
    RecommendProductAction 
    > => async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartActionCreator());
        try {
          const {data} = await axios.get(
            "http://123.56.149.216:8080/api/productCollections" ,   
            {
              headers: {
                "x-icode":"D860A132536E048B",
              }
            }         
             );
             dispatch(fetchRecommendProductSucecssActionCreator(data))           
        } catch (error) {
            dispatch(fetchRecommendProductFailActionCreator(
                error instanceof Error ? error.message : "error"))
        }    
    }