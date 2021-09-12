import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema, GraphQLFloat } from "graphql"
import { ITypeContext} from './../../interface'

import { AccountType }  from './accountType'


export const CategoryType = new GraphQLObjectType({
    name :  'CategoryType',
    fields : ()=>({
        id : {type : GraphQLID} ,
        categoryName : { type : GraphQLString} ,
        accountId  : { type : GraphQLID} ,
        expertise : { type : GraphQLFloat } ,
        createdAt : { type : GraphQLString},
        account : {
            type : AccountType ,
            resolve : async (parent , args , context : ITypeContext )=>{
                const account = await context.prisma.account.findFirst({
                    where : {  
                        id : parent.accountId
                     }
                })
                
                return account
            }
            
        } 
    })
})