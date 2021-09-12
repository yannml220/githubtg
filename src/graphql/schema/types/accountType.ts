
import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from 'graphql'
import { ITypeContext } from '../../interface'
import { UserType }  from './userType'
import { CategoryType }  from './categoryType'



export const AccountType = new GraphQLObjectType({
    name :  'AccountType',
    fields : ():any=>({
        id : {type : GraphQLID} ,
        createdAt : { type : GraphQLString} ,
        user : {
            type : UserType ,
            resolve : async (parent , args , context : ITypeContext)=>{
                const user = context.prisma.user.findFirst({
                    where : {
                        id : parent.userId
                    }
                })
                return user
            }
        } ,
        categories : {
            type : new GraphQLList(CategoryType) ,
            resolve: async (parent, args , context: ITypeContext)=>{
                const categories = context.prisma.category.findMany({
                    where : { accountId : parent.id }
                })
                return categories
            }
        }
      
    })
})
