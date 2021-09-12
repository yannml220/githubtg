import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
require('dotenv').config()

export const getAccessToken = (user)=>{
    return jwt.sign({ username : user.username , email  :  user.email } , process.env.ACCESS_TOKEN_SECRET , { expiresIn : '10m'}  )

}

export const getRefreshToken = (user)=>{
    return jwt.sign({ username : user.username , email  :  user.email } , process.env.ACCESS_TOKEN_SECRET   )

}


export const  hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt()
    return  await bcrypt.hash(password , salt)
}


export const verifyPassword = (inputPassword :string , password : string) =>{
    return bcrypt.compareSync(inputPassword , password)
}