import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from "graphql"
import { ITypeContext} from "../../interface"

import { CategoryType }  from './categoryType'
import { CardType }  from './cardType'


export const DeckType = new GraphQLObjectType({
    name :  'DeckType',
    fields : ():any=>({
        id : {type : GraphQLID} , 
        deckName : { type : GraphQLString} , 
        categoryId : { type : GraphQLString} ,
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        repetition : { type : GraphQLInt } ,
        expertise : { type : GraphQLInt } ,
        category : { 
            type : CategoryType ,
            resolve : async (parent , args , context :ITypeContext)=>{
                const category = await context.prisma.category.findFirst({
                    where : {
                        id : parent.categoryId
                    }
                })
                return category
            }
        } ,
        
        cards: {
            type : new GraphQLList(CardType) ,
            resolve: async (parent ,args , context : ITypeContext)=>{
                const cards = await context.prisma.card.findMany({
                    where : {
                        belongstodeck : {
                            some : {
                                card : {
                                    deckId : parent.id
                                }
                            }
                        }
                    }
                })

                return cards 
            }
        }

   })
})
