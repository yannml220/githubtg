import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import { PrismaClient } from "@prisma/client"
import { Request , Response} from 'express'
import { IContext } from './graphql/interface'
const schema = require('./graphql/schema/schema')



const app = express()
export const prisma = new PrismaClient()

app.use(express.json());
app.use('/graphql' , graphqlHTTP( (req : Request ,res : Response)=> ({
    schema , 
    graphiql : true ,
    context : { req , res ,  prisma } 
}))
)

const port = 2000



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

