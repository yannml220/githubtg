import { category } from '.prisma/client'
import { getAccessToken , getRefreshToken ,hashPassword ,verifyPassword } from '../../utils/userUtils'
import {IContext, ITypeContext} from '../interface'
import { DeckType} from  '../schema/types/deckType'





export const deckResolvers = {

    Query  : {


    } ,


    Mutation  : {
        createDeck : async (parent , args , context : IContext )=>{
            const newDeck = context.prisma.deck.create({
                data : {
                    deckName : args.deckName ,
                    categoryId :  parseInt(args.categoryId , 10)  ,
                    createdAt : new Date().toISOString()
                }
            })
            return newDeck

        }
    }
}