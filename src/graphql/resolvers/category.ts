import { category } from '.prisma/client'
import { getAccessToken , getRefreshToken ,hashPassword ,verifyPassword } from '../../utils/userUtils'
import {IContext, ITypeContext} from '../interface'
import { CategoryType} from  '../schema/types/categoryType'




export const categoryResolvers = {

    Query : {

    }
    ,

    Mutation : {
        createCategory : async ( _ ,  { categoryName ,  accountId , expertise }, context : ITypeContext )=>{
            const category =  await context.prisma.category.create({
                data : {
                    categoryName : categoryName ,
                    accountId : parseInt(accountId,10),
                  
                    createdAt : new Date().toISOString()
                }
            })

            return category 
        }
    }
}