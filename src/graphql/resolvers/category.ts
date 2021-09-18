import { category } from '.prisma/client'
import { getAccessToken , getRefreshToken ,hashPassword ,verifyPassword } from '../../utils/userUtils'
import {IContext, ITypeContext} from '../interface'
import { CategoryType} from  '../schema/types/categoryType'




export const categoryResolvers = {

    Query : {
        getUserCategories : async (_ , { accountId } , context : ITypeContext )=>{
            try {
                
                const categories = await context.prisma.category.findMany({

                    where : {
                        accountId :  parseInt(accountId,10)
                    }

                })

                return categories

            }catch(error){
                console.log(error)
            }
        }
    }
    ,

    Mutation : {
        createCategory : async ( _ ,  { categoryName ,  accountId , description , subject , parentId }, context : ITypeContext )=>{


            try{

                const category =  await context.prisma.category.create({
                    data : {
                        categoryName : categoryName ,
                        accountId : parseInt(accountId,10),
                        expertise : 0 ,
                        parentId :  parseInt(parentId,10) || null ,
                        createdAt : new Date().toISOString() ,
                        description : description ,
                        subject : subject 
                    }
                })
    
                return category 


            }catch(error){
                console.log(error)
            }
          
        } ,

        deleteCategories : async ( _, {ids}, context: IContext ) =>{
            try{
                console.log(ids)

                const idsToNumberList = ids.map(id=>(
                    parseInt(id , 10)
                ))
                const deletedCategories  =   await context.prisma.category.deleteMany({
                    where : {
                        id : {
                            in : idsToNumberList 
                        }
                    }
                })
                return true
    
            }catch(error){
                console.log(error)
                return false
                
            }
        },

        deleteCategory : async (_ , {id} , context:IContext )=>{
            try{

                const deletedCategory = await context.prisma.category.delete({
                    where : {
                        id : parseInt(id,10) 
                    }
                })
                return deletedCategory
            }catch(error){
                console.log(error)
            }
        }
    }


    
}