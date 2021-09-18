import { PrismaClient } from "@prisma/client"
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { getAccessToken , getRefreshToken ,hashPassword ,verifyPassword } from '../../utils/userUtils'
import {IContext} from '../interface'

//const prisma = new PrismaClient()




export  const userResolvers = {

    Query : {
        user : async (_ , { id } , context : IContext)=> {
            try{
                const user = await context.prisma.user.findUnique({
                    where: {
                      id: parseInt(id , 10),
                    },
                  })
                console.log(user)

                return user
            }catch(error){
                throw error
            }

        }

    } ,

    Mutation : {

         registerUser : 
            async (_ , { ...userDetails} , context : IContext  )=>{
               // const { username , password , email} = args
                try{
                    console.log(userDetails.password)
                    const hashedPassword = await hashPassword(userDetails.password)
                    const accessToken  = getAccessToken(userDetails)
                    const refreshToken = getRefreshToken(userDetails)
                    const newUser = await context.prisma.user.create({
                        data : {
                            username : userDetails.username ,
                            password : hashedPassword ,
                            email : userDetails.email ,
                            token : refreshToken
                        }
                        
                    })

                    await context.prisma.account.create({
                        data : {
                            userId : newUser.id ,
                            createdAt : new Date().toISOString()
                        }
                    })
                    

                    console.log(newUser)
                    return newUser
        
                }catch(error){
                    console.log(error)
                }
               
                
            }
          ,

          login : async (_,{username , password} , context:IContext )=>{

            try{
                const user = await context.prisma.user.findFirst({
                    where : { username : username }
                })

                if(!user) return false
                
                const valid = verifyPassword(password ,  user.password)
                console.log(valid)
                if( !valid){
                    
                   return false
                }
                else {
                    const accessToken = getAccessToken({ username , password , email : user.email  })
                    const userInfos = { userInfos : { id :  user.id  ,   username  , email : user.email , accessToken   } }
                  
                    return user

                }
               
                
                //return user

                


            }catch(error){
                throw error
            }

        }




    }
 
    

        
            
            
                
            
        
    
}


