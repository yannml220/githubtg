import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from "graphql"
import { ITypeContext} from './../../interface'

import { DeckType }  from './deckType'

export const CardType = new GraphQLObjectType({
    name :  'CardType',
    fields : ():any=>({
        id : { type : GraphQLID } ,
        question : { type : GraphQLString} ,
        answer : { type : GraphQLString} ,
        deckId : {type : GraphQLString} ,
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        repetition : { type : GraphQLInt} ,
        nextOccurrence : { type : GraphQLString} ,
        deck : { 
            type : new GraphQLList(DeckType) ,
            resolve: async (parent ,args , context : ITypeContext)=>{
                const decks = await context.prisma.deck.findMany({
                    where : {
                        id : parent.deckId
                    }
                })

                return decks 
            }
        }

    })
})
