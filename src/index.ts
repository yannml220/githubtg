import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import { PrismaClient } from "@prisma/client"
import { Request , Response} from 'express'
import { IContext } from './graphql/interface'
import cors from 'cors'

const schema = require('./graphql/schema/schema')



const app = express()
export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());
app.use('/graphql' , graphqlHTTP( (req : Request ,res : Response)=> ({
    schema , 
    graphiql : true ,
    context : { req , res ,  prisma } 
}))
)

const port = 5000



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

