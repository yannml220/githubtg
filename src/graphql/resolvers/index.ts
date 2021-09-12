import {userResolvers} from './user'
import  { categoryResolvers } from './category'
import { deckResolvers } from './deck'



export const userAllResolvers = {
    Query : { ...userResolvers.Query } ,
    Mutation : { ...userResolvers.Mutation }
}





export const categoryAllResolvers = {
    Query : {
        ...categoryResolvers.Query 
    },
    Mutation : {
        ...categoryResolvers.Mutation 
    }
}


export const deckAllResolvers = {
    Query : {
        ...deckResolvers.Query
    } ,
    Mutation : {
        ...deckResolvers.Mutation
    }
}