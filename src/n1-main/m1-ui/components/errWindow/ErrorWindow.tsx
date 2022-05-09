import style from './err.module.css'
import React from "react";
import {useDispatch} from "react-redux";
import {setError} from "../../../m2-bll/weatherReducer";


type ErrorWindowType = {
    errorText:string
}

export const ErrorWindow = ({errorText}: ErrorWindowType) => {
 const dispatch = useDispatch()

    const closeClickHandler = () => {
        dispatch(setError(false))
    }
    setTimeout(()=>{
        dispatch(setError(false)) },4000)


    return (
        <div className={style.block_main}>
            <div className={style.close} onClick={closeClickHandler}></div>
            {errorText}
        </div>
    )
}