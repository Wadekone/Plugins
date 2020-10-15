import React from 'react'
import crypto from 'crypto';
import {parseString} from "loader-utils";
export const getUniqueKey = ()=>{
    return crypto.createHash('md5').update(parseString(new Date())).digest("hex");
}