import bcrypt  from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user";

// eslint-disable-next-line import/no-anonymous-default-export
export default   { 
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedField = LoginSchema.safeParse(credentials);
                if(validatedField.success){
                    const{email,password} = validatedField.data
                    
                    const user = await getUserByEmail(email);
                    console.log(JSON.stringify(user));
                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password,user.password);

                    if(passwordsMatch) return user;
                }
            }
        })

        
    ]
}