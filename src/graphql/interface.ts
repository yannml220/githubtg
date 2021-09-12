import  { Request , Response} from 'express'
import  {PrismaClient} from '@prisma/client'

export interface IContext {
    req : Request ,
    res : Response ,
    prisma : PrismaClient

}


export interface ITypeContext {
    prisma : PrismaClient
}