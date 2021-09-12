import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from "graphql"



import { AccountType }  from './accountType'
import { IContext, ITypeContext }  from '../../interface'
//import { prisma } from '../../../index'


export const UserType = new GraphQLObjectType({
    name :  'UserType',
    fields : ()=> ({
      
        id : {type : GraphQLID } ,
        username : {type : GraphQLString} ,
        password : {type : GraphQLString} ,
        email : {type : GraphQLString} ,
        token : {type : GraphQLString} ,
        account : {
            type : AccountType ,
            resolve: async ( parent , args , context : ITypeContext )=>{
                const account = await context.prisma.account.findFirst({
                    where : {  userId : parent.id }
                })
                
                return account
            }
        }
    })
})
