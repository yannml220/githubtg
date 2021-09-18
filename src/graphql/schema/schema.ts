

import {IContext} from '../interface'
import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema, GraphQLFloat, GraphQLBoolean } from "graphql"
import  { AccountType } from './types/accountType'
import  { CardType } from './types/cardType'
import  { CategoryType } from './types/categoryType'
import  { DeckType } from './types/deckType'
import  { UserType } from './types/userType'
import  { userResolvers} from '../resolvers/user'
import { categoryResolvers } from '../resolvers/category'
import { deckResolvers } from '../resolvers/deck'
import { cardResolvers } from '../resolvers/card'



/*
const UserType = new GraphQLObjectType({
    name :  'User',
    fields : ()=> ({
      
        id : {type : GraphQLID } ,
        username : {type : GraphQLString} ,
        password : {type : GraphQLString} ,
        email : {type : GraphQLString} ,
        account : {
            type : AccountType ,
            resolve( parent , args){
                return 
            }
        }
    })
})



const AccountType = new GraphQLObjectType({
    name :  'Account',
    fields : ():any=>({
        id : {type : GraphQLID} ,
        user : {
            type : UserType ,
            resolve(parent , args){

            }
        } ,
        categories : {
            type : new GraphQLList(CategoryType) ,
            resolve(parent, args){

            }
        }
      
    })
})


const CategoryType = new GraphQLObjectType({
    name :  'Category',
    fields : ()=>({
        id : {type : GraphQLID} ,
        libelle : { type : GraphQLString} ,
        account : {
            type : AccountType ,
            resolve(parent , args){
                return 'bonjour'
            }
        } 
    })
})



const DeckType = new GraphQLObjectType({
    name :  'Deck',
    fields : ():any=>({
        id : {type : GraphQLID} , 
        libelle : { type : GraphQLString} , 
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        repetition : { type : GraphQLInt } ,
        expertise : { type : GraphQLInt } ,
        category : { type : CategoryType} ,
        cards: {
            type : new GraphQLList(CardType) ,
            resolve(parent ,args){
                return 'bonjour'
            }
        }
   })
})


const CardType = new GraphQLObjectType({
    name :  'Card',
    fields : ():any=>({
        id : { type : GraphQLID } ,
        question : { type : GraphQLString} ,
        answer : { type : GraphQLString} ,
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        repetition : { type : GraphQLInt} ,
        nextOccurrence : { type : GraphQLString} ,
        deck : { 
            type : new GraphQLList(DeckType) ,
            resolve(parent , args){


            }
        }

    })
})

*/


const RootQueryType = new GraphQLObjectType({
    name :  'RootQueryType',
    fields : {
        user : {
            
            type : UserType ,
            args : { id : {type : GraphQLString} } ,
            resolve : userResolvers.Query.user
        }
        ,

        category : {
            type : new GraphQLList(CategoryType) ,
            args : { accountId : { type  : GraphQLString} } ,
            resolve : categoryResolvers.Query.getUserCategories
        }
    }
})




const Mutation = new GraphQLObjectType({
    name : 'Mutation' ,
    fields : {
        registerUser : {
            type : UserType ,
            args : { 
                username : {type :GraphQLString} ,
                password : {type :GraphQLString} ,
                email : {type :GraphQLString} ,
            },
            resolve: userResolvers.Mutation.registerUser
        },
       login : {
           type : UserType ,
           args : {
               username :  {type : GraphQLString}  ,
               password : { type : GraphQLString }
           } ,
           resolve : userResolvers.Mutation.login

       } ,

       createCategory : {
           type :  CategoryType  ,
           args : {

            categoryName : { type : GraphQLString } ,
            accountId  : { type : GraphQLID} ,
            description : { type : GraphQLString},
            subject : { type : GraphQLString } ,
            parentId : {type : GraphQLID}
           
           
           },
           resolve : categoryResolvers.Mutation.createCategory
           
       } ,
    
       deleteCategories  :{
           type : CategoryType ,
           args  : {
               ids  : { type : new GraphQLList(GraphQLID) }
           },
           resolve : categoryResolvers.Mutation.deleteCategories
       }

       ,
       deleteCategory : {
           type : CategoryType ,
           args : {
               id : { type : GraphQLID }
           },
           resolve : categoryResolvers.Mutation.deleteCategory
       }
       ,

       createDeck : {
           type : DeckType ,
           args : {

                deckName : { type : GraphQLString} ,
                categoryId : { type : GraphQLString}  ,
           } ,
           resolve : deckResolvers.Mutation.createDeck
       } ,

       createCard : {
           type  : CardType ,
           args :  {
               question : { type : GraphQLString} ,
               answer :   { type : GraphQLString} ,
               deckId : { type  : GraphQLString }
           } ,
           resolve : cardResolvers.Mutation.createCard
       }
    }

})



module.exports = new GraphQLSchema({
    
    query : RootQueryType ,
    mutation : Mutation
})