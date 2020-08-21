import { RouterContext, hashSync, compareSync,validateJwt,  makeJwt, setExpiration, Jose, Payload  } from "../deps.ts";
import User from  "../models/User.ts"




const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};



class AuthController {

    async login(ctx: RouterContext) {
        const data = await  ctx.request.body();
        const {email, password} = await data.value; 
        
        if(!email || !password) {
            ctx.response.status = 442;
            ctx.response.body = { message: "Please provide email and password"}
            return;
        }
        const user: any = await User.findOne({email});

        
        if (!user) {
            ctx.response.status = 422;
            ctx.response.body = {message : "No Account found"}
            return;
        }

        if (!compareSync(password,user.password)) {
            ctx.response.status = 422;
            ctx.response.body = { message : "Incorrect password"}
            return;
        }                
        
        const payload: Payload = {
            iss: user.email,
             exp: setExpiration(new Date().getTime()+ 60 * 60 * 1000),
        };
        
        const jwt = await makeJwt({ header, payload, key: Deno.env.get("JWT_SECRET_KEY")! })

        ctx.response.body = {
            id: user._id.$oid,
            name: user.name,
            email: user.email,
            jwt,
        }


    //     Mai jab bhi rota hun,
    // Mujhe wo bohot yaad aata hai,
    // Jaise mujhe wo manata tha,
    // Ab koi bhi na manata hai,

    // Khud ko jab mai khota hun,
    // Mujhe wo bohot yaad aata hai,
    // Jaise mujhe wo samjhata tha,
    // Ab koi bhi na samjhata hai,



    }

    async register(ctx: RouterContext) {
        const data = await  ctx.request.body()
        const {name, email, password} = await data.value; 
        let user = await User.findOne({email})        


        if (user) {
            ctx.response.status = 422;
            ctx.response.body = {message : "Email  is already used"}
            return;
        }    


        const hashedPassword = hashSync(password);
        const users = new User({name,email,password: hashedPassword });
        console.log("Hello");
        await users.save()
        ctx.response.status = 201
        ctx.response.body = {
            id : users.id,
            name : users.name,
            email : users.email,
            password : users.password
        }

    }
}

const authController = new AuthController()


export default authController;