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
        parentId : {type : GraphQLID} ,
        createdAt : { type : GraphQLString},
        description : { type : GraphQLString} ,
        subject : { type : GraphQLString } ,

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