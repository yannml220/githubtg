import { category } from '.prisma/client'
import { getAccessToken , getRefreshToken ,hashPassword ,verifyPassword } from '../../utils/userUtils'
import {IContext, ITypeContext} from '../interface'
import { CardType} from  '../schema/types/cardType'




export const cardResolvers = {
    Query : {

    } ,
    Mutation : {
        createCard : async (parent , {question , answer , deckId} , context:ITypeContext)=>{
            const newCard = await context.prisma.card.create({
                data : {
                    question ,
                    answer ,
                    deckId : parseInt(deckId,10)
                }
            })
            return newCard
        }
    }
}